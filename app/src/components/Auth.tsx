import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { createUser, updateUser } from "../api/users";
import useStore from "../store";

const Auth: React.FC = () => {
  const [login, logout, user] = useStore((state) => [state.login, state.logout, state.user]);
  console.log(user);
  const onLoginSuccess = async (response: any) => {
    const { googleId, name, email } = response.profileObj;
    const userToCreate = { name, google_id: googleId, email };
    const createdUser = await createUser(userToCreate);
    login({ name: createdUser.name, id: createdUser.id, google_id: createdUser.google_id, email: createdUser.email });
    console.log("LoginSuccess", response);
  };

  const onError = (response: any) => {
    console.log("error", response);
  };
  const onPermissionSuccess = async (response: any) => {
    if (user.id) {
      updateUser({ id: user.id, google_code: response.code });
      console.log("PermissionSuccess", response.code);
    }
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
        onFailure={onError}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
        onSuccess={onLoginSuccess}
      />
      <GoogleLogin
        clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Give Permissions To Track Steps"
        onFailure={onError}
        responseType="code"
        accessType="offline"
        cookiePolicy="single_host_origin"
        onSuccess={onPermissionSuccess}
      />
      <GoogleLogout clientId={process.env.GOOGLE_OAUTH_CLIENT_ID} buttonText="Logout" onLogoutSuccess={onLogout} />
    </section>
  );
};

export default Auth;
