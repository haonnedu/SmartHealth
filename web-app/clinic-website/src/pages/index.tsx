import { useLoadingState } from "@/hooks/useLoadingState";
import UserLayout from "@/layouts/UserLayout";
import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Rating,
  Stepper,
  Text,
  Title,
} from "@mantine/core";
import { useEffect } from "react";

export default function HomePage() {
  const { setLoading } = useLoadingState();

  useEffect(() => {
    // Show loading while images are loading
    setLoading(true, "Loading content...");

    // Simulate loading time and check if images are loaded
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
        // Add a small delay to ensure smooth transition
        setTimeout(() => setLoading(false), 500);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        // Even if images fail to load, we should show the page
        setTimeout(() => setLoading(false), 500);
      });
  }, [setLoading]);

  return (
    <>
      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-r from-pink-100 to-blue-100 py-12 md:py-24">
        <Container size="xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <Text size="lg" className="text-pink-700 font-semibold mb-2">
                👩‍⚕️ Hey! We Are SmartHealth
              </Text>
              <Title
                order={1}
                className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
              >
                Makes Your Health Better Will Makes Us Better
              </Title>
              <Text
                size="lg"
                className="mb-6 text-gray-700 max-w-xl mx-auto md:mx-0"
              >
                Our team of highly trained professionals uses the latest healing
                technologies to restore you to pain-free health quickly and
                easily.
              </Text>
              <Group gap="md" className="justify-center md:justify-start">
                <Button
                  size="lg"
                  color="pink"
                  variant="outline"
                  radius="md"
                  className="font-semibold px-8"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="pink"
                  radius="md"
                  className="font-semibold px-8"
                >
                  Watch Video
                </Button>
              </Group>
              <Group
                gap="xl"
                mt="xl"
                className="justify-center md:justify-start"
              >
                <div className="text-center">
                  <Text fw={700} size="xl" className="text-pink-700">
                    70+
                  </Text>
                  <Text size="sm" c="dimmed">
                    Active Doctor
                  </Text>
                </div>
                <div className="text-center">
                  <Text fw={700} size="xl" className="text-pink-700">
                    15K+
                  </Text>
                  <Text size="sm" c="dimmed">
                    Active User
                  </Text>
                </div>
                <div className="text-center">
                  <Text fw={700} size="xl" className="text-pink-700">
                    100+
                  </Text>
                  <Text size="sm" c="dimmed">
                    Online Appointment
                  </Text>
                </div>
              </Group>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <Image
                src="/images/doctor.png"
                alt="Doctors Team"
                width={400}
                height={400}
                className="rounded-xl shadow-lg object-contain bg-white"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Hero Section (Carousel) */}
      <Container size="xl">
        <Carousel slideSize="100%" slideGap="md" withIndicators loop>
          <Carousel.Slide className="w-full h-full">
            <Image src="/images/3.png" alt="Healthcare service 1" />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src="/images/2.jpg" alt="Healthcare service 2" />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src="/images/1.png" alt="Healthcare service 3" />
          </Carousel.Slide>
        </Carousel>
      </Container>

      {/* Dịch vụ nổi bật */}
      <Container size="xl" py="xl">
        <Title order={2} mb="lg">
          Dịch vụ nổi bật / Featured Services
        </Title>
        <Grid>
          {[
            { title: "Khám tổng quát", en: "General Checkup" },
            { title: "Chuyên khoa", en: "Specialty Clinics" },
            { title: "Khám online", en: "Online Consultation" },
            { title: "Xét nghiệm tại nhà", en: "Home Lab Test" },
          ].map((service) => (
            <Grid.Col span={6} key={service.title}>
              <Card withBorder shadow="sm" p="md">
                <Title order={4}>{service.title}</Title>
                <Text size="sm" color="dimmed">
                  {service.en}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      {/* Quy trình khám bệnh */}
      <Container size="xl" py="xl">
        <Title order={2} mb="lg">
          Quy trình khám bệnh / Booking Steps
        </Title>
        <Stepper active={-1} orientation="horizontal">
          <Stepper.Step
            label="Bước 1"
            description="Chọn chuyên khoa / Select department"
          />
          <Stepper.Step
            label="Bước 2"
            description="Chọn bác sĩ / Choose doctor"
          />
          <Stepper.Step
            label="Bước 3"
            description="Chọn thời gian / Pick time"
          />
          <Stepper.Step label="Bước 4" description="Xác nhận / Confirm" />
        </Stepper>
      </Container>

      {/* Đội ngũ bác sĩ */}
      <Container size="xl" py="xl">
        <Title order={2} mb="lg">
          Đội ngũ bác sĩ / Our Doctors
        </Title>
        <Grid>
          {[1, 2, 3].map((id) => (
            <Grid.Col span={4} key={id}>
              <Card withBorder shadow="sm" p="md">
                <Group>
                  <Avatar
                    radius="xl"
                    size="lg"
                    src={`https://randomuser.me/api/portraits/men/${id}.jpg`}
                  />
                  <div>
                    <Text fw={500}>BS. Nguyễn Văn A</Text>
                    <Text size="xs" color="dimmed">
                      Chuyên khoa Nội / Internal Medicine
                    </Text>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      {/* Đánh giá từ bệnh nhân */}
      <Container size="xl" py="xl">
        <Title order={2} mb="lg">
          Đánh giá / Reviews
        </Title>
        <Grid>
          {[1, 2, 3].map((id) => (
            <Grid.Col span={4} key={id}>
              <Card shadow="sm" withBorder>
                <Text mb="xs">"Dịch vụ rất tốt, bác sĩ thân thiện."</Text>
                <Text size="sm" color="dimmed">
                  "Very good service, friendly doctor."
                </Text>
                <Rating value={5} readOnly mt="sm" />
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      {/* CTA cuối trang */}
      <Container size="xl" py="xl" ta="center">
        <Title order={2}>Sẵn sàng để đặt lịch? / Ready to book?</Title>
        <Button mt="md" color="teal" size="lg">
          Đặt lịch ngay / Book Now
        </Button>
      </Container>
    </>
  );
}

HomePage.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;
