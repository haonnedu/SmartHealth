import { useEffect } from "react";
import { useRouter } from "next/router";
import { useKeycloak } from "../contexts/KeycloakContext";

const CallbackPage = () => {
  const { keycloak, authenticated } = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    if (keycloak) {
      // Kiểm tra xem token đã có và hợp lệ chưa
      if (authenticated) {
        router.push("/dashboard"); // Chuyển hướng nếu đã xác thực
      } else {
        // Nếu chưa xác thực, quay lại trang login
        router.push("/login");
      }
    }
  }, [keycloak, authenticated, router]);

  return <div>Loading...</div>;
};

export default CallbackPage;
