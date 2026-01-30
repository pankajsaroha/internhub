"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()

  const login = () => {
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    if (!ADMIN_PASSWORD) {
      alert("Admin password not configured")
      return
    }

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_token", "authenticated")
      router.push("/admin/certificates")
    } else {
      setError("Invalid admin password")
    }
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <h1>Admin Login</h1>

        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={login}>Login</button>
      </div>
    </div>
  )
}
