import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProject } from "../apis/createProjectApi";
import { projectSchema, type ProjectFormData } from "../dtos/projectSchema";
import { useCreateProjectStore } from "../stores/useCreateProjectStore";
import LoadingButton from "@mui/lab/LoadingButton";

export default function CreateProjectModal({ createProjectModalOpen, handleCreateProjectModalClose }: { createProjectModalOpen: boolean, handleCreateProjectModalClose: () => void }) {
  const queryClient = useQueryClient();
  const { mutate } = useCreateProject();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { submitting, handleCreateProject } = useCreateProjectStore();
  const handleCreateProjectFormSubmit = async (projectSchema: ProjectFormData) => {
    handleCreateProject(projectSchema, mutate, queryClient, handleCreateProjectModalClose);
  };

  return (
    <Dialog
      open={createProjectModalOpen}
      onClose={handleCreateProjectModalClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Create Project</DialogTitle>
      <Box
        component='form'
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(handleCreateProjectFormSubmit)}
        noValidate
      >
        <DialogContent>
          <TextField
            label="Project Name"
            fullWidth
            margin="normal"
            disabled={submitting}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            disabled={submitting}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCreateProjectModalClose}>
            Cancel
          </Button>

          <LoadingButton
            variant='outlined'
            loading={submitting}
            type='submit'
          >
            Create Project
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
