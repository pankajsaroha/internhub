"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CertificateTemplate from "@/components/CertificateTemplate"

export default function AdminCertificatePage() {
  const [name, setName] = useState("")
  const [program, setProgram] = useState("")
  const [email, setEmail] = useState("")
  const [certificateId, setCertificateId] = useState("")

  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.push("/admin/login")
    }
  }, [])

  const generateCertificate = async () => {
    const res = await fetch("/api/certificates/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, program, email })
    })

    const data = await res.json()
    setCertificateId(data.certificateId)
  }

  const downloadPDF = async () => {
  const res = await fetch("/api/certificates/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ certificateId }),
  })

  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "InternHub-Certificate.pdf"
  a.click()

  window.URL.revokeObjectURL(url)
}

const sendEmail = async () => {
  await fetch("/api/certificates/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, certificateId }),
  })

  alert("Certificate sent successfully!")
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

          <div className="certificate-actions">
            <button onClick={downloadPDF}>
              Download PDF
            </button>

            <button onClick={sendEmail}>
              Send Email
            </button>

            <button
              onClick={() =>
                window.open(`/certificate/${certificateId}`, "_blank")
              }
            >
              Open Certificate
            </button>
          </div>
        </>
      )}
    </div>
  )
}
