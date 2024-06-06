import { useDispatch, useSelector } from "react-redux";
import { enable, disable } from "@/store/slices/authSlice";


export default function TopNav(){

    const dispatch = useDispatch();
    const visible = useSelector((state)=>state.Auth.visible)
    const {data} = useSelector(state => state.User)


  
    function handelSignup (){
        if (visible) {
            dispatch(disable());
        } else {
            dispatch(enable("signup"));
        }
    }
    function handelLogin (){
        if (visible) {
            dispatch(disable());
        } else {
            dispatch(enable("login"));
        }
    }
    

    return(<div className=" md:hidden flex justify-between items-center h-10 pt-0 pb-0 pl-6 pr-6 bg-white border-b border-borderGrey">
        <div className=" text-textGrey font-sans text-[13px] flex items-center gap-2">
            Open in app 
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="ds"><path d="M.98 8.48a.37.37 0 1 0 .54.54l-.54-.54zm7.77-7.23h.38c0-.2-.17-.38-.38-.38v.38zM8.37 6.5a.37.37 0 1 0 .76 0h-.76zM3.5.87a.37.37 0 1 0 0 .76V.88zM1.52 9.03l7.5-7.5-.54-.54-7.5 7.5.54.54zm6.86-7.77V6.5h.74V1.25h-.74zm-4.88.38h5.25V.88H3.5v.74z" fill="#6B6B6B"></path></svg>
        </div>

        {/* sign in and signup mobile  */}

        {
          !data?.access_token ?
             <div>
            <button className=" text-[13px] bg-defaultGrey text-white pt-[1px] pb-[1px] p-[8px] rounded-full "
            onClick={handelSignup}
            >Sign up</button>

            <button
            className=" ml-1 text-[13px] text-defaultGrey pt-[1px] pb-[1px] p-[8px] rounded-full "
            onClick={handelLogin}
            > Sign in </button>
        </div>
        : ""
        }
       

    </div>)
}
