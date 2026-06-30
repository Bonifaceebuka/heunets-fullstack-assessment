import { setAuthToken } from "../../auth/utils";
import { axios } from "../../../shared/configs/axios";
import { useQuery } from "@tanstack/react-query";

export const getTasks = async (projectId: string) => {
  setAuthToken();
  const { data } = await axios.get(`/projects/${projectId}/tasks`);
  return data;
};

export const useGetTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasks(projectId),
    enabled: !!projectId,
  });
};