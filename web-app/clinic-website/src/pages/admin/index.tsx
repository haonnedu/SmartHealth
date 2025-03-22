import AdminLayout from "@/layouts/AdminLayout";

export default function AdminHome() {
  return <div>Welcome to Admin Dashboard</div>;
}

AdminHome.getLayout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);
