    import {  useNavigate } from "react-router-dom";
    import ThemeToggle from "./ThemeToggle";
    export function Navbar() {

    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/')
    }

    return (
        <>
        <header className={`flex justify-between items-center p-4 z-50  w-full sticky top-0  backdrop-blur-sm  supports-[backdrop-filter]:bg-background/60 ]  `}  >
            <div className="flex justify-start items-center gap-4">
            <h5 onClick={handleClick} className="font-bold cursor-pointer "> Task0</h5>
            </div>
            <div  className="flex justify-center items-center gap-4">
            <ThemeToggle />
            </div>

        </header>
        </>
    );
    }