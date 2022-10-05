import fetch from "node-fetch";
import {
    ClientBuilder,

    // Import middlewares
    type AuthMiddlewareOptions, // Required for auth
    type HttpMiddlewareOptions, // Required for sending HTTP requests
} from "@commercetools/sdk-client-v2";

const projectKey = "getting-started-project-matias";
const scopes = ["anage_project:getting-started-project-matias"];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: "https://auth.us-central1.gcp.commercetools.com",
    projectKey: projectKey,
    credentials: {
        clientId: "vpl41R-52-QMYNs4xd1MllG3",
        clientSecret: "vVmvsxkIxaFV3Iu_475-eebzSjKrMSzs",
    },
    scopes,
    fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: "https://api.us-central1.gcp.commercetools.com",
    fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();
