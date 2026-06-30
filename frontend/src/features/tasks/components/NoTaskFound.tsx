import {
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

interface NoTasksCardProps {
  onCreateTask?: () => void;
}

export default function NoTasksCard({
  onCreateTask,
}: NoTasksCardProps) {
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
          No tasks found
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          You haven't created any tasks yet. Create your first task to
          start organizing your work.
        </Typography>

        <Button
          variant="contained"
          onClick={onCreateTask}
        >
          Create Task
        </Button>
      </CardContent>
    </Card>
  );
}