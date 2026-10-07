import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validateEmail, validateFullName, validatePassword, validateUsername } from "../utils/validation";

export default function RegisterPage() {
  const { register, checkUsername } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const errors = {
    fullName: validateFullName(form.fullName),
    username: validateUsername(form.username) || (usernameTaken ? "Username already taken" : ""),
    email: validateEmail(form.email),
    password: validatePassword(form.password),
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setTouched({ ...touched, [name]: true });
    if (name === "username" && !validateUsername(value)) {
      setUsernameTaken(!(await checkUsername(value)));
    }
  };

  const border = (name) =>
    !touched[name] ? "border-gray-300" : errors[name] ? "border-red-500" : "border-green-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ fullName: true, username: true, email: true, password: true });
    if (Object.values(errors).some(Boolean)) return;
    setLoading(true);
    setError("");
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    ["fullName", "Full Name", "text"],
    ["username", "Username", "text"],
    ["email", "Email", "text"],
    ["password", "Password", "password"],
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Register</h1>
        {error && <p className="rounded bg-red-100 p-2 text-sm text-red-600">{error}</p>}

        {fields.map(([name, label, type]) => (
          <div key={name}>
            <input name={name} type={type} placeholder={label} value={form[name]}
              onChange={handleChange} className={`w-full rounded border p-2 ${border(name)}`} />
            {touched[name] && <p className="text-xs text-red-500">{errors[name]}</p>}
          </div>
        ))}

        <button disabled={loading} className="w-full rounded bg-blue-600 p-2 text-white disabled:opacity-50">
          {loading ? "Creating..." : "Register"}
        </button>
        <p className="text-center text-sm">
          Have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}