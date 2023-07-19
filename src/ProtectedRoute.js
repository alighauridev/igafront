import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  // show unauthorized screen if no accessToken is found in localstorage
  if (
    !accessToken ||
    accessToken === "undefined" ||
    accessToken === null ||
    accessToken === ""
  ) {
    return <Navigate to="/login" replace />;
  }
  else if (user.role !== "Admin") {
    if(!user.onBoarding){
      return <Navigate to="/onboarding" replace />;
    }
    else if (props.type !== null && props.type !== undefined) {
      if (props.type !== user.role) {
        return (
          <Navigate to="/" replace />
        );
      }
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
