import UserLayout from "@/layouts/UserLayout";

export default function BookingPage() {
  return <div>Đây là trang đặt lịch</div>;
}

BookingPage.getLayout = (page: React.ReactNode) => (
  <UserLayout>{page}</UserLayout>
);
