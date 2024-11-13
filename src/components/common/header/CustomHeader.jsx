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
  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
      className: "itemStyle",
    },
    {
      key: "2",
      icon: (
        <div>
          <span className="icon-num">4</span>
          <UserOutlined />
        </div>
      ),
      label: "Network",
      className: "itemStyle",
    },
    {
      key: "3",
      icon: (
        <div>
          <span className="icon-num">2</span>
          <CalendarOutlined />
        </div>
      ),
      label: "Calender",
      className: "itemStyle",
    },
    {
      key: "4",
      icon: (
        <div>
          <span className="icon-num">3</span>
          <MessageOutlined />
        </div>
      ),
      label: "Masseging",
      className: "itemStyle",
    },
    {
      key: "5",
      icon: (
        <div>
          <span className="icon-num">3</span>
          <NotificationOutlined />
        </div>
      ),
      label: "Notifications",
      className: "itemStyle",
    },
  ];
  return (
    <Flex align="crnter" gap="3rem">
      <div>
        <Image
          align="center"
          justify="space-between"
          src={logo}
          alt="Logo"
          width={200}
          height={50}
        />
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
        items={menuItems}
      ></Menu>
      <Flex vertical align="center">
        <Avatar icon={<UserOutlined />} shape="circle" size={24} />
        <span className="profileIcon">Profile</span>
      </Flex>
    </Flex>
  );
}

export default CustomHeader;
