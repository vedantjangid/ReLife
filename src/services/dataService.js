// dataService.js
import axios from "axios";

const API_BASE_URL = "https://example.com/api";

export const fetchLiveStreams = async () => {
  const response = await axios.get(`${API_BASE_URL}/live-streams`);
  return response.data;
};

export const fetchPopularVideos = async () => {
  const response = await axios.get(`${API_BASE_URL}/popular-videos`);
  return response.data;
};
