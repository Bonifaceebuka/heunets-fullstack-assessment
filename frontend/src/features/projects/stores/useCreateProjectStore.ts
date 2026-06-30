import { formatBackendErrors, formatValidationMessage } from "../../../shared/handlers/error_handler";
import type { ErrorMessages } from "../../../shared/handlers/error_handler";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { IProjectStore } from "../types/IProjectStore";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useCreateProjectStore =
  create<IProjectStore>()(
    devtools((set) => ({
      submitting: false,
      successMsg: "",
      errorMsg: "",

      reset: () =>
        set({
          submitting: false,
          successMsg: "",
          errorMsg: "",
        }),

      handleCreateProject: async (
        formData,
        mutate,
        queryClient,
        handleCreateProjectModalClose
      ) => {
        set({ submitting: true, errorMsg: "", successMsg: "" });

        mutate(formData, {
          onSuccess(response) {
            const { status_code, message, data } = response.data;

            if (status_code === 200 || status_code === 201) {
              set({
                submitting: false,
                successMsg: message,
              });
              queryClient.invalidateQueries({
                queryKey: ["projects"],
              });

              toast.success("Project creation successful", {
                description: message,
              });

              handleCreateProjectModalClose()
            } else if (status_code >= 400 && status_code < 500) {
              const errorMessages = message;
              const allErrors = formatBackendErrors(errorMessages);
              const firstMessage = allErrors[0] || "Some required fields are still empty!";
              set({ submitting: false, errorMsg: firstMessage })
              toast.error("Project creation failed", {
                description: firstMessage,
              })

              set({ submitting: false, errorMsg: firstMessage });
            }
          },
          onError(error) {
            set({ submitting: false });


            if (error instanceof AxiosError) {
              let message = error?.response?.data.message
              if (error?.response?.status === 422) {
                const allErrors = formatBackendErrors(error?.response?.data);
                message = allErrors[0] || "Some required fields are still empty!";
              }
              set({ submitting: false, errorMsg: message })
              toast.error("Project creation failed", {
                description: message,
              });
            } else {
              set({ submitting: false, errorMsg: 'Internal server error. Please try again!' })
              toast.error("Project creation failed", {
                description: 'Internal server error. Please try again!',
              });
            }
          },
        });
      },
    }))
  );