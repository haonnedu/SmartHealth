"use client";

import axiosInstance from "@/lib/axios-instance";
import {
  Box,
  Button,
  LoadingOverlay,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

interface MasterDataPopUpProps {
  data?: any;
  opened?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onSubmit?: (values: any) => void;
}

const MasterDataPopUp: React.FC<MasterDataPopUpProps> = ({
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
      masterDataName: data?.masterDataName || "",
      sortNo: data?.sortNo || 0,
      subDataDataCodeLength: data?.subDataDataCodeLength || 20,
    },
    validate: {

      masterDataCode: (value: string) => {
        if (!value) return "Mã loại dữ liệu không được để trống";
        if (value.length > 20) return "Mã loại dữ liệu không được quá 20 ký tự";
        return null;
      },
      masterDataName: (value: string) => {
        if (!value) return "Tên loại dữ liệu không được để trống";
        if (value.length > 200)
          return "Tên loại dữ liệu không được quá 200 ký tự";
        return null;
      },
      sortNo: (value: number) => {
        if (value < 0) return "Số thứ tự không được nhỏ hơn 0";
        if (value > 999) return "Số thứ tự không được lớn hơn 999";
        return null;
      },
      subDataDataCodeLength: (value: number) => {
        if (value < 1) return "Độ dài mã dữ liệu con phải lớn hơn 0";
        if (value > 20) return "Độ dài mã dữ liệu con không được quá 20 ký tự";
        return null;
      },
    },
  });

  const title =
    (!data?.masterDataCode ? "Thên Mới" : "Cập Nhật") + " Loại Dữ Liệu";
  const isEditMode = !!data?.masterDataCode;

  useEffect(() => {
    if (opened) {
      form.reset();
      form.setValues({
        masterDataCode: data?.masterDataCode || "",
        masterDataName: data?.masterDataName || "",
        sortNo: data?.sortNo || 0,
        subDataDataCodeLength: data?.subDataDataCodeLength || 20,
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
          `/master-data/updateMasterDataByCode/${data?.masterDataCode}`,
          {
            ...values,
            masterDataCode: values.masterDataCode?.trim()?.toUpperCase(),
          }
        );
      } else {
        response = await axiosInstance.post(`/master-data/createMasterData`, {
          masterDataCode: values.masterDataCode?.trim()?.toUpperCase(),
          masterDataName: values.masterDataName?.trim(),
          sortNo: values.sortNo,
          subDataDataCodeLength: values.subDataDataCodeLength,
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
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
            maxLength={20}
            autoFocus
          />
          <TextInput
            withAsterisk
            size="sm"
            label="Tên Loại Dữ Liệu"
            placeholder="Nhập tên loại dữ liệu"
            {...form.getInputProps("masterDataName")}
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
          <TextInput
            size="sm"
            label="Độ Dài Mã Dữ Liệu Con"
            placeholder="Nhập độ dài mã dữ liệu con"
            {...form.getInputProps("subDataDataCodeLength")}
            value={form.values.subDataDataCodeLength}
            type="number"
            description="Độ dài tối đa của mã dữ liệu con, mặc định là 20"
          />
          <Button type="submit" variant="outline">
            Lưu dữ liệu
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default MasterDataPopUp;
