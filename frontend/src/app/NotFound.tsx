import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const location = useLocation();
 
  useEffect(() => {
    console.error(`404: ${location.pathname} does not exist.`);
  }, [location.pathname]);

  return (
    <main className="not-found">
      <div className="not-found-card">
        <span className="not-found-code">404</span>

        <h1>Page not found</h1>

        <p>
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Link to="/" className="not-found-btn">
          Return Home
        </Link>
      </div>
    </main>
  );
}