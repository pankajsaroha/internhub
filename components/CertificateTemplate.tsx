import { QRCodeSVG } from "qrcode.react";
import styles from "./certificate.module.css";

interface CertificateProps {
    name: string
    program: string
    issueDate: string
    certificateId: string
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export default function CertificateTemplate({
    name,
    program,
    issueDate,
    certificateId
}: CertificateProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.certificate}>
                {/* <img src="/corner-gold.svg" className={`${styles.corner} ${styles.topLeft}`} />
                <img src="/corner-gold.svg" className={`${styles.corner} ${styles.topRight}`} />
                <img src="/corner-gold.svg" className={`${styles.corner} ${styles.bottomRight}`} />
                <img src="/corner-gold.svg" className={`${styles.corner} ${styles.bottomLeft}`} /> */}

                {/* Header */}
                <div className={styles.header}>
                    <img src="/logo.png" alt="InternHub" />
                    <img src="/msme.png" alt="MSME" />
                </div>

                {/* Title */}
                <h1 className={styles.title}>Certificate of Completion</h1>

                {/* Body */}
                <p className={styles.text}>This is to certify that</p>

                <h2 className={styles.name}>{name}</h2>

                <p className={styles.text}>
                    has successfully completed the program
                </p>

                <h3 className={styles.program}>{program}</h3>

                {/* Footer */}
                <div className={styles.footer}>
                    <div>
                        <img
                            src="/signature.png"
                            alt="Founder Signature"
                            className={styles.signature}
                        />
                        <p>Founder, InternHub</p>
                    </div>

                    <div className={styles.meta}>
                        <p><strong>Issued on:</strong> {issueDate}</p>
                        <p><strong>Certificate ID:</strong> {certificateId}</p>
                    </div>

                    <QRCodeSVG
                        value={`${BASE_URL}/verify/${certificateId}`}
                        size={90}
                    />
                </div>

            </div>
        </div>
    )
}
