import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux';
const Home = lazy(() => import("../pages/Home/Home.js"));
const Events = lazy(() => import("../pages/Events/Events.js"));
const Login = lazy(() => import("../pages/Auth/Login.js"));
const Register = lazy(() => import("../pages/Auth/Register.js"));




const OrganizerDashboard = lazy(() => import("../pages/Dashboard/Organizer/OrganizerDashboard.js"));
const Profile = lazy(() => import("../pages/Dashboard/Organizer/Profile.js"))
const CreateEvent = lazy(() => import("../pages/Dashboard/Organizer/CreateEvent.js"))
const AllEvent = lazy(() => import("../pages/Dashboard/Organizer/ALLEvents.js"))
const Setting = lazy(() => import("../pages/Dashboard/Organizer/Setting.js"));

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
    const { isActive } = useSelector((state) => state.EventManagement);
    return (
        <Routes>
            <Route path='/' element={<Suspense fallback={<div>Loading...</div>}> <Home /> </Suspense>} />

            <Route path='/events' element={<Suspense fallback={<div>Loading...</div>}> <Events /> </Suspense>} />

            {
                !isActive && <>
                    <Route path='/user/login' element={<Suspense fallback={<div>Loading...</div>}> <Login /> </Suspense>} />
                    <Route path='/user/register' element={<Suspense fallback={<div>Loading...</div>}> <Register /> </Suspense>} />
                </>
            }
            <Route path='/*' element={<Suspense fallback={<div>Loading...</div>}> <Home /> </Suspense>} />

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