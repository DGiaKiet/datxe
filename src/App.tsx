/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  LayoutDashboard, Map, Car, Users, Calendar, 
  Settings, DollarSign, BarChart3, HeartHandshake,
  Search, Bell, Plus, Filter, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { stats, vehicles, drivers, bookings, trips, invoices, customers } from './data/mockData';
import Dashboard from './components/Dashboard';
import VehicleMap from './components/VehicleMap';
import VehicleList from './components/VehicleList';
import DriverList from './components/DriverList';
import BookingList from './components/BookingList';
import OperationList from './components/OperationList';
import AccountingList from './components/AccountingList';
import ReportCenter from './components/ReportCenter';
import CustomerCenter from './components/CustomerCenter';

type View = 'dashboard' | 'map' | 'vehicles' | 'drivers' | 'bookings' | 'ops' | 'accounting' | 'reports' | 'crm';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // CRM & Operations States
  const [localVehicles, setLocalVehicles] = useState(vehicles);
  const [localDrivers, setLocalDrivers] = useState(drivers);
  const [localBookings, setLocalBookings] = useState(bookings);
  const [localTrips, setLocalTrips] = useState(trips);
  const [localCustomers, setLocalCustomers] = useState(customers);
  const [localInvoices, setLocalInvoices] = useState(invoices);

  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'map', label: 'Bản đồ trực tuyến', icon: Map },
    { id: 'vehicles', label: 'Đội xe', icon: Car },
    { id: 'drivers', label: 'Tài xế', icon: Users },
    { id: 'bookings', label: 'Đặt xe', icon: Calendar },
    { id: 'ops', label: 'Vận hành', icon: Settings },
    { id: 'accounting', label: 'Kế toán', icon: DollarSign },
    { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
    { id: 'crm', label: 'Khách hàng', icon: HeartHandshake },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'map': return <VehicleMap />;
      case 'vehicles': return (
        <VehicleList 
          vehicles={localVehicles} 
          setVehicles={setLocalVehicles} 
        />
      );
      case 'drivers': return (
        <DriverList 
          drivers={localDrivers} 
          setDrivers={setLocalDrivers} 
        />
      );
      case 'bookings': return (
        <BookingList 
          bookings={localBookings} 
          setBookings={setLocalBookings} 
        />
      );
      case 'ops': return (
        <OperationList 
          trips={localTrips} 
          setTrips={setLocalTrips} 
        />
      );
      case 'accounting': return (
        <AccountingList 
          invoices={localInvoices} 
          setInvoices={setLocalInvoices} 
        />
      );
      case 'reports': return <ReportCenter />;
      case 'crm': return (
        <CustomerCenter 
          customers={localCustomers} 
          setCustomers={setLocalCustomers} 
        />
      );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Dynamic Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col z-20 shadow-xl shadow-slate-200/50"
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand/30 shrink-0">
            <Car className="w-6 h-6" />
          </div>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="font-display font-black text-2xl tracking-tighter text-slate-800"
            >
              FleetFlow<span className="text-brand">.</span>
            </motion.div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`sidebar-btn group ${
                activeView === item.id 
                  ? 'sidebar-btn-active' 
                  : 'sidebar-btn-inactive'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-brand'}`} />
              {sidebarOpen && (
                <span className="text-sm font-semibold whitespace-nowrap overflow-hidden">
                  {item.label}
                </span>
              )}
              {activeView === item.id && (
                <motion.div layoutId="activeRule" className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
              )}
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-slate-100 uppercase tracking-[0.2em] font-black text-[10px] text-slate-300 text-center">
          {sidebarOpen ? "Phiên bản 1.2.0" : "V1"}
        </div>
      </motion.aside>

      {/* Primary Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Glass style */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
            >
              <Plus className={`w-6 h-6 transition-transform duration-500 ${sidebarOpen ? 'rotate-45' : ''}`} />
            </button>
            <h1 className="font-display font-bold text-xl text-slate-800">
              {menuItems.find(m => m.id === activeView)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden md:flex relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
                <input 
                  type="text" 
                  placeholder="Tìm hành trình, tài xế..." 
                  className="pl-11 pr-4 py-2.5 bg-slate-100 border border-transparent focus:bg-white focus:border-brand/30 focus:ring-4 focus:ring-brand/5 rounded-2xl text-sm w-80 outline-none transition-all shadow-inner"
                />
              </div>

            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <button className="relative w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/20 animate-pulse"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black uppercase tracking-wider leading-none text-slate-800">Kiệt Mã</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Quản lý đội xe</p>
                </div>
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-white ring-1 ring-slate-200 overflow-hidden shadow-sm">
                   <Users className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
