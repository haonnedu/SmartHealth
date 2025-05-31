import MasterDataComponent from "@/components/admin/master-data/master-data.component";
import AdminLayout from "@/layouts/AdminLayout";

export default function AdminMasterDataHome() {
  return <MasterDataComponent />
}

AdminMasterDataHome.getLayout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);
