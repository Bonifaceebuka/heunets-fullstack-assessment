import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export default function CreateProjectModal({createProjectModalOpen, handleCreateProjectModalClose}: {createProjectModalOpen: boolean, handleCreateProjectModalClose: () => void}) {
  return (
      <Dialog
        open={createProjectModalOpen}
        onClose={handleCreateProjectModalClose}
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
          <Button onClick={handleCreateProjectModalClose}>
            Cancel
          </Button>

          <Button variant="contained">
            Create Project
          </Button>
        </DialogActions>
      </Dialog>
  )
}
