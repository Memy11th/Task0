import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Layout from './components/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Employees from './components/Employees';
import { User } from './interface/Users';
export const Users:User[] = [
  {
    fName: 'Abdelrahman',
    lName: 'Abdue',
    userName: 'Abdelrahman11',
    email: 'Abdelrahman11@gmail.com',
    role:'owner',
  },
  {
    fName: 'Manar',
    lName: 'Abdue',
    userName: 'Manar',
    email: 'Manar@gmail.com',
    role:'superAdmin',
  },
  {
    fName: 'Omar',
    lName: 'Abdue',
    userName: 'Omar11',
    email: 'Omar11@gmail.com',
    role: 'admin',
  },
  {
    
    fName: 'Ahmed',
    lName: 'Abdue',
    userName: 'Ahmed11',
    email: 'Ahmed11@gmail.com',
    role: 'user',
  }
]
function App() { 
  const queryClient = new QueryClient();
  const Router = createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<Employees/>},
      // {path:'*',element:Error Component }
    ]}
  ])

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} >

      </RouterProvider>
    </QueryClientProvider>

    </>
  )
}

export default App
