import { AdminLayoutShell, AdminPageHeader } from "@/components/admin-shell";
import { ProductsManager } from "@/components/products-manager";

export default function ProductsAdminPage() {
  return (
    <AdminLayoutShell>
      <AdminPageHeader
        title="Product Management"
        copy="Add, edit, delete, categorize, price, and track inventory from here."
      />
      <ProductsManager />
    </AdminLayoutShell>
  );
}
