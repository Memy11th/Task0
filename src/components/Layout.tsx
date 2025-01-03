import { Outlet } from "react-router-dom"

const Layout = () => {
    return <>
    <div >
        Hola
    </div>
    <div className=" min-h-screen">
    <Outlet>
    </Outlet>
    </div>
    <div>
        5ew5ew
    </div>
        
    </>
}

export default Layout
