import { formatBackendErrors } from "../../../shared/handlers/error_handler";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { IDeleteTaskStore } from "../types/IDeleteTaskStore";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useDeleteTaskStore =
  create<IDeleteTaskStore>()(
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

      handleDeleteTask: async (
        task_id,
        mutate,
        queryClient,
      ) => {
        set({ submitting: true, errorMsg: "", successMsg: "" });

        mutate(task_id, {
          onSuccess(response) {
            const { status_code, message } = response.data;

            if (status_code === 200 || status_code === 201) {
              set({
                submitting: false,
                successMsg: message,
              });
              queryClient.invalidateQueries({
                queryKey: ["tasks"],
              });

              toast.success("Task deletion successful", {
                description: message,
              });
            } else if (status_code >= 400 && status_code < 500) {
              const errorMessages = message;
              const allErrors = formatBackendErrors(errorMessages);
              const firstMessage = allErrors[0] || "Some required fields are still empty!";
              set({ submitting: false, errorMsg: firstMessage })
              toast.error("Task deletion failed", {
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
              toast.error("Task deletion failed", {
                description: message,
              });
            } else {
              set({ submitting: false, errorMsg: 'Internal server error. Please try again!' })
              toast.error("Task deletion failed", {
                description: 'Internal server error. Please try again!',
              });
            }
          },
        });
      },
    }))
  );