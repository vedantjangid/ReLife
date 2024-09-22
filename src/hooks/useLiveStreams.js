import { useQuery } from "@tanstack/react-query";
import { fetchLiveStreams, fetchPopularVideos } from "../services/dataService";

export const useLiveStreams = () => {
  return useQuery(["liveStreams"], fetchLiveStreams);
};

export const usePopularVideos = () => {
  return useQuery(["popularVideos"], fetchPopularVideos);
};
