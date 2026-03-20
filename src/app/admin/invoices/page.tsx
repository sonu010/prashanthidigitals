"use client";
import { useState, useRef } from "react";
import { FiPlus, FiTrash2, FiPrinter } from "react-icons/fi";

interface InvoiceItem { id: number; description: string; qty: number; rate: number; }
interface Invoice {
  invoiceNumber: string; date: string;
  customerName: string; customerPhone: string; customerEmail: string; customerAddress: string;
  items: InvoiceItem[]; notes: string;
  paymentStatus: "unpaid" | "partial" | "paid"; advancePaid: number;
}

export default function InvoicesPage() {
  const printRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [invoice, setInvoice] = useState<Invoice>({
    invoiceNumber: "PS-" + Date.now().toString().slice(-6), date: new Date().toISOString().split("T")[0],
    customerName: "", customerPhone: "", customerEmail: "", customerAddress: "",
    items: [{ id: 1, description: "", qty: 1, rate: 0 }], notes: "",
    paymentStatus: "unpaid", advancePaid: 0,
  });

  const addItem = () => setInvoice((p) => ({ ...p, items: [...p.items, { id: Date.now(), description: "", qty: 1, rate: 0 }] }));
  const removeItem = (id: number) => { if (invoice.items.length === 1) return; setInvoice((p) => ({ ...p, items: p.items.filter((i) => i.id !== id) })); };
  const updateItem = (id: number, field: string, value: string | number) => setInvoice((p) => ({ ...p, items: p.items.map((item) => item.id === id ? { ...item, [field]: value } : item) }));

  const subtotal = invoice.items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const balanceDue = subtotal - invoice.advancePaid;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write("<!DOCTYPE html><html><head><title>Invoice " + invoice.invoiceNumber + "</title>");
    printWindow.document.write("<style>");
    printWindow.document.write("* { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }");
    printWindow.document.write("body { padding: 30px; color: #1a1a2e; font-size: 13px; }");
    printWindow.document.write(".invoice-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #c8102e; }");
    printWindow.document.write(".studio-name { font-size: 22px; font-weight: bold; color: #c8102e; }");
    printWindow.document.write(".studio-sub { font-size: 13px; color: #666; }");
    printWindow.document.write(".studio-contact { font-size: 11px; color: #888; margin-top: 6px; line-height: 1.6; }");
    printWindow.document.write(".inv-title { font-size: 24px; font-weight: bold; color: #1a1a2e; text-align: right; }");
    printWindow.document.write(".inv-meta { text-align: right; font-size: 12px; color: #666; margin-top: 4px; }");
    printWindow.document.write(".status-badge { display: inline-block; padding: 3px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin-top: 8px; }");
    printWindow.document.write(".status-paid { background: #dcfce7; color: #166534; } .status-partial { background: #fef3c7; color: #92400e; } .status-unpaid { background: #fee2e2; color: #991b1b; }");
    printWindow.document.write(".bill-to { margin-bottom: 25px; } .bill-to .label { font-size: 10px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; } .bill-to .name { font-weight: bold; color: #1a1a2e; font-size: 15px; } .bill-to .detail { font-size: 12px; color: #666; }");
    printWindow.document.write("table { width: 100%; border-collapse: collapse; margin-bottom: 20px; } thead { background: #f8f8f8; } th { text-align: left; padding: 10px 12px; font-size: 11px; color: #666; font-weight: 600; border-bottom: 2px solid #eee; } td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; } .text-right { text-align: right; } .text-center { text-align: center; }");
    printWindow.document.write(".totals { display: flex; justify-content: flex-end; margin-bottom: 25px; } .totals-box { width: 250px; } .totals-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; } .totals-row.total { border-top: 2px solid #1a1a2e; padding-top: 10px; margin-top: 6px; font-size: 16px; font-weight: bold; } .totals-row.total .amount { color: #c8102e; }");
    printWindow.document.write(".notes { background: #f8f8f8; border-radius: 8px; padding: 15px; margin-bottom: 25px; } .notes .label { font-size: 10px; font-weight: bold; color: #999; text-transform: uppercase; margin-bottom: 4px; } .notes p { font-size: 12px; color: #555; }");
    printWindow.document.write(".footer { text-align: center; border-top: 1px solid #eee; padding-top: 20px; font-size: 11px; color: #aaa; }");
    printWindow.document.write("@media print { body { padding: 15px; } @page { margin: 10mm; size: A4; } }");
    printWindow.document.write("</style></head><body>");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 300);
  };

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">Invoice Generator</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowPreview(!showPreview)} className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition">{showPreview ? "Edit" : "Preview"}</button>
          {showPreview && <button onClick={handlePrint} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"><FiPrinter className="w-4 h-4" /><span className="hidden sm:inline">Print</span></button>}
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {!showPreview ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-accent mb-4">Invoice Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Invoice #</label><input type="text" value={invoice.invoiceNumber} onChange={(e) => setInvoice({...invoice, invoiceNumber: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" value={invoice.date} onChange={(e) => setInvoice({...invoice, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={invoice.paymentStatus} onChange={(e) => setInvoice({...invoice, paymentStatus: e.target.value as Invoice["paymentStatus"]})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"><option value="unpaid">Unpaid</option><option value="partial">Partially Paid</option><option value="paid">Fully Paid</option></select></div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-accent mb-4">Customer Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" value={invoice.customerName} onChange={(e) => setInvoice({...invoice, customerName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Full name" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={invoice.customerPhone} onChange={(e) => setInvoice({...invoice, customerPhone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={invoice.customerEmail} onChange={(e) => setInvoice({...invoice, customerEmail: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><input type="text" value={invoice.customerAddress} onChange={(e) => setInvoice({...invoice, customerAddress: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-accent">Items / Services</h3><button onClick={addItem} className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline"><FiPlus className="w-4 h-4" /> Add Item</button></div>
              <div className="space-y-3">{invoice.items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-12 sm:col-span-5">{index === 0 && <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>}<input type="text" value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g., Wedding Photography" /></div>
                  <div className="col-span-4 sm:col-span-2">{index === 0 && <label className="block text-xs font-medium text-gray-500 mb-1">Qty</label>}<input type="number" min="1" value={item.qty} onChange={(e) => updateItem(item.id, "qty", Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                  <div className="col-span-5 sm:col-span-3">{index === 0 && <label className="block text-xs font-medium text-gray-500 mb-1">Rate</label>}<input type="number" min="0" value={item.rate || ""} onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="0" /></div>
                  <div className="col-span-2 sm:col-span-1 text-right">{index === 0 && <label className="block text-xs font-medium text-gray-500 mb-1">&nbsp;</label>}<p className="text-sm font-medium py-2 hidden sm:block">&#8377;{(item.qty * item.rate).toLocaleString()}</p></div>
                  <div className="col-span-1">{index === 0 && <label className="block text-xs text-gray-500 mb-1">&nbsp;</label>}<button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500" disabled={invoice.items.length === 1}><FiTrash2 className="w-4 h-4" /></button></div>
                </div>
              ))}</div>
              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-semibold">&#8377;{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm items-center gap-3"><span className="text-gray-600">Advance Paid</span><input type="number" min="0" value={invoice.advancePaid || ""} onChange={(e) => setInvoice({...invoice, advancePaid: Number(e.target.value)})} className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-right focus:ring-2 focus:ring-primary outline-none" placeholder="0" /></div>
                <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2"><span>Balance Due</span><span className="text-primary">&#8377;{balanceDue.toLocaleString()}</span></div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"><h3 className="font-bold text-accent mb-3">Notes</h3><textarea rows={3} value={invoice.notes} onChange={(e) => setInvoice({...invoice, notes: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Payment terms, notes..." /></div>
            <button onClick={() => setShowPreview(true)} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition">Preview Invoice</button>
          </div>
        ) : (
          <div>
            <div ref={printRef}>
              <div className="invoice-header" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:30,paddingBottom:20,borderBottom:"3px solid #c8102e"}}>
                <div><div className="studio-name" style={{fontSize:22,fontWeight:"bold",color:"#c8102e"}}>Prashanthi Digital Studio</div><div className="studio-sub" style={{fontSize:13,color:"#666"}}>& LED Walls</div><div className="studio-contact" style={{fontSize:11,color:"#888",marginTop:6,lineHeight:1.6}}>Nacharam, Hyderabad, Telangana<br/>Phone: +91 9948670396<br/>Email: prashanthistudio@gmail.com</div></div>
                <div style={{textAlign:"right"}}><div className="inv-title" style={{fontSize:24,fontWeight:"bold",color:"#1a1a2e"}}>INVOICE</div><div className="inv-meta" style={{fontSize:12,color:"#666",marginTop:4}}>#{invoice.invoiceNumber}<br/>Date: {new Date(invoice.date + "T00:00:00").toLocaleDateString("en-IN", {day:"numeric",month:"long",year:"numeric"})}</div><div className={"status-badge " + (invoice.paymentStatus === "paid" ? "status-paid" : invoice.paymentStatus === "partial" ? "status-partial" : "status-unpaid")} style={{display:"inline-block",padding:"3px 12px",borderRadius:20,fontSize:11,fontWeight:"bold",marginTop:8,background:invoice.paymentStatus==="paid"?"#dcfce7":invoice.paymentStatus==="partial"?"#fef3c7":"#fee2e2",color:invoice.paymentStatus==="paid"?"#166534":invoice.paymentStatus==="partial"?"#92400e":"#991b1b"}}>{invoice.paymentStatus === "paid" ? "PAID" : invoice.paymentStatus === "partial" ? "PARTIALLY PAID" : "UNPAID"}</div></div>
              </div>
              <div className="bill-to" style={{marginBottom:25}}><div style={{fontSize:10,fontWeight:"bold",color:"#999",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Bill To</div><div style={{fontWeight:"bold",color:"#1a1a2e",fontSize:15}}>{invoice.customerName || "Customer Name"}</div>{invoice.customerPhone && <div style={{fontSize:12,color:"#666"}}>{invoice.customerPhone}</div>}{invoice.customerEmail && <div style={{fontSize:12,color:"#666"}}>{invoice.customerEmail}</div>}{invoice.customerAddress && <div style={{fontSize:12,color:"#666"}}>{invoice.customerAddress}</div>}</div>
              <table style={{width:"100%",borderCollapse:"collapse",marginBottom:20}}><thead><tr style={{background:"#f8f8f8"}}><th style={{textAlign:"left",padding:"10px 12px",fontSize:11,color:"#666",fontWeight:600,borderBottom:"2px solid #eee"}}>#</th><th style={{textAlign:"left",padding:"10px 12px",fontSize:11,color:"#666",fontWeight:600,borderBottom:"2px solid #eee"}}>Description</th><th style={{textAlign:"center",padding:"10px 12px",fontSize:11,color:"#666",fontWeight:600,borderBottom:"2px solid #eee"}}>Qty</th><th style={{textAlign:"right",padding:"10px 12px",fontSize:11,color:"#666",fontWeight:600,borderBottom:"2px solid #eee"}}>Rate</th><th style={{textAlign:"right",padding:"10px 12px",fontSize:11,color:"#666",fontWeight:600,borderBottom:"2px solid #eee"}}>Amount</th></tr></thead><tbody>{invoice.items.map((item, idx) => <tr key={item.id}><td style={{padding:"10px 12px",borderBottom:"1px solid #f0f0f0",color:"#999"}}>{idx+1}</td><td style={{padding:"10px 12px",borderBottom:"1px solid #f0f0f0",fontWeight:500}}>{item.description || "—"}</td><td style={{padding:"10px 12px",borderBottom:"1px solid #f0f0f0",textAlign:"center"}}>{item.qty}</td><td style={{padding:"10px 12px",borderBottom:"1px solid #f0f0f0",textAlign:"right"}}>&#8377;{item.rate.toLocaleString()}</td><td style={{padding:"10px 12px",borderBottom:"1px solid #f0f0f0",textAlign:"right",fontWeight:500}}>&#8377;{(item.qty*item.rate).toLocaleString()}</td></tr>)}</tbody></table>
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:25}}><div style={{width:250}}><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:13}}><span style={{color:"#666"}}>Subtotal</span><span style={{fontWeight:500}}>&#8377;{subtotal.toLocaleString()}</span></div>{invoice.advancePaid > 0 && <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:13,color:"#16a34a"}}><span>Advance Paid</span><span>- &#8377;{invoice.advancePaid.toLocaleString()}</span></div>}<div style={{display:"flex",justifyContent:"space-between",paddingTop:10,marginTop:6,borderTop:"2px solid #1a1a2e",fontSize:16,fontWeight:"bold"}}><span>Balance Due</span><span style={{color:"#c8102e"}}>&#8377;{balanceDue.toLocaleString()}</span></div></div></div>
              {invoice.notes && <div style={{background:"#f8f8f8",borderRadius:8,padding:15,marginBottom:25}}><div style={{fontSize:10,fontWeight:"bold",color:"#999",textTransform:"uppercase",marginBottom:4}}>Notes</div><p style={{fontSize:12,color:"#555"}}>{invoice.notes}</p></div>}
              <div style={{textAlign:"center",borderTop:"1px solid #eee",paddingTop:20,fontSize:11,color:"#aaa"}}><p>Thank you for choosing Prashanthi Digital Studio!</p><p style={{marginTop:4}}>Nacharam, Hyderabad | +91 9948670396 | prashanthistudio@gmail.com</p></div>
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <button onClick={() => setShowPreview(false)} className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50">Back to Edit</button>
              <button onClick={handlePrint} className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"><FiPrinter className="w-4 h-4" /> Print / Save PDF</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
