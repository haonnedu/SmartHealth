import { BookingModal } from "@/components/frontSite/BookingModal";
import UserLayout from "@/layouts/UserLayout";
import {
  Container,
  Grid,
  NativeSelect,
  Text,
  Textarea,
  UnstyledButton,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

export default function BookingPage() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      {/* Popup booking */}
      <BookingModal opened={opened} onClose={close} />
      {/* Popup booking */}
      <Container size="xl" pt={20}>
        <Grid columns={24}>
          <Grid.Col span={{ base: 24, md: 12 }}>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NativeSelect
                  mt="md"
                  label="Chuyên Khoa"
                  data={["", "Phụ khoa", "Tim mạch", "Mắt", "Tổng quát"]}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NativeSelect
                  mt="md"
                  label="Bác Sĩ"
                  data={["", "Uy", "Uyên"]}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <NativeSelect
                  mt="md"
                  label="Ca"
                  data={["", "Sáng", "Chiều"]}
                  className=""
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NativeSelect
                  mt="md"
                  label="Tư vấn trực tiếp "
                  data={["Không", "Có"]}
                />
                <Text size="xs" c="dimmed" mt={2}>
                  Google Meet sẽ được gửi qua Gmail
                </Text>
              </Grid.Col>

              <Grid.Col span={12} mt={-10}>
                <DatePickerInput
                  mt="md"
                  valueFormat="DD/MM/YYYY"
                  label="Ngày"
                  placeholder="Ngày khám bệnh."
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Textarea
                  mt="md"
                  placeholder="Hãy cho chúng tôi biết triệu chứng cụ thể bạn đang gặp phải."
                  label="Chi tiết"
                  autosize
                  minRows={2}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea mt="md" label="Địa chỉ" autosize minRows={2} />
              </Grid.Col>
            </Grid>
          </Grid.Col>
          {/* Col 2 */}
          <Grid.Col
            span={{ base: 24, md: 12 }}
            className="border border-collapse border-solid mt-4 md:mt-0"
          >
            <Grid>
              <Grid.Col span={12}>
                <Text size="xl" ta="center" m={2}>
                  Chọn giờ
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <UnstyledButton
                  size="xl"
                  className="w-full flex justify-center items-center text-center !bg-green-200 hover:!bg-gray-300 rounded-md p-4"
                  onClick={open}
                >
                  10:00 - 12:00
                </UnstyledButton>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

BookingPage.getLayout = (page: React.ReactNode) => (
  <UserLayout>{page}</UserLayout>
);
