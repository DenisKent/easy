import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { loadJs } from "../utils";
import { createUser, updateUser } from "../api/users";
import { runStepsCron } from "../api/steps";
import { useQueryClient } from "react-query";

// DOCS: https://developers.google.com/identity/sign-in/web/reference#googleauthissignedinget
const scope =
  "profile email https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read";

const onError = (response: any) => {
  console.error("onError", response);
};
type dbUser = {
  id: string;
} | null;

const GoogleAuth: React.FC = () => {
  const [googleUser, setGoogleUser] = useState(null);
  const queryClient = useQueryClient();
  const [user, setUser] = useState<dbUser>(null);

  const requestPermisions = async (gUser: any) => {
    if (user) {
      const userHasRequeredScopes = gUser.hasGrantedScopes(scope);
      console.log("requestPermisions", { userHasRequeredScopes });
      const { code } = await gUser.grantOfflineAccess({ scope });
      const updateStatement = { id: user.id, google_code: code };
      console.log(updateStatement);
      await updateUser(updateStatement);
      await runStepsCron();
      queryClient.invalidateQueries("allUserSteps");
    }
  };

  const onSignIn = async (response: any) => {
    console.log("onSignIn");
    const basicProfile = response.getBasicProfile();

    const userToCreate = {
      name: basicProfile.getName(),
      google_id: basicProfile.getId(),
      email: basicProfile.getEmail()
    };
    const createdUser: any = await createUser(userToCreate);
    setUser(createdUser);
  };

  const renderButton = () => {
    window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        cookiepolicy: "single_host_origin"
      });

      auth2.currentUser.listen((gUser: any) => setGoogleUser(gUser));

      window.gapi.signin2.render("google-auth-button", {
        longtitle: true,
        theme: "dark",
        onsuccess: onSignIn,
        onfailure: onError
      });
    });
  };

  useEffect(() => {
    if (!window?.gapi?.signin2) {
      loadJs("https://apis.google.com/js/platform.js", renderButton);
    } else {
      renderButton();
    }
  }, []);

  return (
    <section>
      <div id="google-auth-button" />
      {googleUser && (
        <>
          <Button
            style={{ marginTop: "30px" }}
            variant="outlined"
            color="primary"
            onClick={() => requestPermisions(googleUser)}
          >
            Allow Permissions
          </Button>
          <Button
            style={{ marginTop: "30px" }}
            variant="outlined"
            color="primary"
            onClick={() => {
              if (window.gapi) {
                const auth2 = window.gapi.auth2.getAuthInstance();
                if (auth2 != null) {
                  auth2.signOut();
                  setGoogleUser(null);
                }
              }
            }}
          >
            SIGN OUT
          </Button>
        </>
      )}
    </section>
  );
};

export default GoogleAuth;
