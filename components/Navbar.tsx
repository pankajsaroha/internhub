export default function Navbar() {
    return (
        <header className="navbar">
            <div className="logo">
                Intern<span>Hub</span>
            </div>
            <nav>
                <a href="#">Home</a>
                <a href="#">Programs</a>
                <a href="#">Certificate</a>
                <a href="#">Contact</a>
                <button className="btn-primary">Apply Now</button>
            </nav>
        </header>
    );
}
