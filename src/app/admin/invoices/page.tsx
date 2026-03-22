"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { FiPlus, FiTrash2, FiPrinter, FiList, FiFileText } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { eventCategories } from "@/lib/eventCategories";

interface InvoiceItem { id: number; description: string; qty: number; rate: number; }
interface Invoice {
  id?: string;
  invoice_number: string; date: string;
  customer_name: string; customer_phone: string; customer_email: string;
  event_type: string;
  items: InvoiceItem[]; notes: string;
  subtotal: number; advance_paid: number; balance_due: number; total: number;
  status: "unpaid" | "partial" | "paid";
}

interface BookingRecord { id: string; customer_name: string; customer_phone: string; event_type: string; event_date: string; event_location: string; services: string[]; status: string; }
interface DailyLogRecord { id: string; date: string; type: string; title: string; description: string; amount?: number; customer_name?: string; customer_phone?: string; }

const emptyInvoice = (): Invoice => ({
  invoice_number: "PS-" + Date.now().toString().slice(-6), date: new Date().toISOString().split("T")[0],
  customer_name: "", customer_phone: "", customer_email: "", event_type: "",
  items: [{ id: 1, description: "", qty: 1, rate: 0 }], notes: "",
  subtotal: 0, advance_paid: 0, balance_due: 0, total: 0, status: "unpaid",
});

