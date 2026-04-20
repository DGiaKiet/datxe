import React, { useState } from 'react';
import { UserCircle, Mail, Phone, MapPin, Search, Plus, Star, Award, X, Trash2 } from 'lucide-react';
import { Customer } from '../types';
import { exportToExcel } from '../lib/exportUtils';

interface Props {
  customers: Customer[];
  setCustomers: (c: Customer[]) => void;
}

export default function CustomerCenter({ customers, setCustomers }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    type: 'Business' as any,
    customerCode: '',
    tier: 'Standard' as any,
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.customerCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer: Customer = {
      id: Math.random().toString(36).substring(2, 9),
      customerCode: formData.customerCode || `CUS-${Math.floor(Math.random() * 1000)}`,
      name: formData.name,
      type: formData.type,
      tripsCount: 0,
      totalSpend: 0,
      tier: formData.tier
    };
    setCustomers([...customers, newCustomer]);
    setIsModalOpen(false);
    setFormData({ name: '', type: 'Business', customerCode: '', tier: 'Standard' });
  };

  const handleExport = () => {
    const exportData = customers.map(c => ({
      'Mã KH': c.customerCode,
      'Tên khách hàng': c.name,
      'Loại': c.type === 'Business' ? 'Doanh nghiệp' : 'Cá nhân',
      'Hạng': c.tier,
      'Số chuyến': c.tripsCount,
      'Tổng chi tiêu': `${c.totalSpend.toLocaleString()}đ`
    }));
    exportToExcel(exportData, 'Danh_sach_Khach_hang');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-slate-800 tracking-tighter">Hệ khách hàng & CRM</h2>
          <p className="text-sm text-slate-400 font-medium">Quản lý quan hệ khách hàng và chương trình tri ân</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExport}
            className="px-5 h-12 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 flex items-center gap-2"
          >
             Tải Excel
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 h-12 bg-brand text-white rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand/20 active:scale-95 transition-all"
          >
             <Plus className="w-4 h-4" /> Thêm khách hàng
          </button>
        </div>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
        <input 
          type="text" 
          placeholder="Tìm tên khách hàng hoặc mã..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-brand/30 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCustomers.map(c => (
          <div key={c.id} className="card-glass group p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className={`badge-vibrant border-0 font-black mb-2 ${
                    c.tier === 'VIP' ? 'bg-indigo-600 text-white' : 
                    c.tier === 'Gold' ? 'bg-amber-100 text-amber-600' : 
                    'bg-slate-100 text-slate-500'
                  }`}>
                    Hạng {c.tier}
                  </div>
                  <h4 className="text-xl font-display font-black text-slate-800 leading-tight">{c.name}</h4>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">Mã KH: {c.customerCode}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center">
                      <UserCircle className="w-8 h-8 text-slate-200" />
                   </div>
                   <button 
                    onClick={() => setCustomers(customers.filter(cust => cust.id !== c.id))}
                    className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50 mb-6">
                 <div>
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Tổng chuyến đi</p>
                    <p className="text-lg font-display font-black text-slate-800">{c.tripsCount}</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Tổng chi tiêu</p>
                    <p className="text-lg font-display font-black text-emerald-600">{(c.totalSpend / 1000000).toFixed(1)}Tr</p>
                 </div>
              </div>

              <div className="flex items-center justify-between">
                 <div className="flex -space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                 </div>
                 <button className="text-xs font-black uppercase text-brand tracking-widest hover:underline">Xem lịch sử đặt xe</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-display font-black text-slate-800">Thêm khách hàng mới</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"><X className="w-5 h-5" /></button>
             </div>
             <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tên khách hàng</label>
                   <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:border-brand/40 transition-all" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mã khách hàng (tùy chọn)</label>
                   <input value={formData.customerCode} onChange={e => setFormData({...formData, customerCode: e.target.value})} placeholder="VD: CUS-999" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:border-brand/40 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loại khách</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none">
                       <option value="Business">Doanh nghiệp</option>
                       <option value="Personal">Cá nhân</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phân hạng</label>
                    <select value={formData.tier} onChange={e => setFormData({...formData, tier: e.target.value as any})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none">
                       <option value="Standard">Standard</option>
                       <option value="Gold">Gold</option>
                       <option value="VIP">VIP</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-brand text-white rounded-2xl font-bold shadow-lg shadow-brand/20 active:scale-95 transition-all">Lưu thông tin</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
