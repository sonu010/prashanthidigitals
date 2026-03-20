"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiCalendar,
  FiFilter,
} from "react-icons/fi";

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

const demoLogs: LogEntry[] = [
  {
    id: 1,
    date: "2026-03-20",
    type: "event",
    title: "Wedding Photography - Ramesh Reddy",
    description: "Full day wedding coverage at Golconda Resorts. 2 photographers + 1 videographer. Collected advance.",
    amount: 15000,
    customerName: "Ramesh Reddy",
    customerPhone: "+91 98765 11111",
  },
  {
    id: 2,
    date: "2026-03-20",
    type: "income",
    title: "LED Wall Advance - Corporate Event",
    description: "Received 50% advance for LED wall rental on April 2. 2 screens booked.",
    amount: 8000,
    customerName: "Sunil Kumar",
  },
  {
    id: 3,
    date: "2026-03-19",
    type: "expense",
    title: "Camera Battery Purchase",
    description: "Bought 2 spare batteries for Canon R6 from Amazon.",
    amount: 3500,
  },
  {
    id: 4,
    date: "2026-03-19",
    type: "enquiry",
    title: "Pre-Wedding Enquiry - WhatsApp",
    description: "Couple from Secunderabad enquired about pre-wedding shoot locations. Sent package details.",
    customerName: "Arun & Divya",
    customerPhone: "+91 98765 55555",
  },
  {
    id: 5,
    date: "2026-03-18",
    type: "note",
    title: "Studio Maintenance",
    description: "Backdrop replaced. New white seamless backdrop installed. Old one was torn.",
  },
  {
    id: 6,
    date: "2026-03-18",
    type: "income",
    title: "Birthday Shoot Full Payment",
    description: "Delivered 150 edited photos. Full payment received for birthday photography.",
    amount: 5000,
    customerName: "Lakshmi Devi",
  },
  {
    id: 7,
    date: "2026-03-17",
    type: "expense",
    title: "Petrol for LED Wall Transport",
    description: "Travelled to Shamshabad for LED wall setup. Petrol + toll charges.",
    amount: 1200,
  },
];

const typeColors: Record<string, string> = {
  event: "bg-blue-100 text-blue-700",
  enquiry: "bg-yellow-100 text-yellow-700",
  expense: "bg-red-100 text-red-700",
  income: "bg-green-100 text-green-700",
  note: "bg-gray-100 text-gray-700",
};

const typeLabels: Record<string, string> = {
  event: "📸 Event",
  enquiry: "📞 Enquiry",
  expense: "💸 Expense",
  income: "💰 Income",
  note: "📝 Note",
};

export default function DailyLogPage() {
  const [logs, setLogs] = useState<LogEntry[]>(demoLogs);
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<LogEntry, "id">>({
    date: new Date().toISOString().split("T")[0],
    type: "event",
    title: "",
    description: "",
    amount: undefined,
    customerName: "",
    customerPhone: "",
  });

  const filteredLogs = logs.filter((log) => {
    if (filterType !== "all" && log.type !== filterType) return false;
    if (filterDate && log.date !== filterDate) return false;
    return true;
  });

  // Group by date
  const groupedLogs = filteredLogs.reduce((groups, log) => {
    const date = log.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(log);
    return groups;
  }, {} as Record<string, LogEntry[]>);

  const sortedDates = Object.keys(groupedLogs).sort((a, b) => b.localeCompare(a));

  // Totals
  const totalIncome = filteredLogs
    .filter((l) => l.type === "income" || l.type === "event")
    .reduce((sum, l) => sum + (l.amount || 0), 0);
  const totalExpense = filteredLogs
    .filter((l) => l.type === "expense")
    .reduce((sum, l) => sum + (l.amount || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setLogs((prev) =>
        prev.map((l) => (l.id === editingId ? { ...form, id: editingId } : l))
      );
      setEditingId(null);
    } else {
      setLogs((prev) => [{ ...form, id: Date.now() }, ...prev]);
    }
    setForm({
      date: new Date().toISOString().split("T")[0],
      type: "event",
      title: "",
      description: "",
      amount: undefined,
      customerName: "",
      customerPhone: "",
    });
    setShowForm(false);
  };

  const handleEdit = (log: LogEntry) => {
    setForm({
      date: log.date,
      type: log.type,
      title: log.title,
      description: log.description,
      amount: log.amount,
      customerName: log.customerName || "",
      customerPhone: log.customerPhone || "",
    });
    setEditingId(log.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this log entry?")) {
      setLogs((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">📒 Daily Log / Audit</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setForm({
              date: new Date().toISOString().split("T")[0],
              type: "event",
              title: "",
              description: "",
              amount: undefined,
              customerName: "",
              customerPhone: "",
            });
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"
        >
          <FiPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Entry</span>
        </button>
      </header>

      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-xs text-green-600 font-medium">Income</p>
            <p className="text-xl font-bold text-green-700">₹{totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-xs text-red-600 font-medium">Expenses</p>
            <p className="text-xl font-bold text-red-700">₹{totalExpense.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs text-blue-600 font-medium">Net</p>
            <p className="text-xl font-bold text-blue-700">
              ₹{(totalIncome - totalExpense).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2">
            <FiFilter className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm outline-none bg-transparent"
            >
              <option value="all">All Types</option>
              <option value="event">Events</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
              <option value="enquiry">Enquiries</option>
              <option value="note">Notes</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2">
            <FiCalendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="text-sm outline-none bg-transparent"
            />
            {filterDate && (
              <button
                onClick={() => setFilterDate("")}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
            <h3 className="font-bold text-accent mb-4">
              {editingId !== null ? "Edit Entry" : "New Log Entry"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    required
                    value={form.type}
                    onChange={(e) =>
                      setForm({ ...form, type: e.target.value as LogEntry["type"] })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="event">📸 Event / Work Done</option>
                    <option value="income">💰 Income / Payment Received</option>
                    <option value="expense">💸 Expense</option>
                    <option value="enquiry">📞 Enquiry</option>
                    <option value="note">📝 Note / Reminder</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g., Wedding Photography - Client Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                  placeholder="Add details about the work, payment, or expense..."
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={form.amount || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        amount: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) =>
                      setForm({ ...form, customerName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Phone
                  </label>
                  <input
                    type="tel"
                    value={form.customerPhone}
                    onChange={(e) =>
                      setForm({ ...form, customerPhone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition"
                >
                  {editingId !== null ? "Update Entry" : "Save Entry"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="px-6 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Log Entries grouped by date */}
        {sortedDates.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">📒</p>
            <p>No log entries found. Click &quot;Add Entry&quot; to start.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((date) => (
              <div key={date}>
                <h3 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  {new Date(date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <div className="space-y-3">
                  {groupedLogs[date].map((log) => (
                    <div
                      key={log.id}
                      className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                typeColors[log.type]
                              }`}
                            >
                              {typeLabels[log.type]}
                            </span>
                            {log.amount && (
                              <span
                                className={`text-sm font-bold ${
                                  log.type === "expense"
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                {log.type === "expense" ? "-" : "+"}₹
                                {log.amount.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <h4 className="font-semibold text-accent text-sm">
                            {log.title}
                          </h4>
                          {log.description && (
                            <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                              {log.description}
                            </p>
                          )}
                          {log.customerName && (
                            <p className="text-xs text-gray-400 mt-1">
                              👤 {log.customerName}
                              {log.customerPhone && ` • ${log.customerPhone}`}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button
                            onClick={() => handleEdit(log)}
                            className="p-1.5 text-gray-400 hover:text-primary hover:bg-red-50 rounded-lg"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(log.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
