import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import "./Layout.css";
import AppContext from "../../../features/context/AppContext";

export default function Layout() {
    const {user, setToken} = useContext(AppContext);
    const isAdmin = user?.role === "Administrator";
    const {serverUrl} = useContext(AppContext);
    const userLogin = user?.Login || "";

    return (
        <div className="d-flex flex-column min-vh-100">
            <header>
                <div className="container-sm">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex mt-1">
                            <span>
                                <Link className="navbar-brand" to="/">
                                    <img
                                        className="header-logo"
                                        src={`${serverUrl}/resources/images/text.svg`}
                                        alt="logo"
                                    />
                                </Link>
                            </span>
                        </div>

                        <div>
                            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light">
                                <div className="container-fluid">
                                    <button className="btn btn-warning">List your property</button>

                                    {user && userLogin ? (
                                        <>
                                            <Link to={`/profile/${userLogin}`} className="text-decoration-none d-flex align-items-center">
                                                <div className="login-icon mx-2">{userLogin[0]}</div>
                                                {/* <span className="header-user-name">{userLogin}</span>  */}
                                            </Link>
                                            <button onClick={() => { setToken(null); }}>Log Out</button>
                                        </>
                                    ) : (
                                        <>
                                            <Link className="btn btn-primary mx-2" to="/register">
                                                Register
                                            </Link>
                                            <Link className="btn btn-primary" to="/login">
                                                Sign In
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </div>

                    <nav className="navbar navbar-expand-lg tab-nav">
                    <div className="container-fluid">
                        <ul className="navbar-nav d-flex flex-row align-items-center mb-0">
                        <li className="nav-item mx-3">
                            <Link className="nav-link d-flex align-items-center" to="/realties">
                            <i className="bi bi-house me-1"></i> Stays
                            </Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link d-flex align-items-center" to="/search">
                            <i className="bi bi-search me-1"></i> Search
                            </Link>
                        </li>
                        {
                            user && userLogin &&
                            <li className="nav-item mx-3">
                            <Link className="nav-link d-flex align-items-center" to={`/bookings/${userLogin}`}>
                            <i className="bi bi-journal-bookmark me-1"></i> Bookings & Trips
                            </Link>
                        </li>}
                        {isAdmin && (
                            <li className="nav-item mx-3">
                            <Link className="nav-link d-flex align-items-center" to="/admin">
                                <i className="bi bi-feather me-1"></i> Administrator
                            </Link>
                            </li>
                        )}
                        </ul>
                    </div>
                    </nav>

                </div>

                <div id="header-bottom">
                    {document.title === "Booking.com" ? (
                        <div className="container header-banner">
                            <h1>
                                <span>Find your next stay</span>
                            </h1>
                            <p>Search deals on hotels, homes, and much more...</p>
                        </div>
                    ) : (
                        <div className="header-bottom-filler"></div>
                    )}
                </div>
            </header>


            <main className="flex-grow-1">
                <div className="container pb-3">
                    <Outlet />
                </div>
            </main>

            <footer className="footer-booking mt-5 mb-0">
                <div className="container py-4">
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <h5 className="text-white mb-3">Support</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="footer-link">Coronavirus (COVID-19) FAQs</a></li>
                                <li><a href="#" className="footer-link">Manage your trips</a></li>
                                <li><a href="#" className="footer-link">Contact Customer Service</a></li>
                                <li><a href="#" className="footer-link">Safety resource centre</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5 className="text-white mb-3">Discover</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="footer-link">Genius loyalty programme</a></li>
                                <li><a href="#" className="footer-link">Seasonal and holiday deals</a></li>
                                <li><a href="#" className="footer-link">Travel articles</a></li>
                                <li><a href="#" className="footer-link">Booking.com for Business</a></li>
                                <li><a href="#" className="footer-link">Traveller Review Awards</a></li>
                                <li><a href="#" className="footer-link">Car hire</a></li>
                                <li><a href="#" className="footer-link">Flight finder</a></li>
                                <li><a href="#" className="footer-link">Restaurant reservations</a></li>
                                <li><a href="#" className="footer-link">Booking.com for Travel Agents</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5 className="text-white mb-3">Terms and settings</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="footer-link">Privacy & cookies</a></li>
                                <li><a href="#" className="footer-link">Terms and conditions</a></li>
                                <li><a href="#" className="footer-link">Accessibility Statement</a></li>
                                <li><a href="#" className="footer-link">Partner dispute</a></li>
                                <li><a href="#" className="footer-link">Modern Slavery Statement</a></li>
                                <li><a href="#" className="footer-link">Human Rights Statement</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5 className="text-white mb-3">Partners</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="footer-link">Extranet login</a></li>
                                <li><a href="#" className="footer-link">Partner help</a></li>
                                <li><a href="#" className="footer-link">List your property</a></li>
                                <li><a href="#" className="footer-link">Become an affiliate</a></li>
                            </ul>

                            <h5 className="text-white mt-4 mb-3">About</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="footer-link">About Booking.com</a></li>
                                <li><a href="#" className="footer-link">How we work</a></li>
                                <li><a href="#" className="footer-link">Sustainability</a></li>
                                <li><a href="#" className="footer-link">Press centre</a></li>
                                <li><a href="#" className="footer-link">Careers</a></li>
                                <li><a href="#" className="footer-link">Investor relations</a></li>
                                <li><a href="#" className="footer-link">Corporate contact</a></li>
                            </ul>
                        </div>
                    </div>

                    <hr className="border-light opacity-25 my-4" />
                    <div className="text-center text-muted">
                        <small>&copy; 2025 Booking.com. All rights reserved.</small>
                    </div>
                </div>
            </footer>
        </div>
    );
}
