import { Link } from "react-router-dom";
import "../styles/Project.css";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Revamp company website UI",
    members: 8,
    tasks: 24,
    status: "Active",
  },
  {
    id: 2,
    name: "Mobile App",
    description: "Customer mobile experience",
    members: 5,
    tasks: 16,
    status: "Completed",
  },
];

export default function Projects() {
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
              <th>Members</th>
              <th>Tasks</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>


          <tbody>

            {projects.map((project) => (

              <tr key={project.id}>

                <td data-label="Project">
                  <strong>{project.name}</strong>
                </td>

                <td data-label="Description">
                  {project.description}
                </td>

                <td data-label="Members">
                  {project.members}
                </td>

                <td data-label="Tasks">
                  {project.tasks}
                </td>

                <td data-label="Status">
                  <span className="status">
                    {project.status}
                  </span>
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