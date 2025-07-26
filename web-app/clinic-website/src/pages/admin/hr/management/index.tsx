import AdminHrManagementComponent from "@/components/admin/hr/management/hr-management.component";
import AdminLayout from "@/layouts/AdminLayout";

export default function AdminHrManagement() {
  return (
    <>
      <AdminHrManagementComponent />
    </>
  );
}

AdminHrManagement.getLayout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);
