declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_OAUTH_CLIENT_ID: string;
    NODE_ENV: "development" | "production";
  }
}
