
import { useSelector } from "react-redux";
import AuthLayer from "./AuthLayer";
import { Toaster } from "react-hot-toast";
import AuthForm from "@/components/auth/auth";

export default function AuthWrap({ children }) {
    const authVisible = useSelector((state) => state.Auth);
    const { data } = useSelector((state) => state.User);


    return (
        <AuthLayer>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {authVisible.visible ? <AuthForm /> : ""}
            <main className="flex justify-center ">
                <div className="w-[1335px]">

                    {children}
                </div>
            </main>

        </AuthLayer>
    )
}