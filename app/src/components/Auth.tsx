import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { createUser } from "../api/users";
import useStore from "../store";

const Auth: React.FC = () => {
  const [login, logout] = useStore((state) => [state.login, state.logout]);

  const onLoginSuccess = async (response: any) => {
    const { googleId, name } = response.profileObj;
    const userToCreate = { name, google_id: googleId };
    const createdUser = await createUser(userToCreate);
    login({ name: createdUser.name, id: createdUser.id, google_id: createdUser.google_id });
    console.log("LoginSuccess", response);
  };

  const onError = (response: any) => {
    console.log("error", response);
  };
  const onPermissionSuccess = (response: any) => {
    console.log("PermissionSuccess", response);
  };

  const onLogout = () => {
    console.log("onLogout");
    logout();
  };

  return (
    <section>
      <GoogleLogin
        clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={onLoginSuccess}
        onFailure={onError}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
      />
      <GoogleLogin
        clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Give Permissions To Track Steps"
        onSuccess={onPermissionSuccess}
        onFailure={onError}
        responseType="code"
        accessType="offline"
        cookiePolicy="single_host_origin"
      />
      <GoogleLogout clientId={process.env.GOOGLE_OAUTH_CLIENT_ID} buttonText="Logout" onLogoutSuccess={onLogout} />
    </section>
  );
};

export default Auth;
