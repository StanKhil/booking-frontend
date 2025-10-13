import { useContext, useState } from "react";
import AppContext from "../../features/context/AppContext";
import Base64 from "../../shared/base64/Base64";

export default function Login() {
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const { request, setToken } = useContext(AppContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.login || !form.password) {
      setError("Please fill in both login and password.");
      return;
    }

    setError("");

    try {
      const credentials = Base64.encode(`${form.login}:${form.password}`);

      const data = await request("/api/auth/", {
        method: "GET",
        headers: {
          Authorization: "Basic " + credentials,
        },
      });

      setToken(data);
      setError("");
      console.log("Logged in:", data);
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="mt-5" style={{ maxWidth: 400 }}>
          <h4>Sign In</h4>
          <p>
            You can sign in using your Booking.com account to access our
            services.
          </p>

          <form id="sign-in-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="login" className="form-label">
                Login
              </label>
              <input
                type="text"
                id="login"
                className="form-control"
                placeholder="Enter your login"
                value={form.login}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {error && (
              <div
                id="login-alert"
                className="alert alert-danger mb-3 text-center"
                role="alert"
              >
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
