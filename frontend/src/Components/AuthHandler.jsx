import useAuthRedirect from "../Hooks/useAuthRedirect";

const AuthHandler = () => {
  const isAuthHandled = useAuthRedirect();

  // Make or use some custom loading component
  if (!isAuthHandled) {
    return <div>Loading...</div>;
  }

  return null;
};

export default AuthHandler;
