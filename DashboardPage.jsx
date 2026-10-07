import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {
  const { user, fetchCurrentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser().finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading || !user) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm space-y-3 rounded-xl bg-white p-6 text-center shadow">
        <img src={user.avatar} alt="avatar" className="mx-auto h-24 w-24 rounded-full object-cover" />
        <h1 className="text-xl font-bold">{user.fullName}</h1>
        <p className="text-gray-500">@{user.username}</p>
        <p>{user.email}</p>
        <p className="text-sm text-gray-400">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
        <button onClick={handleLogout} className="w-full rounded bg-red-600 p-2 text-white">
          Logout
        </button>
      </div>
    </div>
  );
}