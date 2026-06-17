import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FullPageLoader from "../common/FullPageLoader";

export default function PublicRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) return <FullPageLoader />;
  if (currentUser) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
