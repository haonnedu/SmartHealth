import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { KeycloakInstance } from "keycloak-js";
import { initKeycloak } from "../lib/keycloak";

interface KeycloakContextType {
  keycloak: KeycloakInstance | null;
  loading: boolean;
  authenticated: boolean;
}

const KeycloakContext = createContext<KeycloakContextType | undefined>(
  undefined
);

export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error("useKeycloak must be used within a KeycloakProvider");
  }
  return context;
};

interface KeycloakProviderProps {
  children: ReactNode;
}

export const KeycloakProvider = ({ children }: KeycloakProviderProps) => {
  const [keycloak, setKeycloak] = useState<KeycloakInstance | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    initKeycloak()
      .then((kc) => {
        setKeycloak(kc);
        setAuthenticated(kc.authenticated ? true : false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Keycloak initialization failed", error);
        setLoading(false);
      });
  }, []);

  return (
    <KeycloakContext.Provider value={{ keycloak, loading, authenticated }}>
      {children}
    </KeycloakContext.Provider>
  );
};
