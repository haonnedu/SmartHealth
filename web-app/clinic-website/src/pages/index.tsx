import UserLayout from "@/layouts/UserLayout";

export default function UserHome() {
  return <div>Trang người dùng</div>;
}

UserHome.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;
