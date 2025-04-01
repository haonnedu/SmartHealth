import PatientLayout from "@/layouts/PatientLayout";

export default function Patient() {
  return <div>Welcome to Patient Dashboard</div>;
}

Patient.getLayout = (page: React.ReactNode) => (
  <PatientLayout>{page}</PatientLayout>
);
