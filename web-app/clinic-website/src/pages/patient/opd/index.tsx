import AdminLayout from "@/layouts/AdminLayout";

export default function OutPatient() {
  return <div>Welcome to Admin Dashboard</div>;
}

OutPatient.getLayout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);
