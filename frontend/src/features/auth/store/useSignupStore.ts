import { formatValidationMessage } from "../../../shared/handlers/error_handler";
import type { ErrorMessages } from "../../../shared/handlers/error_handler";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { IUser } from "../types/IUser";
import type { ISignupUserStore } from "../types/ISignupUserStore";
import { tokenStorage } from "../../../shared/configs/axios";

export const useSignupStore =
  create<ISignupUserStore>()(
    devtools((set, get) => ({
      submitting: false,
      successMsg: "",
      errorMsg: "",
      user: null,

      setUser: (user: IUser | null) => set({ user }),

      reset: () =>
        set({
          submitting: false,
          successMsg: "",
          errorMsg: "",
        }),

      handleSignupUser: async (
        formData,
        mutate,
        queryClient,
        navigate,
        toast
      ) => {
        set({ submitting: true, errorMsg: "", successMsg: "" });

        mutate(formData, {
          onSuccess(response) {
            const { status_code, message, data } = response.data;

            if (status_code === 200) {
              const { token } = data as IUser;

              tokenStorage.setToken({ access_token: token });

              set({
                submitting: false,
                successMsg: message,
                user: data,
              });
              queryClient.setQueryData(["user"], data);

              setTimeout(() => {
                toast({
                  title: message,
                  description: "Welcome back to Aurispectrum for staff.",
                });
                navigate("/dashboard");
              }, 1500);
            } else if (status_code === 400) {

              const errorMessages = message;
              const firstMessage = Array.isArray(errorMessages)
                ? formatValidationMessage(
                  errorMessages as unknown as ErrorMessages
                )[0] || "Some required fields are still empty!"
                : errorMessages;

              setTimeout(() => {
                toast({
                  title: firstMessage,
                  description: "Login failed!",
                  variant: "destructive",
                });
              }, 1500);

              set({ submitting: false, errorMsg: firstMessage });
            } else {
              set({
                submitting: false,
                errorMsg: "Something went wrong. Please try again!",
              });
              setTimeout(() => {
                toast({
                  title: message,
                  description: "Login failed",
                  variant: "destructive",
                });
              }, 1500);
            }
          },
          onError(error) {
            set({ submitting: false });

            setTimeout(() => {
              toast({
                title: error.message,
                description: "Login failed",
                variant: "destructive",
              });
            }, 1500);
          },
        });
      },
    }))
  );