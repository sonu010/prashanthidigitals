"use client";
import { useState, useEffect, useCallback } from "react";
import { FiPhone, FiCalendar, FiCheck, FiTrash2, FiMessageCircle, FiClock } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

interface Enquiry {
  id: string;
  name: string;
  phone: string | null;
  event_type: string | null;
  event_date: string | null;
  message: string | null;
  status: "new" | "contacted" | "converted" | "closed";
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-yellow-100 text-yellow-700",
  contacted: "bg-blue-100 text-blue-700",
  converted: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchEnquiries = useCallback(async () => {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (data) setEnquiries(data);
    if (error) console.error("Fetch enquiries error:", error.message);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
    if (!error) fetchEnquiries();
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (!error) fetchEnquiries();
  };

  const filtered = filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter);
  const newCount = enquiries.filter((e) => e.status === "new").length;

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-accent">Enquiries</h1>
          {newCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
              {newCount} new
            </span>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {["all", "new", "contacted", "converted", "closed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition whitespace-nowrap ${
                filter === s
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {s === "all" ? "All" : s}
              {s === "new" && newCount > 0 && (
                <span className="ml-1.5 bg-white/30 text-white px-1.5 py-0.5 rounded-full text-xs">
                  {newCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Enquiry cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FiMessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No enquiries yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((enq) => (
              <div
                key={enq.id}
                className={`bg-white rounded-xl border p-4 shadow-sm ${
                  enq.status === "new" ? "border-yellow-300 ring-1 ring-yellow-200" : "border-gray-100"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-semibold text-accent">{enq.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[enq.status]}`}>
                        {enq.status}
                      </span>
                      {enq.event_type && (
                        <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
                          {enq.event_type}
                        </span>
                      )}
                    </div>
                    {enq.phone && (
                      <a href={`tel:${enq.phone}`} className="text-sm text-blue-600 flex items-center gap-1 mb-1">
                        <FiPhone className="w-3.5 h-3.5" /> {enq.phone}
                      </a>
                    )}
                    {enq.event_date && (
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                        <FiCalendar className="w-3.5 h-3.5" />
                        {new Date(enq.event_date + "T00:00:00").toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                    {enq.message && <p className="text-sm text-gray-600 mt-1">{enq.message}</p>}
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <FiClock className="w-3 h-3" />
                      {new Date(enq.created_at).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 shrink-0">
                    {enq.status === "new" && (
                      <button
                        onClick={() => updateStatus(enq.id, "contacted")}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg text-xs flex items-center gap-1"
                        title="Mark as Contacted"
                      >
                        <FiPhone className="w-4 h-4" />
                      </button>
                    )}
                    {(enq.status === "new" || enq.status === "contacted") && (
                      <button
                        onClick={() => updateStatus(enq.id, "converted")}
                        className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg text-xs"
                        title="Mark as Converted"
                      >
                        <FiCheck className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteEnquiry(enq.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
