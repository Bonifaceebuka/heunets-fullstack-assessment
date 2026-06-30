import { Link } from "react-router-dom";
import "../styles/Project.css";
import { useState } from "react";
import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import { useParams } from "react-router-dom";
import { useGetOneTask } from "../apis/get-tasks";
import Loading from "../../../shared/common/Loading";
import NoTasksCard from "../components/NoTaskFound";

export default function Tasks() {
  const params = useParams();
  const projectId = params.projectId;
  const { data: tasks, isLoading } = useGetOneTask(projectId);

  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const handleCreateProjectModalOpen = () => setCreateProjectModalOpen(true);
  const handleCreateProjectModalClose = () => setCreateProjectModalOpen(false);

  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);
  const handleEditProjectModalOpen = () => setEditProjectModalOpen(true);
  const handleEditProjectModalClose = () => setEditProjectModalOpen(false);

  return (
    <main className="projects-page">

      <header className="projects-header">
        <div>
          <h1>Manage {tasks?.data?.project_name}'s tasks</h1>
          <p>Manage your team's tasks</p>
        </div>

        <button className="primary-btn" onClick={handleCreateProjectModalOpen}>
          + New Task
        </button>
      </header>

      <div className="project-table-wrapper">
        {isLoading ? (
          <Loading fullHeight />
        ) : (tasks?.data?.tasks || []).length === 0 ? (
          <NoTasksCard onCreateTask={handleCreateProjectModalOpen} />
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
      <CreateProjectModal createProjectModalOpen={createProjectModalOpen} handleCreateProjectModalClose={handleCreateProjectModalClose} />
      <EditProjectModal editProjectModalOpen={editProjectModalOpen} handleEditProjectModalClose={handleEditProjectModalClose} />
    </main>
  );
}