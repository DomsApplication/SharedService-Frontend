import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
  }, []);
  return null;
};

export default LoginButton;
