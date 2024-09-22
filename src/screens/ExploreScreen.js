import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://138.2.78.67:3000"; // Replace with your actual API URL

const fetchTopCreators = async () => {
  const response = await axios.get(`${API_URL}/top-creators`);
  return response.data;
};

const ExploreScreen = ({ navigation }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topCreators"],
    queryFn: fetchTopCreators,
  });

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error)
    return <Text style={styles.errorText}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Top creators</Text>
        <TouchableOpacity>
          <FontAwesome name="ellipsis-h" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data?.creators.map((creator, index) => (
          <View key={index} style={styles.creatorCard}>
            <Image
              source={{ uri: creator.avatar }}
              style={styles.creatorImage}
            />
            <View style={styles.creatorInfo}>
              <Text style={styles.creatorName}>{creator.name}</Text>
              <Text style={styles.creatorDescription}>
                {creator.description}
              </Text>
            </View>
          </View>
        ))}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  creatorCard: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  creatorImage: {
    width: 100,
    height: 100,
  },
  creatorInfo: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  creatorName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  creatorDescription: {
    color: "#999",
    fontSize: 14,
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

export default ExploreScreen;
