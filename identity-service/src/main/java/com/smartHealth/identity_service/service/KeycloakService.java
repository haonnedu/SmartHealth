package com.smartHealth.identity_service.service;

import jakarta.ws.rs.core.Response;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class KeycloakService {
    private final String serverUrl;
    private final String realm;
    private final String clientId;
    private final String clientSecret;
    private final String adminUsername;
    private final String adminPassword;

    public KeycloakService(
            @Value("${keycloak.server-url}") String serverUrl,
            @Value("${keycloak.realm}") String realm,
            @Value("${keycloak.client-id}") String clientId,
            @Value("${keycloak.client-secret}") String clientSecret,
            @Value("${keycloak.admin-username}") String adminUsername,
            @Value("${keycloak.admin-password}") String adminPassword) {

        this.serverUrl = serverUrl;
        this.realm = realm;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
    }

    private Keycloak getKeycloakInstance() {
        return KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm("master") // Use "master" to get admin access
                .clientId(clientId)
                .username(adminUsername)
                .password(adminPassword)
                .grantType(OAuth2Constants.PASSWORD)
                .build();
    }
    public String createUser(String username, String email, String password, String role) {
        Keycloak keycloak = getKeycloakInstance();

        // Create a new Keycloak user
        UserRepresentation user = new UserRepresentation();
        user.setUsername(username);
        user.setEmail(email);
        user.setEnabled(true);

        // Set Password
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setTemporary(false);
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(password);
        user.setCredentials(Collections.singletonList(credential));

        // Create the user in Keycloak
        RealmResource realmResource = keycloak.realm(realm);
        UsersResource usersResource = realmResource.users();
        Response response = usersResource.create(user);

        if (response.getStatus() == 201) {
            // Fetch the created user ID
            List<UserRepresentation> userList = usersResource.search(username);
            if (userList.isEmpty()) {
                return "User created but not found!";
            }
            String userId = userList.get(0).getId();

            // Assign role to the user
            RolesResource rolesResource = realmResource.roles();
            RoleRepresentation roleRepresentation = rolesResource.get(role).toRepresentation();

            UserResource userResource = usersResource.get(userId);
            userResource.roles().realmLevel().add(Collections.singletonList(roleRepresentation));

            return "User created successfully with role: " + role;
        } else {
            return "Failed to create user: " + response.getStatus();
        }
    }

    public String assignRoleToUser(String userId, String roleName) {
        Keycloak keycloak = getKeycloakInstance();
        RealmResource realmResource = keycloak.realm(realm);
        UsersResource usersResource = realmResource.users();
        RolesResource rolesResource = realmResource.roles();

        UserResource userResource = usersResource.get(userId);
        RoleRepresentation role = rolesResource.get(roleName).toRepresentation();

        userResource.roles().realmLevel().add(Collections.singletonList(role));
        return "Role assigned successfully!";
    }

    public String removeRoleFromUser(String userId, String roleName) {
        Keycloak keycloak = getKeycloakInstance();
        RealmResource realmResource = keycloak.realm(realm);
        UsersResource usersResource = realmResource.users();
        RolesResource rolesResource = realmResource.roles();

        UserResource userResource = usersResource.get(userId);
        RoleRepresentation role = rolesResource.get(roleName).toRepresentation();

        userResource.roles().realmLevel().remove(Collections.singletonList(role));
        return "Role removed successfully!";
    }

    public List<RoleRepresentation> getUserRoles(String userId) {
        Keycloak keycloak = getKeycloakInstance();
        RealmResource realmResource = keycloak.realm(realm);
        UsersResource usersResource = realmResource.users();

        UserResource userResource = usersResource.get(userId);
        return userResource.roles().realmLevel().listAll();
    }

    public List<RoleRepresentation> getAllRoles() {
        Keycloak keycloak = getKeycloakInstance();
        RealmResource realmResource = keycloak.realm(realm);

        return realmResource.roles().list();
    }
}
