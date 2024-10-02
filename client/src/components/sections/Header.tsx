import Navbar from "./Navbar";
import TopNav from "./TopNav";
import React from "react";

export default function Header() {
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    const handleScroll = React.useCallback(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            setIsVisible(false); // Hide the header when scrolling down
        } else {
            setIsVisible(true); // Show the header when scrolling up
        }

        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <header
            className={`w-full h-auto z-40 fixed top-0 left-0 right-0 transition-transform duration-300 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <TopNav />
            <Navbar />
        </header>
    );
}
