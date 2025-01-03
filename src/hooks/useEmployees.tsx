import { User } from "@/interface/Users";
import { useLocalStorage } from "./useLocalStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useEmployees(){
    const queryClient = useQueryClient()
    const [Employees,setEmployees] = useLocalStorage<User[]>('Employees',[{
        fName:'Abdelrahman',
        lName:'Abdue',
        email:'Abdelrahmanabdue11@gmail.com',
        userName:'Abdelrahman11',
        role:'owner',
    }]);

    const employeeQuery = useQuery({
        queryKey:['EmployeesArr'],
        queryFn:()=>Employees,
        initialData:Employees,
        staleTime:Infinity,
    })

    const addToEmployee = useMutation({
        mutationFn:async(formikData:User)=>{
            const newEmployee:User = {
                ...formikData
            };
            
        }
    })


    return {employeeQuery}

}