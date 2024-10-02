import { useDispatch, useSelector } from "react-redux";
import { enable, disable, AuthState } from "@/store/slices/authSlice";
import { UserState } from "@/store/slices/userSlice";

export default function TopNav() {
  const dispatch = useDispatch();
  const visible = useSelector(
    (state: { Auth: AuthState }) => state.Auth.visible,
  );
  const { data } = useSelector((state: { User: UserState }) => state.User);

  function handelSignup() {
    if (visible) {
      dispatch(disable());
    } else {
      dispatch(enable("signup"));
    }
  }
  function handelLogin() {
    if (visible) {
      dispatch(disable());
    } else {
      dispatch(enable("login"));
    }
  }

  return (
    <div
      className={` bg-primary-dart-background text-white dark:bg-primary-background dark:text-primary-text sm:hidden flex ${!data?.access_token ? "justify-between" : "justify-center"} items-center h-10 pt-0 pb-0 pl-6 pr-6  border-b border-borderGrey transition-all duration-300`}
    >
      <div className=" text-textGrey font-sans text-[13px] flex items-center gap-2">
        Open in app
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className="ds"
        >
          <path
            d="M.98 8.48a.37.37 0 1 0 .54.54l-.54-.54zm7.77-7.23h.38c0-.2-.17-.38-.38-.38v.38zM8.37 6.5a.37.37 0 1 0 .76 0h-.76zM3.5.87a.37.37 0 1 0 0 .76V.88zM1.52 9.03l7.5-7.5-.54-.54-7.5 7.5.54.54zm6.86-7.77V6.5h.74V1.25h-.74zm-4.88.38h5.25V.88H3.5v.74z"
            fill="#6B6B6B"
          ></path>
        </svg>
      </div>

      {/* sign in and signup mobile  */}

      {!data?.access_token ? (
        <div className="flex">
          <button
            className=" text-[13px] bg-link-orenge text-white pt-[1px] pb-[1px] p-[8px] rounded-full "
            onClick={handelSignup}
          >
            Sign up
          </button>

          <button
            className=" ml-1 text-[13px] text-defaultGrey pt-[1px] pb-[1px] p-[8px] rounded-full "
            onClick={handelLogin}
          >
            {" "}
            Sign in{" "}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
