"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiCalendar, FiFilter } from "react-icons/fi";

interface LogEntry {
  id: number;
  date: string;
  type: "event" | "enquiry" | "expense" | "income" | "note";
  title: string;
  description: string;
  amount?: number;
  customerName?: string;
  customerPhone?: string;
}

const STORAGE_KEY = "prashanthi_daily_logs";
const typeColors: Record<string, string> = { event: "bg-blue-100 text-blue-700", enquiry: "bg-yellow-100 text-yellow-700", expense: "bg-red-100 text-red-700", income: "bg-green-100 text-green-700", note: "bg-gray-100 text-gray-700" };
const typeLabels: Record<string, string> = { event: "Event", enquiry: "Enquiry", expense: "Expense", income: "Income", note: "Note" };

export default function DailyLogPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const mkForm = () => ({ date: new Date().toISOString().split("T")[0], type: "event" as LogEntry["type"], title: "", description: "", amount: undefined as number | undefined, customerName: "", customerPhone: "" });
  const [form, setForm] = useState(mkForm());

  useEffect(() => { try { const s = localStorage.getItem(STORAGE_KEY); if (s) setLogs(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(logs)); }, [logs]);

  const filtered = logs.filter((l) => (filterType === "all" || l.type === filterType) && (!filterDate || l.date === filterDate));
  const grouped = filtered.reduce((g, l) => { (g[l.date] = g[l.date] || []).push(l); return g; }, {} as Record<string, LogEntry[]>);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const totalIncome = filtered.filter((l) => l.type === "income" || l.type === "event").reduce((s, l) => s + (l.amount || 0), 0);
  const totalExpense = filtered.filter((l) => l.type === "expense").reduce((s, l) => s + (l.amount || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) { setLogs((p) => p.map((l) => l.id === editingId ? { ...form, id: editingId } : l)); setEditingId(null); }
    else { setLogs((p) => [{ ...form, id: Date.now() }, ...p]); }
    setForm(mkForm()); setShowForm(false);
  };
  const handleEdit = (log: LogEntry) => { setForm({ date: log.date, type: log.type, title: log.title, description: log.description, amount: log.amount, customerName: log.customerName || "", customerPhone: log.customerPhone || "" }); setEditingId(log.id); setShowForm(true); };
  const handleDelete = (id: number) => { if (confirm("Delete this entry?")) setLogs((p) => p.filter((l) => l.id !== id)); };

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">Daily Log / Audit</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(mkForm()); }} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition">
          <FiPlus className="w-4 h-4" /><span className="hidden sm:inline">Add Entry</span>
        </button>
      </header>
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4"><p className="text-xs text-green-600 font-medium">Income</p><p className="text-lg font-bold text-green-700">&#8377;{totalIncome.toLocaleString()}</p></div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4"><p className="text-xs text-red-600 font-medium">Expenses</p><p className="text-lg font-bold text-red-700">&#8377;{totalExpense.toLocaleString()}</p></div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4"><p className="text-xs text-blue-600 font-medium">Net</p><p className="text-lg font-bold text-blue-700">&#8377;{(totalIncome - totalExpense).toLocaleString()}</p></div>
        </div>
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2"><FiFilter className="w-4 h-4 text-gray-400" /><select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="text-sm outline-none bg-transparent"><option value="all">All Types</option><option value="event">Events</option><option value="income">Income</option><option value="expense">Expenses</option><option value="enquiry">Enquiries</option><option value="note">Notes</option></select></div>
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2"><FiCalendar className="w-4 h-4 text-gray-400" /><input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="text-sm outline-none bg-transparent" />{filterDate && <button onClick={() => setFilterDate("")} className="text-xs text-gray-400 hover:text-red-500">x</button>}</div>
        </div>
        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
            <h3 className="font-bold text-accent mb-4">{editingId !== null ? "Edit Entry" : "New Log Entry"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date *</label><input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Type *</label><select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as LogEntry["type"] })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"><option value="event">Event</option><option value="income">Income</option><option value="expense">Expense</option><option value="enquiry">Enquiry</option><option value="note">Note</option></select></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g., Wedding Photography" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Details..." /></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount</label><input type="number" value={form.amount || ""} onChange={(e) => setForm({ ...form, amount: e.target.value ? Number(e.target.value) : undefined })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="0" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer</label><input type="text" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" /></div>
              </div>
              <div className="flex gap-3"><button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm">{editingId !== null ? "Update" : "Save"}</button><button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-6 py-2.5 text-sm text-gray-600">Cancel</button></div>
            </form>
          </div>
        )}
        {/* Entries */}
        {dates.length === 0 ? (
          <div className="text-center py-20 text-gray-400"><p className="text-4xl mb-3">&#128210;</p><p>No log entries yet. Click &quot;Add Entry&quot; to start.</p></div>
        ) : (
          <div className="space-y-6">{dates.map((date) => (
            <div key={date}>
              <h3 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2"><FiCalendar className="w-4 h-4" />{new Date(date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</h3>
              <div className="space-y-3">{grouped[date].map((log) => (
                <div key={log.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={"px-2 py-0.5 rounded-full text-xs font-medium " + typeColors[log.type]}>{typeLabels[log.type]}</span>
                        {log.amount !== undefined && log.amount > 0 && <span className={"text-sm font-bold " + (log.type === "expense" ? "text-red-600" : "text-green-600")}>{log.type === "expense" ? "-" : "+"}&#8377;{log.amount.toLocaleString()}</span>}
                      </div>
                      <h4 className="font-semibold text-accent text-sm">{log.title}</h4>
                      {log.description && <p className="text-gray-500 text-xs mt-1">{log.description}</p>}
                      {log.customerName && <p className="text-xs text-gray-400 mt-1">Customer: {log.customerName}{log.customerPhone && " - " + log.customerPhone}</p>}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => handleEdit(log)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg"><FiEdit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(log.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><FiTrash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}</div>
            </div>
          ))}</div>
        )}
      </div>
    </div>
  );
}
