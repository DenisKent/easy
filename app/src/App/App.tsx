import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import Home from "../pages/Home";

const queryClient = new QueryClient();

const App: React.FC = () => {
  console.log(process.env.DOMAIN);
  return (
    <Auth0Provider
      domain="easy-denis.eu.auth0.com"
      clientId="VTUfClaVpt71ucQYAUN3otbBd4TEugGk"
      redirectUri={process.env.DOMAIN}
    >
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default App;
