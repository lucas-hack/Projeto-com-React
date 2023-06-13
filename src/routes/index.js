import { Routes, Route } from "react-router-dom"

import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"

function RoutesApp() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default RoutesApp