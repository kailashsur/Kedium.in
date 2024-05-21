import Navbar from "./navbar";
import TopNav from "./topNav";


export default function Header(){
    return(<>
    <header className=" w-full sticky top-0 z-50 ">
        <TopNav/>
        <Navbar/>
    </header>
    </>)
}