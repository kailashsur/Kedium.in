import Image from "next/image";
import LoadingIcon from "@/images/LIcon.svg"

export default function Loader(){
    return(
<div className=" flex justify-center items-center h-screen bg-white">
<Image src={LoadingIcon} alt="loader" width={50} height={50}/>
</div>
    
    )
}