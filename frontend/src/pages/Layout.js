import AuthForm from "@/components/auth/auth";
import Header from "@/components/ui/header";
import { useSelector } from "react-redux";
import AuthLayer from "./AuthLayer";

export default function Layout({ children }) {
    // const authVisible = useSelector((state) => state.Auth)
    const {data} = useSelector((state) => state.User);
    // console.log("data ", data);

    return (
        <AuthLayer>
        <>
            {/* {
                authVisible.visible ? <AuthForm /> : ""
            } */}
            <Header />
            {children}
        </>
        </AuthLayer>
    )
}