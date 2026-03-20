"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { FiArrowLeft, FiPlus, FiTrash2, FiPrinter, FiDownload } from "react-icons/fi";

interface InvoiceItem {
  id: number;
  description: string;
  qty: number;
  rate: number;
}

interface Invoice {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  items: InvoiceItem[];
  notes: string;
  paymentStatus: "unpaid" | "partial" | "paid";
  advancePaid: number;
}

export default function InvoicesPage() {
  const printRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [invoice, setInvoice] = useState<Invoice>({
    invoiceNumber: `PS-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split("T")[0],
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    items: [{ id: 1, description: "", qty: 1, rate: 0 }],
    notes: "",
    paymentStatus: "unpaid",
    advancePaid: 0,
  });

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), description: "", qty: 1, rate: 0 },
      ],
    }));
  };

  const removeItem = (id: number) => {
    if (invoice.items.length === 1) return;
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== id),
    }));
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.qty * item.rate,
    0
  );
  const balanceDue = subtotal - invoice.advancePaid;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30 no-print">
        <h1 className="text-lg font-bold text-accent">🧾 Invoice Generator</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition"
          >
            {showPreview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={handlePrint}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"
          >
            <FiPrinter className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {!showPreview ? (
          /* EDIT MODE */
          <div className="space-y-6">
            {/* Invoice Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-accent mb-4">Invoice Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice #
                  </label>
                  <input
                    type="text"
                    value={invoice.invoiceNumber}
                    onChange={(e) =>
                      setInvoice({ ...invoice, invoiceNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={invoice.date}
                    onChange={(e) =>
                      setInvoice({ ...invoice, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    value={invoice.paymentStatus}
                    onChange={(e) =>
                      setInvoice({
                        ...invoice,
                        paymentStatus: e.target.value as Invoice["paymentStatus"],
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="partial">Partially Paid</option>
                    <option value="paid">Fully Paid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-accent mb-4">Customer Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    value={invoice.customerName}
                    onChange={(e) =>
                      setInvoice({ ...invoice, customerName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={invoice.customerPhone}
                    onChange={(e) =>
                      setInvoice({ ...invoice, customerPhone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="+91 9948670396"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={invoice.customerEmail}
                    onChange={(e) =>
                      setInvoice({ ...invoice, customerEmail: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={invoice.customerAddress}
                    onChange={(e) =>
                      setInvoice({ ...invoice, customerAddress: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="City, Area"
                  />
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-accent">Items / Services</h3>
                <button
                  onClick={addItem}
                  className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline"
                >
                  <FiPlus className="w-4 h-4" /> Add Item
                </button>
              </div>
              <div className="space-y-3">
                {invoice.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 items-end"
                  >
                    <div className="col-span-12 sm:col-span-5">
                      {index === 0 && (
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Description
                        </label>
                      )}
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                        placeholder="e.g., Wedding Photography - Full Day"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      {index === 0 && (
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Qty
                        </label>
                      )}
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) =>
                          updateItem(item.id, "qty", Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div className="col-span-5 sm:col-span-3">
                      {index === 0 && (
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Rate (₹)
                        </label>
                      )}
                      <input
                        type="number"
                        min="0"
                        value={item.rate || ""}
                        onChange={(e) =>
                          updateItem(item.id, "rate", Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1 text-right sm:text-center">
                      {index === 0 && (
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          &nbsp;
                        </label>
                      )}
                      <p className="text-sm font-medium py-2 hidden sm:block">
                        ₹{(item.qty * item.rate).toLocaleString()}
                      </p>
                    </div>
                    <div className="col-span-1">
                      {index === 0 && (
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          &nbsp;
                        </label>
                      )}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                        disabled={invoice.items.length === 1}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm items-center gap-3">
                  <span className="text-gray-600">Advance Paid</span>
                  <input
                    type="number"
                    min="0"
                    value={invoice.advancePaid || ""}
                    onChange={(e) =>
                      setInvoice({
                        ...invoice,
                        advancePaid: Number(e.target.value),
                      })
                    }
                    className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-right focus:ring-2 focus:ring-primary outline-none"
                    placeholder="0"
                  />
                </div>
                <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2">
                  <span>Balance Due</span>
                  <span className="text-primary">₹{balanceDue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-accent mb-3">Notes</h3>
              <textarea
                rows={3}
                value={invoice.notes}
                onChange={(e) =>
                  setInvoice({ ...invoice, notes: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                placeholder="Payment terms, special notes, etc."
              />
            </div>

            <button
              onClick={() => setShowPreview(true)}
              className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition"
            >
              Preview Invoice
            </button>
          </div>
        ) : (
          /* PREVIEW MODE — Printable Invoice */
          <div ref={printRef} className="bg-white rounded-xl shadow-sm p-6 sm:p-10 border border-gray-200 print:shadow-none print:border-none">
            {/* Invoice Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 pb-6 border-b-2 border-primary">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  Prashanthi Digital Studio
                </h2>
                <p className="text-sm text-gray-500">
                  & LED Walls
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Nacharam, Hyderabad, Telangana
                  <br />
                  Phone: +91 9948670396
                  <br />
                  Email: prashanthistudio@gmail.com
                </p>
              </div>
              <div className="text-left sm:text-right">
                <h3 className="text-xl font-bold text-accent">INVOICE</h3>
                <p className="text-sm text-gray-500">#{invoice.invoiceNumber}</p>
                <p className="text-sm text-gray-500">
                  Date:{" "}
                  {new Date(invoice.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                    invoice.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : invoice.paymentStatus === "partial"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {invoice.paymentStatus === "paid"
                    ? "PAID"
                    : invoice.paymentStatus === "partial"
                    ? "PARTIALLY PAID"
                    : "UNPAID"}
                </span>
              </div>
            </div>

            {/* Bill To */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                Bill To
              </p>
              <p className="font-bold text-accent">
                {invoice.customerName || "Customer Name"}
              </p>
              {invoice.customerPhone && (
                <p className="text-sm text-gray-500">{invoice.customerPhone}</p>
              )}
              {invoice.customerEmail && (
                <p className="text-sm text-gray-500">{invoice.customerEmail}</p>
              )}
              {invoice.customerAddress && (
                <p className="text-sm text-gray-500">{invoice.customerAddress}</p>
              )}
            </div>

            {/* Items Table */}
            <table className="w-full text-sm mb-6">
              <thead>
                <tr className="bg-gray-50 text-gray-500">
                  <th className="text-left px-4 py-2 font-medium">#</th>
                  <th className="text-left px-4 py-2 font-medium">Description</th>
                  <th className="text-center px-4 py-2 font-medium">Qty</th>
                  <th className="text-right px-4 py-2 font-medium">Rate</th>
                  <th className="text-right px-4 py-2 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoice.items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-accent">
                      {item.description || "—"}
                    </td>
                    <td className="px-4 py-3 text-center">{item.qty}</td>
                    <td className="px-4 py-3 text-right">
                      ₹{item.rate.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      ₹{(item.qty * item.rate).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                {invoice.advancePaid > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Advance Paid</span>
                    <span>- ₹{invoice.advancePaid.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Balance Due</span>
                  <span className="text-primary">₹{balanceDue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                  Notes
                </p>
                <p className="text-sm text-gray-600">{invoice.notes}</p>
              </div>
            )}

            {/* Footer */}
            <div className="text-center border-t border-gray-200 pt-6 text-xs text-gray-400">
              <p>Thank you for choosing Prashanthi Digital Studio!</p>
              <p className="mt-1">
                Nacharam, Hyderabad | +91 9948670396 | prashanthistudio@gmail.com
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
