import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export default function EditProjectModal({editProjectModalOpen, handleEditProjectModalClose}: {editProjectModalOpen: boolean, handleEditProjectModalClose: () => void}) {
  return (
      <Dialog
        open={editProjectModalOpen}
        onClose={handleEditProjectModalClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update Project</DialogTitle>

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
          <Button onClick={handleEditProjectModalClose}>
            Cancel
          </Button>

          <Button variant="contained">
            Update Project
          </Button>
        </DialogActions>
      </Dialog>
  )
}
