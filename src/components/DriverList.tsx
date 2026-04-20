import React, { useState } from 'react';
import { Driver } from '../types';
import { Phone, Mail, Star, MapPin, MoreVertical, ShieldCheck, Plus, Trash2, Edit3, X, User } from 'lucide-react';
import { exportToExcel } from '../lib/exportUtils';

interface Props {
  drivers: Driver[];
  setDrivers: (d: Driver[]) => void;
}

export default function DriverList({ drivers, setDrivers }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    license: 'B2',
    licenseNumber: '',
    status: 'Ready' as any,
    rating: 5,
  });

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.phone.includes(searchTerm)
  );

  const handleOpenModal = (d?: Driver) => {
    if (d) {
      setEditingDriver(d);
      setFormData({ 
        name: d.name, 
        phone: d.phone, 
        email: d.email, 
        license: d.license, 
        licenseNumber: d.licenseNumber, 
        status: d.status,
        rating: d.rating
      });
    } else {
      setEditingDriver(null);
      setFormData({ name: '', phone: '', email: '', license: 'B2', licenseNumber: '', status: 'Ready', rating: 5 });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDriver) {
      setDrivers(drivers.map(d => d.id === editingDriver.id ? { ...d, ...formData } : d));
    } else {
      const newDriver: Driver = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        currentVehicle: null
      };
      setDrivers([...drivers, newDriver]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tài xế này khỏi hệ thống?')) {
      setDrivers(drivers.filter(d => d.id !== id));
    }
  };

  const handleExport = () => {
    const data = drivers.map(d => ({
      'Tên tài xế': d.name,
      'Điện thoại': d.phone,
      'Email': d.email,
      'Hạng bằng': d.license,
      'Số bằng lái': d.licenseNumber,
      'Trạng thái': d.status === 'Active' ? 'Đang chạy' : d.status === 'Off' ? 'Nghỉ ca' : 'Sẵn sàng',
      'Đánh giá': d.rating
    }));
    exportToExcel(data, 'Danh_sach_Tai_xe');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-slate-800 tracking-tighter">Đội ngũ Tài xế</h2>
          <p className="text-sm text-slate-400 font-medium">Quản lý hồ sơ và trạng thái của {drivers.length} nhân sự</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExport}
            className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
             Xuất Excel
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="px-6 py-3 bg-brand text-white rounded-2xl text-sm font-bold hover:bg-brand-hover transition-all shadow-lg shadow-brand/20 active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tuyển tài xế mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((d) => (
          <div key={d.id} className="card-glass group p-6 relative">
            <div className="flex justify-between items-start mb-6">
               <div className="relative">
                 <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center border-2 border-white ring-1 ring-slate-100 overflow-hidden group-hover:scale-105 transition-transform shadow-inner">
                    <User className="w-8 h-8 text-blue-200" />
                 </div>
                 <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-sm ${
                   d.status === 'Active' ? 'bg-blue-500' : d.status === 'Off' ? 'bg-slate-300' : 'bg-emerald-500'
                 }`}>
                    <ShieldCheck className="w-3 h-3 text-white" />
                 </div>
               </div>
               
               <div className="flex gap-1">
                 <button 
                   onClick={() => handleOpenModal(d)}
                   className="p-2 text-slate-300 hover:text-brand hover:bg-brand/5 rounded-xl transition-all"
                 >
                    <Edit3 className="w-4 h-4" />
                 </button>
                 <button 
                   onClick={() => handleDelete(d.id)}
                   className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                 >
                    <Trash2 className="w-4 h-4" />
                 </button>
               </div>
            </div>

            <h4 className="text-lg font-display font-bold text-slate-800 mb-1">{d.name}</h4>
            <div className="flex items-center gap-1 text-amber-500 mb-4">
               {[1,2,3,4,5].map(i => (
                 <Star key={i} className={`w-3 h-3 fill-current ${i > Math.floor(d.rating) ? 'opacity-20' : ''}`} />
               ))}
               <span className="text-xs font-bold ml-1 text-slate-500">{d.rating}</span>
            </div>

            <div className="space-y-3 mb-6 border-t border-slate-50 pt-4">
               <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center"><Phone className="w-4 h-4 opacity-50" /></div>
                  <span>{d.phone}</span>
               </div>
               <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center"><Mail className="w-4 h-4 opacity-50" /></div>
                  <span className="truncate max-w-[180px]">{d.email}</span>
               </div>
               <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center"><MapPin className="w-4 h-4 opacity-50" /></div>
                  <span className="uppercase tracking-wider font-bold text-slate-400">GPLX: {d.licenseNumber} ({d.license})</span>
               </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
               <span className={`badge-vibrant border-0 font-black ${
                 d.status === 'Active' ? 'bg-blue-100 text-blue-600' :
                 d.status === 'Off' ? 'bg-slate-100 text-slate-400' :
                 'bg-emerald-100 text-emerald-600'
               }`}>
                 {d.status === 'Active' ? 'Đang chạy' : 
                  d.status === 'Off' ? 'Nghỉ ca' : 'Sẵn sàng'}
               </span>
               <button className="text-[10px] font-black uppercase text-brand tracking-widest hover:underline">Chi tiết lịch trình</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl shadow-slate-900/20 overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-display font-black text-slate-800">
                  {editingDriver ? 'Cập nhật hồ sơ tài xế' : 'Thêm hồ sơ tài xế mới'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                  <X className="w-5 h-5" />
                </button>
             </div>
             
             <form onSubmit={handleSave} className="p-8 grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Họ và tên</label>
                   <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Nguyễn Văn A" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:border-brand/40 focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold" />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Số điện thoại</label>
                   <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="090..." className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white outline-none font-bold" />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                   <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="example@mail.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white outline-none font-bold" />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Hạng bằng lái</label>
                   <select value={formData.license} onChange={e => setFormData({...formData, license: e.target.value as any})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white outline-none font-bold">
                     <option value="B2">Bằng B2</option>
                     <option value="C">Bằng C</option>
                     <option value="D">Bằng D</option>
                     <option value="FC">Bằng FC</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Số bằng lái (GPLX)</label>
                   <input required value={formData.licenseNumber} onChange={e => setFormData({...formData, licenseNumber: e.target.value})} placeholder="G..." className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white outline-none font-bold" />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Trạng thái công tác</label>
                   <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white outline-none font-bold">
                     <option value="Ready">Sẵn sàng</option>
                     <option value="Active">Đang chạy</option>
                     <option value="Off">Nghỉ phép/Nghỉ ca</option>
                   </select>
                </div>

                <div className="space-y-2 text-left">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Đánh giá sao (1-5)</label>
                   <input type="number" min="1" max="5" step="0.1" value={formData.rating} onChange={e => setFormData({...formData, rating: parseFloat(e.target.value)})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white outline-none font-bold" />
                </div>

                <div className="col-span-2 pt-4 flex gap-3">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all">Hủy</button>
                   <button type="submit" className="flex-1 py-4 bg-brand text-white rounded-2xl font-bold text-sm hover:bg-brand-hover shadow-lg shadow-brand/20 transition-all">Lưu hồ sơ</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
