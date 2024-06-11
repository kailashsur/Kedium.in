
import Header from "@/components/ui/header";
import { useSelector } from "react-redux";
import AuthLayer from "./AuthLayer";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
    // const authVisible = useSelector((state) => state.Auth)
    const { data } = useSelector((state) => state.User);
    // console.log("data ", data);

    return (
        <AuthLayer>
            <>

                <Header />
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                {children}
            </>
        </AuthLayer>
    )
}