import {
  Button,
  Divider,
  Group,
  Image,
  Modal,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
interface AuthModalProps {
  opened: boolean;
  onClose: () => void;
}
export function BookingModal({ opened, onClose }: AuthModalProps) {
  const [patientType, setPatientType] = useState<"new" | "old">("new");
  return (
    <Modal
      opened={opened}
      size="auto"
      onClose={onClose}
      title="Chỗ đặt khả dụng"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 md:w-[800px] gap-6">
        {/* LEFT: Doctor + Slots */}
        <div>
          <Group align="flex-start">
            <Image
              src="https://randomuser.me/api/portraits/men/10.jpg"
              width={60}
              height={60}
              radius="md"
            />
            <div>
              <Text size="sm">
                <strong>Doctor Name:</strong> Amit Singh (9009)
              </Text>
              <Text size="sm">
                <strong>Specialist:</strong> Cardiologists, Gastroenterologists
              </Text>
              <Text size="sm">
                <strong>Consultation Fees:</strong> $123.00
              </Text>
            </div>
          </Group>

          <Divider my="sm" />

          <SimpleGrid cols={3} spacing="sm">
            {[
              "10:00 AM",
              "10:20 AM",
              "10:40 AM",
              "11:00 AM",
              "11:20 AM",
              "11:40 AM",
              "12:00 PM",
              "12:20 PM",
            ].map((slot) => (
              <Button
                key={slot}
                variant="light"
                color="green"
                fullWidth
                size="xs"
              >
                {slot}
              </Button>
            ))}
          </SimpleGrid>
        </div>

        {/* RIGHT: Form */}
        <div>
          <Text size="lg" mb="sm">
            Login/Register
          </Text>

          <Radio.Group
            value={patientType}
            onChange={(value) => setPatientType(value as "new" | "old")}
            label="Patient Appointment"
            mb="sm"
          >
            <Group gap="md">
              <Radio value="new" label="New Patient" />
              <Radio value="old" label="Old Patient" />
            </Group>
          </Radio.Group>

          <Stack gap="xs">
            {patientType === "new" ? (
              <>
                <TextInput
                  label="Patient Name"
                  required
                  placeholder="Enter Patient Name"
                />
                <TextInput label="Email" required placeholder="Enter Email" />
                <Select
                  label="Gender"
                  required
                  placeholder="Select gender"
                  data={["Male", "Female", "Other"]}
                />
                <TextInput label="Phone" placeholder="Enter Phone" />
              </>
            ) : (
              <>
                <TextInput label="Username" required placeholder="Username" />
                <TextInput
                  label="Password"
                  type="password"
                  required
                  placeholder="Password"
                />
              </>
            )}
          </Stack>
        </div>
      </div>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose}>
          Close
        </Button>
        <Button color="blue">Submit</Button>
      </Group>
    </Modal>
  );
}
