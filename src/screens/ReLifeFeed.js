import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://138.2.78.67:3000"; // Replace with your actual API URL

const fetchFeedData = async () => {
  const response = await axios.get(`${API_URL}/feed`);
  return response.data;
};

const ReLifeFeed = () => {
  const navigation = useNavigation();
  const { data, isLoading, error } = useQuery({
    queryKey: ["feedData"],
    queryFn: fetchFeedData,
  });

  const navigateToSearch = () => {
    navigation.navigate("Search");
  };

  const navigateToLive = (stream) => {
    navigation.navigate("Live", { stream });
  };

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error)
    return <Text style={styles.errorText}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToSearch} style={styles.button}>
          <FontAwesome
            name="search"
            size={24}
            color="white" // Set icon color
            style={styles.icon} // Apply additional styling
          />
        </TouchableOpacity>
        <Text style={styles.title}>Zirka</Text>
        {data?.feeds[0]?.user?.avatar ? (
          <Image
            source={{ uri: data.feeds[0].user.avatar }}
            style={styles.avatar}
          />
        ) : (
          <FontAwesome name="user-circle" size={32} color="white" />
        )}
      </View>

      <ScrollView>
        {/* Favorites */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your favourites</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.favoritesScroll}
          >
            {data?.feeds[0]?.favorites?.length > 0 ? (
              data.feeds[0].favorites.map((favorite, i) => (
                <Image
                  key={i}
                  source={{ uri: favorite.avatar }}
                  style={styles.favoriteAvatar}
                />
              ))
            ) : (
              <Text style={styles.noFavoritesText}>No favorites found</Text>
            )}
          </ScrollView>
        </View>

        {/* Creators on live */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Creators on live</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.liveGridContainer}
          >
            {data?.feeds[0]?.liveStreams?.length > 0 ? (
              data.feeds[0].liveStreams.map((stream, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.liveItem}
                  onPress={() => navigateToLive(stream)}
                >
                  <Image
                    source={{ uri: stream.thumbnail }}
                    style={styles.liveImage}
                  />
                  <View style={styles.liveOverlay}>
                    <Text style={styles.liveTag}>LIVE</Text>
                    {stream.viewers && (
                      <Text style={styles.viewersCount}>{stream.viewers}</Text>
                    )}
                    <View style={styles.liveInfo}>
                      <Text style={styles.liveTitle}>{stream.title}</Text>
                      <Text style={styles.liveCreator}>
                        {stream.creator} • {stream.time}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noLiveStreamsText}>
                No live streams available
              </Text>
            )}
          </ScrollView>
        </View>

        {/* Popular videos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular videos</Text>
          <View style={styles.popularGridContainer}>
            {data?.feeds[0]?.popularVideos?.length > 0 ? (
              data.feeds[0].popularVideos.map((video, i) => (
                <View key={i} style={styles.videoItem}>
                  <Image
                    source={{ uri: video.thumbnail }}
                    style={styles.videoImage}
                  />
                  <View style={styles.videoDuration}>
                    <FontAwesome name="clock-o" size={12} color="white" />
                    <Text style={styles.durationText}>{video.duration}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noPopularVideosText}>
                No popular videos found
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "white", // Set background color
    borderRadius: 40, // Apply border radius
    padding: 8, // Add padding around the icon
    justifyContent: "center", // Center icon vertically
    alignItems: "center", // Center icon horizontally
  },
  icon: {
    borderRadius: 50,
    color: "black", // Ensure icon follows the border radius of the button
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 12,
  },
  favoritesScroll: {
    flexDirection: "row",
  },
  favoriteAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  liveGridContainer: {
    flexDirection: "row",
  },
  liveItem: {
    width: 180,
    marginRight: 16,
  },
  liveImage: {
    width: 180,
    height: 240,
    borderRadius: 8,
  },
  liveOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    padding: 8,
  },
  liveTag: {
    backgroundColor: "red",
    color: "white",
    padding: 4,
    borderRadius: 4,
    fontSize: 12,
    alignSelf: "flex-start",
  },
  viewersCount: {
    // change it such that the vie count is visible on top right of card
    color: "white",
    backgroundColor: "black",
    marginLeft: "auto",
    marginBottom: "auto",
    fontSize: 12,
    alignSelf: "flex-end",
  },

  liveInfo: {
    justifyContent: "flex-end",
  },
  liveTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  liveCreator: {
    color: "white",
    fontSize: 12,
  },
  popularGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  videoItem: {
    width: "48%",
    marginBottom: 16,
  },
  videoImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  videoDuration: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  durationText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ReLifeFeed;
