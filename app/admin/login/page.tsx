"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()

  const login = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      alert("Invalid password");
      return;
    }

    localStorage.setItem("admin_token", "authenticated");
    router.push("/admin/certificates");
  };

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
