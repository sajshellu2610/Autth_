import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validateEmail } from "../utils/validation";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const errors = {
    email: validateEmail(form.email),
    password: form.password ? "" : "Password is required",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
  };

  const border = (name) =>
    !touched[name] ? "border-gray-300" : errors[name] ? "border-red-500" : "border-green-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (errors.email || errors.password) return;
    setLoading(true);
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="rounded bg-red-100 p-2 text-sm text-red-600">{error}</p>}

        <div>
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange}
            className={`w-full rounded border p-2 ${border("email")}`} />
          {touched.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <input name="password" type="password" placeholder="Password" value={form.password}
            onChange={handleChange} className={`w-full rounded border p-2 ${border("password")}`} />
          {touched.password && <p className="text-xs text-red-500">{errors.password}</p>}
        </div>

        <button disabled={loading} className="w-full rounded bg-blue-600 p-2 text-white disabled:opacity-50">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm">
          No account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
}