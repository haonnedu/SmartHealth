import AppointmentComponent from "@/components/patient/appointment/appointment.component";
import PatientLayout from "@/layouts/PatientLayout";

export default function Dashboard() {
    return <div>Welcome to Patient Dashboard</div>;
}

Dashboard.getLayout = (page: React.ReactNode) => (
  <PatientLayout>{page}</PatientLayout>
);
