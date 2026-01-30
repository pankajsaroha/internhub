export default function ContactPage() {
  return (
    <section className="page-container">
      {/* ================= HEADER ================= */}
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Have a question about programs, applications, or how InternHub works?
          We’re happy to help.
        </p>
      </header>

      {/* ================= CONTENT ================= */}
      <div className="contact-content">
        {/* LEFT: CONTACT INFO */}
        <section className="contact-info">
          <h2>Get in Touch</h2>

          <p>
            If you’re unsure which program to choose, have questions about the
            application process, or need clarification about certificates,
            feel free to reach out.
          </p>

          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@internhub.com">support@internhub.com</a>
            </li>
            <li>
              <strong>Response time:</strong> Within 24–48 hours
            </li>
          </ul>

          <p className="muted">
            Please note: InternHub does not offer placement guarantees or paid
            internships.
          </p>
        </section>

        {/* RIGHT: CONTACT FORM (OPTIONAL / FUTURE) */}
        <section className="contact-note">
          <h2>Before You Contact Us</h2>

          <ul>
            <li>Review the <strong>How It Works</strong> page</li>
            <li>Check program details carefully</li>
            <li>Understand certificate eligibility</li>
          </ul>

          <p className="muted">
            This helps us respond faster and more effectively.
          </p>
        </section>
      </div>

      {/* ================= FOOTER NOTE ================= */}
      <footer className="contact-footer">
        <p>
          We value thoughtful questions and serious learners.  
          Reach out when you’re ready to commit to learning by doing.
        </p>
      </footer>
    </section>
  );
}