export default function InvoicesPage() {
  const printRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"list" | "create" | "preview" | "pick-source">("list");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [invoice, setInvoice] = useState<Invoice>(emptyInvoice());

  // Source records for prefill
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [dailyLogs, setDailyLogs] = useState<DailyLogRecord[]>([]);
  const [sourceTab, setSourceTab] = useState<"bookings" | "daily-log">("bookings");
  const [sourceSearch, setSourceSearch] = useState("");
  const [loadingSource, setLoadingSource] = useState(false);

  const fetchInvoices = useCallback(async () => {
    const { data } = await supabase.from("invoices").select("*").order("created_at", { ascending: false });
    if (data) setInvoices(data as Invoice[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

  const fetchSourceRecords = useCallback(async () => {
    setLoadingSource(true);
    const [bRes, dRes] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("daily_logs").select("*").in("type", ["event", "walk-in"]).order("date", { ascending: false }),
    ]);
    if (bRes.data) setBookings(bRes.data);
    if (dRes.data) setDailyLogs(dRes.data);
    setLoadingSource(false);
  }, []);

  const addItem = () => setInvoice((p) => ({ ...p, items: [...p.items, { id: Date.now(), description: "", qty: 1, rate: 0 }] }));
  const removeItem = (id: number) => { if (invoice.items.length === 1) return; setInvoice((p) => ({ ...p, items: p.items.filter((i) => i.id !== id) })); };
  const updateItem = (id: number, field: string, value: string | number) => setInvoice((p) => ({ ...p, items: p.items.map((item) => item.id === id ? { ...item, [field]: value } : item) }));

  const subtotal = invoice.items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const balanceDue = subtotal - invoice.advance_paid;

  const handleSave = async () => {
    setSaving(true);
    const row = {
      invoice_number: invoice.invoice_number, customer_name: invoice.customer_name,
      customer_phone: invoice.customer_phone, customer_email: invoice.customer_email || null,
      event_type: invoice.event_type || null, event_date: invoice.date, items: invoice.items,
      subtotal, tax: 0, total: subtotal, advance_paid: invoice.advance_paid, balance_due: balanceDue,
      status: invoice.status, notes: invoice.notes || null,
    };
    if (invoice.id) {
      await supabase.from("invoices").update(row).eq("id", invoice.id);
    } else {
      await supabase.from("invoices").insert(row);
    }
    setSaving(false);
    setMode("list");
    fetchInvoices();
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write("<!DOCTYPE html><html><head><title>Invoice " + invoice.invoice_number + "</title>");
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
    printWindow.document.write("table { width: 100%; border-collapse: collapse; margin-bottom: 20px; } thead { background: #f8f8f8; } th { text-align: left; padding: 10px 12px; font-size: 11px; color: #666; font-weight: 600; border-bottom: 2px solid #eee; } td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; } .text-right { text-align: right; }");
    printWindow.document.write(".totals { display: flex; justify-content: flex-end; margin-bottom: 25px; } .totals-box { width: 250px; } .totals-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; } .totals-row.total { border-top: 2px solid #1a1a2e; padding-top: 10px; margin-top: 6px; font-size: 16px; font-weight: bold; }");
    printWindow.document.write(".footer { text-align: center; border-top: 1px solid #eee; padding-top: 20px; font-size: 11px; color: #aaa; }");
    printWindow.document.write("@media print { body { padding: 15px; } @page { margin: 10mm; size: A4; } }");
    printWindow.document.write("</style></head><body>");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 300);
  };

  const newInvoice = () => { setInvoice(emptyInvoice()); setMode("create"); };

  const startFromSource = () => { fetchSourceRecords(); setSourceTab("bookings"); setSourceSearch(""); setMode("pick-source"); };

  const prefillFromBooking = (b: BookingRecord) => {
    const inv = emptyInvoice();
    inv.customer_name = b.customer_name;
    inv.customer_phone = b.customer_phone;
    inv.event_type = b.event_type;
    inv.date = b.event_date || inv.date;
    inv.notes = b.event_location ? "Venue: " + b.event_location : "";
    if (b.services && b.services.length > 0) {
      inv.items = b.services.map((s, i) => ({ id: i + 1, description: s, qty: 1, rate: 0 }));
    }
    setInvoice(inv);
    setMode("create");
  };

  const prefillFromDailyLog = (log: DailyLogRecord) => {
    const inv = emptyInvoice();
    inv.customer_name = log.customer_name || "";
    inv.customer_phone = log.customer_phone || "";
    inv.date = log.date || inv.date;
    inv.items = [{ id: 1, description: log.title, qty: 1, rate: log.amount || 0 }];
    inv.notes = log.description || "";
    setInvoice(inv);
    setMode("create");
  };

  const editInvoice = (inv: Invoice) => {
    setInvoice({ ...inv, items: Array.isArray(inv.items) ? inv.items : [] });
    setMode("create");
  };

  const deleteInvoice = async (id: string) => {
    if (confirm("Delete this invoice?")) {
      await supabase.from("invoices").delete().eq("id", id);
      fetchInvoices();
    }
  };

  const filteredBookings = bookings.filter((b) => !sourceSearch || b.customer_name.toLowerCase().includes(sourceSearch.toLowerCase()) || b.customer_phone.includes(sourceSearch));
  const filteredLogs = dailyLogs.filter((l) => !sourceSearch || (l.customer_name || "").toLowerCase().includes(sourceSearch.toLowerCase()) || l.title.toLowerCase().includes(sourceSearch.toLowerCase()));

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">Invoices</h1>
        <div className="flex gap-2">
          {mode === "list" && (
            <>
              <button onClick={startFromSource} className="border border-primary text-primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-red-50 transition"><FiFileText className="w-4 h-4" /><span className="hidden sm:inline">From Record</span></button>
              <button onClick={newInvoice} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"><FiPlus className="w-4 h-4" /><span className="hidden sm:inline">New Invoice</span></button>
            </>
          )}
          {mode === "create" && <><button onClick={() => setMode("preview")} className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50">Preview</button><button onClick={handleSave} disabled={saving} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">{saving ? "Saving..." : "Save"}</button></>}
          {mode === "preview" && <><button onClick={() => setMode("create")} className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50">Edit</button><button onClick={handlePrint} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"><FiPrinter className="w-4 h-4" />Print</button></>}
          {mode !== "list" && <button onClick={() => setMode("list")} className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50 flex items-center gap-2"><FiList className="w-4 h-4" />All</button>}
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-4 sm:p-6">

        {/* Pick Source: select a booking or daily log to prefill */}
        {mode === "pick-source" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => setSourceTab("bookings")} className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (sourceTab === "bookings" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}>Bookings</button>
              <button onClick={() => setSourceTab("daily-log")} className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (sourceTab === "daily-log" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}>Daily Log (Events)</button>
            </div>
            <input type="text" placeholder="Search by name, phone, or title..." value={sourceSearch} onChange={(e) => setSourceSearch(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
            {loadingSource && <div className="flex items-center justify-center py-10"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>}

            {!loadingSource && sourceTab === "bookings" && (
              <div className="space-y-2">
                {filteredBookings.length === 0 && <p className="text-center text-gray-400 py-10 text-sm">No bookings found.</p>}
                {filteredBookings.map((b) => (
                  <button key={b.id} onClick={() => prefillFromBooking(b)} className="w-full text-left bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-primary hover:bg-red-50/30 transition">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-accent text-sm">{b.customer_name}</h3>
                        <p className="text-xs text-gray-500">{b.customer_phone} &middot; {b.event_type}</p>
                        <p className="text-xs text-gray-400">{b.event_date}{b.event_location ? " — " + b.event_location : ""}</p>
                      </div>
                      <span className="text-xs text-primary font-medium shrink-0">Use &rarr;</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!loadingSource && sourceTab === "daily-log" && (
              <div className="space-y-2">
                {filteredLogs.length === 0 && <p className="text-center text-gray-400 py-10 text-sm">No event logs found.</p>}
                {filteredLogs.map((l) => (
                  <button key={l.id} onClick={() => prefillFromDailyLog(l)} className="w-full text-left bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-primary hover:bg-red-50/30 transition">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-accent text-sm">{l.title}</h3>
                        <p className="text-xs text-gray-500">{l.customer_name || "—"} &middot; {l.date}</p>
                        {l.amount ? <p className="text-xs text-green-600 font-medium">&#8377;{l.amount.toLocaleString()}</p> : null}
                      </div>
                      <span className="text-xs text-primary font-medium shrink-0">Use &rarr;</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {mode === "list" && (
          <div className="space-y-3">
            {invoices.length === 0 && <div className="text-center py-20 text-gray-400"><p>No invoices yet. Create your first invoice!</p></div>}
            {invoices.map((inv) => (
              <div key={inv.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-accent text-sm">{inv.invoice_number}</h3>
                    <span className={"px-2 py-0.5 rounded-full text-xs font-medium " + (inv.status === "paid" ? "bg-green-100 text-green-700" : inv.status === "partial" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")}>{inv.status}</span>
                  </div>
                  <p className="text-xs text-gray-500">{inv.customer_name} &middot; {inv.date}</p>
                  {inv.event_type && <p className="text-xs text-gray-400">{inv.event_type}</p>}
                  <p className="text-sm font-bold text-accent mt-1">&#8377;{(inv.total || 0).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => editInvoice(inv)} className="text-xs text-primary font-medium hover:underline">Edit</button>
                  <button onClick={() => { editInvoice(inv); setTimeout(() => setMode("preview"), 100); }} className="text-xs text-gray-500 font-medium hover:underline">Print</button>
                  <button onClick={() => deleteInvoice(inv.id!)} className="p-1.5 text-gray-400 hover:text-red-500"><FiTrash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {mode === "create" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-accent mb-4">Invoice Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Invoice #</label><input type="text" value={invoice.invoice_number} onChange={(e) => setInvoice({...invoice, invoice_number: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" value={invoice.date} onChange={(e) => setInvoice({...invoice, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={invoice.status} onChange={(e) => setInvoice({...invoice, status: e.target.value as Invoice["status"]})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"><option value="unpaid">Unpaid</option><option value="partial">Partially Paid</option><option value="paid">Fully Paid</option></select></div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-accent mb-4">Customer</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" value={invoice.customer_name} onChange={(e) => setInvoice({...invoice, customer_name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Full name" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={invoice.customer_phone} onChange={(e) => setInvoice({...invoice, customer_phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={invoice.customer_email} onChange={(e) => setInvoice({...invoice, customer_email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <select value={invoice.event_type} onChange={(e) => setInvoice({...invoice, event_type: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none">
                    <option value="">Select event type</option>
                    {eventCategories.map((cat) => (
                      <optgroup key={cat.value} label={cat.label}>
                        {cat.subTypes.map((sub) => <option key={sub.value} value={sub.value}>{sub.label}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-accent">Items / Services</h3><button onClick={addItem} className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline"><FiPlus className="w-4 h-4" /> Add</button></div>
              <div className="space-y-3">{invoice.items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-12 sm:col-span-5">{index === 0 && <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>}<input type="text" value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g., Wedding Photography" /></div>
                  <div className="col-span-4 sm:col-span-2">{index === 0 && <label className="block text-xs font-medium text-gray-500 mb-1">Qty</label>}<input type="number" min="1" value={item.qty} onChange={(e) => updateItem(item.id, "qty", Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                  <div className="col-span-5 sm:col-span-3">{index === 0 && <label className="block text-xs font-medium text-gray-500 mb-1">Rate</label>}<input type="number" min="0" value={item.rate || ""} onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="0" /></div>
                  <div className="col-span-2 sm:col-span-1 text-right"><p className="text-sm font-medium py-2 hidden sm:block">&#8377;{(item.qty * item.rate).toLocaleString()}</p></div>
                  <div className="col-span-1"><button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500" disabled={invoice.items.length === 1}><FiTrash2 className="w-4 h-4" /></button></div>
                </div>
              ))}</div>
              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-semibold">&#8377;{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm items-center gap-3"><span className="text-gray-600">Advance Paid</span><input type="number" min="0" value={invoice.advance_paid || ""} onChange={(e) => setInvoice({...invoice, advance_paid: Number(e.target.value)})} className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-right focus:ring-2 focus:ring-primary outline-none" placeholder="0" /></div>
                <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2"><span>Balance Due</span><span className="text-primary">&#8377;{balanceDue.toLocaleString()}</span></div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"><h3 className="font-bold text-accent mb-3">Notes</h3><textarea rows={3} value={invoice.notes} onChange={(e) => setInvoice({...invoice, notes: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Payment terms, notes..." /></div>
          </div>
        )}

        {mode === "preview" && (
          <div>
            <div ref={printRef}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:30,paddingBottom:20,borderBottom:"3px solid #c8102e"}}>
                <div><div style={{fontSize:22,fontWeight:"bold",color:"#c8102e"}}>Prashanthi Digital Studio</div><div style={{fontSize:13,color:"#666"}}>& LED Walls</div><div style={{fontSize:11,color:"#888",marginTop:6,lineHeight:1.6}}>Nacharam, Hyderabad, Telangana<br/>Phone: +91 9948670396<br/>Email: prashanthistudio@gmail.com</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:24,fontWeight:"bold",color:"#1a1a2e"}}>INVOICE</div><div style={{fontSize:12,color:"#666",marginTop:4}}>#{invoice.invoice_number}<br/>Date: {new Date(invoice.date + "T00:00:00").toLocaleDateString("en-IN", {day:"numeric",month:"long",year:"numeric"})}</div><div style={{display:"inline-block",padding:"3px 12px",borderRadius:20,fontSize:11,fontWeight:"bold",marginTop:8,background:invoice.status==="paid"?"#dcfce7":invoice.status==="partial"?"#fef3c7":"#fee2e2",color:invoice.status==="paid"?"#166534":invoice.status==="partial"?"#92400e":"#991b1b"}}>{invoice.status === "paid" ? "PAID" : invoice.status === "partial" ? "PARTIALLY PAID" : "UNPAID"}</div></div>
              </div>
              <div style={{marginBottom:25}}><div style={{fontSize:10,fontWeight:"bold",color:"#999",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Bill To</div><div style={{fontWeight:"bold",color:"#1a1a2e",fontSize:15}}>{invoice.customer_name || "Customer Name"}</div>{invoice.customer_phone && <div style={{fontSize:12,color:"#666"}}>{invoice.customer_phone}</div>}{invoice.customer_email && <div style={{fontSize:12,color:"#666"}}>{invoice.customer_email}</div>}{invoice.event_type && <div style={{fontSize:12,color:"#888",marginTop:2}}>Event: {invoice.event_type}</div>}</div>
              <table style={{width:"100%",borderCollapse:"collapse",marginBottom:20}}><thead><tr style={{background:"#f8f8f8"}}><th style={{textAlign:"left",padding:"10px 12px",fontSize:11,color:"#666",fontWeight:600,borderBottom:"2px solid #eee"}}>#</th><th style={{textAlign:"left",padding:"10px 12px",fontSize:11,color:"#666",fontWeight:600,borderBottom:"2px solid #eee"}}>Description</th><th style={{textAlign:"center",padding:"10px 12px",fontSize:11,color:"#666",fontWeight:600,borderBottom:"2px solid #eee"}}>Qty</th><th style={{textAlign:"right",padding:"10px 12px",fontSize:11,color:"#666",fontWeight:600,borderBottom:"2px solid #eee"}}>Rate</th><th style={{textAlign:"right",padding:"10px 12px",fontSize:11,color:"#666",fontWeight:600,borderBottom:"2px solid #eee"}}>Amount</th></tr></thead><tbody>{invoice.items.map((item, idx) => <tr key={item.id}><td style={{padding:"10px 12px",borderBottom:"1px solid #f0f0f0",color:"#999"}}>{idx+1}</td><td style={{padding:"10px 12px",borderBottom:"1px solid #f0f0f0",fontWeight:500}}>{item.description || "\u2014"}</td><td style={{padding:"10px 12px",borderBottom:"1px solid #f0f0f0",textAlign:"center"}}>{item.qty}</td><td style={{padding:"10px 12px",borderBottom:"1px solid #f0f0f0",textAlign:"right"}}>&#8377;{item.rate.toLocaleString()}</td><td style={{padding:"10px 12px",borderBottom:"1px solid #f0f0f0",textAlign:"right",fontWeight:500}}>&#8377;{(item.qty*item.rate).toLocaleString()}</td></tr>)}</tbody></table>
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:25}}><div style={{width:250}}><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:13}}><span style={{color:"#666"}}>Subtotal</span><span style={{fontWeight:500}}>&#8377;{subtotal.toLocaleString()}</span></div>{invoice.advance_paid > 0 && <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:13,color:"#16a34a"}}><span>Advance Paid</span><span>- &#8377;{invoice.advance_paid.toLocaleString()}</span></div>}<div style={{display:"flex",justifyContent:"space-between",paddingTop:10,marginTop:6,borderTop:"2px solid #1a1a2e",fontSize:16,fontWeight:"bold"}}><span>Balance Due</span><span style={{color:"#c8102e"}}>&#8377;{balanceDue.toLocaleString()}</span></div></div></div>
              {invoice.notes && <div style={{background:"#f8f8f8",borderRadius:8,padding:15,marginBottom:25}}><div style={{fontSize:10,fontWeight:"bold",color:"#999",textTransform:"uppercase",marginBottom:4}}>Notes</div><p style={{fontSize:12,color:"#555"}}>{invoice.notes}</p></div>}
              <div style={{textAlign:"center",borderTop:"1px solid #eee",paddingTop:20,fontSize:11,color:"#aaa"}}><p>Thank you for choosing Prashanthi Digital Studio!</p><p style={{marginTop:4}}>Nacharam, Hyderabad | +91 9948670396 | prashanthistudio@gmail.com</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
