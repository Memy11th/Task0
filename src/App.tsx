import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Layout from './components/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Employees from './components/Employees';
import { ThemeProvider } from './Providers/ThemeProvider';

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <RouterProvider router={Router} >

      </RouterProvider>
      </ThemeProvider> 

    </QueryClientProvider>

    </>
  )
}

export default App
