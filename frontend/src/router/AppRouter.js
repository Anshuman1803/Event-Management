import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux';
import LazyLoader from '../components/LazyLoader/LazyLoader.js';

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
            <Route path='/' element={<Suspense fallback={<LazyLoader/>}> <OrganizerDashboard /> </Suspense>}>
                <Route path='/profile' index={1} element={<Suspense fallback={<LazyLoader/>}> <Profile /> </Suspense>} />

                <Route path='/create-events' element={<Suspense fallback={<LazyLoader/>}> <CreateEvent /> </Suspense>} />

                <Route path='/all-events' element={<Suspense fallback={<LazyLoader/>}> <AllEvent /> </Suspense>} />

                <Route path='/setting' element={<Suspense fallback={<LazyLoader/>}> <Setting /> </Suspense>} />

                {/* <Route path='/event/:id' element={<Suspense fallback={<LazyLoader/>}> <EventDetails /> </Suspense>} /> */}

                <Route path='/*' index={1} element={<Suspense fallback={<LazyLoader/>}> <Profile /> </Suspense>} />

            </Route>

        </Routes>
    )
}

function Audience() {
    return (
        <Routes>
            <Route path='/' element={<Suspense fallback={<LazyLoader/>}> <Events /> </Suspense>} />


            <Route path='/*' element={<Suspense fallback={<LazyLoader/>}> <Events /> </Suspense>} />

        </Routes>
    )
}

function AuthRoute() {
    return <Routes>
        <Route path='/user/login' element={<Suspense fallback={<LazyLoader/>}> <Login /> </Suspense>} />
        <Route path='/user/register' element={<Suspense fallback={<LazyLoader/>}> <Register /> </Suspense>} />
        <Route path='/' element={<Suspense fallback={<LazyLoader/>}> <Login /> </Suspense>} />
    </Routes>
}