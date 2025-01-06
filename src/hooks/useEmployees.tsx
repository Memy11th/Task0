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
        role: 'Owner',
        branch:'All branches'
    }]);
    const [Filtered,setFiltered] = useLocalStorage<User[]>('Filterd',[]);
    
    const Branches = [
                    {
                        name:'McDonalds',
                        location:'Alexandria'
                    },
                    {
                        name:'KFC',
                        location:'Cairo'
                    }
                ]

    const employeeQuery = useQuery({
        queryKey:['EmployeesArr'],
        queryFn:()=>Employees,
        initialData:Employees,
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
        mutationFn: async (id: string) => {
            // Filter out the employee with the specified ID
            const newEmployeesArr = Employees.filter((Employee) => Employee.id !== id);
            
            // Update the local storage with the new array
            setEmployees(newEmployeesArr);
            
            return Employees;
        },
        onSuccess: (data) => {
            // Update the query cache with the updated employees list
            queryClient.setQueryData(['EmployeesArr'], data);
        },
    });

    const updateEmployee = useMutation({
        mutationFn:async(formikData:User)=>{
            const newEmployee:User = {
                ...formikData
            };
                
            const updatedEmployees = Employees.map((Employee)=>{
            return  Employee.id === newEmployee.id ? newEmployee : Employee
            })
            setEmployees(updatedEmployees);
            return Employees
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['EmployeesArr']})
        } 
    })

    const filterBranch =useMutation({
        mutationFn:async(filterParam:string)=>{
            const filtered = Employees.filter((Employee)=> Employee.branch === filterParam || Employee.branch === 'All branches');
            setFiltered(filtered);
            return Filtered;
        }
    })


    return {Employees:employeeQuery.data??[],addToEmployee,fireEmployee,updateEmployee,Branches,filterBranch}

}