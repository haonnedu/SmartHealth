import { ThemedContainer } from "@/components/ui/themed-container";
import { useLoadingState } from "@/hooks/useLoadingState";
import UserLayout from "@/layouts/UserLayout";
import { useTheme } from "@/providers/ThemeProvider";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Rating,
  SimpleGrid,
  Stack,
  Stepper,
  Text,
  Title
} from "@mantine/core";
import {
  IconAward,
  IconBone,
  IconBrain,
  IconCalendar,
  IconCheck,
  IconChevronRight,
  IconClock,
  IconEye,
  IconHeart,
  IconPhone,
  IconPlayerPlay,
  IconShield,
  IconStar,
  IconStethoscope,
  IconUsers
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";

export default function HomePage() {
  const { setLoading } = useLoadingState();
  const { tenantTheme, themeStyles } = useTheme();

  useEffect(() => {
    setLoading(true, "Loading content...");
    const imageUrls = ["/images/3.png", "/images/2.jpg", "/images/1.png"];
    const imagePromises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setTimeout(() => setLoading(false), 500);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        setTimeout(() => setLoading(false), 500);
      });
  }, [setLoading]);

  const specialties = [
    { name: "Cardiology", icon: IconHeart, color: "red", patients: "2.5K+" },
    { name: "Neurology", icon: IconBrain, color: "blue", patients: "1.8K+" },
    { name: "Ophthalmology", icon: IconEye, color: "green", patients: "3.2K+" },
    { name: "Orthopedics", icon: IconBone, color: "orange", patients: "2.1K+" },
    {
      name: "General Medicine",
      icon: IconStethoscope,
      color: "teal",
      patients: "5.5K+",
    },
  ];

  const features = [
    {
      icon: IconShield,
      title: "Advanced Security",
      description:
        "Your health data is protected with enterprise-grade security",
    },
    {
      icon: IconAward,
      title: "Expert Doctors",
      description: "Board-certified physicians with years of experience",
    },
    {
      icon: IconClock,
      title: "24/7 Support",
      description: "Round-the-clock medical assistance when you need it",
    },
    {
      icon: IconUsers,
      title: "Patient-Centered",
      description: "Personalized care tailored to your unique needs",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      comment:
        "Exceptional care and professional service. The doctors are knowledgeable and caring.",
    },
    {
      name: "Michael Chen",
      role: "Patient",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5,
      comment:
        "Easy booking system and excellent medical care. Highly recommend this platform.",
    },
    {
      name: "Emily Rodriguez",
      role: "Patient",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5,
      comment:
        "Professional staff and modern facilities. Great experience overall.",
    },
  ];

  return (
    <>
      {/* Enhanced Hero Section - Full Width */}
      <Box
        className="relative overflow-hidden w-full"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          marginTop: "-3.5rem",
          width: "100vw",
        }}
      >
        <ThemedContainer
          variant="primary"
          className="pt-[140px] pb-8 md:pb-12 lg:pb-16 relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full"></div>
            <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white rounded-full"></div>
          </div>

          <Container size="xl" className="relative z-10">
            <Grid align="center" gutter="xl">
              <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6 }}>
                <Stack gap="lg">
                  <Badge
                    size="lg"
                    variant="light"
                    color={tenantTheme.primaryColor}
                    className="w-fit"
                  >
                    👩‍⚕️ Welcome to {tenantTheme.brandName}
                  </Badge>

                  <Title
                    order={1}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
                  >
                    Your Health,{" "}
                    <span
                      className={`text-${themeStyles.accentColor} bg-gradient-to-r ${themeStyles.secondaryGradient} bg-clip-text text-transparent`}
                    >
                      Our Priority
                    </span>
                  </Title>

                  <Text
                    size="lg"
                    className="text-gray-700 leading-relaxed max-w-lg"
                  >
                    Experience world-class healthcare with our team of expert
                    professionals. Book appointments, consult online, and manage
                    your health journey seamlessly.
                  </Text>

                  <Group gap="lg" className="flex-wrap">
                    <Button
                      size="xl"
                      variant="filled"
                      color={tenantTheme.primaryColor}
                      component={Link}
                      href="/booking"
                      leftSection={<IconCalendar size={20} />}
                      className="shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Book Appointment
                    </Button>

                    <Button
                      size="xl"
                      variant="outline"
                      color="gray"
                      leftSection={<IconPlayerPlay size={20} />}
                      className="border-2 hover:bg-gray-50"
                    >
                      Watch Demo
                    </Button>
                  </Group>

                  {/* Stats */}
                  <Group gap="lg" mt="lg" className="flex-wrap">
                    <div className="text-center">
                      <Text
                        fw={700}
                        size="xl"
                        className={`text-${themeStyles.accentColor}`}
                      >
                        70+
                      </Text>
                      <Text size="sm" c="dimmed" fw={500}>
                        Expert Doctors
                      </Text>
                    </div>
                    <Divider
                      orientation="vertical"
                      className="hidden sm:block"
                    />
                    <div className="text-center">
                      <Text
                        fw={700}
                        size="xl"
                        className={`text-${themeStyles.accentColor}`}
                      >
                        15K+
                      </Text>
                      <Text size="sm" c="dimmed" fw={500}>
                        Happy Patients
                      </Text>
                    </div>
                    <Divider
                      orientation="vertical"
                      className="hidden sm:block"
                    />
                    <div className="text-center">
                      <Text
                        fw={700}
                        size="xl"
                        className={`text-${themeStyles.accentColor}`}
                      >
                        100+
                      </Text>
                      <Text size="sm" c="dimmed" fw={500}>
                        Daily Appointments
                      </Text>
                    </div>
                  </Group>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6 }}>
                <div className="relative mt-8 md:mt-0">
                  {/* Main Image */}
                  <div className="relative z-10">
                    <Image
                      src="/images/doctor.png"
                      alt="Healthcare Professionals"
                      className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg mx-auto drop-shadow-2xl"
                    />
                  </div>

                  {/* Floating Cards */}
                  <Card
                    shadow="lg"
                    p="md"
                    className="absolute top-4 sm:top-8 md:top-10 -left-2 sm:-left-4 md:-left-5 z-20 bg-white/90 backdrop-blur-sm border-l-4 border-green-500"
                  >
                    <Group gap="sm">
                      <ActionIcon color="green" variant="light" size="lg">
                        <IconCheck size={16} />
                      </ActionIcon>
                      <div>
                        <Text fw={600} size="sm">
                          24/7 Available
                        </Text>
                        <Text size="xs" c="dimmed">
                          Emergency Support
                        </Text>
                      </div>
                    </Group>
                  </Card>

                  <Card
                    shadow="lg"
                    p="md"
                    className="absolute bottom-12 sm:bottom-16 md:bottom-20 -right-2 sm:-right-4 md:-right-5 z-20 bg-white/90 backdrop-blur-sm border-l-4 border-blue-500"
                  >
                    <Group gap="sm">
                      <ActionIcon color="blue" variant="light" size="lg">
                        <IconStar size={16} />
                      </ActionIcon>
                      <div>
                        <Text fw={600} size="sm">
                          4.9/5 Rating
                        </Text>
                        <Text size="xs" c="dimmed">
                          Patient Satisfaction
                        </Text>
                      </div>
                    </Group>
                  </Card>
                </div>
              </Grid.Col>
            </Grid>
          </Container>
        </ThemedContainer>
      </Box>

      {/* Enhanced Specialties Section */}
      <ThemedContainer variant="secondary" className="py-12 md:py-16">
        <Container size="xl">
          <Stack gap="xl">
            <div className="text-center text-white">
              <Title
                order={2}
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
              >
                Medical Specialties
              </Title>
              <Text size="lg" className="max-w-2xl mx-auto opacity-90">
                Our expert medical teams provide specialized care across
                multiple disciplines
              </Text>
            </div>

            <SimpleGrid
              cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}
              spacing="lg"
            >
              {specialties.map((specialty) => {
                const IconComponent = specialty.icon;
                return (
                  <Card
                    key={specialty.name}
                    shadow="lg"
                    p="xl"
                    className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer bg-white/95 backdrop-blur-sm"
                  >
                    <Stack align="center" gap="md">
                      <ActionIcon
                        size="xl"
                        color={specialty.color}
                        variant="light"
                        className="mb-2"
                      >
                        <IconComponent size={32} />
                      </ActionIcon>
                      <div>
                        <Text fw={600} size="lg">
                          {specialty.name}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {specialty.patients} patients
                        </Text>
                      </div>
                      <Button
                        variant="subtle"
                        color={specialty.color}
                        size="sm"
                        rightSection={<IconChevronRight size={16} />}
                      >
                        Learn More
                      </Button>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>
          </Stack>
        </Container>
      </ThemedContainer>

      {/* Enhanced Features Section */}
      <Container size="xl" py="xl">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6 }}>
            <Stack gap="xl">
              <div>
                <Title
                  order={2}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                >
                  Why Choose {tenantTheme.brandName}?
                </Title>
                <Text size="lg" c="dimmed">
                  We're committed to providing exceptional healthcare services
                  with cutting-edge technology and compassionate care.
                </Text>
              </div>

              <Stack gap="lg">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card
                      key={index}
                      shadow="sm"
                      p="lg"
                      className="border-l-4 border-l-blue-500"
                    >
                      <Group>
                        <ActionIcon
                          size="xl"
                          color={tenantTheme.primaryColor}
                          variant="light"
                        >
                          <IconComponent size={24} />
                        </ActionIcon>
                        <div className="flex-1">
                          <Text fw={600} size="lg" mb="xs">
                            {feature.title}
                          </Text>
                          <Text c="dimmed" size="md">
                            {feature.description}
                          </Text>
                        </div>
                      </Group>
                    </Card>
                  );
                })}
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6 }}>
            <Image
              src="/images/doctor.png"
              alt="Medical Team"
              className="w-full h-auto rounded-xl shadow-xl mt-8 md:mt-0"
            />
          </Grid.Col>
        </Grid>
      </Container>

      {/* Enhanced Booking Process */}
      <ThemedContainer variant="primary" className="py-12 md:py-20">
        <Container size="xl">
          <Stack gap="xl">
            <div className="text-center">
              <Title
                order={2}
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900"
              >
                Simple Booking Process
              </Title>
              <Text size="lg" className="text-gray-700 max-w-2xl mx-auto">
                Get the care you need in just a few simple steps
              </Text>
            </div>

            <Stepper
              active={-1}
              orientation="horizontal"
              size="lg"
              color={tenantTheme.primaryColor}
              className="hidden sm:flex"
            >
              <Stepper.Step
                label="Choose Specialty"
                description="Select your medical specialty"
                icon={<IconStethoscope size={20} />}
              />
              <Stepper.Step
                label="Select Doctor"
                description="Pick your preferred doctor"
                icon={<IconUsers size={20} />}
              />
              <Stepper.Step
                label="Pick Time"
                description="Choose convenient time slot"
                icon={<IconClock size={20} />}
              />
              <Stepper.Step
                label="Confirm"
                description="Complete your booking"
                icon={<IconCheck size={20} />}
              />
            </Stepper>

            {/* Mobile Stepper */}
            <Stepper
              active={-1}
              orientation="vertical"
              size="md"
              color={tenantTheme.primaryColor}
              className="sm:hidden"
            >
              <Stepper.Step
                label="Choose Specialty"
                description="Select your medical specialty"
                icon={<IconStethoscope size={20} />}
              />
              <Stepper.Step
                label="Select Doctor"
                description="Pick your preferred doctor"
                icon={<IconUsers size={20} />}
              />
              <Stepper.Step
                label="Pick Time"
                description="Choose convenient time slot"
                icon={<IconClock size={20} />}
              />
              <Stepper.Step
                label="Confirm"
                description="Complete your booking"
                icon={<IconCheck size={20} />}
              />
            </Stepper>

            <Center>
              <Button
                size="xl"
                variant="filled"
                color={tenantTheme.primaryColor}
                component={Link}
                href="/booking"
                leftSection={<IconCalendar size={20} />}
                className="shadow-lg"
              >
                Start Booking Now
              </Button>
            </Center>
          </Stack>
        </Container>
      </ThemedContainer>

      {/* Enhanced Testimonials */}
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <div className="text-center">
            <Title
              order={2}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            >
              What Our Patients Say
            </Title>
            <Text size="lg" c="dimmed">
              Real experiences from real patients
            </Text>
          </div>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {testimonials.map((testimonial, index) => (
              <Card key={index} shadow="lg" p="xl" className="h-full">
                <Stack gap="md">
                  <Group>
                    <Avatar src={testimonial.avatar} size="lg" radius="xl" />
                    <div>
                      <Text fw={600} size="md">
                        {testimonial.name}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {testimonial.role}
                      </Text>
                    </div>
                  </Group>

                  <Rating value={testimonial.rating} readOnly size="md" />

                  <Text className="italic" size="md">
                    "{testimonial.comment}"
                  </Text>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>

      {/* Enhanced CTA Section */}
      <ThemedContainer variant="secondary" className="py-12 md:py-20">
        <Container size="xl">
          <div className="text-center text-white">
            <Title
              order={2}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Take Control of Your Health?
            </Title>
            <Text size="xl" className="mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust{" "}
              {tenantTheme.brandName} for their healthcare needs.
            </Text>
            <Group justify="center" gap="lg" className="flex-wrap">
              <Button
                size="xl"
                variant="filled"
                color={tenantTheme.primaryColor}
                component={Link}
                href="/booking"
                leftSection={<IconCalendar size={20} />}
              >
                Book Appointment
              </Button>
              <Button
                size="xl"
                variant="outline"
                color="white"
                leftSection={<IconPhone size={20} />}
              >
                Call Us Now
              </Button>
            </Group>
          </div>
        </Container>
      </ThemedContainer>
    </>
  );
}

HomePage.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;
