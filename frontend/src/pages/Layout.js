import Header from "@/components/ui/header";
import { useSelector } from "react-redux";
import AuthLayer from "./AuthLayer";
import { Toaster } from "react-hot-toast";
import AuthForm from "@/components/auth/auth";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  const authVisible = useSelector((state) => state.Auth);

  return (
    <AuthLayer>
      <div className=" ">
        <Header />
        <Toaster position="top-center" reverseOrder={false} />
        {authVisible.visible ? <AuthForm /> : ""}
        <main className=" w-full h-auto flex justify-center ">
          <div className=" max-w-5xl w-full h-auto flex flex-col">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </AuthLayer>
  );
}
