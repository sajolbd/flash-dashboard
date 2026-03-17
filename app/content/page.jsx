import { AdminLayoutShell, AdminPageHeader } from "@/components/admin-shell";

export default function ContentPage() {
  return (
    <AdminLayoutShell>
      <AdminPageHeader title="Content Management" copy="Control homepage sections, banners, policy pages, FAQ, and support copy from the CMS area." />
      <div className="admin-card mt-6 p-6">
        <p className="text-lg font-bold text-stone-900">CMS modules</p>
        <div className="mt-4 space-y-3 text-sm">
          {["Homepage hero", "Featured categories", "Footer links", "Policy pages"].map((item) => (
            <div key={item} className="rounded-2xl border border-black/5 px-4 py-4">{item}</div>
          ))}
        </div>
      </div>
    </AdminLayoutShell>
  );
}
