import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "../apis/createTaskApi";
import { createTaskSchema, type CreateTaskFormData } from "../dtos/createTaskSchema";
import { useCreateTaskStore } from "../stores/useCreateTaskStore";
import { useGetUsers } from "../../auth/api/getUsers";
import LoadingButton from "@mui/lab/LoadingButton";

export default function CreateTaskModal({
  createTaskModalOpen,
  handleCreateTaskModalClose,
  projectId
}: {
  createTaskModalOpen: boolean,
  handleCreateTaskModalClose: () => void
  projectId: string
}) {
  const queryClient = useQueryClient();
  const { mutate } = useCreateTask();
  const { data: users } = useGetUsers()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      assigned_to: "",
      status: "todo",
      project_id: projectId || "",
      priority: "medium",
      start_date: undefined,
      end_date: undefined
    },
  });

  const { submitting, handleCreateTask } = useCreateTaskStore();
  const handleCreateTaskFormSubmit = async (createTaskData: CreateTaskFormData) => {
    const data = {
      ...createTaskData,
      project_id: projectId || ""
    }
    handleCreateTask(data, mutate, queryClient, handleCreateTaskModalClose);
  };

  return (
    <Dialog
      open={createTaskModalOpen}
      onClose={handleCreateTaskModalClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Create Task</DialogTitle>
      <Box
        component='form'
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(handleCreateTaskFormSubmit)}
        noValidate
      >
        <DialogContent>
          <TextField
            label="Task Name"
            fullWidth
            margin="normal"
            disabled={submitting}
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            select
            label="Status"
            fullWidth
            defaultValue="todo"
            margin="normal"
            disabled={submitting}
            {...register("status")}
            error={!!errors.status}
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
            defaultValue="medium"
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
            defaultValue=""
            disabled={submitting}
            {...register("assigned_to")}
            error={!!errors.assigned_to}
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
            helperText={errors.description?.message}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={handleCreateTaskModalClose}>
            Cancel
          </Button>

          <LoadingButton
            variant='outlined'
            loading={submitting}
            type='submit'
          >
            Create Task
          </LoadingButton>
        </DialogActions>
      </Box>

    </Dialog>
  )
}
