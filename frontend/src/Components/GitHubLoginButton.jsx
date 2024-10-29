import { FaGithub } from "react-icons/fa";
import { useAuth } from "../Context/AuthProvider";

const LoginButton = () => {
  const { login } = useAuth();

  return (
    <button
      onClick={login}
      className="hover:border-blue-500 transition duration-2 w-72 m-3 pt-2.5 pb-2.5 border border-blue-950 text-current flex gap-4 justify-center rounded-full"
    >
      <FaGithub className="text-blue-400 rounded-full text-4xl" />
    </button>
  );
};

export default LoginButton;
