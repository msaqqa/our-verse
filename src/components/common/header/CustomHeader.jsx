import { Avatar, Flex, Image, Menu } from "antd";
import React from "react";
import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import logo from "../../../assets/our-verse-logo.png";
import Search from "antd/es/input/Search";
import "./style.css";

function CustomHeader() {
  return (
    <Flex align="crnter" gap="3rem">
      <div>
        <Image align="center" src={logo} alt="Logo" width={200} />
      </div>
      <Search
        size="middle"
        allowClear
        style={{ display: "flex", alignItems: "center" }}
      />

      <Menu
        mode="horizontal"
        className="menu"
        defaultSelectedKeys={"1"}
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: "Home",
            className: "itemStyle",
          },
          {
            key: "2",
            icon: <UserOutlined />,
            label: "Network",
          },
          {
            key: "3",
            icon: <CalendarOutlined />,
            label: "Calender",
          },
          {
            key: "4",
            icon: <MessageOutlined />,
            label: "Masseging",
          },
          {
            key: "5",
            icon: <NotificationOutlined />,
            label: "Notifications",
          },
        ]}
      ></Menu>
      <Avatar icon={<UserOutlined />} size="small" shape="circle" />
    </Flex>
  );
}

export default CustomHeader;
