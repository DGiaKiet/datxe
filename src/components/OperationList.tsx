import { useState } from 'react';
import { Trip } from '../types';
import { PlayCircle, CheckCircle2, Clock, MapPin, User, AlertTriangle, MoreHorizontal, Activity, Search } from 'lucide-react';
import { exportToExcel } from '../lib/exportUtils';

interface Props {
  trips: Trip[];
  setTrips: (t: Trip[]) => void;
}

export default function OperationList({ trips, setTrips }: Props) {
  const [filter, setFilter] = useState<'all' | 'Moving' | 'incident'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrips = trips.filter(t => {
    const matchesSearch = t.tripCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'Moving') return matchesSearch && t.status === 'Moving';
    if (filter === 'incident') return matchesSearch && t.incidents > 0;
    return matchesSearch;
  });

  const handleExport = () => {
    const data = filteredTrips.map(t => ({
      'Mã hành trình': t.tripCode,
      'Tài xế': t.driverName,
      'Lộ trình': t.route,
      'Bắt đầu': t.departureTime,
      'Trạng thái': t.status === 'Moving' ? 'Đang di chuyển' : 'Hoàn thành',
      'Sự cố': t.incidents
    }));
    exportToExcel(data, `Bao_cao_Van_hanh_${filter}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-slate-800 tracking-tighter">Vận hành & Điều tuyến</h2>
          <p className="text-sm text-slate-400 font-medium">Giám sát {filteredTrips.length} hành trình theo tiêu chí đã chọn</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExport}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase text-slate-500 hover:bg-slate-50 transition-all"
          >
             Xuất Excel
          </button>
          <div className="flex bg-white rounded-2xl border border-slate-100 p-1 shadow-sm">
             <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${filter === 'all' ? 'bg-brand text-white' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Tất cả
             </button>
             <button 
              onClick={() => setFilter('Moving')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${filter === 'Moving' ? 'bg-brand text-white' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Đang chạy
             </button>
             <button 
              onClick={() => setFilter('incident')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${filter === 'incident' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Sự cố
             </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
        <input 
          type="text" 
          placeholder="Tìm mã hành trình, tài xế..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-brand/30 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredTrips.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-wrap lg:flex-nowrap items-center gap-8">
             <div className="flex items-center gap-4 min-w-[200px]">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  t.status === 'Moving' ? 'bg-blue-100 text-blue-600 animate-pulse' :
                  t.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                  'bg-slate-100 text-slate-400'
                }`}>
                   {t.status === 'Moving' ? <Activity className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Mã hành trình</p>
                   <p className="font-display font-black text-lg text-slate-800 truncate">{t.tripCode}</p>
                </div>
             </div>

             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 flex items-center gap-2">
                     <User className="w-3 h-3" /> Tài xế & Booking
                   </p>
                   <p className="font-bold text-sm text-slate-700">{t.driverName}</p>
                   <p className="text-[10px] font-mono text-brand font-bold">{t.bookingCode}</p>
                </div>

                <div>
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 flex items-center gap-2">
                     <MapPin className="w-3 h-3" /> Lộ trình
                   </p>
                   <p className="font-bold text-sm text-slate-700 truncate">{t.route}</p>
                   <p className="text-[10px] font-bold text-slate-400">Khởi hành: {t.departureTime}</p>
                </div>

                <div className="flex flex-col justify-center">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tiến độ</span>
                      <span className="text-[10px] font-black text-brand">{t.status === 'Completed' ? '100%' : '45%'}</span>
                   </div>
                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-1000 ${t.status === 'Completed' ? 'bg-emerald-500 w-full' : 'bg-brand w-[45%]'}`}></div>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border-2 flex items-center gap-2 transition-all ${
                  t.incidents > 0 ? 'bg-red-50 text-red-600 border-red-100 animate-bounce' : 'bg-slate-50 text-slate-400 border-slate-100'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {t.incidents} Sự cố
                </div>
                <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                   <MoreHorizontal className="w-5 h-5" />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
