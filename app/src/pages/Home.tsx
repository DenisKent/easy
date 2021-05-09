import { Button } from "@material-ui/core";
import React from "react";
import GoogleAuth from "../components/GoogleAuth";

import Steps from "../components/Steps";
import { runStepsCron } from "../api/steps";

const Home: React.FC = () => {
  return (
    <div style={{ padding: "0 40px" }}>
      <section>
        <h1 style={{ textAlign: "center", fontSize: "30px" }}>Step Tracker v2.0</h1>
      </section>
      <GoogleAuth />
      <Steps />
      <Button style={{ marginTop: "30px" }} variant="outlined" color="primary" onClick={runStepsCron}>
        Refresh Steps Data
      </Button>
    </div>
  );
};
export default Home;
