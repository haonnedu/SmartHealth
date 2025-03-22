import Keycloak, { KeycloakInstance } from "keycloak-js";

let keycloak: KeycloakInstance;

export const initKeycloak = (): Promise<KeycloakInstance> => {
  // Khởi tạo Keycloak với từ khóa 'new'
  keycloak = new Keycloak({
    url: "http://103.166.183.74:8080",
    realm: "SmartHealth", // Tên realm của bạn
    clientId: "smarthealth-app", // Client ID của bạn
  });

  return new Promise((resolve, reject) => {
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      if (authenticated) {
        resolve(keycloak);
      } else {
        reject("Authentication failed");
      }
    });
  });
};
export const loginWithKeycloak = () => {
  if (keycloak) {
    keycloak.login({
      redirectUri: "http://localhost:3000/dashboard",
    });
  } else {
    console.error("Keycloak is not initialized.");
  }
};
export const getKeycloakInstance = (): KeycloakInstance => keycloak;
