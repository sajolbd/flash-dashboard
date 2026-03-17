import { AdminLayoutShell, AdminPageHeader } from "@/components/admin-shell";

export default function ShippingPage() {
  return (
    <AdminLayoutShell>
      <AdminPageHeader title="Shipping Management" copy="Manage zones, fees, couriers, delivery estimates, and fulfillment rules." />
      <div className="admin-card mt-6 p-6">
        <p className="text-lg font-bold text-stone-900">Zone rates</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {["Dhaka City - ৳ 80", "Inside Dhaka - ৳ 120", "Outside Dhaka - ৳ 150"].map((zone) => (
            <div key={zone} className="rounded-2xl border border-black/5 px-4 py-5 text-sm">{zone}</div>
          ))}
        </div>
      </div>
    </AdminLayoutShell>
  );
}
