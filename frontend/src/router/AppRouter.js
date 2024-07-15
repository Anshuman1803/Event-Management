import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux';

//! Auth components
const Login = lazy(() => import("../pages/Auth/Login.js"));
const Register = lazy(() => import("../pages/Auth/Register.js"));

// !Organizer Components
const OrganizerDashboard = lazy(() => import("../pages/Dashboard/Organizer/OrganizerDashboard.js"));
const Profile = lazy(() => import("../pages/Dashboard/Organizer/Profile.js"))
const CreateEvent = lazy(() => import("../pages/Dashboard/Organizer/CreateEvent.js"))
const AllEvent = lazy(() => import("../pages/Dashboard/Organizer/ALLEvents.js"))
const Setting = lazy(() => import("../pages/Dashboard/Organizer/Setting.js"));


// ! Audience Component
const Events = lazy(()=>import("../pages/Dashboard/Audience/AllEvent.js"))
function AppRouter() {
    const { role } = useSelector((state) => state.EventManagement);
    return (
        <>
            {
                (role !== "organizer" && role !== "audience") && <AuthRoute />
            }
            {
                role === "organizer" && <Organizer />
            }
            {
                role === "audience" && <Audience />
            }
        </>

    )
}

export default AppRouter
function Organizer() {
    return (
        <Routes>
            <Route path='/' element={<Suspense fallback={<div>Loading...</div>}> <OrganizerDashboard /> </Suspense>}>
                <Route path='/profile' index={1} element={<Suspense fallback={<div>Loading...</div>}> <Profile /> </Suspense>} />

                <Route path='/create-events' element={<Suspense fallback={<div>Loading...</div>}> <CreateEvent /> </Suspense>} />

                <Route path='/all-events' element={<Suspense fallback={<div>Loading...</div>}> <AllEvent /> </Suspense>} />

                <Route path='/setting' element={<Suspense fallback={<div>Loading...</div>}> <Setting /> </Suspense>} />

                {/* <Route path='/event/:id' element={<Suspense fallback={<div>Loading...</div>}> <EventDetails /> </Suspense>} /> */}

                <Route path='/*' index={1} element={<Suspense fallback={<div>Loading...</div>}> <Profile /> </Suspense>} />

            </Route>

        </Routes>
    )
}

function Audience() {
    return (
        <Routes>
            <Route path='/' element={<Suspense fallback={<div>Loading...</div>}> <Events /> </Suspense>} />


            <Route path='/*' element={<Suspense fallback={<div>Loading...</div>}> <Events /> </Suspense>} />

        </Routes>
    )
}

function AuthRoute() {
    return <Routes>
        <Route path='/user/login' element={<Suspense fallback={<div>Loading...</div>}> <Login /> </Suspense>} />
        <Route path='/user/register' element={<Suspense fallback={<div>Loading...</div>}> <Register /> </Suspense>} />
        <Route path='/' element={<Suspense fallback={<div>Loading...</div>}> <Login /> </Suspense>} />
    </Routes>
}