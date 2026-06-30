import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import type { IProject } from "../types/IProjects";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProject } from "../apis/updateProjectApi";
import LoadingButton from "@mui/lab/LoadingButton";
import { useUpdateProjectStore } from "../stores/useUpdateProjectStore";
import { updateProjectSchema, type UpdateProjectFormData } from "../dtos/updateProjectSchema";
import { useEffect } from "react";

export default function EditProjectModal({
  editProjectModalOpen,
  handleEditProjectModalClose,
  selectedProject
}: {
  editProjectModalOpen: boolean,
  handleEditProjectModalClose: () => void,
  selectedProject: IProject | null
}) {
  if(!selectedProject) return;
  const queryClient = useQueryClient();
  const { mutate } = useUpdateProject();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProjectFormData>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: selectedProject?.name,
      _id: selectedProject?._id,
      description: selectedProject?.description,
    },
  });

  const { submitting, handleUpdateProject } = useUpdateProjectStore();
  const handleUpdateProjectFormSubmit = async (updateProjectSchema: UpdateProjectFormData) => {
    const data = {
      name: updateProjectSchema.name,
      _id: updateProjectSchema._id,
      description: updateProjectSchema.description,
    }

    handleUpdateProject(data, mutate, queryClient, handleEditProjectModalClose);
  };


useEffect(() => {
  if (selectedProject) {
    reset({
      _id: selectedProject._id,
      name: selectedProject.name,
      description: selectedProject.description,
    });
  }
}, [selectedProject, reset]);
  return (
      <Dialog
        open={editProjectModalOpen}
        onClose={handleEditProjectModalClose}
        fullWidth
        maxWidth="sm"
      >
        <Box
        component='form'
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(handleUpdateProjectFormSubmit)}
        noValidate
      >
        <DialogTitle>Update Project</DialogTitle>

        <DialogContent>
          <TextField
            label="Project Name"
            fullWidth
            margin="normal"
            disabled={submitting}
            {...register("name")}
            error={!!errors.name}
            defaultValue={selectedProject?.name}
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
            defaultValue={selectedProject?.description}
            helperText={errors.description?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditProjectModalClose}>
            Cancel
          </Button>

          <LoadingButton
            variant='outlined'
            loading={submitting}
            type='submit'
          >
            Update Project
          </LoadingButton>
        </DialogActions>
      </Box>
      </Dialog>
  )
}
