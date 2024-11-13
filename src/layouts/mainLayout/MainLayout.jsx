import React from "react";
import { Flex, Layout } from "antd";
import {
  CustomHeader,
  LeftSidbar,
  MainContent,
  RightSidbar,
} from "../../components/common";
import "./style.css";

const { Header, Content } = Layout;

function MainLayout({ children }) {
  return (
    <Layout>
      <Header className="header">
        <CustomHeader />
      </Header>
      <Content className="content">
        <Flex gap="large">
          <LeftSidbar />
          <MainContent />
          <RightSidbar />
        </Flex>
      </Content>
    </Layout>
  );
}

export default MainLayout;
