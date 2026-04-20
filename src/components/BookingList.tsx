import React, { useState } from 'react';
import { Booking } from '../types';
import { Search, Calendar, User, Car, ArrowRight, CheckCircle2, Clock, AlertCircle, Plus, X, Trash2 } from 'lucide-react';
import { exportToExcel } from '../lib/exportUtils';

interface Props {
  bookings: Booking[];
  setBookings: (b: Booking[]) => void;
}

export default function BookingList({ bookings, setBookings }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    bookingCode: '',
    customerName: '',
    vehiclePlate: '',
    startDate: '',
    endDate: '',
    status: 'Confirmed' as any,
    totalPrice: 0
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      ...formData,
      bookingCode: formData.bookingCode || `BK-${Math.floor(Math.random() * 10000)}`
    };
    setBookings([newBooking, ...bookings]);
    setIsModalOpen(false);
    setFormData({ bookingCode: '', customerName: '', vehiclePlate: '', startDate: '', endDate: '', status: 'Confirmed', totalPrice: 0 });
  };

  const filteredBookings = bookings.filter(b => 
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const data = bookings.map(b => ({
      'Mã Booking': b.bookingCode,
      'Khách hàng': b.customerName,
      'Biển số xe': b.vehiclePlate,
      'Ngày bắt đầu': b.startDate,
      'Ngày kết thúc': b.endDate,
      'Trạng thái': b.status,
      'Thành tiền': `${b.totalPrice.toLocaleString()}đ`
    }));
    exportToExcel(data, 'Danh_sach_Dat_xe');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-slate-800 tracking-tighter">Hệ thống Đặt xe</h2>
          <p className="text-sm text-slate-400 font-medium">Quản lý các yêu cầu điều xe và lịch trình dự kiến</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExport}
            className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
             Xuất Excel
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-brand text-white rounded-2xl text-sm font-bold hover:bg-brand-hover tracking-tight shadow-lg shadow-brand/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tạo yêu cầu mới
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-4">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
              type="text" 
              placeholder="Tìm theo mã code, khách hàng..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:border-brand/30 transition-all shadow-sm" 
             />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="table-head">Mã Booking</th>
                <th className="table-head">Khách hàng</th>
                <th className="table-head">Phương tiện</th>
                <th className="table-head">Thời gian thuê</th>
                <th className="table-head">Trạng thái</th>
                <th className="table-head text-right px-8">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="table-cell font-mono font-bold text-brand">{b.bookingCode}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                      <User className="w-4 h-4 text-slate-300" />
                      {b.customerName}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2 font-medium text-slate-600">
                      <Car className="w-4 h-4 text-slate-300" />
                      {b.vehiclePlate}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl w-fit border border-slate-100">
                      <Calendar className="w-3.5 h-3.5" />
                      {b.startDate} <ArrowRight className="w-3 h-3" /> {b.endDate}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge-vibrant flex items-center gap-2 w-fit font-black border-0 ${
                      b.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                      b.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                      b.status === 'Confirmed' ? 'bg-violet-50 text-violet-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {b.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : 
                       b.status === 'In Progress' ? <Clock className="w-3 h-3 animate-spin" /> : 
                       b.status === 'Confirmed' ? <CheckCircle2 className="w-3 h-3" /> : 
                       <AlertCircle className="w-3 h-3" />}
                      
                      {b.status === 'Completed' ? 'Hoàn thành' : 
                       b.status === 'In Progress' ? 'Đang chạy' : 
                       b.status === 'Confirmed' ? 'Đã xác nhận' : 'Chờ thanh toán'}
                    </span>
                  </td>
                  <td className="table-cell text-right px-8">
                     <button 
                      onClick={() => setBookings(bookings.filter(bk => bk.id !== b.id))}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                     >
                        <Trash2 className="w-4 h-4" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                 <h3 className="text-xl font-display font-black text-slate-800">Tạo yêu cầu thuê xe mới</h3>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tên khách hàng</label>
                       <input required value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Biển số xe điều động</label>
                       <input required value={formData.vehiclePlate} onChange={e => setFormData({...formData, vehiclePlate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ngày bắt đầu</label>
                       <input required type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ngày kết thúc</label>
                       <input required type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tổng chi phí dự kiến</label>
                       <input required type="number" value={formData.totalPrice} onChange={e => setFormData({...formData, totalPrice: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trạng thái ban đầu</label>
                       <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none">
                          <option value="Confirmed">Xác nhận luôn</option>
                          <option value="In Progress">Bắt đầu ngay</option>
                          <option value="Pending Payment">Chờ thanh toán</option>
                       </select>
                    </div>
                 </div>
                 <button type="submit" className="w-full py-4 bg-brand text-white rounded-2xl font-bold shadow-lg shadow-brand/20 active:scale-95 transition-all">Xác nhận tạo yêu cầu</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
