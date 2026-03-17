import { AdminLayoutShell, AdminPageHeader } from "@/components/admin-shell";
import { productRows, statCards } from "@/lib/admin-data";

export default function DashboardHome() {
  return (
    <AdminLayoutShell>
      <AdminPageHeader
        title="Dashboard"
        copy="Monitor sales, users, orders, inventory, coupon performance, and content operations from a separate admin application."
      />
      <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="admin-card p-6">
            <p className="text-sm text-stone-500">{card.label}</p>
            <p className="mt-3 text-3xl font-bold text-stone-900">{card.value}</p>
          </div>
        ))}
      </section>
      <section className="admin-card mt-6 p-6">
        <p className="text-xl font-bold text-stone-900">Inventory snapshot</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-stone-500">
              <tr>
                <th className="pb-3">Product</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {productRows.map((row) => (
                <tr key={row.name} className="border-t border-black/5">
                  <td className="py-4 font-semibold text-stone-900">{row.name}</td>
                  <td>{row.stock}</td>
                  <td>{row.price}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayoutShell>
  );
}
