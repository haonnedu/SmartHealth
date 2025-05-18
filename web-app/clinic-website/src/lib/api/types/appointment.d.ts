export interface Appointment {
  id: number;
  appointmentNo: string;
  appointmentDate: string;
  priority: string;
  specialist: string[];
  doctor: string;
  status: string;
  message: string;
  alternateAddress: string;
  userId: string;
};