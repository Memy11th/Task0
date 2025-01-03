import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import Footer from "./Footer"

const Layout = () => {
    return <>
    <Navbar/>
    <div className=" min-h-screen max-w-[1080px] mx-auto">
    <Outlet>
    </Outlet>
    </div>
    <Footer/>
        
    </>
}

export default Layout
