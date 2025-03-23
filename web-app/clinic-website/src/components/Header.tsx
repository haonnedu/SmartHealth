import { useState } from "react";
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
import { useDisclosure } from "@mantine/hooks";
import classes from "@/styles/HeaderTabs.module.css";
import Link from "next/link";

const user = {
  name: "Hao Nguyen",
  email: "janspoon@fighter.dev",
  image:
    "https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/475712132_2092450211235754_2570560166146676736_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5bSAgiHOkxYQ7kNvgGg7K4S&_nc_oc=AdkIrTCFVE9bKB1a9-GKnGjA5RvAcZvj3BsykyIBgURiE7223CEwAwPRPNMw5mtdifY&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=gDvct4fnLk7Y8z5msWLk1Q&oh=00_AYEOysG4HJmmtBoAPWVXXSENy50VN2Rl4bqRUK29ptM70A&oe=67E49D90",
};

const tabs = [
  { label: "Trang chủ", value: "/" },
  { label: "Đặt lịch khám", value: "/booking" },
  { label: "Hướng dẫn", value: "/guide" },
  { label: "Liên hệ", value: "/contact" },
];
export function HeaderTabs() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between">
          <UnstyledButton>
            <Text fw={500} size="sm" lh={1} mr={3}>
              SmartHealth
            </Text>
          </UnstyledButton>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

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
        </Group>
      </Container>
      <Container size="xl">
        <Tabs
          defaultValue="/"
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
