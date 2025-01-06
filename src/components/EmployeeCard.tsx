import { useEmployees } from "@/hooks/useEmployees";
import { User } from "@/interface/Users";
import { CommandDialog } from "./ui/command";
import { useFormik } from "formik";
import React from "react";

const EmployeeCard = ({ data }: { data: User }) => {
  const [open, setOpen] = React.useState(false);
  const { fireEmployee, updateEmployee ,Branches} = useEmployees();

  const handleSubmit = (formikValues: Omit<User, "id">) => {
    updateEmployee.mutate({ ...formikValues, id: data.id });
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
        email: data.email || "",
        fName: data.fName || "",
        lName: data.lName || "",
        userName: data.userName || "",
        role: data.role || "",
        branch: data.branch ||"",
    },
    onSubmit:()=> {
        handleSubmit(formik.values)
        formik.resetForm();
    } 
  });

  const isOwner = data.role.toLowerCase() === "owner"  ;

  return (
    <>
      <tr className="grid grid-cols-12">
        <td className="col-span-3 p-2 border-b border-gray-200">{data.fName}</td>
        <td className="col-span-3 p-2 border-b border-gray-200">{data.role}</td>
        <td className="col-span-2 p-2 border-b border-gray-200">{data.branch}</td>
        <td className="col-span-4 p-2 border-b border-gray-200">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setOpen(true)}
              disabled={isOwner}
              className={`px-4 py-2 rounded-lg text-white ${
                isOwner
                  ? "cursor-not-allowed bg-gray-500"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Edit Employee
            </button>
            <button
              disabled={isOwner}
              onClick={() => fireEmployee.mutate(data.id )}
              className={`px-4 py-2 rounded-lg text-white ${
                isOwner
                  ? "cursor-not-allowed bg-gray-500"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Fire Employee
            </button>
          </div>
        </td>
      </tr>

      <CommandDialog open={open} onOpenChange={setOpen} >
        <h4 className="m-1 p-2 text-start">Update Employee</h4>
        <form
          className="p-2 m-1 flex flex-col dark:text-black "
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded-md outline-0"
            type="text"
          />

          <label htmlFor="fName">First Name</label>
          <input
            name="fName"
            value={formik.values.fName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded-md outline-0"
            type="text"
          />

          <label htmlFor="lName">Last Name</label>
          <input
            name="lName"
            value={formik.values.lName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded-md outline-0"
            type="text"
          />

          <label htmlFor="userName">User Name</label>
          <input
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded-md outline-0"
            type="text"
          />

          <div className="flex items-center justify-around gap-2">
                <select name="role" value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur} className="p-2 border w-1/2 rounded-md outline-0 ">
                    <option value="" disabled selected className="cursor-pointer">
                    Select a role
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="Super-Admin">Super Admin</option>
                    <option value="User">User</option>
                </select>

                {formik.values.role === 'Super-Admin' ? <select name="branch" value={formik.values.branch} onChange={formik.handleChange} onBlur={formik.handleBlur} className="p-2 w-1/2 border rounded-md outline-0 ">
                    
                    <option value="All branches" selected   className="cursor-pointer">
                    All branches
                    </option>

                    
            </select> : <select name="branch" value={formik.values.branch} onChange={formik.handleChange} onBlur={formik.handleBlur} className="p-2 w-1/2 border rounded-md outline-0 ">
                    
                    <option value="" disabled selected className="cursor-pointer">Select branch</option>
                    {Branches.map((branch) => <option key={branch.location} value={branch.location}>{branch.location}</option>)}

                    
            </select>}
                
                </div>

          <button
            type="submit"
            className="p-2 border rounded-xl mt-2 bg-green-600 text-white hover:bg-green-700"
          >
            Update
          </button>
        </form>
      </CommandDialog>
    </>
  );
};

export default EmployeeCard;
