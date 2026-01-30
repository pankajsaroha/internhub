type PageProps = {
  params: {
    id: string
  }
}

export default function CertificatePage({ params }: PageProps) {

    const cert = globalThis.certificates?.[params.id]

    if (!cert) {
        return <h1>❌ Certificate Not Found</h1>
    }

    return (
        <div className="verify-card">
            <h1>✅ Certificate Verified</h1>
            <p><strong>Name:</strong> {cert.name}</p>
            <p><strong>Program:</strong> {cert.program}</p>
            <p><strong>Issued:</strong> {new Date(cert.issueDate).toDateString()}</p>
            <p><strong>ID:</strong> {params.id}</p>
        </div>
    )
}
