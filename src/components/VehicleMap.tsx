import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Navigation, MapPin, Gauge, User, Phone, Info } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const HCM_CENTER: [number, number] = [10.762622, 106.660172];

const activeVehicles = [
  { id: '1', plate: '51A-123.45', position: [10.7769, 106.7009] as [number, number], speed: 45, driver: 'Nguyễn Văn A', phone: '0901234567' },
  { id: '4', plate: '51G-111.88', position: [10.8231, 106.6297] as [number, number], speed: 32, driver: 'Phạm Minh D', phone: '0988888888' },
  { id: '5', plate: '51H-999.00', position: [10.7327, 106.6992] as [number, number], speed: 28, driver: 'Hoàng Văn E', phone: '0912123123' },
];

export default function VehicleMap() {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
             <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-black text-xl text-slate-800 tracking-tighter">Bản đồ Giám sát Đội xe</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Đang kết nối GPS: {activeVehicles.length} phương tiện</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 px-4 rounded-2xl border border-slate-100 shadow-sm">
           <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-600 uppercase">Hệ thống ổn định</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        <div className="flex-1 bg-white p-2 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden relative min-h-[400px]">
          <MapContainer center={HCM_CENTER} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {activeVehicles.map(v => (
              <Marker 
                key={v.id} 
                position={v.position}
                eventHandlers={{
                  click: () => setSelectedVehicle(v),
                }}
              >
                <Popup>
                  <div className="p-1 font-sans">
                    <p className="font-black text-brand text-lg tracking-tight leading-none mb-1">{v.plate}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{v.driver}</p>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                       <span className="text-xs font-black text-slate-700">{v.speed} km/h</span>
                       <button className="text-[10px] font-black text-brand uppercase underline">Xem camera</button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <aside className="w-full lg:w-96 flex flex-col gap-6 overflow-y-auto lg:pr-2">
           {selectedVehicle ? (
             <div className="bg-white p-6 rounded-3xl border-2 border-brand shadow-2xl shadow-brand/10 animate-in slide-in-from-right duration-500">
               <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase text-brand tracking-widest bg-brand/10 px-3 py-1 rounded-full flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-brand rounded-full animate-ping"></div>
                     Trực tuyến
                  </span>
                  <button onClick={() => setSelectedVehicle(null)} className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                     <Info className="w-5 h-5 ml-1" />
                  </button>
               </div>

               <h4 className="text-3xl font-display font-black text-slate-800 tracking-tighter mb-1">{selectedVehicle.plate}</h4>
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-8">Thiết bị: NAVI-PRO-X4</p>
               
               <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 group hover:bg-white hover:border-brand/20 transition-all">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-brand"><User className="w-6 h-6" /></div>
                     <div>
                        <p className="text-[10px] uppercase font-black text-slate-400 leading-none mb-1">Tài xế vận hành</p>
                        <p className="text-sm font-black text-slate-800">{selectedVehicle.driver}</p>
                     </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500"><Navigation className="w-6 h-6 shrink-0" /></div>
                     <div>
                        <p className="text-[10px] uppercase font-black text-slate-400 leading-none mb-1">Tọa độ thực tế</p>
                        <p className="text-sm font-mono font-bold text-slate-800">{selectedVehicle.position[0].toFixed(5)}, {selectedVehicle.position[1].toFixed(5)}</p>
                     </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500"><Gauge className="w-6 h-6 shrink-0" /></div>
                     <div>
                        <p className="text-[10px] uppercase font-black text-slate-400 leading-none mb-1">Vận tốc đang duy trì</p>
                        <p className="text-sm font-black text-slate-800">{selectedVehicle.speed} km/h</p>
                     </div>
                  </div>
               </div>

               <button className="w-full mt-8 py-4 bg-brand text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 active:scale-95 flex items-center justify-center gap-3">
                  <Phone className="w-4 h-4 fill-current" />
                  Kết nối tài xế
               </button>
             </div>
           ) : (
             <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center flex-1">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                   <MapPin className="w-10 h-10 text-slate-200" />
                </div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">
                  Vui lòng chọn phương tiện để theo dõi lộ trình trực tiếp
                </p>
             </div>
           )}

           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest border-b border-slate-50 pb-2">Thông báo khẩn cấp</h5>
              <div className="space-y-3">
                 <div className="p-3 bg-red-50 text-red-600 rounded-2xl text-[11px] font-black border border-red-100 flex gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 shrink-0"></div>
                    Xe 51H-999.00 mất tín hiệu ( {'>'} 30p)
                 </div>
                 <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl text-[11px] font-black border border-amber-100 flex gap-3">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1 shrink-0"></div>
                    Xe 51A-123.45 chạy quá tốc độ (65/50)
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
