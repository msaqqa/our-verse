import { Flex, Menu, Space } from "antd";
import React from "react";
import "./style.css";
import { UserOutlined } from "@ant-design/icons";
import logo from "../../../assets/our-verse-logo.png";
import HomeIcon from "../../../assets/home-icon.svg?react";
import NetworkIcon from "../../../assets/network-icon.svg?react";
import CalendarIcon from "../../../assets/calendar-icon.svg?react";
import MessagingIcon from "../../../assets/messaging-icon.svg?react";
import NotificationIcon from "../../../assets/notification-icon.svg?react";

import { Input } from "antd";

function CustomHeader() {
  return (
    <header>
      <Flex gap="middle">
        <div>
          <img src={logo} alt="Logo" />
        </div>
        <Input placeholder="Search" prefix={<UserOutlined />} size="small" />
        <Menu mode="horizontal" className="menu">
          <Menu.Item key="1">
            <div className="itemStyle">
              <HomeIcon />
              <span>Home</span>
            </div>
          </Menu.Item>
          <Menu.Item key="2">
            <div className="itemStyle">
              <NetworkIcon />
              <span>Network</span>
            </div>
          </Menu.Item>
          <Menu.Item key="3">
            <div className="itemStyle">
              <CalendarIcon />
              <span>Calender</span>
            </div>
          </Menu.Item>
          <Menu.Item key="4">
            <div className="itemStyle">
              <MessagingIcon />
              <span>Masseging</span>
            </div>
          </Menu.Item>
          <Menu.Item key="5">
            <div className="itemStyle">
              <NotificationIcon />
              <span>Notifications</span>
            </div>
          </Menu.Item>
        </Menu>
      </Flex>
    </header>
  );
}

export default CustomHeader;
