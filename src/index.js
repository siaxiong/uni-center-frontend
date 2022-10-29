import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Link
} from "react-router-dom";
import { AuthContext } from './Components/AuthProvider/AuthContext';
import { AuthProvider } from './Components/AuthProvider/AuthProvider';
import { PublicHome } from './Pages/Public/PublicHome';
import { DefaultLayout } from './Layouts/DefaultLayout';
import { ProtectedRoutes } from './Components/ProtectedRoutes/ProtectedRoutes';
import { AdminLayout } from './Layouts/Admin/AdminLayout';
import { ProfessorLayout } from './Layouts/Professor/ProfessorLayout';
import { StudentLayout } from './Layouts/Student/StudentLayout';
import { AdminHome } from './Pages/Private/Admin/AdminHome';
import { ProfessorHome } from './Pages/Private/Professor/ProfessorHome';
import { StudentHome } from './Pages/Private/Student/StudentHome';
import { App } from './App';
import { Courses } from './Pages/Private/Admin/Courses/Courses';
import { Users } from './Pages/Private/Admin/Users/Users';
import { Professors } from './Pages/Private/Admin/Professors/Professors';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>} >
            <Route index element={<PublicHome/>}/>
            <Route element={<ProtectedRoutes/>} >
                <Route path="admin" element={<AdminLayout/>}>
                    <Route index element={<AdminHome/>} />
                    <Route path="courses" element={<Courses/>}/>
                    <Route path="professors" element={<Professors/>}/>
                    <Route path="users" element={<Users/>}/>
                </Route>
                <Route path="student" element={<StudentLayout/>}>
                    <Route index element={<StudentHome/>} />
                </Route>
                <Route path="professor" element={<ProfessorLayout/>}>
                    <Route index element={<ProfessorHome/>}/>
                </Route>
            </Route>
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <DefaultLayout>
            <RouterProvider router={router} />
        </DefaultLayout>
    </AuthProvider>
);

