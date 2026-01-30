import CertificateTemplate from "@/components/CertificateTemplate"

type PageProps = {
    params: {
        id: string
    }
}

export default function CertificatePage({ params }: PageProps) {

    const cert = globalThis.certificates?.[params.id]

    if (!cert) return <h1>Invalid Certificate</h1>

    return (
        <CertificateTemplate
            name={cert.name}
            program={cert.program}
            issueDate={new Date(cert.issueDate).toDateString()}
            certificateId={params.id}
        />
    )
}
