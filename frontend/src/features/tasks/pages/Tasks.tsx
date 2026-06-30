import { Link, useNavigate } from "react-router-dom";
import "../styles/Project.css";
import { useState } from "react";
import CreateTaskModal from "../components/CreateTaskModal";
import EditProjectModal from "../components/EditProjectModal";
import { useParams } from "react-router-dom";
import { useGetTasks } from "../apis/getTasks";
import Loading from "../../../shared/common/Loading";
import NoTasksCard from "../components/NoTaskFound";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

export default function Tasks() {
  const params = useParams();
  const navigate = useNavigate()
  const projectId = params.projectId;
  const { data: tasks, isLoading } = useGetTasks(projectId);

  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const handleCreateTaskModalOpen = () => setCreateTaskModalOpen(true);
  const handleCreateTaskModalClose = () => setCreateTaskModalOpen(false);

  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);
  const handleEditProjectModalOpen = () => setEditProjectModalOpen(true);
  const handleEditProjectModalClose = () => setEditProjectModalOpen(false);

  return (
    <main className="projects-page">

      <header className="projects-header">
        <div>
          <Button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>
          <h1>Manage {tasks?.data?.project_name}'s tasks</h1>
          <p>Manage your team's tasks</p>
        </div>

        <Button variant="outlined" onClick={handleCreateTaskModalOpen}>
          + New Task
        </Button>
      </header>

      <div className="project-table-wrapper">
        {isLoading ? (
          <Loading fullHeight />
        ) : (tasks?.data?.tasks || []).length === 0 ? (
          <NoTasksCard onCreateTask={handleCreateTaskModalOpen} />
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{
                width: "100%",
                overflowX: "auto",
              }}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell align="center"><strong>Edit</strong></TableCell>
                  <TableCell align="center"><strong>View</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks?.data?.tasks?.map((task: any) => (
                  <TableRow key={task._id}>
                    <TableCell>{task.title}</TableCell>

                    <TableCell sx={{maxWidth:300}}>{task.description}</TableCell>

                    <TableCell sx={{maxWidth:30}} align="center">
                      <Button
                        variant="outlined"
                        color="warning"
                        size="small"
                        onClick={handleEditProjectModalOpen}
                      >
                        Edit
                      </Button>
                    </TableCell>

                    <TableCell sx={{maxWidth:30}} align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/tasks/${task._id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <CreateTaskModal
        createTaskModalOpen={createTaskModalOpen}
        projectId={projectId}
        handleCreateTaskModalClose={handleCreateTaskModalClose}
      />
      <EditProjectModal editProjectModalOpen={editProjectModalOpen} handleEditProjectModalClose={handleEditProjectModalClose} />
    </main>
  );
}