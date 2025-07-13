"use client";

import axiosInstance from "@/lib/axios-instance";
import { Box, Button, LoadingOverlay, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

interface SubDataPopupProps {
  data?: any;
  opened?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onSubmit?: (values: any) => void;
}

const SubDataPopup: React.FC<SubDataPopupProps> = ({
  data = {},
  opened = false,
  onClose = () => {},
  onSubmit = (values: any) => {},
}) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
      mode: "controlled",
      initialValues: {
        masterDataCode: data?.masterDataCode || "",
        subDataCode: data?.subDataCode || "",
        subDataName: data?.subDataName || "",
        sortNo: data?.sortNo || 0,
      },
      validate: {
        masterDataCode: (value: string) => {
          if (!value) return "Mã loại dữ liệu không được để trống";
          if (value.length > 20) return "Mã loại dữ liệu không được quá 20 ký tự";
          return null;
        },
        subDataCode: (value: string) => {
          if (!value) return "Mã loại dữ liệu con không được để trống";
          if (value.length > 20) return "Mã loại dữ liệu con không được quá 20 ký tự";
          return null;
        },
        subDataName: (value: string) => {
          if (!value) return "Tên loại dữ liệu con không được để trống";
          if (value.length > 200)
            return "Tên loại dữ liệu không được quá 200 ký tự";
          return null;
        },
        sortNo: (value: number) => {
          if (value < 0) return "Số thứ tự không được nhỏ hơn 0";
          if (value > 999) return "Số thứ tự không được lớn hơn 999";
          return null;
        },
      },
    });

  const title =
    (!data?.subDataCode ? "Thên Mới" : "Cập Nhật") + " Dữ Liệu Con ";
  const isEditMode = !!data?.subDataCode;

  useEffect(() => {
      if (opened) {
        form.reset();
        form.setValues({
          masterDataCode: data?.masterDataCode || "",
          subDataCode: data?.subDataCode || "",
          subDataName: data?.subDataName || "",
          sortNo: data?.sortNo || 0,
        });
      }
    }, [data, opened]);
  
    useEffect(() => {
      if (opened) {
        setLoading(false);
      }
    }, [opened]);

  const handleOnSubmit = async (values: any) => {
    setLoading(true);
    try {
      let response;
      if (isEditMode) {
        response = await axiosInstance.patch(
          `/master-data/updateSubDataByCode/${data?.masterDataCode}/${data?.subDataCode}`,
          {
            ...values,
            masterDataCode: values.masterDataCode?.trim()?.toUpperCase(),
            subDataCode: values.subDataCode?.trim()?.toUpperCase(),
          }
        );
      } else {
        response = await axiosInstance.post(`/master-data/createSubData`, {
          masterDataCode: values.masterDataCode?.trim()?.toUpperCase(),
          subDataCode: values.subDataCode?.trim()?.toUpperCase(),
          subDataName: values.subDataName?.trim(),
          sortNo: values.sortNo,
        });
      }
      let status = response?.status || 500;
      console.log("Response status:", status);
      if ([200, 201].includes(status)) {
        notifications.show({
          title: "Thành công",
          message: "Dữ liệu đã được lưu thành công.",
          color: "green",
        });
        if (typeof onSubmit === "function") {
          onSubmit(values);
        }
        onClose?.();
      } else {
        notifications.show({
          title: "Lỗi",
          message: "Đã xảy ra lỗi khi lưu dữ liệu. Vui lòng thử lại sau.",
          color: "red",
        });
      }
    } catch (error: any) {
      if (error?.status == 400) {
        notifications.show({
          title: "Cảnh báo",
          message:
            error?.response?.data?.message ||
            "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
          color: "yellow",
        });
      } else {
        notifications.show({
          title: "Lỗi",
          message: "Đã xảy ra lỗi khi lưu dữ liệu. Vui lòng thử lại sau.",
          color: "red",
        });
      }
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size="md"
      centered
      style={{ position: "relative" }}
    >
      <Box
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "pink", type: "bars" }}
        />
      </Box>
      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
        <Stack justify="center" align="stretch" gap="sx">
          <TextInput
            withAsterisk
            size="sm"
            label="Mã Loại Dữ Liệu"
            placeholder="Nhập mã loại dữ liệu"
            {...form.getInputProps("masterDataCode")}
            readOnly={!!data?.masterDataCode}
            disabled={!!data?.masterDataCode}
            maxLength={20}
            autoFocus
          />
          <TextInput
            withAsterisk
            size="sm"
            label="Mã Loại Dữ Liệu Con"
            placeholder="Nhập mã loại dữ liệu Con"
            {...form.getInputProps("subDataCode")}
            readOnly={!!data?.subDataCode}
            maxLength={20}
            autoFocus
          />
          <TextInput
            withAsterisk
            size="sm"
            label="Tên Loại Dữ Liệu Con"
            placeholder="Nhập tên loại dữ liệu Con"
            {...form.getInputProps("subDataName")}
            maxLength={200}
          />
          <TextInput
            size="sm"
            label="Số Thứ Tự"
            placeholder="Nhập số thứ tự"
            {...form.getInputProps("sortNo")}
            type="number"
            description="Số thứ tự hiển thị, mặc định là 0"
          />
          <Button type="submit" variant="outline">
            Lưu dữ liệu
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default SubDataPopup;
