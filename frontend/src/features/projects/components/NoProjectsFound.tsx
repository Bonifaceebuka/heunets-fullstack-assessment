import {
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

interface NoProjectsCardProps {
  onCreateProject?: () => void;
}

export default function NoProjectsCard({
  onCreateProject,
}: NoProjectsCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 6,
        textAlign: "center",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <CardContent sx={{ py: 6 }}>
        <Typography variant="h5" gutterBottom>
          No projects found
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          You haven't created any projects yet. Create your first project to
          start organizing your work.
        </Typography>

        <Button
          variant="contained"
          onClick={onCreateProject}
        >
          Create Project
        </Button>
      </CardContent>
    </Card>
  );
}