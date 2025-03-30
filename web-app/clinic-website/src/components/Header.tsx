import classes from "@/styles/HeaderTabs.module.css";
import {
  Avatar,
  Burger,
  Container,
  Group,
  Menu,
  Tabs,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import cx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const user = {
  name: "Hao Nguyen",
  email: "janspoon@fighter.dev",
  image:
    "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/475712132_2092450211235754_2570560166146676736_n.jpg?stp=cp6_dst-jpg_s160x160_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Dt4CutXDCZgQ7kNvgF98TWh&_nc_oc=Adme_O9oD7OBqb4zRdU0Q4oDsWctzLGV02HSbA7JrqFUVREUX8g3WH_fqc-15Sm6G6g&_nc_zt=24&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=LSemaRbiTYiayXBTvWVMEw&oh=00_AYFS3ToytnV88vhcau0TLwYwJFxV5XgqdYNm8R9yOMk6Iw&oe=67EC6C8E",
};

const tabs = [
  { label: "Trang chủ", value: "/" },
  { label: "Đặt lịch khám", value: "/booking" },
  { label: "Hướng dẫn", value: "/guide" },
  { label: "Liên hệ", value: "/contact" },
];
export function HeaderTabs() {
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const router = useRouter();
  const toggleMenu = () => setUserMenuOpened((prev) => !prev);
  const closeMenu = () => setUserMenuOpened(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between">
          <UnstyledButton>
            <Text fw={500} size="sm" lh={1} mr={3}>
              SmartHealth
            </Text>
          </UnstyledButton>

          {/* Menu for Tab Start */}
          <Menu
            width={200}
            shadow="md"
            onClose={() => setUserMenuOpened(false)}
          >
            <Menu.Target>
              <Burger
                opened={userMenuOpened}
                onClick={toggleMenu}
                hiddenFrom="xs"
                size="sm"
              />
            </Menu.Target>

            <Menu.Dropdown>
              {tabs.map((tab) => (
                <Menu.Item
                  key={tab.value}
                  component={Link}
                  href={`${tab.value}`}
                  onClick={closeMenu}
                >
                  {tab.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
          {/* Menu for Tab END */}

          {/* Menu for avatar Start */}
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Avatar
                    src={user.image}
                    alt={user.name}
                    radius="xl"
                    size={20}
                  />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    size={16}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    size={16}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    size={16}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                Account settings
              </Menu.Item>
              <Menu.Item
                leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}
              >
                Change account
              </Menu.Item>
              <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>
                Logout
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                leftSection={<IconPlayerPause size={16} stroke={1.5} />}
              >
                Pause subscription
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={16} stroke={1.5} />}
              >
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          {/* Menu for avatar END */}
        </Group>
      </Container>
      <Container size="xl">
        <Tabs
          value={router.pathname}
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>
            {tabs.map((tab) => (
              <Link href={tab.value} key={tab.value} legacyBehavior passHref>
                <Tabs.Tab component="a" value={tab.value}>
                  {tab.label}
                </Tabs.Tab>
              </Link>
            ))}
          </Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}
