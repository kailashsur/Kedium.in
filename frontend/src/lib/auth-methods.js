
import axios from "axios";
import toast from "react-hot-toast";
import { toast_theme1 } from "./hot-toast";

async function SignOut() {

    try {
      const res = await axios.get("/api/logout")
      if (res){
        localStorage.clear('info')
        return res
      }
    } catch (error) {

      toast.error(String(error), toast_theme1)
    }
  }

export {SignOut}