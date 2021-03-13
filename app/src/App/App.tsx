import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "../pages/Home";

const queryClient = new QueryClient();

const App: React.FC = () => {
  console.log(process.env.DOMAIN);
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

export default App;
