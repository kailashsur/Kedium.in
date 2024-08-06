import Image from "next/image";
import SadFace from "@/../public/images/sadface.png"

export default function NotFound() {
    return (
        <div className=" flex gap-4 justify-center items-center h-screen bg-white">
            <Image src={SadFace} width={48} height={48} alt="404 Not found" />
            <h1 
            className=" text-2xl font-bold "
            >404 Not found</h1>
        </div>

    )
}