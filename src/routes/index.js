import { Routes, Route } from "react-router-dom"

import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import Home from "../pages/Home"

import Private from "./Private"

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Private><Dashboard /></Private>} />

        </Routes>
    )
}

export default RoutesApp