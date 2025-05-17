import AppointmentComponent from "@/components/patient/appointment/appointment.component";
import PatientLayout from "@/layouts/PatientLayout";

export default function Appointment() {
  return <AppointmentComponent />;
}

Appointment.getLayout = (page: React.ReactNode) => (
  <PatientLayout>{page}</PatientLayout>
);
