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
  const [modal, setModal] = useState<{ show: boolean, title: string, message: string }>({ show: false, title: "", message: "" });

  const router = useRouter()

  useEffect(() => {
    const adminSecret = sessionStorage.getItem("admin_secret")
    if (!adminSecret) {
      router.push("/admin")
      return
    }

    // Check if a normal user is logged in (isolation)
    import("@/lib/supabase").then(({ supabase }) => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setModal({
            show: true,
            title: "Access Denied",
            message: "You are currently logged in as a student. Please log out before accessing admin features."
          });
        }
      })
    })
  }, [router])

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
    a.download = "Inzivoo-Certificate.pdf"
    a.click()

    window.URL.revokeObjectURL(url)
  }

  const sendEmail = async () => {
    await fetch("/api/certificates/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, certificateId }),
    })

    setModal({
      show: true,
      title: "Email Sent",
      message: "The certificate has been sent successfully to the student."
    })
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

      {modal.show && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3>{modal.title}</h3>
            <p>{modal.message}</p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setModal({ ...modal, show: false });
                  router.push("/");
                }}
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
