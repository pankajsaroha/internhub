import { createClient } from "@supabase/supabase-js";
import CertificateTemplate from "@/components/CertificateTemplate";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function CertificatePage({ params }: PageProps) {
    const { id } = await params;

    console.log("CERT ID PARAM:", id);

    const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("certificate_id", id)
        .limit(1);

    const cert = data?.[0];

    if (error || !cert) {
        return <h1>Invalid Certificate</h1>;
    }

    return (
        <CertificateTemplate
            name={cert.name}
            program={cert.program}
            issueDate={new Date(cert.created_at).toDateString()}
            certificateId={cert.certificate_id}
        />
    );
}
