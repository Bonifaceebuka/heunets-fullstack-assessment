import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTask } from "../apis/deleteTaskApi";
import { useDeleteTaskStore } from "../stores/useDeleteTaskStore";

export default function DeleteTaskModal({
    deleteDialogOpen,
    setDeleteDialogOpen,
    setSelectedTask,
    selectedTask
}: {
    deleteDialogOpen: boolean;
    setDeleteDialogOpen: (deleteDialogOpen: boolean) => void;
    setSelectedTask: (task: any) => void;
    selectedTask: any;
}) {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteTask();
  const { handleDeleteTask } = useDeleteTaskStore();

  const deleteTask = async (task_id: string) => {
    handleDeleteTask(task_id, mutate, queryClient);
  };
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedTask(null);
    };

    return (
        <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteDialogClose}
        >
            <DialogTitle>Delete Task</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete{" "}
                    <strong>{selectedTask?.title}</strong>?
                    <br />
                    <br />
                    This action cannot be undone.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleDeleteDialogClose}>
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={async () => {
                        await deleteTask(selectedTask._id);
                        handleDeleteDialogClose();
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
