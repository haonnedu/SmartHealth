import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useKeycloak } from "@/contexts/KeycloakContext";

const DashboardPage = () => {
  const { keycloak, authenticated } = useKeycloak();
  const [roles, setRoles] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.push("/login");
    }

    if (keycloak?.tokenParsed?.realm_access?.roles) {
      setRoles(keycloak.tokenParsed.realm_access.roles);
    }
  }, [authenticated, keycloak, router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">Dashboard</h1>
        <p className="text-center text-gray-600">Welcome to the dashboard!</p>
        <p className="text-center text-gray-600">
          Your roles: {roles.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
