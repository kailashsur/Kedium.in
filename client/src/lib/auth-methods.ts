
import axios from "axios";
import toast from "react-hot-toast";
import { toast_theme1 } from "./hot-toast";


async function SignOut() : Promise<any> {

    try {
      const res = await axios.get("/api/logout")
      if (res){
        localStorage.clear()
        return res
      }
    } catch (error) {

      toast.error(String(error), { ...toast_theme1, iconTheme: { primary: "#000", secondary: "#fff" } });
    }
  }

export {SignOut}