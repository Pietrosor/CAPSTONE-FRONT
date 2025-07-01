import React from "react"
import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
