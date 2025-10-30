import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App';
import UserDetails from './Components/UserDetails';
import UpdateUser from './Components/UpdateUser';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: 'users/:id',
    Component: UserDetails,
    loader:({params}) => {
      return fetch(`http://localhost:3000/users/${params.id}`)
    }
  },
  {
    path: 'update/:id',
    Component: UpdateUser
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
