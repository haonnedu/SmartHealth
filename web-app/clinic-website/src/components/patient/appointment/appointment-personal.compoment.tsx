"use client";

import { Card, Grid, Group, Image, Text } from "@mantine/core";

const PADDING_FIELD_DETAIL = 10;

export default function AppointmentPersonalComponent() {
  return (
    <Card withBorder radius={"md"} className={"p-10"}>
      <Card.Section>
        <div 
          className={"flex items-center justify-center"}
          >
          <Image 
            style={{ width: 120 }}
            className={"mx-auto block rounded-full"} 
            src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"} 
          />
        </div>
      </Card.Section>

      <Card.Section mt="md">
        <Group justify="center">
          <Text fz="lg" fw={500}>
            {"Thông tin cá nhân"}
          </Text>
        </Group>
      </Card.Section>

      <Card.Section mt="md">
        <Grid pt={PADDING_FIELD_DETAIL} pb={PADDING_FIELD_DETAIL} className={"border-b border-gray-300"}>
          <Grid.Col span={{ base: 12, xs: 4 }}>ID</Grid.Col>
          <Grid.Col className={"text-blue-500 text-right"} span={{ base: 12, xs: 8 }}>30</Grid.Col>
        </Grid>
        <Grid pt={PADDING_FIELD_DETAIL} pb={PADDING_FIELD_DETAIL} className={"border-b border-gray-300"}>
          <Grid.Col span={{ base: 12, xs: 4 }}>Giới Tính</Grid.Col>
          <Grid.Col className={"text-blue-500 text-right"} span={{ base: 12, xs: 8 }}>Name</Grid.Col>
        </Grid>
        <Grid pt={PADDING_FIELD_DETAIL} pb={PADDING_FIELD_DETAIL} className={"border-b border-gray-300"}>
          <Grid.Col span={{ base: 12, xs: 4 }}>Trạng Thái</Grid.Col>
          <Grid.Col className={"text-blue-500 text-right"} span={{ base: 12, xs: 8 }}></Grid.Col>
        </Grid>
        <Grid pt={PADDING_FIELD_DETAIL} pb={PADDING_FIELD_DETAIL} className={"border-b border-gray-300"}>
          <Grid.Col span={{ base: 12, xs: 4 }}>Điện Thoại</Grid.Col>
          <Grid.Col className={"text-blue-500 text-right"} span={{ base: 12, xs: 8 }}>0329 123 456</Grid.Col>
        </Grid>
        <Grid pt={PADDING_FIELD_DETAIL} pb={PADDING_FIELD_DETAIL} className={"border-b border-gray-300"}>
          <Grid.Col span={{ base: 12, xs: 4 }}>E-mail</Grid.Col>
          <Grid.Col className={"text-blue-500 text-right"} span={{ base: 12, xs: 8 }}>appointment@gmail.com</Grid.Col>
        </Grid>
        <Grid pt={PADDING_FIELD_DETAIL} pb={PADDING_FIELD_DETAIL} className={"border-b border-gray-300"}>
          <Grid.Col span={{ base: 12, xs: 4 }}>Địa Chỉ</Grid.Col>
          <Grid.Col className={"text-blue-500 text-right"} span={{ base: 12, xs: 8 }}>19A Đ. Cộng Hòa, Phường 12, Tân Bình, Hồ Chí Minh</Grid.Col>
        </Grid>
        <Grid pt={PADDING_FIELD_DETAIL} pb={PADDING_FIELD_DETAIL} className={"border-b border-gray-300"}>
          <Grid.Col span={{ base: 12, xs: 4 }}>Tuổi</Grid.Col>
          <Grid.Col className={"text-blue-500 text-right"} span={{ base: 12, xs: 8 }}>40</Grid.Col>
        </Grid>
        <Grid pt={PADDING_FIELD_DETAIL} pb={PADDING_FIELD_DETAIL}>
          <Grid.Col span={{ base: 12, xs: 4 }}>Tên</Grid.Col>
          <Grid.Col className={"text-blue-500 text-right"} span={{ base: 12, xs: 8 }}></Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  )
}