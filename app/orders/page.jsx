import { AdminLayoutShell, AdminPageHeader } from "@/components/admin-shell";

export default function OrdersPage() {
  return (
    <AdminLayoutShell>
      <AdminPageHeader title="Order Management" copy="Track order states, payment status, packing, dispatch, returns, and customer communication." />
      <div className="admin-card mt-6 p-6">
        <p className="text-lg font-bold text-stone-900">Recent orders</p>
        <div className="mt-4 space-y-3 text-sm">
          {["#10231 Paid", "#10232 Packing", "#10233 Out for delivery"].map((item) => (
            <div key={item} className="rounded-2xl border border-black/5 px-4 py-4">{item}</div>
          ))}
        </div>
      </div>
    </AdminLayoutShell>
  );
}
