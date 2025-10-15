import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../features/context/AppContext";

export default function Register() {
  const { request} = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userLogin: "",
    birthdate: "",
    userPassword: "",
    userRepeat: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    const newErrors = {};
    if (!form.userFirstName) newErrors.userFirstName = "First name is required";
    if (!form.userLastName) newErrors.userLastName = "Last name is required";
    if (!form.userEmail) newErrors.userEmail = "Email is required";
    if (!form.userLogin) newErrors.userLogin = "Login is required";
    if (!form.userPassword) newErrors.userPassword = "Password is required";
    if (form.userPassword !== form.userRepeat)
      newErrors.userRepeat = "Passwords do not match";
    if (!form.agree) newErrors.agree = "You must agree with policies";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await request("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      console.log(response);

      if (response) {
        console.log(response);
        setMessage("Account successfully created! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Try again later.");
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="mt-5 signup-form">
          <h4>Sign in or create an account</h4>
          <p>You can sign in using your Booking.com account to access our services.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="user-first-name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="userFirstName"
                id="user-first-name"
                className={`form-control ${errors.userFirstName ? "is-invalid" : ""}`}
                value={form.userFirstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
              <div className="invalid-feedback">{errors.userFirstName}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="user-last-name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="userLastName"
                id="user-last-name"
                className={`form-control ${errors.userLastName ? "is-invalid" : ""}`}
                value={form.userLastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
              <div className="invalid-feedback">{errors.userLastName}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="user-email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="userEmail"
                id="user-email"
                className={`form-control ${errors.userEmail ? "is-invalid" : ""}`}
                value={form.userEmail}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
              <div className="invalid-feedback">{errors.userEmail}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="user-login" className="form-label">
                Login
              </label>
              <input
                type="text"
                name="userLogin"
                id="user-login"
                className={`form-control ${errors.userLogin ? "is-invalid" : ""}`}
                value={form.userLogin}
                onChange={handleChange}
                placeholder="Enter your login"
              />
              <div className="invalid-feedback">{errors.userLogin}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="user-birthdate" className="form-label">
                Date of birth
              </label>
              <input
                type="date"
                name="birthdate"
                id="user-birthdate"
                className={`form-control ${errors.birthdate ? "is-invalid" : ""}`}
                value={form.birthdate}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.birthdate}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="user-password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="userPassword"
                id="user-password"
                className={`form-control ${errors.userPassword ? "is-invalid" : ""}`}
                value={form.userPassword}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div className="invalid-feedback">{errors.userPassword}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="user-repeat" className="form-label">
                Repeat Password
              </label>
              <input
                type="password"
                name="userRepeat"
                id="user-repeat"
                className={`form-control ${errors.userRepeat ? "is-invalid" : ""}`}
                value={form.userRepeat}
                onChange={handleChange}
                placeholder="Repeat your password"
              />
              <div className="invalid-feedback">{errors.userRepeat}</div>
            </div>

            <div className="form-check mb-3">
              <input
                name="agree"
                type="checkbox"
                id="checkDefault"
                className={`form-check-input ${errors.agree ? "is-invalid" : ""}`}
                checked={form.agree}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="checkDefault">
                I agree with policies
              </label>
              <div className="invalid-feedback">{errors.agree}</div>
            </div>

            <button type="submit" className="btn btn-primary continue-button">
              Continue
            </button>

            {message && <p className="mt-3 text-info">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
