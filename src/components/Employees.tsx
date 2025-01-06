import { useEmployees } from "@/hooks/useEmployees";
import Controls from "./Controls";
import EmployeeCard from "./EmployeeCard";

const Employees = () => {
  const { Employees } = useEmployees();

  if (!Employees || Employees.length === 0) {
    return <p className="text-center mt-4">No employees found.</p>;
  }

  return (
    <>
      <Controls />
      <table className="w-full border-collapse border text-center mt-4 rounded-lg border-gray-200">
        <thead className="bg-gray-100 dark:text-black ">
          <tr className="grid grid-cols-12">
            <th className="col-span-3 p-2 text-center border-b border-gray-200">Name</th>
            <th className="col-span-3 p-2 text-center border-b border-gray-200">Role</th>
            <th className="col-span-2 p-2 text-center border-b border-gray-200">Branch</th>
            <th className="col-span-4 p-2 text-center border-b border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {Employees.map((employee) => (
            <EmployeeCard data={employee} key={employee.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Employees;
