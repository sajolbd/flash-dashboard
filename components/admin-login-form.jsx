"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAdminToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://flash-wl58.onrender.com";

export function AdminLoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "admin@flash.local",
    password: "Admin@123"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Login failed");
      }

      if (payload.data.user.role !== "admin") {
        throw new Error("This account does not have admin access");
      }

      setAdminToken(payload.data.token);
      document.cookie = `admin_token=${payload.data.token}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
      router.push("/");
      router.refresh();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card mx-auto max-w-md p-8">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-teal-700">Admin Access</p>
      <h1 className="mt-3 text-3xl font-bold text-stone-900">Dashboard login</h1>
      <p className="mt-3 text-sm leading-7 text-stone-600">
        Sign in with an admin account to access products, orders, users, coupons, and shipping controls.
      </p>
      <div className="mt-6 space-y-4">
        <input
          className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
          placeholder="Admin email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
        />
        <input
          className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
        />
      </div>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      <button
        className="mt-6 w-full rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "Signing in..." : "Login to Dashboard"}
      </button>
      <p className="mt-4 text-xs text-stone-500">Default admin: admin@flash.local / Admin@123</p>
    </form>
  );
}
