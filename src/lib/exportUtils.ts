import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Xuất dữ liệu ra file Excel
 * @param data Mảng dữ liệu
 * @param fileName Tên file (không bao gồm đuôi)
 */
export const exportToExcel = (data: any[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dữ liệu');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

/**
 * Xuất dữ liệu ra file PDF
 * @param title Tiêu đề báo cáo
 * @param headers Tiêu đề cột
 * @param data Dữ liệu hàng
 * @param fileName Tên file
 */
export const exportToPDF = (title: string, headers: string[], data: any[][], fileName: string) => {
  const doc = new jsPDF();
  
  // Tiêu đề trang
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  
  // Thời gian xuất
  doc.setFontSize(10);
  doc.text(`Ngày xuất: ${new Date().toLocaleString()}`, 14, 30);

  autoTable(doc, {
    head: [headers],
    body: data,
    startY: 35,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [37, 99, 235] }
  });

  doc.save(`${fileName}.pdf`);
};
