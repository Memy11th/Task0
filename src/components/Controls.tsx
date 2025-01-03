import { Button } from "./ui/button";
import React from 'react'
import { CommandDialog } from "./ui/command";
import { useFormik } from "formik";
import { User } from "@/interface/Users";
import { Users } from "@/App";

        const Controls = () => {
        const [open, setOpen] = React.useState(false);
        const FilteredUsers = Users.filter((user)=>user.role !== 'owner');
        const [Employees,setEmployees]=React.useState<User[]>(FilteredUsers)

        const handleSubmit = (formikValues: Omit<User, "id">) => {
            Users.push(formikValues)
            const FilteredUsers = Users.filter((user)=>user.role !== 'owner');
            setEmployees(FilteredUsers);
            window.localStorage.setItem('Users',JSON.stringify(Employees));
            setOpen(false);
        }
        const formik = useFormik({
            initialValues: {
                email: "",
                fName: "",
                lName: "",
                userName: "",
                role: "",
            },
            onSubmit: handleSubmit
        })
        React.useEffect(()=>{
            // const Arr = window.localStorage.getItem('Users');
            // setEmployees(Arr)
        },[])
    return <>
    <Button onClickCapture={() => setOpen(true)} variant="outline" className="relative hover:bg-slate-300 dark:hover:bg-slate-800/35 bg-slate-200 dark:bg-slate-800/35 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64" onClick={() => setOpen(true)}>
            
            Add
    </Button>
    <CommandDialog open={open} onOpenChange={setOpen}>
        <h4 className="m-1 p-2 text-start">Add employee</h4>
        <form  className="p-2 m-1 flex flex-col " onSubmit={formik.handleSubmit} >
                <label htmlFor="email" >Email</label>
                <input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  className="p-2 border rounded-md outline-0 " type="text" />
                <label htmlFor="fName">First Name</label>
                <input  name="fName" value={formik.values.fName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="p-2 border rounded-md outline-0 " type="text" />
                <label htmlFor="lName">Last Name</label>
                <input name="lName" value={formik.values.lName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="p-2 border rounded-md outline-0 " type="text" />
                <label htmlFor="userName">User Name</label>
                <input name="userName" value={formik.values.userName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="p-2 border rounded-md outline-0 " type="text" />
                <label htmlFor="role">Role</label>
                <select name="role" value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur} className="p-2 border rounded-md outline-0 ">
                    <option value="" disabled selected className="cursor-pointer">
                    Select a role
                    </option>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                    <option value="superAdmin">Super Admin</option>
                    <option value="user">User</option>
                </select>

                <button className="p-2 border rounded-xl mt-2 bg-green-600 outline-0 " type="submit">
                    Submit
                </button>
        </form>
    </CommandDialog>

    <span>{Employees.map((Employee)=> Employee?.fName)}</span>
    
    </>
    }

    export default Controls ;