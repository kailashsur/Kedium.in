
import Header from "@/components/ui/header";
import { useSelector } from "react-redux";
import AuthLayer from "./AuthLayer";
import { Toaster } from "react-hot-toast";
import AuthForm from "@/components/auth/auth";

export default function Layout({ children }) {
    const authVisible = useSelector((state) => state.Auth);
    const { data } = useSelector((state) => state.User);


    return (
        <AuthLayer>
            <div className=" ">

                <Header />
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    />
                    {authVisible.visible ? <AuthForm /> : ""}
                <main className=" bg-green-300  flex justify-center ">
                    <div className="w-[1335px]">

                        {children}
                    </div>
                </main>
            </div>
        </AuthLayer>
    )
}