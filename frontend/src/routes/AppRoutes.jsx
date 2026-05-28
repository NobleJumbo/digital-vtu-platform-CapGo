// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "../pages/Home.jsx";
// import Login from "../pages/auth/Login.jsx";
// import Register from "../pages/auth/Register.jsx";
// import Dashboard from "../pages/Dashboard/Dashboard.jsx";

// function AppRoutes() {
//   return (
//     <BrowserRouter>

//       <Routes>

//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />

//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default AppRoutes;

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
}

export default AppRoutes;