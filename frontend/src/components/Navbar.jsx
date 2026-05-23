import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex items-center justify-between">

      <h1 className="text-2xl font-bold">
        VTU Platform
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

    </nav>
  );
}

export default Navbar;