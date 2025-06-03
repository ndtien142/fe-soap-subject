import { useState, useEffect } from "react";

const useRole = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  return role;
};

export default useRole;