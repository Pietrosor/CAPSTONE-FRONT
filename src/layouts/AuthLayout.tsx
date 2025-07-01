import React from "react"
import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="container-fluid px-0">
      <div className="row justify-content-center">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
