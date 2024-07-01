import Navbar from "./navbar";
import TopNav from "./topNav";


export default function Header(){
    return(<>
    <header className=" w-full h-auto sticky top-0 z-40 ">
        <TopNav/>
        <Navbar/>
    </header>
    </>)
}