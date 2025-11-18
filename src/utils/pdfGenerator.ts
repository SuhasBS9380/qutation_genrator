import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { QuotationData } from '../types/quotation';
import { COMPANY_DATA } from '../constants/companyData';
import { loadLogoAsBase64 } from './logoLoader';

export async function generateQuotationPDF(data: QuotationData): Promise<void> {
  // Load logo first
  const logoBase64 = await loadLogoAsBase64();
  const doc = new jsPDF('p', 'mm', 'a4');
  
  // Colors
  const peachyOrange = '#F5A962';
  const darkNavy = '#2C3E50';
  
  // Helper to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };
  
  const peachRgb = hexToRgb(peachyOrange);
  const navyRgb = hexToRgb(darkNavy);
  
  // Header - Two-tone design with diagonal split
  // Main peachy orange section (full background)
  doc.setFillColor(peachRgb.r, peachRgb.g, peachRgb.b);
  doc.rect(0, 0, 210, 50, 'F');
  
  // Dark navy diagonal section (top right)
  doc.setFillColor(navyRgb.r, navyRgb.g, navyRgb.b);
  // Create diagonal shape
  doc.triangle(120, 0, 210, 0, 210, 35, 'F');
  doc.triangle(120, 0, 210, 35, 90, 35, 'F');
  
  // White triangle accent
  doc.setFillColor(255, 255, 255);
  doc.triangle(90, 35, 120, 0, 210, 35, 'F');
  
  // Company name - larger and bold
  doc.setFont('times', 'bold');
  doc.setFontSize(42);
  doc.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  doc.text('V M Constructions', 12, 22);
  
  // Logo area with white rounded background
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(145, 6, 55, 28, 3, 3, 'F');
  
  // Add logo image if available
  if (logoBase64) {
    try {
      // Add logo with proper sizing
      doc.addImage(logoBase64, 'PNG', 148, 8, 49, 24);
    } catch (error) {
      console.error('Logo embedding error:', error);
      // Fallback text
      doc.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('VM', 172.5, 16, { align: 'center' });
      doc.setFontSize(8);
      doc.text('CONSTRUCTIONS', 172.5, 22, { align: 'center' });
      doc.setFontSize(6);
      doc.setTextColor(peachRgb.r, peachRgb.g, peachRgb.b);
      doc.text('Innovation in Infrastructure', 172.5, 27, { align: 'center' });
    }
  }
  
  // Contact details bar - Email and Phone only (no address)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  
  // Contact bar positioning
  const contactY = 44;
  
  // Left side: Email
  doc.text(COMPANY_DATA.email, 12, contactY);
  
  // Right side: Phone
  doc.text(COMPANY_DATA.phone, 155, contactY);
  
  // Quotation info - top right
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Date: ${data.date}`, 150, 58);
  doc.text(`Quotation #: ${data.quotationNumber}`, 150, 63);
  
  // Horizontal line separator
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(12, 68, 198, 68);
  
  // Billed To section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  doc.text('BILLED TO', 12, 77);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.text(`Name: ${data.client.name || 'N/A'}`, 12, 84);
  doc.text(`Address: ${data.client.address || 'N/A'}`, 12, 90);
  doc.text(`Phone: ${data.client.phone || 'N/A'}`, 12, 96);
  doc.text(`Email: ${data.client.email || 'N/A'}`, 12, 102);
  
  // Company Details section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  doc.text('COMPANY DETAILS', 120, 77);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.text(`Proprietor: ${COMPANY_DATA.proprietor}`, 120, 84);
  doc.text(`GST No: ${COMPANY_DATA.gstNumber}`, 120, 90);
  doc.text(`State: ${COMPANY_DATA.state}`, 120, 96);
  
  // Services Table Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  doc.text('CONSTRUCTION SERVICES ESTIMATE', 105, 115, { align: 'center' });
  
  // Services Table - Filter out empty rows
  const filledServices = data.services.filter(service => 
    service.service.trim() !== '' || service.description.trim() !== ''
  );
  
  const tableData = filledServices.map((service, index) => [
    (index + 1).toString(),
    service.service,
    service.description,
    service.uom,
    service.quantity.toString(),
    service.unitPrice.toFixed(2),
    Math.round(service.totalPrice).toString(),
    service.remarks
  ]);
  
  const subtotal = filledServices.reduce((sum, s) => sum + s.totalPrice, 0);
  const gstAmount = (subtotal * data.gstPercentage) / 100;
  const grandTotal = subtotal + gstAmount;
  
  autoTable(doc, {
    startY: 120,
    head: [['SR NO', 'SERVICE', 'DESCRIPTION', 'UOM', 'QUANTITY', 'UNIT PRICE', 'TOTAL PRICE', 'REMARKS']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [44, 62, 80],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'center',
      valign: 'middle',
      cellPadding: 4
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 4,
      textColor: [40, 40, 40],
      lineWidth: 0.2,
      lineColor: [220, 220, 220],
      overflow: 'linebreak'
    },
    alternateRowStyles: {
      fillColor: [255, 250, 240]
    },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 28 },
      2: { cellWidth: 42, overflow: 'linebreak' },
      3: { cellWidth: 15, halign: 'center' },
      4: { cellWidth: 18, halign: 'center' },
      5: { cellWidth: 24, halign: 'right' },
      6: { cellWidth: 28, halign: 'right', fontStyle: 'bold' },
      7: { cellWidth: 15, fontSize: 8 }
    },
    margin: { left: 10, right: 10 }
  });
  
  // Get Y position after table
  let summaryY = (doc as any).lastAutoTable.finalY + 8;
  
  // Summary section positioning - aligned with TOTAL PRICE column
  // Total Price column starts at: 10 + 15 + 28 + 42 + 15 + 18 + 24 = 152mm
  const totalPriceColStart = 152;
  const totalPriceColWidth = 28;
  const totalPriceColEnd = totalPriceColStart + totalPriceColWidth;
  
  // Subtotal row
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text('Subtotal:', totalPriceColStart - 35, summaryY);
  doc.text(Math.round(subtotal).toLocaleString('en-IN'), totalPriceColEnd, summaryY, { align: 'right' });
  
  summaryY += 10;
  
  // GST row
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`GST (${data.gstPercentage}%):`, totalPriceColStart - 35, summaryY);
  doc.text(Math.round(gstAmount).toLocaleString('en-IN'), totalPriceColEnd, summaryY, { align: 'right' });
  
  summaryY += 12;
  
  // Grand Total row - full width dark navy background
  const totalX = 10;
  const totalWidth = 190;
  
  doc.setFillColor(44, 62, 80);
  doc.rect(totalX, summaryY, totalWidth, 11, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('GRAND TOTAL (INC. GST)', totalX + 10, summaryY + 7.5);
  doc.text(`Rs ${Math.round(grandTotal).toLocaleString('en-IN')}`, totalX + totalWidth - 10, summaryY + 7.5, { align: 'right' });
  
  const finalY = summaryY + 20;
  
  // Terms and Conditions - with professional gradient-like background
  // Light peach background with border
  const lightPeachRgb = { r: 255, g: 249, b: 240 };
  doc.setFillColor(lightPeachRgb.r, lightPeachRgb.g, lightPeachRgb.b);
  doc.rect(15, finalY, 180, 50, 'F');
  
  // Add border
  doc.setDrawColor(peachRgb.r, peachRgb.g, peachRgb.b);
  doc.setLineWidth(0.5);
  doc.rect(15, finalY, 180, 50, 'S');
  
  // Header with underline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  doc.text('TERMS AND CONDITIONS', 20, finalY + 8);
  
  // Underline for header
  doc.setDrawColor(peachRgb.r, peachRgb.g, peachRgb.b);
  doc.setLineWidth(0.8);
  doc.line(20, finalY + 10, 190, finalY + 10);
  
  // Terms content
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  
  let yPos = finalY + 17;
  
  // Filter out empty terms
  const validTerms = data.termsAndConditions.filter(term => term.trim() !== '');
  
  if (validTerms.length > 0) {
    validTerms.forEach((term, index) => {
      // Add bullet point
      doc.setFont('helvetica', 'bold');
      doc.text('•', 20, yPos);
      
      // Add term text
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(term, 165);
      doc.text(lines, 25, yPos);
      
      // Calculate height for this term
      const lineHeight = 4.5;
      yPos += lines.length * lineHeight;
      
      // Add spacing between terms
      if (index < validTerms.length - 1) {
        yPos += 2;
      }
    });
  } else {
    // If no terms, show a message
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('No terms and conditions specified.', 20, yPos);
  }
  
  // Save PDF
  doc.save(`VM_Construction_Quotation_${data.quotationNumber}.pdf`);
}
