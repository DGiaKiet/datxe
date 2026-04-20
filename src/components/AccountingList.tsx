import { invoices } from '../data/mockData';
import { Search, Receipt, CreditCard, Download, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function AccountingList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-slate-800 tracking-tighter">Kế toán & Hóa đơn</h2>
          <p className="text-sm text-slate-400 font-medium">Quản lý dòng tiền, công nợ và quyết toán hành trình</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl border border-emerald-100 flex flex-col items-end">
             <span className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">Tổng doanh thu</span>
             <span className="text-xl font-display font-black leading-none">1.240.000.000đ</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-4 items-center justify-between">
           <div className="relative flex-1 min-w-[250px]">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input type="text" placeholder="Tìm theo mã hóa đơn, khách hàng..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:border-brand/30 transition-all shadow-sm" />
           </div>
           <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
             <Download className="w-4 h-4" /> Xuất báo cáo tháng
           </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="table-head">Hóa đơn</th>
                <th className="table-head">Đối tác</th>
                <th className="table-head">Số tiền</th>
                <th className="table-head text-center">Hạn thanh toán</th>
                <th className="table-head">Trạng thái</th>
                <th className="table-head text-right px-8">Tác vụ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 italic font-medium">
              {invoices.map((i) => (
                <tr key={i.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-brand group-hover:text-white transition-all">
                          <Receipt className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="font-mono font-bold text-slate-800 leading-none">{i.invoiceCode}</p>
                          <p className="text-[9px] font-black uppercase text-slate-400 mt-1">{i.bookingCode}</p>
                       </div>
                    </div>
                  </td>
                  <td className="table-cell font-bold text-slate-700">{i.customerName}</td>
                  <td className="table-cell font-display font-black text-slate-800 text-lg">
                    {i.amount.toLocaleString()}đ
                  </td>
                  <td className="table-cell text-center">
                    <div className="flex flex-col">
                       <span className="text-xs font-bold text-slate-600">{i.dueDate}</span>
                       <span className="text-[9px] font-black text-slate-300 uppercase">Ngày xuất: {i.issueDate}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge-vibrant border-0 font-black flex items-center gap-2 w-fit ${
                      i.status === 'Paid' ? 'bg-emerald-100 text-emerald-600' :
                      i.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {i.status === 'Paid' ? <CheckCircle className="w-3" /> : 
                       i.status === 'Pending' ? <Clock className="w-3" /> : <AlertCircle className="w-3" />}
                      {i.status === 'Paid' ? 'Đã thanh toán' : 
                       i.status === 'Pending' ? 'Đang chờ' : 'Đã cọc'}
                    </span>
                  </td>
                  <td className="table-cell text-right px-8">
                    <button className="p-3 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-brand transition-all">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
