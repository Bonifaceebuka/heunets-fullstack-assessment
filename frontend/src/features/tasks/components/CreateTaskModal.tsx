import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export default function CreateTaskModal({createTaskModalOpen, handleCreateTaskModalClose}: {createTaskModalOpen: boolean, handleCreateTaskModalClose: () => void}) {
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
            label="Project Name"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
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
