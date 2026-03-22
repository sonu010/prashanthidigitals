"use client";
import { useState, useEffect, useCallback } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiCalendar, FiFilter } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

type LogType = "event" | "walk-in" | "enquiry" | "expense" | "note";

interface LogEntry {
  id: string;
  date: string;
  type: LogType;
  title: string;
  description: string;
  amount?: number;
  customer_name?: string;
  customer_phone?: string;
}

const typeColors: Record<LogType, string> = {
  event: "bg-blue-100 text-blue-700",
  "walk-in": "bg-purple-100 text-purple-700",
  enquiry: "bg-yellow-100 text-yellow-700",
  expense: "bg-red-100 text-red-700",
  note: "bg-gray-100 text-gray-700",
};
const typeLabels: Record<LogType, string> = {
  event: "Event / Booking",
  "walk-in": "Walk-in",
  enquiry: "Enquiry",
  expense: "Expense",
  note: "Note",
};
const typeDescriptions: Record<LogType, string> = {
  event: "Photography job, wedding, function etc.",
  "walk-in": "Passport photo, prints, scanning, lamination, ID cards etc.",
  enquiry: "Customer asking about services, pricing, availability etc.",
  expense: "Studio rent, equipment, travel, supplies etc.",
  note: "General note or reminder",
};

const walkInPresets = [
  "Passport Size Photo",
  "Stamp Size Photo",
  "Photo Printout",
  "Document Scanning",
  "Lamination",
  "ID Card Photo",
  "Visa Photo",
  "Photo Restoration",
  "Photo Frame",
  "Flex / Banner Print",
  "Other",
];

export default function DailyLogPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const mkForm = () => ({
    date: new Date().toISOString().split("T")[0],
    type: "walk-in" as LogType,
    title: "",
    description: "",
    amount: undefined as number | undefined,
    customer_name: "",
    customer_phone: "",
  });
  const [form, setForm] = useState(mkForm());

  const fetchLogs = useCallback(async () => {
    const { data } = await supabase
      .from("daily_logs")
      .select("*")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });
    if (data) setLogs(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const filtered = logs.filter(
    (l) =>
      (filterType === "all" || l.type === filterType) &&
      (!filterDate || l.date === filterDate)
  );

  const grouped = filtered.reduce((g, l) => {
    (g[l.date] = g[l.date] || []).push(l);
    return g;
  }, {} as Record<string, LogEntry[]>);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const row = {
      date: form.date,
      type: form.type,
      title: form.title,
      description: form.description,
      amount: form.amount || null,
      customer_name: form.customer_name || null,
      customer_phone: form.customer_phone || null,
    };
    if (editingId) {
      await supabase.from("daily_logs").update(row).eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("daily_logs").insert(row);
    }
    setForm(mkForm());
    setShowForm(false);
    setSaving(false);
    fetchLogs();
  };

  const handleEdit = (log: LogEntry) => {
    setForm({
      date: log.date,
      type: log.type as LogType,
      title: log.title,
      description: log.description,
      amount: log.amount,
      customer_name: log.customer_name || "",
      customer_phone: log.customer_phone || "",
    });
    setEditingId(log.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this entry?")) {
      await supabase.from("daily_logs").delete().eq("id", id);
      fetchLogs();
    }
  };

  /* Count entries per type for the current filter */
  const entryCounts = filtered.reduce((c, l) => {
    c[l.type] = (c[l.type] || 0) + 1;
    return c;
  }, {} as Record<string, number>);

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">Daily Log</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setForm(mkForm());
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"
        >
          <FiPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Entry</span>
        </button>
      </header>

      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Summary chips — show count of each type for current filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(Object.keys(typeLabels) as LogType[]).map((t) => (
            <span key={t} className={"px-3 py-1 rounded-full text-xs font-medium " + typeColors[t]}>
              {typeLabels[t]}: {entryCounts[t] || 0}
            </span>
          ))}
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            Total: {filtered.length}
          </span>
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
              <option value="event">Events / Bookings</option>
              <option value="walk-in">Walk-ins</option>
              <option value="enquiry">Enquiries</option>
              <option value="expense">Expenses</option>
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
                x
              </button>
            )}
          </div>
        </div>

        {/* Add / Edit form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
            <h3 className="font-bold text-accent mb-4">
              {editingId ? "Edit Entry" : "New Log Entry"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    required
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as LogType })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  >
                    {(Object.keys(typeLabels) as LogType[]).map((t) => (
                      <option key={t} value={t}>{typeLabels[t]}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">{typeDescriptions[form.type]}</p>
                </div>
              </div>

              {/* Quick-fill for walk-in titles */}
              {form.type === "walk-in" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quick Select</label>
                  <div className="flex flex-wrap gap-2">
                    {walkInPresets.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setForm({ ...form, title: p })}
                        className={
                          "px-3 py-1 rounded-full text-xs font-medium border transition " +
                          (form.title === p
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100")
                        }
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  placeholder={
                    form.type === "walk-in"
                      ? "e.g., Passport Size Photo"
                      : form.type === "enquiry"
                      ? "e.g., Wedding photography enquiry"
                      : form.type === "event"
                      ? "e.g., Wedding Photography - Ramesh"
                      : form.type === "expense"
                      ? "e.g., Camera lens repair"
                      : "e.g., Studio closed for holiday"
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {form.type === "enquiry" ? "Enquiry Details" : "Description"}
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                  placeholder={
                    form.type === "enquiry"
                      ? "What did they ask about? Budget? Date? Location? Follow-up needed?"
                      : "Details..."
                  }
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {form.type !== "note" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {form.type === "enquiry" ? "Est. Budget" : "Amount"}
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
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                  <input
                    type="text"
                    value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={form.customer_phone}
                    onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingId ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="px-6 py-2.5 text-sm text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Entries grouped by date */}
        {dates.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">&#128210;</p>
            <p>No log entries yet. Click &quot;Add Entry&quot; to start.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {dates.map((date) => (
              <div key={date}>
                <h3 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  {new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  <span className="text-xs font-normal text-gray-400">
                    ({grouped[date].length} {grouped[date].length === 1 ? "entry" : "entries"})
                  </span>
                </h3>
                <div className="space-y-3">
                  {grouped[date].map((log) => (
                    <div
                      key={log.id}
                      className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span
                              className={
                                "px-2 py-0.5 rounded-full text-xs font-medium " +
                                (typeColors[log.type as LogType] || "bg-gray-100 text-gray-700")
                              }
                            >
                              {typeLabels[log.type as LogType] || log.type}
                            </span>
                            {log.amount !== undefined &&
                              log.amount !== null &&
                              log.amount > 0 && (
                                <span
                                  className={
                                    "text-sm font-bold " +
                                    (log.type === "expense"
                                      ? "text-red-600"
                                      : "text-green-600")
                                  }
                                >
                                  {log.type === "expense" ? "-" : ""}&#8377;
                                  {log.amount.toLocaleString()}
                                </span>
                              )}
                          </div>
                          <h4 className="font-semibold text-accent text-sm">{log.title}</h4>
                          {log.description && (
                            <p className="text-gray-500 text-xs mt-1">{log.description}</p>
                          )}
                          {log.customer_name && (
                            <p className="text-xs text-gray-400 mt-1">
                              Customer: {log.customer_name}
                              {log.customer_phone && " — " + log.customer_phone}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button
                            onClick={() => handleEdit(log)}
                            className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg"
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
