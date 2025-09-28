import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import AppSidebar from '@/components/ui/appSidebar.jsx'
import { SidebarProvider } from '@/components/ui/sidebar.jsx'
import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
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