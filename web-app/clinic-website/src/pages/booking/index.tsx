import { BookingModal } from "@/components/frontSite/BookingModal";
import { ThemedContainer } from "@/components/ui/themed-container";
import UserLayout from "@/layouts/UserLayout";
import { useTheme } from "@/providers/ThemeProvider";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Progress,
  Rating,
  Select,
  Stack,
  Stepper,
  Text,
  TextInput,
  Textarea,
  Timeline,
  Title
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBone,
  IconBrain,
  IconCalendar,
  IconCheck,
  IconEye,
  IconHeart,
  IconLock,
  IconMail,
  IconPhone,
  IconStethoscope,
  IconUser
} from "@tabler/icons-react";
import { useState } from "react";

const specialties = [
  { value: "cardiology", label: "Cardiology", icon: IconHeart, color: "red" },
  { value: "neurology", label: "Neurology", icon: IconBrain, color: "blue" },
  {
    value: "ophthalmology",
    label: "Ophthalmology",
    icon: IconEye,
    color: "green",
  },
  {
    value: "orthopedics",
    label: "Orthopedics",
    icon: IconBone,
    color: "orange",
  },
  {
    value: "general",
    label: "General Medicine",
    icon: IconStethoscope,
    color: "teal",
  },
];

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "15+ years",
    rating: 4.9,
    reviews: 234,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    price: 150,
    nextAvailable: "Today",
    languages: ["English", "Spanish"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    experience: "12+ years",
    rating: 4.8,
    reviews: 189,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    price: 180,
    nextAvailable: "Tomorrow",
    languages: ["English", "Mandarin"],
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Ophthalmology",
    experience: "10+ years",
    rating: 4.9,
    reviews: 156,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    price: 140,
    nextAvailable: "Today",
    languages: ["English", "Spanish"],
  },
];

const timeSlots = [
  { time: "09:00", available: true },
  { time: "09:30", available: true },
  { time: "10:00", available: false },
  { time: "10:30", available: true },
  { time: "11:00", available: true },
  { time: "11:30", available: false },
  { time: "14:00", available: true },
  { time: "14:30", available: true },
  { time: "15:00", available: true },
  { time: "15:30", available: true },
  { time: "16:00", available: false },
  { time: "16:30", available: true },
];

