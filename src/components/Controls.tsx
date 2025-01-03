import { Button } from "./ui/button";
import React from 'react'
import { CommandDialog } from "./ui/command";
import { useFormik } from "formik";
import { User } from "@/interface/Users";
import { useEmployees } from "@/hooks/useEmployees";
import { UserPlus } from "lucide-react";

        const Controls = () => {
        const [open, setOpen] = React.useState(false);
        const {addToEmployee} = useEmployees()

        const handleSubmit = (formikValues: Omit<User, "id">) => {
            addToEmployee.mutate({
                ...formikValues,
            })
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
            onSubmit: ()=>{
                handleSubmit(formik.values)
                formik.resetForm();
            }
        })
        React.useEffect(()=>{
            // const Arr = window.localStorage.getItem('Users');
            // setEmployees(Arr)
        },[])
    return <>
    <Button onClickCapture={() => setOpen(true)} variant="outline" className=" rounded-xl   justify-start text-sm text-muted-foreground " onClick={() => setOpen(true)}>
            <UserPlus />
            Add
    </Button>
    <CommandDialog open={open} onOpenChange={setOpen}>
        <h4 className="m-1 p-2 text-start">Add employee</h4>
        <form  className="p-2 m-1 flex flex-col dark:text-black " onSubmit={formik.handleSubmit} >
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
                    <option value="Owner">Owner</option>
                    <option value="Admin">Admin</option>
                    <option value="Super-Admin">Super Admin</option>
                    <option value="User">User</option>
                </select>

                <button className="p-2 border rounded-xl mt-2 bg-green-600 outline-0 " type="submit">
                    Submit
                </button>
        </form>
    </CommandDialog>

    
    </>
    }

    export default Controls ;