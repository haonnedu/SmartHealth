import UserLayout from "@/layouts/UserLayout";

export default function Home() {
  return <div>Đây là trang người dùng</div>;
}

Home.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;
