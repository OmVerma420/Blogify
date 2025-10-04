import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import AppSidebar from '@/components/ui/AppSidebar.jsx'
import { SidebarProvider } from '@/components/ui/sidebar.jsx'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getRedirectResult } from 'firebase/auth'
import { auth } from '@/helpers/firebase'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'
import { RouteIndex } from '@/helpers/RouteNames.js'

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          const bodyData = {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          };
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(bodyData),
            }
          );
          const data = await response.json();
          if (!response.ok) {
            showToast("error", data?.message || "Login failed");
            return;
          }
          showToast("success", data?.message || "Login successful");
          dispatch(setUser(data.data.user));
          navigate(RouteIndex);
        }
      } catch (error) {
        showToast("error", "Google login failed");
      }
    };
    handleRedirectResult();
  }, [dispatch, navigate]);

  return (
    <SidebarProvider className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 pt-16">
        <AppSidebar />

        {/* Main content area with its own flex column */}
        <div className="flex-1 flex flex-col bg-white">
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  )}

export default Layout