import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";
import type { ITask } from "../types/ITask";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateTask } from "../apis/updateTaskApi";
import LoadingButton from "@mui/lab/LoadingButton";
import { useUpdateTaskStore } from "../stores/useUpdateTaskStore";
import { updateTaskSchema, type UpdateTaskFormData } from "../dtos/updateTaskSchema";
import { useEffect } from "react";
import { useGetUsers } from "../../auth/api/getUsers";

export default function EditTaskModal({
  editTaskModalOpen,
  handleEditTaskModalClose,
  selectedTask
}: {
  editTaskModalOpen: boolean,
  handleEditTaskModalClose: () => void,
  selectedTask: ITask
}) {
  const queryClient = useQueryClient();
  const { mutate } = useUpdateTask();
  const { data: users } = useGetUsers()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateTaskFormData>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: selectedTask?.title,
      _id: selectedTask?._id,
      description: selectedTask?.description,
      assigned_to: selectedTask?.assigned_to || "",
      status: selectedTask?.status || "todo",
      priority: selectedTask?.priority || "low",
      start_date: selectedTask?.start_date,
      end_date: selectedTask?.end_date,
    },
  });

  const { submitting, handleUpdateTask } = useUpdateTaskStore();
  const handleUpdateTaskFormSubmit = async (updateTaskSchema: UpdateTaskFormData) => {
    const data = {
      _id: selectedTask._id,
      ...updateTaskSchema
    }
    console.log({ data })

    handleUpdateTask(data, mutate, queryClient, handleEditTaskModalClose);
  };


  useEffect(() => {
    if (selectedTask) {
      reset({
        title: selectedTask?.title,
        description: selectedTask?.description,
        _id: selectedTask?._id,
        status: selectedTask?.status || "todo",
        priority: selectedTask?.priority || "low",
        assigned_to: selectedTask?.assigned_to || "",
        start_date: selectedTask?.start_date,
        end_date: selectedTask?.end_date,
      });
    }
  }, [selectedTask, reset]);
  return (
    <Dialog
      open={editTaskModalOpen}
      onClose={handleEditTaskModalClose}
      fullWidth
      maxWidth="sm"
    >
      <Box
        component='form'
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(handleUpdateTaskFormSubmit)}
        noValidate
      >
        <DialogTitle>Update Task</DialogTitle>

        <DialogContent>
          <TextField
            label="Task Title"
            fullWidth
            margin="normal"
            disabled={submitting}
            {...register("title")}
            error={!!errors.title}
            defaultValue={selectedTask?.title}
            helperText={errors.title?.message}
          />

<TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            disabled={submitting}
            {...register("status")}
            error={!!errors.status}
            defaultValue={selectedTask?.status}
            helperText={errors.status?.message}
          >
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>

<TextField
            select
            label="Priority"
            fullWidth
            defaultValue={selectedTask?.priority}
            margin="normal"
            disabled={submitting}
            {...register("priority")}
            error={!!errors.priority}
            helperText={errors.priority?.message}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <TextField
            select
            label="Assignee"
            fullWidth
            margin="normal"
            disabled={submitting}
            {...register("assigned_to")}
            error={!!errors.assigned_to}
            defaultValue={selectedTask?.assigned_to || ""}
            helperText={errors.assigned_to?.message}
          >
            {users?.data?.map((user: any) => (
              <MenuItem key={user._id} value={user._id}>
                {user.full_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Start date"
            fullWidth
            type="date"
            margin="normal"
            disabled={submitting}
            {...register("start_date")}
            error={!!errors.start_date}
            defaultValue={selectedTask?.start_date}
            helperText={errors.start_date?.message}
          />
          <TextField
            label="End date"
            fullWidth
            margin="normal"
            type="date"
            disabled={submitting}
            {...register("end_date")}
            error={!!errors.end_date}
            defaultValue={selectedTask?.end_date}
            helperText={errors.end_date?.message}
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
            defaultValue={selectedTask?.description}
            helperText={errors.description?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditTaskModalClose}>
            Cancel
          </Button>

          <LoadingButton
            variant='outlined'
            loading={submitting}
            type='submit'
          >
            Update Task
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
