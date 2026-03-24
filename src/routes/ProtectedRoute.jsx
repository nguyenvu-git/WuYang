import { Navigate, Outlet } from "react-router-dom";
import { useToast } from "../components/ui/Toast";

const ProtectedRoute = ({ allowedRoles }) => {
  const { toast } = useToast();
  // Lấy dữ liệu user đã lưu ở localStorage khi đăng nhập thành công
  const user = JSON.parse(localStorage.getItem("user"));

  // Trường hợp 1: Chưa đăng nhập -> Đá về trang đăng nhập
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Trường hợp 2: Đã đăng nhập nhưng Role không nằm trong danh sách cho phép (Case-insensitive)
  const userRole = user.UserRole?.toLowerCase();
  const isAllowed = !allowedRoles || allowedRoles.some(role => role.toLowerCase() === userRole);

  if (!isAllowed) {
    toast.error("Truy cập bị từ chối", "Bạn không có quyền vào khu vực này.");
    return <Navigate to="/" replace />;
  }

  // Trường hợp 3: Hợp lệ -> Cho phép vào trang con (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
