import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

import PassportMap from "../../components/PassportMap/PassportMap";

import {
  getPassportEntries,
  getPassportStats,
} from "../../services/passportService";

import {
  getAllPlaces,
} from "../../services/placeService";

import {
  getCurrentUser,
} from "../../services/userService";

const getExplorerLevel = (visitedCount) => {
  if (visitedCount >= 25) {
    return "Ethiopia Insider";
  }

  if (visitedCount >= 10) {
    return "Ethiopia Explorer";
  }

  if (visitedCount >= 5) {
    return "Trail Seeker";
  }

  if (visitedCount >= 1) {
    return "Explorer";
  }

  return "Curious Traveler";
};

const getInitials = (user) => {
  if (user?.full_name) {
    return user.full_name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase();
  }

  if (user?.username) {
    return user.username
      .charAt(0)
      .toUpperCase();
  }

  return "T";
};

export default function PassportScreen({
  navigation,
}) {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    visitedCount: 0,
    wantToVisitCount: 0,
    totalTracked: 0,
  });

  const [totalDestinations, setTotalDestinations] =
    useState(0);

  const [activeTab, setActiveTab] =
    useState("visited");

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loadPassport = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError("");

      const [
        entriesData,
        statsData,
        placesData,
        userData,
      ] = await Promise.all([
        getPassportEntries(),
        getPassportStats(),
        getAllPlaces(),
        getCurrentUser(),
      ]);

      setEntries(
        Array.isArray(entriesData)
          ? entriesData
          : []
      );

      setStats(
        statsData || {
          visitedCount: 0,
          wantToVisitCount: 0,
          totalTracked: 0,
        }
      );

      setTotalDestinations(
        Array.isArray(placesData)
          ? placesData.length
          : 0
      );

      /*
        Supports either:

        { user: {...} }

        or:

        { full_name: "...", ... }
      */
      setUser(
        userData?.user ||
          userData ||
          null
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to load your Passport.";

      console.log(
        "Failed to load Passport:",
        message
      );

      setLoadError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPassport();
    }, [loadPassport])
  );

  const visitedEntries = useMemo(
    () =>
      entries.filter(
        (entry) =>
          entry.status === "visited"
      ),
    [entries]
  );

  const wantToVisitEntries = useMemo(
    () =>
      entries.filter(
        (entry) =>
          entry.status === "wantToVisit"
      ),
    [entries]
  );

  /*
    Highlights contain only personal memories
    with user-uploaded photographs.
  */
  const personalHighlights = useMemo(
    () =>
      visitedEntries.filter(
        (entry) =>
          Boolean(entry.coverPhoto?.url) ||
          entry.photos?.some((photo) =>
            Boolean(photo.url)
          )
      ),
    [visitedEntries]
  );

  const visibleEntries =
    activeTab === "visited"
      ? visitedEntries
      : wantToVisitEntries;

  const explorerLevel = getExplorerLevel(
    stats.visitedCount
  );

  const completionPercentage =
    totalDestinations > 0
      ? Math.min(
          100,
          Math.round(
            (stats.visitedCount /
              totalDestinations) *
              100
          )
        )
      : 0;

  const firstName =
    user?.full_name
      ?.trim()
      .split(/\s+/)[0] ||
    user?.username ||
    "Traveler";

  const initials = getInitials(user);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("Home");
  };

  const openPlace = (entry) => {
    if (!entry.place?.slug) {
      Alert.alert(
        "Destination unavailable",
        "The destination page could not be found."
      );

      return;
    }

    navigation.navigate("PlaceDetails", {
      slug: entry.place.slug,
    });
  };

  const openJourneyMemory = (entry) => {
    if (!entry.place?._id) {
      Alert.alert(
        "Memory unavailable",
        "The journey information could not be found."
      );

      return;
    }

    navigation.navigate("JourneyMemory", {
      placeId: entry.place._id,
    });
  };

  /*
    A visited map pin with a personal memory opens
    Journey Memory. Other pins open Place Details.
  */
  const openMapEntry = (entry) => {
    const hasPersonalMemory =
      Boolean(entry.coverPhoto?.url) ||
      entry.photos?.some((photo) =>
        Boolean(photo.url)
      ) ||
      Boolean(entry.memory);

    if (
      entry.status === "visited" &&
      hasPersonalMemory
    ) {
      openJourneyMemory(entry);
      return;
    }

    openPlace(entry);
  };

  const getPersonalImage = (entry) => {
    return (
      entry.coverPhoto?.url ||
      entry.photos?.find(
        (photo) => photo.url
      )?.url ||
      null
    );
  };

  /*
    Visited and Want-to-Visit cards use ADEY's
    official destination photographs.
  */
  const getOfficialImage = (entry) => {
    return entry.place?.coverImage || null;
  };

  const formatVisitDate = (date) => {
    if (!date) return "Visited";

    return new Date(date).toLocaleDateString(
      undefined,
      {
        month: "short",
        year: "numeric",
      }
    );
  };

  /*
    Official ADEY destination card.

    These original style names are intentionally
    preserved so the old design remains unchanged.
  */
  const renderEntry = ({ item }) => {
    const imageUrl = getOfficialImage(item);

    return (
      <TouchableOpacity
        style={styles.memoryCard}
        activeOpacity={0.88}
        onPress={() => openPlace(item)}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.memoryImage}
          />
        ) : (
          <View
            style={
              styles.memoryPlaceholder
            }
          >
            <Ionicons
              name="location-outline"
              size={32}
              color="#5E6E60"
            />
          </View>
        )}

        <View style={styles.memoryOverlay} />

        <View style={styles.cardStatus}>
          <Ionicons
            name={
              item.status === "visited"
                ? "checkmark"
                : "heart"
            }
            size={13}
            color="#FFFFFF"
          />

          <Text style={styles.cardStatusText}>
            {item.status === "visited"
              ? "Visited"
              : "Want to visit"}
          </Text>
        </View>

        <View
          style={styles.memoryCardContent}
        >
          <Text
            style={styles.memoryPlaceName}
            numberOfLines={2}
          >
            {item.place?.name ||
              "Ethiopian destination"}
          </Text>

          <View style={styles.memoryMetaRow}>
            <Ionicons
              name="location-outline"
              size={13}
              color="#F0F4ED"
            />

            <Text
              style={styles.memoryLocation}
              numberOfLines={1}
            >
              {item.place?.city ||
                item.place?.area ||
                item.place?.region ||
                "Ethiopia"}
            </Text>
          </View>

          {item.status === "visited" && (
            <Text style={styles.memoryDate}>
              {formatVisitDate(
                item.visitedAt
              )}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHighlights = () => {
    if (personalHighlights.length === 0) {
      return null;
    }

    return (
      <View style={styles.highlightsSection}>
        <View style={styles.sectionHeadingRow}>
          <View>
            <Text style={styles.sectionHeading}>
              Journey highlights
            </Text>

            <Text
              style={styles.sectionSubheading}
            >
              Your personal Ethiopia memories
            </Text>
          </View>

          <Ionicons
            name="sparkles-outline"
            size={21}
            color="#C28B2C"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.highlightsContent
          }
        >
          {personalHighlights
            .slice(0, 10)
            .map((entry) => {
              const imageUrl =
                getPersonalImage(entry);

              return (
                <TouchableOpacity
                  key={entry._id}
                  style={styles.highlightItem}
                  activeOpacity={0.85}
                  onPress={() =>
                    openJourneyMemory(entry)
                  }
                >
                  <View
                    style={
                      styles.highlightImageBorder
                    }
                  >
                    <Image
                      source={{
                        uri: imageUrl,
                      }}
                      style={
                        styles.highlightImage
                      }
                    />
                  </View>

                  <Text
                    style={
                      styles.highlightName
                    }
                    numberOfLines={1}
                  >
                    {entry.place?.name ||
                      "Journey"}
                  </Text>
                </TouchableOpacity>
              );
            })}

          <TouchableOpacity
            style={styles.highlightItem}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("AddJourney")
            }
          >
            <View style={styles.addHighlight}>
              <Ionicons
                name="add"
                size={28}
                color="#37533C"
              />
            </View>

            <Text style={styles.highlightName}>
              Add
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const renderHeader = () => (
    <>
      <View style={styles.hero}>
        <View style={styles.heroTopRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={() =>
              Alert.alert(
                "Coming next",
                "Shareable Passport cards will be added after the Passport experience is complete."
              )
            }
          >
            <Ionicons
              name="share-social-outline"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.identityRow}>
          {user?.profile_photo ? (
            <Image
              source={{
                uri: user.profile_photo,
              }}
              style={styles.passportAvatar}
            />
          ) : (
            <View
              style={
                styles.passportAvatarFallback
              }
            >
              <Text
                style={
                  styles.passportAvatarInitials
                }
              >
                {initials}
              </Text>
            </View>
          )}

          <View style={styles.identityText}>
            <Text style={styles.passportLabel}>
              Ethiopia Passport
            </Text>

            <Text
              style={styles.heroTitle}
              numberOfLines={2}
            >
              {firstName}’s Passport
            </Text>
          </View>
        </View>

        <Text style={styles.heroSubtitle}>
          Every destination becomes part of your
          personal travel story.
        </Text>

        <View style={styles.levelRow}>
          <View style={styles.levelBadge}>
            <Ionicons
              name="ribbon-outline"
              size={17}
              color="#D9AD54"
            />

            <Text style={styles.levelText}>
              {explorerLevel}
            </Text>
          </View>

          <Text style={styles.progressText}>
            {completionPercentage}% explored
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${completionPercentage}%`,
              },
            ]}
          />
        </View>

        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text
              style={styles.heroStatNumber}
            >
              {stats.visitedCount}
            </Text>

            <Text style={styles.heroStatLabel}>
              Visited
            </Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.heroStat}>
            <Text
              style={styles.heroStatNumber}
            >
              {stats.wantToVisitCount}
            </Text>

            <Text style={styles.heroStatLabel}>
              Dreaming
            </Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.heroStat}>
            <Text
              style={styles.heroStatNumber}
            >
              {totalDestinations}
            </Text>

            <Text style={styles.heroStatLabel}>
              To explore
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addJourneyButton}
          activeOpacity={0.86}
          onPress={() =>
            navigation.navigate("AddJourney")
          }
        >
          <Ionicons
            name="add-circle-outline"
            size={21}
            color="#37533C"
          />

          <Text
            style={
              styles.addJourneyButtonText
            }
          >
            Add a Journey
          </Text>
        </TouchableOpacity>
      </View>

      <PassportMap
        entries={entries}
        onOpenEntry={openMapEntry}
      />

      {renderHighlights()}

      <View style={styles.gallerySection}>
        <View style={styles.sectionHeadingRow}>
          <View>
            <Text style={styles.sectionHeading}>
              My collection
            </Text>

            <Text
              style={styles.sectionSubheading}
            >
              Places that shape your story
            </Text>
          </View>

          <View
            style={styles.collectionCount}
          >
            <Text
              style={
                styles.collectionCountText
              }
            >
              {visibleEntries.length}
            </Text>
          </View>
        </View>

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "visited" &&
                styles.tabButtonActive,
            ]}
            onPress={() =>
              setActiveTab("visited")
            }
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={17}
              color={
                activeTab === "visited"
                  ? "#FFFFFF"
                  : "#526257"
              }
            />

            <Text
              style={[
                styles.tabText,
                activeTab === "visited" &&
                  styles.tabTextActive,
              ]}
            >
              Visited
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "wantToVisit" &&
                styles.tabButtonActive,
            ]}
            onPress={() =>
              setActiveTab("wantToVisit")
            }
          >
            <Ionicons
              name="heart-outline"
              size={17}
              color={
                activeTab === "wantToVisit"
                  ? "#FFFFFF"
                  : "#526257"
              }
            />

            <Text
              style={[
                styles.tabText,
                activeTab === "wantToVisit" &&
                  styles.tabTextActive,
              ]}
            >
              Want to Visit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  if (loading) {
    return (
      <SafeAreaView
        style={styles.center}
        edges={["top"]}
      >
        <ActivityIndicator
          size="large"
          color="#37533C"
        />

        <Text style={styles.loadingText}>
          Opening your Passport...
        </Text>
      </SafeAreaView>
    );
  }

  if (loadError) {
    return (
      <SafeAreaView
        style={styles.center}
        edges={["top"]}
      >
        <Ionicons
          name="alert-circle-outline"
          size={42}
          color="#37533C"
        />

        <Text style={styles.emptyTitle}>
          Passport unavailable
        </Text>

        <Text style={styles.emptyText}>
          {loadError}
        </Text>

        <TouchableOpacity
          style={styles.emptyButton}
          onPress={loadPassport}
        >
          <Text
            style={styles.emptyButtonText}
          >
            Try again
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >
      <FlatList
        data={visibleEntries}
        keyExtractor={(item) => item._id}
        renderItem={renderEntry}
        numColumns={2}
        columnWrapperStyle={
          styles.columnWrapper
        }
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.listContent
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name={
                  activeTab === "visited"
                    ? "ribbon-outline"
                    : "heart-outline"
                }
                size={34}
                color="#37533C"
              />
            </View>

            <Text style={styles.emptyTitle}>
              {activeTab === "visited"
                ? "Collect your first destination"
                : "Build your dream journey"}
            </Text>

            <Text style={styles.emptyText}>
              {activeTab === "visited"
                ? "Add a destination you have explored and preserve the memory."
                : "Save the Ethiopian destinations you want to experience next."}
            </Text>

            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() =>
                navigation.navigate(
                  "AddJourney"
                )
              }
            >
              <Text
                style={
                  styles.emptyButtonText
                }
              >
                Add a destination
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}