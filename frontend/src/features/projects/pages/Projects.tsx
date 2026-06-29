import { Link } from "react-router-dom";
import "../styles/Project.css";
import { useGetProjects } from "../apis/get-projects";

export default function Projects() {
    const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjects();

  console.log(projects)

  return (
    <main className="projects-page">

      <header className="projects-header">
        <div>
          <h1>Projects</h1>
          <p>Manage your team's projects</p>
        </div>

        <button className="primary-btn">
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
            </tr>
          </thead>


          <tbody>

            {projects?.data?.map((project) => (

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
                  >
                    View
                  </Link>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}