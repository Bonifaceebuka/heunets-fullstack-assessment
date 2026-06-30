import { useNavigate } from "react-router-dom";
import { useGetProjects } from "../apis/getProjectsApi";

import { useState } from "react";
import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal";
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
import DeletePorjectModal from "../components/DeleteProjectModal";
import { tokenStorage } from "../../../shared/configs/axios";
import NoProjectsCard from "../components/NoProjectsFound";

export default function Projects() {
  const {
    data: projects,
  } = useGetProjects();
  const navigate = useNavigate()

  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const handleCreateProjectModalOpen = () => setCreateProjectModalOpen(true);
  const handleCreateProjectModalClose = () => setCreateProjectModalOpen(false);

  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);
  const handleEditProjectModalOpen = () => setEditProjectModalOpen(true);
  const handleEditProjectModalClose = () => setEditProjectModalOpen(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteDialogOpen = (project: any) => {
        setSelectedProject(project);
        setDeleteDialogOpen(true);
    };

    const handleLogout = () => {
      tokenStorage.clearToken();
      navigate("/login");
    };

  return (
    <main className="projects-page">

      <header className="projects-header">
        <div>
          <Button
            type="button"
            className="back-btn"
            onClick={() => handleLogout()}
          >
            ← Logout
          </Button>
          <h1>Projects</h1>
          <p>Manage your team's projects</p>
        </div>

        <Button variant="outlined" onClick={handleCreateProjectModalOpen}>
          + New Project
        </Button>
      </header>


      <div className="project-table-wrapper">

{
  projects?.data?.length === 0 ? (
    <NoProjectsCard onCreateProject={handleCreateProjectModalOpen} />
  ) : (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects?.data?.map((project: any) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/projects/${project._id}/tasks`)}
                  >
                    View
                  </Button>
              </TableCell>
              <TableCell>

                <Button
                    variant="outlined"
                    color="warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProject(null);
                      setSelectedProject(project);
                      handleEditProjectModalOpen()
                    }}
                  >
                    Edit
                  </Button>
              </TableCell>

              <TableCell>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={(e) => {
                      e.preventDefault();
                     handleDeleteDialogOpen(project)
                    }}
                  >
                    Delete
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


      </div>
      <CreateProjectModal createProjectModalOpen={createProjectModalOpen} handleCreateProjectModalClose={handleCreateProjectModalClose} />
      <EditProjectModal
        editProjectModalOpen={editProjectModalOpen}
        handleEditProjectModalClose={handleEditProjectModalClose}
        selectedProject={selectedProject}
      />

      <DeletePorjectModal
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </main>
  );
}