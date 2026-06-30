import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteProject } from "../apis/deleteProjectApi";
import { useDeleteProjectStore } from "../stores/useDeleteProjectStore";

export default function DeleteProjectModal({
    deleteDialogOpen,
    setDeleteDialogOpen,
    setSelectedProject,
    selectedProject
}: {
    deleteDialogOpen: boolean;
    setDeleteDialogOpen: (deleteDialogOpen: boolean) => void;
    setSelectedProject: (project: any) => void;
    selectedProject: any;
}) {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteProject();
  const { handleDeleteProject } = useDeleteProjectStore();

  const deleteProject = async (project_id: string) => {
    handleDeleteProject(project_id, mutate, queryClient);
  };
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedProject(null);
    };

    return (
        <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteDialogClose}
        >
            <DialogTitle>Delete Project</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete{" "}
                    <strong>{selectedProject?.name}</strong>?
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
                        await deleteProject(selectedProject._id);
                        handleDeleteDialogClose();
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
