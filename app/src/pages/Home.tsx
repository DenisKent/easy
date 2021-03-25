import React from "react";
import Auth from "../components/Auth";
import Steps from "../components/Steps";
import useStore from "../store";

const Home: React.FC = () => {
  const user = useStore((state) => state.user);
  return (
    <div>
      <section>
        <h1>{`Hi ${user.name || ""}`}</h1>
      </section>
      <Auth />
      <Steps />
    </div>
  );
};
export default Home;