export default function BookingPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { tenantTheme, themeStyles } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
    notes: "",
    password: "",
    confirmPassword: "",
    birthYear: "",
    gender: "",
    medicalHistory: "",
    agreeTerms: false,
  });
  const [accountType, setAccountType] = useState<"existing" | "new">(
    "existing"
  );
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getDoctorsBySpecialty = () => {
    if (!selectedSpecialty) return doctors;
    return doctors.filter(
      (doctor) =>
        doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
    );
  };

  return (
    <>
      <BookingModal opened={opened} onClose={close} />

      {/* Hero Section */}
      <ThemedContainer variant="primary" className="py-12">
        <Container size="xl">
          <div className="text-center">
            <Title order={1} className="text-4xl font-bold mb-4 text-gray-900">
              Book Your Appointment
            </Title>
            <Text size="lg" className="text-gray-700 max-w-2xl mx-auto">
              Schedule your consultation with our expert healthcare
              professionals. Experience world-class medical care with{" "}
              {tenantTheme.brandName}.
            </Text>
          </div>
        </Container>
      </ThemedContainer>

      <Container size="xl" py="xl">
        {/* Progress Indicator */}
        <Card shadow="sm" p="lg" mb="xl" className={themeStyles.borderRadius}>
          <Stepper
            active={currentStep}
            color={tenantTheme.primaryColor}
            size="sm"
            className="mb-6"
          >
            <Stepper.Step
              label="Specialty"
              description="Choose medical specialty"
              icon={<IconStethoscope size={18} />}
            />
            <Stepper.Step
              label="Doctor"
              description="Select your doctor"
              icon={<IconUser size={18} />}
            />
            <Stepper.Step
              label="Schedule"
              description="Pick date & time"
              icon={<IconCalendar size={18} />}
            />
            <Stepper.Step
              label="Details"
              description="Personal information"
              icon={<IconCheck size={18} />}
            />
          </Stepper>

          <Progress
            value={(currentStep + 1) * 25}
            color={tenantTheme.primaryColor}
            size="sm"
            className="mt-4"
          />
        </Card>

        <Grid>
          <Grid.Col span={{ base: 12, lg: 8 }}>
            {/* Step 1: Specialty Selection */}
            {currentStep === 0 && (
              <Card shadow="sm" p="xl" className={themeStyles.borderRadius}>
                <Title
                  order={2}
                  mb="xl"
                  className={`text-${themeStyles.accentColor}`}
                >
                  Select Medical Specialty
                </Title>

                <Grid>
                  {specialties.map((specialty) => {
                    const IconComponent = specialty.icon;
                    return (
                      <Grid.Col
                        span={{ base: 12, sm: 6 }}
                        key={specialty.value}
                      >
                        <Card
                          shadow="sm"
                          p="lg"
                          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                            selectedSpecialty === specialty.value
                              ? `border-2 border-${specialty.color}-500 bg-${specialty.color}-50`
                              : "border border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedSpecialty(specialty.value)}
                        >
                          <Group>
                            <ActionIcon
                              size="lg"
                              color={specialty.color}
                              variant="light"
                              className={themeStyles.borderRadius}
                            >
                              <IconComponent size={24} />
                            </ActionIcon>
                            <div>
                              <Text fw={600} size="lg">
                                {specialty.label}
                              </Text>
                              <Text size="sm" c="dimmed">
                                Expert care & consultation
                              </Text>
                            </div>
                          </Group>
                        </Card>
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </Card>
            )}

            {/* Step 2: Doctor Selection */}
            {currentStep === 1 && (
              <Card shadow="sm" p="xl" className={themeStyles.borderRadius}>
                <Title
                  order={2}
                  mb="xl"
                  className={`text-${themeStyles.accentColor}`}
                >
                  Choose Your Doctor
                </Title>

                <Stack gap="lg">
                  {getDoctorsBySpecialty().map((doctor) => (
                    <Card
                      key={doctor.id}
                      shadow="sm"
                      p="lg"
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedDoctor === doctor.id
                          ? `border-2 border-${tenantTheme.primaryColor}-500 bg-${tenantTheme.primaryColor}-50`
                          : "border border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <Group justify="space-between">
                        <Group>
                          <Avatar src={doctor.avatar} size="lg" radius="md" />
                          <div>
                            <Text fw={600} size="lg">
                              {doctor.name}
                            </Text>
                            <Text size="sm" c="dimmed" mb="xs">
                              {doctor.specialty} • {doctor.experience}
                            </Text>
                            <Group gap="xs">
                              <Rating
                                value={doctor.rating}
                                readOnly
                                size="sm"
                              />
                              <Text size="sm" c="dimmed">
                                {doctor.rating} ({doctor.reviews} reviews)
                              </Text>
                            </Group>
                            <Group gap="xs" mt="xs">
                              <Badge variant="light" color="green">
                                {doctor.nextAvailable}
                              </Badge>
                              {doctor.languages.map((lang) => (
                                <Badge key={lang} variant="outline" size="sm">
                                  {lang}
                                </Badge>
                              ))}
                            </Group>
                          </div>
                        </Group>
                        <div className="text-right">
                          <Text
                            fw={600}
                            size="xl"
                            className={`text-${themeStyles.accentColor}`}
                          >
                            ${doctor.price}
                          </Text>
                          <Text size="sm" c="dimmed">
                            Consultation
                          </Text>
                        </div>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </Card>
            )}

            {/* Step 3: Date & Time Selection */}
            {currentStep === 2 && (
              <Card shadow="sm" p="xl" className={themeStyles.borderRadius}>
                <Title
                  order={2}
                  mb="xl"
                  className={`text-${themeStyles.accentColor}`}
                >
                  Select Date & Time
                </Title>

                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Text fw={500} mb="md">
                      Choose Date
                    </Text>
                    <DatePickerInput
                      value={selectedDate}
                      onChange={setSelectedDate}
                      placeholder="Select appointment date"
                      leftSection={<IconCalendar size={18} />}
                      size="lg"
                      minDate={new Date()}
                      className="mb-4"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Text fw={500} mb="md">
                      Available Time Slots
                    </Text>
                    <Grid>
                      {timeSlots.map((slot) => (
                        <Grid.Col span={6} key={slot.time}>
                          <Button
                            variant={
                              selectedTime === slot.time ? "filled" : "light"
                            }
                            color={
                              slot.available ? tenantTheme.primaryColor : "gray"
                            }
                            disabled={!slot.available}
                            fullWidth
                            onClick={() =>
                              slot.available && setSelectedTime(slot.time)
                            }
                            className="mb-2"
                          >
                            {slot.time}
                          </Button>
                        </Grid.Col>
                      ))}
                    </Grid>
                  </Grid.Col>
                </Grid>
              </Card>
            )}

            {/* Step 4: Personal Details */}
            {currentStep === 3 && (
              <Card shadow="sm" p="xl" className={themeStyles.borderRadius}>
                <Title
                  order={2}
                  mb="xl"
                  className={`text-${themeStyles.accentColor}`}
                >
                  Account & Personal Information
                </Title>

                {/* Account Type Selection */}
                <Card withBorder p="lg" mb="lg" className="bg-gray-50">
                  <Text fw={500} mb="md" size="lg">
                    Do you have an account with us?
                  </Text>
                  <Group>
                    <Button
                      variant={
                        accountType === "existing" ? "filled" : "outline"
                      }
                      color={tenantTheme.primaryColor}
                      onClick={() => setAccountType("existing")}
                      leftSection={<IconUser size={16} />}
                      size="md"
                    >
                      I have an account
                    </Button>
                    <Button
                      variant={accountType === "new" ? "filled" : "outline"}
                      color={tenantTheme.primaryColor}
                      onClick={() => setAccountType("new")}
                      leftSection={<IconCheck size={16} />}
                      size="md"
                    >
                      Create new account
                    </Button>
                  </Group>
                </Card>

                {/* Existing User Login */}
                {accountType === "existing" && (
                  <Card withBorder p="lg" mb="lg">
                    <Group align="center" mb="md">
                      <IconUser
                        size={20}
                        className={`text-${themeStyles.accentColor}`}
                      />
                      <Text fw={600} size="lg">
                        Login to Your Account
                      </Text>
                    </Group>

                    <Grid>
                      <Grid.Col span={12}>
                        <TextInput
                          label="Email or Username"
                          placeholder="Enter your email or username"
                          required
                          size="md"
                          leftSection={<IconMail size={18} />}
                          value={loginData.username}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              username: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <TextInput
                          label="Password"
                          type="password"
                          placeholder="Enter your password"
                          required
                          size="md"
                          leftSection={<IconLock size={18} />}
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Group justify="space-between">
                          <Button variant="subtle" size="sm" color="gray">
                            Forgot Password?
                          </Button>
                          <Text size="sm" c="dimmed">
                            Don't have an account?{" "}
                            <Button
                              variant="subtle"
                              size="sm"
                              color={tenantTheme.primaryColor}
                              onClick={() => setAccountType("new")}
                            >
                              Sign up
                            </Button>
                          </Text>
                        </Group>
                      </Grid.Col>
                    </Grid>
                  </Card>
                )}

                {/* New User Registration */}
                {accountType === "new" && (
                  <Card withBorder p="lg">
                    <Group align="center" mb="md">
                      <IconCheck
                        size={20}
                        className={`text-${themeStyles.accentColor}`}
                      />
                      <Text fw={600} size="lg">
                        Create Your Account
                      </Text>
                    </Group>

                    <Grid>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="First Name"
                          placeholder="Enter your first name"
                          required
                          size="md"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Last Name"
                          placeholder="Enter your last name"
                          required
                          size="md"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Email"
                          placeholder="Enter your email"
                          required
                          size="md"
                          leftSection={<IconMail size={18} />}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Phone Number"
                          placeholder="Enter your phone number"
                          required
                          size="md"
                          leftSection={<IconPhone size={18} />}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Password"
                          type="password"
                          placeholder="Create a password"
                          required
                          size="md"
                          leftSection={<IconLock size={18} />}
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Confirm Password"
                          type="password"
                          placeholder="Confirm your password"
                          required
                          size="md"
                          leftSection={<IconLock size={18} />}
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              confirmPassword: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Select
                          label="Date of Birth"
                          placeholder="Select your birth year"
                          data={Array.from({ length: 100 }, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return {
                              value: year.toString(),
                              label: year.toString(),
                            };
                          })}
                          value={formData.birthYear}
                          onChange={(value) =>
                            setFormData({ ...formData, birthYear: value || "" })
                          }
                          size="md"
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Select
                          label="Gender"
                          placeholder="Select your gender"
                          data={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" },
                            {
                              value: "prefer-not-to-say",
                              label: "Prefer not to say",
                            },
                          ]}
                          value={formData.gender}
                          onChange={(value) =>
                            setFormData({ ...formData, gender: value || "" })
                          }
                          size="md"
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <TextInput
                          label="Reason for Visit"
                          placeholder="Brief description of your concern"
                          required
                          size="md"
                          value={formData.reason}
                          onChange={(e) =>
                            setFormData({ ...formData, reason: e.target.value })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Textarea
                          label="Medical History (Optional)"
                          placeholder="Any relevant medical history or current medications"
                          minRows={3}
                          value={formData.medicalHistory}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              medicalHistory: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Textarea
                          label="Additional Notes"
                          placeholder="Any additional information you'd like to share"
                          minRows={2}
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                          }
                        />
                      </Grid.Col>

                      {/* Terms and Privacy */}
                      <Grid.Col span={12}>
                        <Card withBorder p="md" className="bg-blue-50">
                          <Group>
                            <input
                              type="checkbox"
                              id="terms"
                              checked={formData.agreeTerms}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  agreeTerms: e.target.checked,
                                })
                              }
                              className={`accent-${tenantTheme.primaryColor}`}
                            />
                            <label htmlFor="terms" className="cursor-pointer">
                              <Text size="sm">
                                I agree to the{" "}
                                <Button
                                  variant="subtle"
                                  size="xs"
                                  color={tenantTheme.primaryColor}
                                >
                                  Terms of Service
                                </Button>{" "}
                                and{" "}
                                <Button
                                  variant="subtle"
                                  size="xs"
                                  color={tenantTheme.primaryColor}
                                >
                                  Privacy Policy
                                </Button>
                              </Text>
                            </label>
                          </Group>
                        </Card>
                      </Grid.Col>
                    </Grid>

                    <Text size="sm" c="dimmed" mt="md">
                      Already have an account?{" "}
                      <Button
                        variant="subtle"
                        size="sm"
                        color={tenantTheme.primaryColor}
                        onClick={() => setAccountType("existing")}
                      >
                        Sign in
                      </Button>
                    </Text>
                  </Card>
                )}
              </Card>
            )}

            {/* Navigation Buttons */}
            <Group justify="space-between" mt="xl">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                size="lg"
              >
                Back
              </Button>

              {currentStep < 3 ? (
                <Button
                  variant="filled"
                  color={tenantTheme.primaryColor}
                  onClick={handleNext}
                  disabled={
                    (currentStep === 0 && !selectedSpecialty) ||
                    (currentStep === 1 && !selectedDoctor) ||
                    (currentStep === 2 && (!selectedDate || !selectedTime))
                  }
                  size="lg"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="filled"
                  color={tenantTheme.primaryColor}
                  onClick={open}
                  disabled={
                    accountType === "existing"
                      ? !loginData.username || !loginData.password
                      : !formData.firstName ||
                        !formData.lastName ||
                        !formData.email ||
                        !formData.phone ||
                        !formData.password ||
                        !formData.confirmPassword ||
                        !formData.agreeTerms ||
                        formData.password !== formData.confirmPassword
                  }
                  size="lg"
                >
                  {accountType === "existing"
                    ? "Login & Book Appointment"
                    : "Create Account & Book"}
                </Button>
              )}
            </Group>
          </Grid.Col>

          {/* Sidebar */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap="lg">
              {/* Appointment Summary */}
              <Card shadow="sm" p="lg" className={themeStyles.borderRadius}>
                <Title
                  order={3}
                  mb="md"
                  className={`text-${themeStyles.accentColor}`}
                >
                  Appointment Summary
                </Title>

                <Timeline active={currentStep} color={tenantTheme.primaryColor}>
                  <Timeline.Item title="Specialty">
                    <Text size="sm" c="dimmed">
                      {selectedSpecialty
                        ? specialties.find((s) => s.value === selectedSpecialty)
                            ?.label
                        : "Not selected"}
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item title="Doctor">
                    <Text size="sm" c="dimmed">
                      {selectedDoctor
                        ? doctors.find((d) => d.id === selectedDoctor)?.name
                        : "Not selected"}
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item title="Date & Time">
                    <Text size="sm" c="dimmed">
                      {selectedDate && selectedTime
                        ? `${selectedDate.toLocaleDateString()} at ${selectedTime}`
                        : "Not selected"}
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item title="Patient Info">
                    <Text size="sm" c="dimmed">
                      {formData.firstName && formData.lastName
                        ? `${formData.firstName} ${formData.lastName}`
                        : "Not provided"}
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Card>

              {/* Consultation Fee */}
              {selectedDoctor && (
                <Card shadow="sm" p="lg" className={themeStyles.borderRadius}>
                  <Title order={4} mb="md">
                    Consultation Fee
                  </Title>
                  <Group justify="space-between" mb="xs">
                    <Text>Doctor Fee</Text>
                    <Text fw={600}>
                      ${doctors.find((d) => d.id === selectedDoctor)?.price}
                    </Text>
                  </Group>
                  <Group justify="space-between" mb="xs">
                    <Text>Platform Fee</Text>
                    <Text fw={600}>$10</Text>
                  </Group>
                  <Divider my="sm" />
                  <Group justify="space-between">
                    <Text fw={600} size="lg">
                      Total
                    </Text>
                    <Text
                      fw={600}
                      size="lg"
                      className={`text-${themeStyles.accentColor}`}
                    >
                      $
                      {(doctors.find((d) => d.id === selectedDoctor)?.price ||
                        0) + 10}
                    </Text>
                  </Group>
                </Card>
              )}

              {/* Why Choose Us */}
              <Card shadow="sm" p="lg" className={themeStyles.borderRadius}>
                <Title order={4} mb="md">
                  Why Choose {tenantTheme.brandName}?
                </Title>
                <Stack gap="xs">
                  <Group>
                    <IconCheck
                      size={16}
                      className={`text-${themeStyles.accentColor}`}
                    />
                    <Text size="sm">Expert medical professionals</Text>
                  </Group>
                  <Group>
                    <IconCheck
                      size={16}
                      className={`text-${themeStyles.accentColor}`}
                    />
                    <Text size="sm">State-of-the-art facilities</Text>
                  </Group>
                  <Group>
                    <IconCheck
                      size={16}
                      className={`text-${themeStyles.accentColor}`}
                    />
                    <Text size="sm">Flexible scheduling</Text>
                  </Group>
                  <Group>
                    <IconCheck
                      size={16}
                      className={`text-${themeStyles.accentColor}`}
                    />
                    <Text size="sm">Insurance accepted</Text>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

BookingPage.getLayout = (page: React.ReactNode) => (
  <UserLayout>{page}</UserLayout>
);
