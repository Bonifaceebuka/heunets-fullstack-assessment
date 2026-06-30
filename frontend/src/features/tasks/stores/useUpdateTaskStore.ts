import { formatBackendErrors } from "../../../shared/handlers/error_handler";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { IUpdateTaskStore } from "../types/IUpdateTaskStore";

export const useUpdateTaskStore =
  create<IUpdateTaskStore>()(
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

      handleUpdateTask: async (
        formData,
        mutate,
        queryClient,
        handleEditTaskModalClose
      ) => {
        set({ submitting: true, errorMsg: "", successMsg: "" });

        mutate(formData, {
          onSuccess(response) {
            const { status_code, message } = response.data;

            if (status_code === 200) {
              set({
                submitting: false,
                successMsg: message,
              });
              queryClient.invalidateQueries({
                queryKey: ["tasks"],
              });
              toast.success("Task updated successfully", {
                description: message,
              });

              handleEditTaskModalClose()
            } else if (status_code >= 400 && status_code < 500) {
              const errorMessages = message;
              const allErrors = formatBackendErrors(errorMessages);
              const firstMessage = allErrors[0] || "Some required fields are still empty!";
              set({ submitting: false, errorMsg: firstMessage })
              toast.error("Task updated failed", {
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
              toast.error("Task updated failed", {
                description: message,
              });
            } else {
              set({ submitting: false, errorMsg: 'Internal server error. Please try again!' })
              toast.error("Task updated failed", {
                description: 'Internal server error. Please try again!',
              });
            }
          },
        });
      },
    }))
  );