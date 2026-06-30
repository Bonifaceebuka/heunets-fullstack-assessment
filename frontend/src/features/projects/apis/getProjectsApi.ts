import { setAuthToken } from "../../auth/utils";
import { axios } from "../../../shared/configs/axios";
import { useQuery } from "@tanstack/react-query";

export const getProjects = async () => {
  setAuthToken();
  const { data } = await axios.get(`/projects`);
  return data;
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
};