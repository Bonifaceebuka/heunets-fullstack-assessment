import { setAuthToken } from "../../auth/utils";
import { axios } from "../../../shared/configs/axios";
import { useQuery } from "@tanstack/react-query";

export const getOneTask = async (projectId: string) => {
  setAuthToken();
  const { data } = await axios.get(`/projects/${projectId}/tasks`);
  return data;
};

export const useGetOneTask = (projectId: string) => {
  return useQuery({
    queryKey: ["getOneTask", projectId],
    queryFn: () => getOneTask(projectId),
    enabled: !!projectId,
  });
};