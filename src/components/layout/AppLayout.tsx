'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Car, 
  ClipboardList, 
  Menu,
  Bell,
  Mail,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TruemoveLogo } from '@/components/ui/truemove-logo'

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Vehicle',
    href: '/vehicles',
    icon: Car,
  },
  {
    title: 'Order',
    href: '/orders',
    icon: ClipboardList,
  },
]

function getPageInfo(pathname: string): { title: string; subtitle: string } {
  if (pathname === '/dashboard') {
    return { title: 'Dashboard', subtitle: 'Overview of your garage operations' }
  }
  if (pathname.startsWith('/vehicles')) {
    if (pathname === '/vehicles/add') {
      return { title: 'Add Vehicle', subtitle: 'Register a new vehicle to the system' }
    }
    if (pathname.match(/\/vehicles\/\d+/)) {
      return { title: 'Vehicle Details', subtitle: 'View and manage vehicle information' }
    }
    return { title: 'Vehicles', subtitle: 'Manage your vehicle fleet' }
  }
  if (pathname.startsWith('/orders')) {
    if (pathname === '/orders/add') {
      return { title: 'Create Work Order', subtitle: 'Create a new work order for vehicle service' }
    }
    return { title: 'Work Orders', subtitle: 'Manage vehicle service orders' }
  }
  if (pathname.startsWith('/garages')) {
    return { title: 'Garages', subtitle: 'Manage garage locations and settings' }
  }
  return { title: 'Truemove', subtitle: 'Auto garage management system' }
}

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()
  
  const pageInfo = getPageInfo(pathname)
  const pageTitle = title || pageInfo.title
  const pageSubtitle = subtitle || pageInfo.subtitle

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarCollapsed ? "w-16" : "w-64",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-center h-16 px-3 border-b border-gray-100">
          <div className={cn("transition-all duration-300", sidebarCollapsed ? "scale-75" : "scale-100")}>
            <TruemoveLogo size={sidebarCollapsed ? "sm" : "md"} />
          </div>
          {!sidebarCollapsed && <h1><span className="text-[#DEE33E]">True</span>Move</h1>}
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || (item.href === '/vehicles' && pathname.startsWith('/vehicles')) || (item.href === '/orders' && pathname.startsWith('/orders'))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative group",
                    isActive
                      ? "bg-[#DEE33E] text-gray-900 border-r-2 border-[#DEE33E]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    sidebarCollapsed ? "justify-center" : ""
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={cn(
                    "h-4 w-4",
                    sidebarCollapsed ? "" : "mr-3",
                    isActive ? "text-gray-700" : "text-gray-400"
                  )} />
                  {!sidebarCollapsed && (
                    <span className="transition-opacity duration-300">{item.title}</span>
                  )}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                      {item.title}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex h-8 w-8 p-0"
              >
                 <Menu className="h-4 w-4" />
              </Button>
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {pageTitle}
                </h1>
                <p className="text-sm text-gray-500">
                  {pageSubtitle}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Mail className="h-5 w-5 text-gray-500" />
              </Button>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-[#DEE33E] rounded-full"></span>
              </Button>
              
              <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">CF</span>
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-900">Cody Fisher</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">Owner</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}