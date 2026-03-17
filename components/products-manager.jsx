"use client";

import { useEffect, useState } from "react";
import { getAdminToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://flash-wl58.onrender.com";

const initialForm = {
  name: "",
  slug: "",
  category: "",
  price: "",
  stock: ""
};

function getStatus(stock) {
  if (stock <= 20) {
    return "Low stock";
  }

  return "Active";
}

export function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/admin/products`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`
        }
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Failed to load products");
      }

      setProducts(payload.data);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/admin/products`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAdminToken()}`
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock)
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Failed to create product");
      }

      setProducts((current) => [payload.data, ...current]);
      setForm(initialForm);
      setOpen(false);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-card mt-6 p-6">
      <div className="mb-4 flex justify-end">
        <button
          className="rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          {open ? "Close Form" : "Add Product"}
        </button>
      </div>

      {open ? (
        <form onSubmit={handleSubmit} className="mb-6 rounded-3xl border border-black/5 bg-stone-50 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="rounded-2xl border border-black/10 px-4 py-3 outline-none"
              placeholder="Product name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
            <input
              className="rounded-2xl border border-black/10 px-4 py-3 outline-none"
              placeholder="Slug"
              value={form.slug}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  slug: event.target.value.toLowerCase().replace(/\s+/g, "-")
                }))
              }
            />
            <input
              className="rounded-2xl border border-black/10 px-4 py-3 outline-none"
              placeholder="Category"
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
            />
            <input
              className="rounded-2xl border border-black/10 px-4 py-3 outline-none"
              placeholder="Price"
              type="number"
              min="0"
              value={form.price}
              onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
            />
            <input
              className="rounded-2xl border border-black/10 px-4 py-3 outline-none"
              placeholder="Stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))}
            />
          </div>
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
          <div className="mt-5 flex gap-3">
            <button
              className="rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Saving..." : "Save Product"}
            </button>
            <button
              className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-stone-700"
              onClick={() => {
                setForm(initialForm);
                setOpen(false);
                setError("");
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {error && !open ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

      {loading ? (
        <p className="text-sm text-stone-500">Loading products...</p>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="rounded-2xl border border-black/5 px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-stone-900">{product.name}</p>
                  <p className="text-sm text-stone-500">
                    Stock {product.stock} | {getStatus(product.stock)} | {product.category}
                  </p>
                </div>
                <p className="font-semibold text-teal-700">Tk {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
