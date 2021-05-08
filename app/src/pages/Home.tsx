import { Button } from "@material-ui/core";
import React from "react";
import Auth from "../components/Auth";
import Steps from "../components/Steps";
import useStore from "../store";
import { runStepsCron } from "../api/steps";

const Home: React.FC = () => {
  const user = useStore((state) => state.user);
  return (
    <div>
      <section>
        <h1>{`Hello ${user.name || "friend"}`}</h1>
      </section>
      <Auth />
      <Steps />
      <Button style={{ marginTop: "30px" }} variant="outlined" color="primary" onClick={runStepsCron}>
        Refresh Steps Data
      </Button>
    </div>
  );
};
export default Home;
