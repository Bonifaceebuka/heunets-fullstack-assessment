import { useNavigate } from "react-router-dom";
import { useGetProjects } from "../apis/getProjectsApi";

import { useState } from "react";
import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import { Button } from "@mui/material";

export default function Projects() {
  const {
    data: projects,
  } = useGetProjects();
  const navigate = useNavigate()

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

        <Button variant="outlined" onClick={handleCreateProjectModalOpen}>
          + New Project
        </Button>
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
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/projects/${project._id}/tasks`)}
                  >
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditProjectModalOpen()
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditProjectModalOpen()
                    }}
                  >
                    Delete
                  </Button>
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