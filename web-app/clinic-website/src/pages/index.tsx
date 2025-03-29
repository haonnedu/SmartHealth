import UserLayout from "@/layouts/UserLayout";
import { Carousel } from "@mantine/carousel";
import {
  Container,
  Title,
  Text,
  Button,
  Grid,
  Card,
  Group,
  Avatar,
  Stepper,
  Rating,
  Image,
} from "@mantine/core";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Container size="xl">
        <Carousel slideSize="100%" slideGap="md" withIndicators loop>
          <Carousel.Slide className="w-full h-full">
            <Image src="./images/3.png" />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src="./images/2.jpg" />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src="./images/1.png" />
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
                <Text mb="xs">“Dịch vụ rất tốt, bác sĩ thân thiện.”</Text>
                <Text size="sm" color="dimmed">
                  “Very good service, friendly doctor.”
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
