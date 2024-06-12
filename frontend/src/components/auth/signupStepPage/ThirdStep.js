
import AuthLayer from "@/pages/AuthLayer";
import { updateStep } from "@/store/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"



export default function ThirdStep() {
    const dispatch = useDispatch();

    const state = useSelector((state)=>state.Auth.state)

    const userData = useSelector(state => state.User.data)
    const [fullname, setFullname] = useState(userData.fullname)
    const [email, setEmail] = useState(userData.email);
    const router = useRouter();


    function handelFullnameChange(e) {
        setFullname(e.target.value)
    }

    async function handelSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData);



        if (userData.fullname != formDataObj.fullname) {
            let loading = toast.loading("Updating Fullname...");
            try {
                const responce = await axios.post(`${process.env.API_URL}/api/v1/u/updateuser`, 
                {
                    fullname : fullname
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${userData.access_token}`
                    }
                } )

                if(responce){
                    toast.dismiss(loading);
                    toast.success("Fullname updated successfully")
                    // dispatch(updateStep(4));
                    // console.log("Update Data = ", responce);
                    router.push("/get-started/topics");

                }
            } catch (error) {
                toast.dismiss(loading);
                toast.error(`Something went wrong - ${error.message}`)
                
            } 

        }
        else {
            // dispatch(updateStep(4));
            router.push("/get-started/topics");
        }

    }

    useEffect(()=>{
        setFullname(userData.fullname);
        setEmail(userData.email);
    },[userData.email, userData.fullname])
   

    if(state == "signup"){

        return (
            <AuthLayer>
            <>
                <div className=" text-center px-6">
                    <h2 className=" text-[28px] font-serif ">Almost there!</h2>
                    <p className=" text-base mt-4">Finish creating your account for the full Medium experience.</p>
                </div>
    
                <div className=" h-[312px] flex flex-col justify-between items-center ">
    
                    {/* Input form  */}
                    <form className=" flex flex-col gap-8 mt-12" onSubmit={handelSubmit}>
                        <div className=" flex flex-col gap-2">
                            <label className=" text-profileGrey text-s text-center">Your fullname</label>
                            <input className=" border-b border-black focus:outline-none focus text-center "
                                type="text" name="fullname"
                                value={fullname}
                                onChange={handelFullnameChange}
                            />
                        </div>
    
                        <div className=" flex flex-col gap-2">
                            <label className=" text-profileGrey text-s text-center">Your email</label>
                            <input className=" focus:outline-none focus text-center "
    
                                type="text" name="password"
                                value={email}
                            />
                        </div>
    
                        <button type="submit"
                            className=" bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-full text-sm  "
                        >Updata Account</button>
                    </form>
    
    
    
    
                </div>
    
                {/* footer policys */}
                <div className=" text-xs mt-14 text-center px-2">
                    <p className="">
                        This site is protected by reCAPTCHA Enterprise and the
                    </p>
                    <p className=" mt-1 px-2">
                        <span className=" underline">Google Privacy Policy</span> and <span className=" underline">Terms of Service</span> apply.
                    </p>
                </div>
            </>
            </AuthLayer>
        )
    }else{
        router.push("/get-started/topics");
    }
}
