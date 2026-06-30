import { formatValidationMessage } from "../../../shared/handlers/error_handler";
import type { ErrorMessages } from "../../../shared/handlers/error_handler";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { IUser } from "../types/IUser";
import { tokenStorage } from "../../../shared/configs/axios";
import { toast } from "sonner";
import type { ISigninUserStore } from "../types/ISigninUserStore";

export const useSigninStore =
  create<ISigninUserStore>()(
    devtools((set) => ({
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

      handleSigninUser: async (
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
              const { access_token } = data as any;

              tokenStorage.setToken({ access_token });

              set({
                submitting: false,
                successMsg: message,
                user: data,
              });
              queryClient.setQueryData(["user"], data);

              toast.success("Account login successful",{
                  description: message,
                });
              navigate("/projects");
            } else if (status_code >= 400 && status_code < 500) {

              const errorMessages = message;
              const firstMessage = Array.isArray(errorMessages)
                ? formatValidationMessage(
                  errorMessages as unknown as ErrorMessages
                )[0] || "Some required fields are still empty!"
                : errorMessages;
              toast.error("Account login failed",{
                description: firstMessage,
              })

              set({ submitting: false, errorMsg: firstMessage });
            } else {
              set({
                submitting: false,
                errorMsg: "Something went wrong. Please try again!",
              });
              toast.error("Account login failed",{
                description: "Something went wrong. Please try again!",
              })
              return
            }
          },
          onError(error) {
            set({ submitting: false });
            toast.error("Account login failed",{
                description: error.message,
              });
          },
        });
      },
    }))
  );