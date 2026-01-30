"use client"

import { useState } from "react"
import CertificateTemplate from "@/components/CertificateTemplate"

export default function AdminCertificatePage() {
  const [name, setName] = useState("")
  const [program, setProgram] = useState("")
  const [email, setEmail] = useState("")
  const [certificateId, setCertificateId] = useState("")

  const generateCertificate = async () => {
    const res = await fetch("/api/certificates/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, program, email })
    })

    const data = await res.json()
    setCertificateId(data.certificateId)
  }

  return (
    <div className="admin-container">
      <h1>Create Certificate</h1>

      <input placeholder="Student Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Program Name" onChange={e => setProgram(e.target.value)} />
      <input placeholder="Student Email" onChange={e => setEmail(e.target.value)} />

      <button onClick={generateCertificate}>
        Generate Certificate
      </button>

      {certificateId && (
        <>
          <CertificateTemplate
            name={name}
            program={program}
            issueDate={new Date().toDateString()}
            certificateId={certificateId}
          />

          <a href={`/certificate/${certificateId}`} target="_blank">
            Open Certificate
          </a>
        </>
      )}
    </div>
  )
}
