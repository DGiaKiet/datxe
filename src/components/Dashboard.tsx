import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Car, Users, ShieldAlert, Wrench, ArrowUpRight, 
  TrendingUp, Fuel, Clock 
} from 'lucide-react';
import { revenueData, fleetStatusData } from '../data/mockData';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

// Mock stats for display
const stats = {
  readyVehicles: 45,
  activeVehicles: 112,
  driversCount: 108,
  maintenanceCount: 12,
  todayTrips: 156,
  onTimeRate: 94.5,
  fuelSpending: 12.4,
  safetyAlerts: 3
};

const StatCard = ({ label, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
          <ArrowUpRight className="w-3 h-3" />
          {trend}
        </div>
      )}
    </div>
    <div>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="font-display font-black text-3xl text-slate-800 mt-1">{value}</p>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Prime Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Xe sẵn sàng" 
          value={stats.readyVehicles} 
          icon={Car} 
          color="bg-blue-100 text-blue-600" 
          trend="+12%"
        />
        <StatCard 
          label="Xe đang chạy" 
          value={stats.activeVehicles} 
          icon={TrendingUp} 
          color="bg-emerald-100 text-emerald-600" 
          trend="+5%"
        />
        <StatCard 
          label="Tài xế online" 
          value={stats.driversCount} 
          icon={Users} 
          color="bg-violet-100 text-violet-600" 
        />
        <StatCard 
          label="Đang bảo dưỡng" 
          value={stats.maintenanceCount} 
          icon={Wrench} 
          color="bg-amber-100 text-amber-600" 
        />
      </div>

      {/* Operational Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-800">Biểu đồ Doanh thu & Chi phí</h3>
              <p className="text-xs text-slate-400">Dữ liệu cập nhật 5 phút trước</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-display font-bold text-lg text-slate-800 mb-8">Trạng thái đội xe</h3>
          <div className="flex-1 flex items-center justify-center min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fleetStatusData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {fleetStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 600, paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Mini Performance Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand p-6 rounded-2xl text-white shadow-lg shadow-brand/20">
           <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 opacity-80" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Tỷ lệ đúng giờ</span>
           </div>
           <p className="text-4xl font-display font-black mb-1">{stats.onTimeRate}%</p>
           <p className="text-xs opacity-70">Tăng 2.4% so với hôm qua</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div className="flex items-center gap-3 mb-4">
              <Fuel className="w-5 h-5 text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sử dụng nhiên liệu</span>
           </div>
           <p className="text-3xl font-display font-black text-slate-800 mb-1">{stats.fuelSpending}M VNĐ</p>
           <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-orange-500 h-full w-[65%]" />
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
           <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cảnh báo an toàn</span>
           </div>
           <p className="text-3xl font-display font-black text-slate-800 mb-1">{stats.safetyAlerts}</p>
           <p className="text-xs text-red-500 font-bold uppercase mt-2">Cần xử lý ngay</p>
        </div>
      </div>
    </div>
  );
}
