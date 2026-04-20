import React, { useState } from 'react';
import { Vehicle } from '../types';
import { Search, Filter, Download, Plus, MoreHorizontal, Car, Trash2, Edit3, X } from 'lucide-react';
import { exportToExcel } from '../lib/exportUtils';

interface Props {
  vehicles: Vehicle[];
  setVehicles: (v: Vehicle[]) => void;
}

export default function VehicleList({ vehicles, setVehicles }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    plate: '',
    type: 'Truck' as any,
    driver: '',
    status: 'Ready' as any,
  });

  const filteredVehicles = vehicles.filter(v => 
    v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (v?: Vehicle) => {
    if (v) {
      setEditingVehicle(v);
      setFormData({ plate: v.plate, type: v.type, driver: v.driver, status: v.status });
    } else {
      setEditingVehicle(null);
      setFormData({ plate: '', type: 'Truck', driver: '', status: 'Ready' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? { ...v, ...formData } : v));
    } else {
      const newVehicle: Vehicle = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        inspectionDate: '2026-12-31',
        mileage: 0
      };
      setVehicles([...vehicles, newVehicle]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa phương tiện này?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const handleExport = () => {
    const data = vehicles.map(v => ({
      'Biển số': v.plate,
      'Loại xe': v.type,
      'Tài xế': v.driver,
      'Trạng thái': v.status === 'Active' ? 'Đang chạy' : v.status === 'Maintenance' ? 'Bảo trì' : 'Sẵn sàng',
      'Hạn kiểm định': v.inspectionDate,
      'Số KM': v.mileage
    }));
    exportToExcel(data, 'Danh_sach_Doi_xe');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-slate-800 tracking-tighter">Đội xe Vận tải</h2>
          <p className="text-sm text-slate-400 font-medium">Quản lý và giám sát {vehicles.length} phương tiện</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-400" />
            Xuất Excel
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-2xl text-sm font-bold hover:bg-brand-hover transition-all shadow-lg shadow-brand/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Đăng ký xe
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input 
              type="text" 
              placeholder="Tìm biển số, tài xế hoặc loại xe..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-brand/5 focus:border-brand/30 transition-all placeholder:text-slate-300"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:border-brand/30 transition-all">
            <Filter className="w-4 h-4 text-slate-400" />
            Lọc nâng cao
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="table-head">Thông tin xe</th>
                <th className="table-head">Phân loại</th>
                <th className="table-head">Tài xế phụ trách</th>
                <th className="table-head">Trạng thái</th>
                <th className="table-head text-right px-8">Tác vụ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="table-cell">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-white ring-1 ring-slate-100 group-hover:bg-white transition-all shadow-sm">
                        <Car className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-base block">{v.plate}</span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1 block">Mã: FF-{v.id.substring(0, 4)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell font-bold text-slate-600">
                    <span className="px-2 py-1 bg-slate-100 rounded-lg text-[10px] tracking-wider uppercase">{v.type}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2 text-slate-700 font-bold">
                       <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 border border-white ring-1 ring-slate-200">
                         {v.driver.split(' ').pop()?.charAt(0)}
                       </div>
                       {v.driver}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge-vibrant border-0 font-black ${
                      v.status === 'Active' ? 'bg-blue-100 text-blue-600' :
                      v.status === 'Maintenance' ? 'bg-amber-100 text-amber-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {v.status === 'Active' ? 'Hoạt động' : 
                       v.status === 'Maintenance' ? 'Bảo trì' : 'Sẵn sàng'}
                    </span>
                  </td>
                  <td className="table-cell text-right px-8">
                    <div className="flex justify-end gap-2 outline-none">
                       <button 
                        onClick={() => handleOpenModal(v)}
                        className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-brand transition-all active:scale-95"
                       >
                         <Edit3 className="w-4 h-4" />
                       </button>
                       <button 
                        onClick={() => handleDelete(v.id)}
                        className="p-2.5 hover:bg-red-50 rounded-xl text-slate-400 hover:text-red-500 transition-all active:scale-95"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredVehicles.length === 0 && (
            <div className="p-20 text-center">
               <Car className="w-16 h-16 text-slate-100 mx-auto mb-4" />
               <p className="text-slate-400 font-bold uppercase tracking-widest">Không tìm thấy phương tiện nào</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl shadow-slate-900/20 overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-display font-black text-slate-800">
                  {editingVehicle ? 'Cập nhật thông tin xe' : 'Đăng ký xe mới'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                  <X className="w-5 h-5" />
                </button>
             </div>
             
             <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="space-y-2 text-left">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Biển kiểm soát</label>
                   <input 
                    required
                    value={formData.plate}
                    onChange={e => setFormData({...formData, plate: e.target.value})}
                    placeholder="VD: 51A-123.45"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:border-brand/40 focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold"
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Loại xe</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value as any})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white outline-none font-bold"
                    >
                      <option value="Truck">Xe tải</option>
                      <option value="Van">Xe Van</option>
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                    </select>
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Trạng thái</label>
                    <select 
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value as any})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white outline-none font-bold"
                    >
                      <option value="Ready">Sẵn sàng</option>
                      <option value="Active">Đang chạy</option>
                      <option value="Maintenance">Bảo trì</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tài xế phụ trách</label>
                   <input 
                    required
                    value={formData.driver}
                    onChange={e => setFormData({...formData, driver: e.target.value})}
                    placeholder="Họ và tên tài xế"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:border-brand/40 outline-none transition-all font-bold"
                   />
                </div>

                <div className="pt-4 flex gap-3">
                   <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3.5 border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-50 active:scale-95 transition-all"
                   >
                     Hủy bỏ
                   </button>
                   <button 
                    type="submit"
                    className="flex-1 py-3.5 bg-brand text-white rounded-2xl font-bold text-sm hover:bg-brand-hover shadow-lg shadow-brand/20 active:scale-95 transition-all"
                   >
                     {editingVehicle ? 'Lưu thay đổi' : 'Xác nhận tạo'}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
