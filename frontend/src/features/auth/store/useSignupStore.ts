import { formatValidationMessage } from "../../../shared/handlers/error_handler";
import type { ErrorMessages } from "../../../shared/handlers/error_handler";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { IUser } from "../types/IUser";
import type { ISignupUserStore } from "../types/ISignupUserStore";
import { tokenStorage } from "../../../shared/configs/axios";
import { toast } from "sonner";

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
      ) => {
        set({ submitting: true, errorMsg: "", successMsg: "" });

        mutate(formData, {
          onSuccess(response) {
            const { status_code, message, data } = response.data;

            if (status_code === 200 || status_code === 201) {
              const { token } = data as IUser;

              tokenStorage.setToken({ access_token: token });

              set({
                submitting: false,
                successMsg: message,
                user: data,
              });
              queryClient.setQueryData(["user"], data);

              setTimeout(() => {
                toast.success("Account creation successful",{
                  description: message,
                });
                navigate("/login");
              }, 1500);
            } else if (status_code === 400) {

              const errorMessages = message;
              const firstMessage = Array.isArray(errorMessages)
                ? formatValidationMessage(
                  errorMessages as unknown as ErrorMessages
                )[0] || "Some required fields are still empty!"
                : errorMessages;
              setTimeout(() => {
                toast.error("Account creation failed",{
                description: firstMessage,
              })
              }, 1500);

              set({ submitting: false, errorMsg: firstMessage });
            } else {
              set({
                submitting: false,
                errorMsg: "Something went wrong. Please try again!",
              });
              setTimeout(() => {
                toast.error("Account creation failed",{
                description: "Something went wrong. Please try again!",
              })
              }, 1500);
              return
            }
          },
          onError(error) {
            set({ submitting: false });
            setTimeout(() => {
              toast.error("Account creation failed",{
                description: error.message,
              });
            }, 1500);
          },
        });
      },
    }))
  );