import { AdminLayoutShell, AdminPageHeader } from "@/components/admin-shell";

export default function CouponsPage() {
  return (
    <AdminLayoutShell>
      <AdminPageHeader title="Coupon Management" copy="Create promo codes, spending rules, product restrictions, expiry windows, and campaign tracking." />
      <div className="admin-card mt-6 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {["FLASH50", "WELCOME10", "RAMADAN25"].map((code) => (
            <div key={code} className="rounded-2xl border border-black/5 px-4 py-5">
              <p className="font-bold text-stone-900">{code}</p>
              <p className="mt-2 text-sm text-stone-500">Active campaign</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayoutShell>
  );
}
