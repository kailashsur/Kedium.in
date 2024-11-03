import Image from "next/image";
import LoadingIcon from "@/images/LIcon.svg";

export default function Loader() {
  return (
    <div className=" flex justify-center items-center h-screen ">
      {/* <Image src={LoadingIcon} alt="loader" width={50} height={50} /> */}
     
<div className="three-body">
<div className="three-body__dot"></div>
<div className="three-body__dot"></div>
<div className="three-body__dot"></div>
</div>
    </div>
  );
}
