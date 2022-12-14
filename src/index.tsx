import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";

import { AuthProvider } from "./Components/AuthProvider/AuthProvider";
import { ProtectedRoutes } from "./Components/AuthProvider/ProtectedRoutes";
import { ProfessorHome } from "./Pages/Private/Professor/ProfessorHome";
import { StudentHome } from "./Pages/Private/Student/StudentHome";
import { App } from "./App";

import { All_Layouts } from "./Layouts/All_Layouts";
import { PrivatePages } from "./Pages/Private/PrivatePages";
import { PublicPages } from "./Pages/Public/PublicPages";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App/>} >
			<Route element={<All_Layouts.PublicLayout/>}>
				<Route index element={<PublicPages.PublicHome/>}/>
				<Route path="public-admin" element={<PublicPages.PublicAdmin/>}/>
				<Route path="public-professor" element={<PublicPages.PublicProfessor/>}/>
				<Route path="public-student" element={<PublicPages.PublicStudent/>}/>
				<Route path="pending" element={<PublicPages.PendingPage/>}/>
				<Route path="login" element={<PublicPages.PublicHome/>}/>
				<Route path="logout" element={<PublicPages.PublicHome/>}/>
			</Route>
			<Route element={<AuthProvider/>}>
				<Route path="admin" element={<All_Layouts.AdminLayout/>}>
					<Route index element={<PrivatePages.AdminRolePages.AdminHome/>}/>
					<Route path="courses" element={<PrivatePages.AdminRolePages.Courses/>}/>
					<Route path="professors" element={<PrivatePages.AdminRolePages.Professors/>}/>
					<Route path="users" element={<PrivatePages.AdminRolePages.Users/>}/>
				</Route>
				<Route path="student" element={<All_Layouts.StudentLayout/>}>
					<Route index element={<StudentHome/>} />
				</Route>
				<Route path="professor" element={<All_Layouts.ProfessorLayout/>}>
					<Route index element={<ProfessorHome/>}/>
				</Route>
			</Route>
		</Route>
	)
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<All_Layouts.DefaultLayout>
		<RouterProvider router={router} />
	</All_Layouts.DefaultLayout>
);

