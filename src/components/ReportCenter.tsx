import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';
import { FileText, TrendingUp, Download, Calendar, Filter, ArrowUpRight, ArrowDownRight, ChevronDown } from 'lucide-react';
import { exportToPDF } from '../lib/exportUtils';

const performanceData = [
  { name: 'T2', trips: 45, efficiency: 88 },
  { name: 'T3', trips: 52, efficiency: 92 },
  { name: 'T4', trips: 48, efficiency: 85 },
  { name: 'T5', trips: 61, efficiency: 94 },
  { name: 'T6', trips: 55, efficiency: 90 },
  { name: 'T7', trips: 67, efficiency: 96 },
  { name: 'CN', trips: 59, efficiency: 91 },
];

const StatCard = ({ title, value, icon: Icon, trend, isPositive }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
        <Icon className="w-6 h-6" />
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        {isPositive ? <ArrowUpRight className="w-3" /> : <ArrowDownRight className="w-3" />}
        {trend}
      </div>
    </div>
    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{title}</p>
    <p className="text-3xl font-display font-black text-slate-800">{value}</p>
  </div>
);

export default function ReportCenter() {
  const [period, setPeriod] = useState('Tháng này');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  const handleExportPDF = () => {
    const headers = ['Ngày (Thứ)', 'Số chuyến đi', 'Hiệu suất (%)'];
    const data = performanceData.map(d => [d.name, d.trips.toString(), `${d.efficiency}%`]);
    exportToPDF(
      `Báo cáo Hiệu suất Vận hành - ${period}`,
      headers,
      data,
      `Bao_cao_Hieu_suat_${period.replace(' ', '_')}`
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-slate-800 tracking-tighter">Trung tâm Phân tích</h2>
          <p className="text-sm text-slate-400 font-medium">Báo cáo hiệu suất vận hành và phân tích kinh doanh dữ liệu lớn</p>
        </div>
        <div className="flex gap-3 relative">
           <div className="relative">
             <button 
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all select-none"
             >
               <Calendar className="w-4 h-4 text-brand" /> {period}
               <ChevronDown className={`w-4 h-4 transition-transform ${showPeriodDropdown ? 'rotate-180' : ''}`} />
             </button>
             
             {showPeriodDropdown && (
               <div className="absolute top-full mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                 {['Hôm nay', 'Tuần này', 'Tháng này', 'Quý này'].map(p => (
                   <button 
                    key={p} 
                    onClick={() => { setPeriod(p); setShowPeriodDropdown(false); }}
                    className="w-full text-left px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                   >
                     {p}
                   </button>
                 ))}
               </div>
             )}
           </div>

           <button 
            onClick={handleExportPDF}
            className="px-5 py-3 bg-brand text-white rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand/20 hover:bg-brand-hover active:scale-95 transition-all"
           >
             <Download className="w-4 h-4" /> Xuất PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Số chuyến hoàn thành" value="1,256" icon={FileText} trend="+14.2%" isPositive={true} />
        <StatCard title="Hiệu suất sử dụng xe" value="88.4%" icon={TrendingUp} trend="+2.1%" isPositive={true} />
        <StatCard title="Doanh thu bình quân" value="12.5M" icon={FileText} trend="-1.2%" isPositive={false} />
        <StatCard title="Đánh giá khách hàng" value="4.85" icon={TrendingUp} trend="+0.5%" isPositive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-display font-bold text-lg text-slate-800">Sản lượng chuyến đi ({period})</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-brand rounded-full"></div>
                <span className="text-[10px] font-black uppercase text-slate-400">Dự kiến</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="trips" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-display font-bold text-lg text-slate-800">Chỉ số Hiệu suất Vận hành (%)</h3>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><Filter className="w-5 h-5 text-slate-300" /></button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
