import { Link } from "react-router-dom";
import "../styles/Project.css";
import { useGetProjects } from "../apis/get-projects";

import { useState } from "react";
import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal";

export default function Projects() {
  const {
    data: projects,
  } = useGetProjects();

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
          <h1>Projects</h1>
          <p>Manage your team's projects</p>
        </div>

        <button className="primary-btn" onClick={handleCreateProjectModalOpen}>
          + New Project
        </button>
      </header>


      <div className="project-table-wrapper">

        <table className="project-table">

          <thead>
            <tr>
              <th>Project</th>
              <th>Description</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {projects?.data?.map((project: any) => (

              <tr key={project.id}>

                <td data-label="Project">
                  <strong>{project.name}</strong>
                </td>

                <td data-label="Description">
                  {project.description}
                </td>
                <td>
                  <Link
                    to={`/projects/${project._id}/tasks`}
                    className="view-btn"
                  >
                    View
                  </Link>
                </td>
                <td>
                  <Link
                    to={`#`}
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
                    to={`#`}
                    className="view-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditProjectModalOpen()
                    }}
                  >
                    Delete
                  </Link>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      <CreateProjectModal createProjectModalOpen={createProjectModalOpen} handleCreateProjectModalClose={handleCreateProjectModalClose} />
      <EditProjectModal editProjectModalOpen={editProjectModalOpen} handleEditProjectModalClose={handleEditProjectModalClose} />
    </main>
  );
}