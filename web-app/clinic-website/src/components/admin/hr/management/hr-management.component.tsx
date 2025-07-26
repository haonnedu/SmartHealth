"use client";

import {
  TextInput, Select, Textarea, Grid, Button, FileInput, Title,
  Divider,
  Box,
  Collapse,
  Text
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconMinus, IconPlus } from '@tabler/icons-react';

export default function AdminHrManagementComponent() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <form>
        <Title order={5} mb="md">Thông tin cơ bản</Title>
        <Grid>
          <Grid.Col span={3}><TextInput label="Mã nhân viên" required /></Grid.Col>
          <Grid.Col span={3}><Select label="Vai trò" data={['Doctor', 'Nurse', 'Admin']} required /></Grid.Col>
          <Grid.Col span={3}><Select label="Chức danh" data={['Junior', 'Senior', 'Head']} /></Grid.Col>
          <Grid.Col span={3}><Select label="Phòng ban" data={['Cardiology', 'Pediatrics']} /></Grid.Col>

          <Grid.Col span={3}><Select label="Chuyên khoa" data={['ENT', 'Dermatology']} /></Grid.Col>
          <Grid.Col span={3}><TextInput label="Họ" required /></Grid.Col>
          <Grid.Col span={3}><TextInput label="Tên" /></Grid.Col>
          <Grid.Col span={3}><TextInput label="Họ tên cha" /></Grid.Col>

          <Grid.Col span={3}><TextInput label="Họ tên mẹ" /></Grid.Col>
          <Grid.Col span={3}><Select label="Giới tính" data={['Nam', 'Nữ', 'Khác']} required /></Grid.Col>
          <Grid.Col span={3}><Select label="Tình trạng hôn nhân" data={['Độc thân', 'Đã kết hôn']} /></Grid.Col>
          <Grid.Col span={3}><Select label="Nhóm máu" data={['A+', 'O-', 'AB+']} /></Grid.Col>

          <Grid.Col span={3}><DateInput label="Ngày sinh" required /></Grid.Col>
          <Grid.Col span={3}><DateInput label="Ngày vào làm" /></Grid.Col>
          <Grid.Col span={3}><TextInput label="Số điện thoại" /></Grid.Col>
          <Grid.Col span={3}><TextInput label="Liên hệ khẩn cấp" /></Grid.Col>

          <Grid.Col span={6}><TextInput label="Email" type="email" required /></Grid.Col>
          <Grid.Col span={6}><FileInput label="Ảnh" placeholder="Kéo thả tệp hoặc nhấn để chọn" /></Grid.Col>

          <Grid.Col span={6}><Textarea label="Địa chỉ hiện tại" /></Grid.Col>
          <Grid.Col span={6}><Textarea label="Địa chỉ thường trú" /></Grid.Col>

          <Grid.Col span={4}><TextInput label="Trình độ học vấn" /></Grid.Col>
          <Grid.Col span={4}><TextInput label="Kinh nghiệm làm việc" /></Grid.Col>
          <Grid.Col span={4}><TextInput label="Chuyên môn" /></Grid.Col>

          <Grid.Col span={12}><Textarea label="Ghi chú" /></Grid.Col>

          <Grid.Col span={4}><TextInput label="Số PAN" /></Grid.Col>
          <Grid.Col span={4}><TextInput label="Số CMND/CCCD" /></Grid.Col>
          <Grid.Col span={4}><TextInput label="Số định danh địa phương" /></Grid.Col>

          <Grid.Col span={12}><TextInput label="Người giới thiệu" /></Grid.Col>
        </Grid>

        <Box mt="xl">
          <div className="flex justify-between items-center">
            <Title order={5} mb="md">Thông tin chi tiết</Title>
            <Button variant="outline" size="xs" radius="xs" onClick={toggle}>
              {opened ? <IconMinus size={16} /> : <IconPlus size={16} />}
            </Button>
          </div>

          <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear">
            {/* Lương */}
            <Divider label="Lương" labelPosition="left" mt="md" mb="sm" />
            <Grid>
              <Grid.Col span={4}><TextInput label="Số EPF" /></Grid.Col>
              <Grid.Col span={4}><TextInput label="Lương cơ bản" /></Grid.Col>
              <Grid.Col span={4}><Select label="Loại hợp đồng" data={['Full-time', 'Part-time', 'Contract']} /></Grid.Col>
              <Grid.Col span={6}><TextInput label="Ca làm việc" /></Grid.Col>
              <Grid.Col span={6}><TextInput label="Địa điểm làm việc" /></Grid.Col>
            </Grid>

            {/* Nghỉ phép */}
            <Divider label="Thông tin nghỉ phép" labelPosition="left" mt="md" mb="sm" />
            <Grid>
              <Grid.Col span={2}><TextInput label="Nghỉ phép thường" placeholder="Số ngày nghỉ" /></Grid.Col>
              <Grid.Col span={2}><TextInput label="Nghỉ phép ưu đãi" placeholder="Số ngày nghỉ" /></Grid.Col>
              <Grid.Col span={2}><TextInput label="Nghỉ bệnh" placeholder="Số ngày nghỉ" /></Grid.Col>
              <Grid.Col span={2}><TextInput label="Nghỉ ốm" placeholder="Số ngày nghỉ" /></Grid.Col>
              <Grid.Col span={2}><TextInput label="Nghỉ thai sản" placeholder="Số ngày nghỉ" /></Grid.Col>
              <Grid.Col span={2}><TextInput label="Nghỉ thai sản (nam)" placeholder="Số ngày nghỉ" /></Grid.Col>
            </Grid>

            {/* Ngân hàng */}
            <Divider label="Thông tin tài khoản ngân hàng" labelPosition="left" mt="md" mb="sm" />
            <Grid>
              <Grid.Col span={3}><TextInput label="Tên tài khoản" /></Grid.Col>
              <Grid.Col span={3}><TextInput label="Số tài khoản" /></Grid.Col>
              <Grid.Col span={3}><TextInput label="Tên ngân hàng" /></Grid.Col>
              <Grid.Col span={3}><TextInput label="Mã IFSC" /></Grid.Col>
              <Grid.Col span={6}><TextInput label="Chi nhánh ngân hàng" /></Grid.Col>
            </Grid>

            {/* Mạng xã hội */}
            <Divider label="Mạng xã hội" labelPosition="left" mt="md" mb="sm" />
            <Grid>
              <Grid.Col span={3}><TextInput label="Facebook URL" /></Grid.Col>
              <Grid.Col span={3}><TextInput label="Twitter URL" /></Grid.Col>
              <Grid.Col span={3}><TextInput label="LinkedIn URL" /></Grid.Col>
              <Grid.Col span={3}><TextInput label="Instagram URL" /></Grid.Col>
            </Grid>

            {/* Tài liệu */}
            <Divider label="Tải lên tài liệu" labelPosition="left" mt="md" mb="sm" />
            <Grid>
              <Grid.Col span={6}>
                <Text size="xs">1. Sơ yếu lý lịch</Text>
                <FileInput placeholder="Kéo thả tệp hoặc nhấn để chọn" />
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="xs">2. Thư nhận việc</Text>
                <FileInput placeholder="Kéo thả tệp hoặc nhấn để chọn" />
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="xs">3. Thư xin nghỉ việc</Text>
                <FileInput placeholder="Kéo thả tệp hoặc nhấn để chọn" />
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="xs">4. Tài liệu khác</Text>
                <FileInput placeholder="Kéo thả tệp hoặc nhấn để chọn" />
              </Grid.Col>
            </Grid>
          </Collapse>
        </Box>

        <div className="flex justify-center gap-2 my-4">
          <Button variant="outline" type="submit" size="xs" radius="xs" leftSection={<IconEdit size={16} />}>
            Lưu
          </Button>
        </div>
      </form>
    </>
  );
}
