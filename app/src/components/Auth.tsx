import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useQueryClient } from "react-query";
import { createUser, updateUser } from "../api/users";

import { runStepsCron } from "../api/steps";
import useStore from "../store";

const Auth: React.FC = () => {
  const [login, logout, user] = useStore((state) => [state.login, state.logout, state.user]);
  const queryClient = useQueryClient();

  const onLoginSuccess = async (response: any) => {
    const { googleId, name, email } = response.profileObj;
    const userToCreate = { name, google_id: googleId, email };
    const createdUser = await createUser(userToCreate);
    login({ name: createdUser.name, id: createdUser.id, google_id: createdUser.google_id, email: createdUser.email });
  };

  const onError = (response: any) => {
    console.error("error", response);
  };
  const onPermissionSuccess = async (response: any) => {
    if (user.id) {
      await updateUser({ id: user.id, google_code: response.code });
      await runStepsCron();
      queryClient.invalidateQueries("allUserSteps");
    }
  };

  const onLogout = () => {
    logout();
  };

  return (
    <section>
      <GoogleLogin
        clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login"
        onFailure={onError}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
        onSuccess={onLoginSuccess}
      />
      {user.isLoggedIn && (
        <GoogleLogin
          clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
          buttonText="Give Permissions To Track Steps"
          onFailure={onError}
          responseType="code"
          accessType="offline"
          prompt="consent"
          cookiePolicy="single_host_origin"
          onSuccess={onPermissionSuccess}
          scope="profile email https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read"
        />
      )}
      {user.isLoggedIn && (
        <GoogleLogout clientId={process.env.GOOGLE_OAUTH_CLIENT_ID} buttonText="Logout" onLogoutSuccess={onLogout} />
      )}
    </section>
  );
};

export default Auth;
