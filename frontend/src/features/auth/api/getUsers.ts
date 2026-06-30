import { setAuthToken } from "../../auth/utils";
import { axios } from "../../../shared/configs/axios";
import { useQuery } from "@tanstack/react-query";

export const getUsers = async () => {
  setAuthToken();
  const { data } = await axios.get(`/authentication/users`);
  return data;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getUsers(),
  });
};