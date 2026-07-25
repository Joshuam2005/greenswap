import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const location = useLocation();

    const isLoggedIn = Boolean(
        localStorage.getItem("accessToken")
    );

    return (
        <nav className="navbar">
            <h2 className="logo">GreenSwap</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>

                {isLoggedIn && (
                    <Link to="/marketplace">
                        Marketplace
                    </Link>
                )}

                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>

                {isLoggedIn ? (
                    <Link to="/profile">
                        Profile
                    </Link>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;