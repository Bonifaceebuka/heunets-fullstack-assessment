import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "../apis/createTaskApi";
import { createTaskSchema, type TaskFormData } from "../dtos/createTaskSchema";
import { useCreateTaskStore } from "../stores/useCreateTaskStore";

export default function CreateTaskModal({
  createTaskModalOpen, 
  handleCreateTaskModalClose
}: {
  createTaskModalOpen: boolean, 
  handleCreateTaskModalClose: () => void
}) {
  const queryClient = useQueryClient();
  const { mutate } = useCreateTask();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      assigned_to: undefined,
      status:"todo",
      project_id:"",
      priority:"medium",
      start_date: undefined,
      end_date:undefined
    },
  });

  const { submitting, handleCreateTask } = useCreateTaskStore();
  const handleCreateTaskFormSubmit = async (createTaskData: TaskFormData) => {
    handleCreateTask(createTaskData, mutate, queryClient, handleCreateTaskModalClose);
  };

  return (
      <Dialog
        open={createTaskModalOpen}
        onClose={handleCreateTaskModalClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create Project</DialogTitle>

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
          defaultValue="low"
          margin="normal"
          disabled={submitting}
          {...register("assigned_to")}
          error={!!errors.assigned_to}
          helperText={errors.assigned_to?.message}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>

          <TextField
            label="Start date"
            fullWidth
            type="date"
            margin="normal"
            disabled={submitting}
            {...register("start_date")}
            error={!!errors.start_date}
            helperText={errors.title?.message}
          />
          <TextField
            label="End date"
            fullWidth
            margin="normal"
            type="date"
            disabled={submitting}
            {...register("end_date")}
            error={!!errors.end_date}
            helperText={errors.title?.message}
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

          <Button variant="contained">
            Create Task
          </Button>
        </DialogActions>
      </Dialog>
  )
}
