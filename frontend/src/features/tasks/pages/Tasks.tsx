import { Link, useNavigate } from "react-router-dom";
import "../styles/Project.css";
import { useState } from "react";
import CreateTaskModal from "../components/CreateTaskModal";
import EditProjectModal from "../components/EditProjectModal";
import { useParams } from "react-router-dom";
import { useGetOneTask } from "../apis/get-tasks";
import Loading from "../../../shared/common/Loading";
import NoTasksCard from "../components/NoTaskFound";
import { Button } from "@mui/material";

export default function Tasks() {
  const params = useParams();
  const navigate = useNavigate()
  const projectId = params.projectId;
  const { data: tasks, isLoading } = useGetOneTask(projectId);

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
          <table className="project-table">

            <thead>
              <tr>
                <th>Project</th>
                <th>Description</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {tasks?.data?.map((project: any) => (

                <tr key={project.id}>

                  <td data-label="Project">
                    <strong>{project.name}</strong>
                  </td>

                  <td data-label="Description">
                    {project.description}
                  </td>

                  <td>
                    <Link
                      to={`/projects/${project.id}`}
                      className="view-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditProjectModalOpen()
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/projects/${project.id}`}
                      className="view-btn"
                    >
                      View
                    </Link>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}
      </div>
      <CreateTaskModal createTaskModalOpen={createTaskModalOpen} handleCreateTaskModalClose={handleCreateTaskModalClose} />
      <EditProjectModal editProjectModalOpen={editProjectModalOpen} handleEditProjectModalClose={handleEditProjectModalClose} />
    </main>
  );
}