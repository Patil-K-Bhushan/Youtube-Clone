import { FaRegCircleUser } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";

const AuthButton = () => {
  const { login, logout, user, isSignedIn } = useAuth();

  if (!isSignedIn)
    return (
      <button
        onClick={() => login()}
        className="flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
      >
        <FaRegCircleUser size={20} /> Sign in
      </button>
    );

  return (
    <button onClick={logout} title="Sign out">
      <img
        src={user.picture}
        alt={user.name}
        className="h-8 w-8 rounded-full"
      />
    </button>
  );
};

export default AuthButton;
