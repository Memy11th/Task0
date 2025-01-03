import { User } from "@/interface/Users";
import { useLocalStorage } from "./useLocalStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useEmployees(){
    const queryClient = useQueryClient()
    const [Employees,setEmployees] = useLocalStorage<User[]>('Employees',[{
        id: 'OWNER',
        fName: 'Abdelrahman',
        lName: 'Abdue',
        email: 'Abdelrahmanabdue11@gmail.com',
        userName: 'Abdelrahman11',
        role: 'owner',
    }]);

    const employeeQuery = useQuery({
        queryKey:['EmployeesArr'],
        queryFn:()=>Employees,
        initialData:Employees,
        staleTime:Infinity,
    })

    const addToEmployee = useMutation({
        mutationFn:async(formikData:Omit<User,'id'>)=>{
            const newEmployee:User = {
                ...formikData,
                id: `${formikData.userName}-${formikData.role}`
            };
            const exists = Employees.some((Employee)=>Employee.id === newEmployee.id)
            if(exists) return Employees;

            const newEmployeesArr = [...Employees,newEmployee];
            setEmployees(newEmployeesArr);
            return Employees
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['EmployeesArr']})
        } 
    })

    const fireEmployee = useMutation({
        mutationFn: async(id:string)=>{
            const newEmployeesArr = Employees.filter((Employee)=>Employee.id !== id);
            setEmployees(newEmployeesArr);
            return Employees;
        },
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['EmployeesArr']})
    });

    const updateEmployee = useMutation({
        mutationFn: async()=>{

        }
    })


    return {Employees:employeeQuery.data??[],addToEmployee,fireEmployee,updateEmployee}

}