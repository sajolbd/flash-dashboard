import { AdminLayoutShell, AdminPageHeader } from "@/components/admin-shell";

export default function UsersPage() {
  return (
    <AdminLayoutShell>
      <AdminPageHeader title="User Management" copy="View customers, roles, activity, status flags, addresses, and purchase history." />
      <div className="admin-card mt-6 p-6">
        <p className="text-lg font-bold text-stone-900">User overview</p>
        <p className="mt-3 text-sm text-stone-600">Connect this page to the backend user service for moderation and CRM workflows.</p>
      </div>
    </AdminLayoutShell>
  );
}
