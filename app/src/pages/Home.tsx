import React from "react";
import Auth from "../components/Auth";
import useStore from "../store";

const Home: React.FC = () => {
  const user = useStore((state) => state.user);
  return (
    <div>
      <section>
        <h1>{`Hello ${user.name || ""}`}</h1>
      </section>
      <Auth />
    </div>
  );
};
export default Home;
