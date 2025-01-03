import { Outlet } from "react-router-dom"

const Layout = () => {
    return <>
    <div >
        Hola
    </div>
    <div className=" min-h-screen max-w-[1080px] mx-auto">
    <Outlet>
    </Outlet>
    </div>
    <div>
        5ew5ew
    </div>
        
    </>
}

export default Layout
