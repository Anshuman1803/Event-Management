import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux';
const Home = lazy(() => import("../pages/Home/Home.js"));
const Events = lazy(() => import("../pages/Events/Events.js"));
const Login = lazy(() => import("../pages/Auth/Login.js"));
const Register = lazy(() => import("../pages/Auth/Register.js"));
function AppRouter() {
    const { isActive } = useSelector((state) => state.EventManagement);
    return (
        <Routes>
            <Route path='/' element={
                <Suspense fallback={<div>Loading...</div>}>
                    <Home />
                </Suspense>
            } />

            <Route path='/events' element={
                <Suspense fallback={<div>Loading...</div>}>
                    <Events />
                </Suspense>
            } />

            {
                !isActive && <>
                    <Route path='/user/login' element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Login />
                        </Suspense>
                    } />

                    <Route path='/user/register' element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Register />
                        </Suspense>
                    } />
                </>
            }

            <Route path='/*' element={
                <Suspense fallback={<div>Loading...</div>}>
                    <Home />
                </Suspense>
            } />
        </Routes>
    )
}

export default AppRouter