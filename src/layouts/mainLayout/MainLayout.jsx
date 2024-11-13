import React from "react";
import { Layout } from "antd";
import LeftSidbar from "../../components/common/LeftSidbar";
import MainContent from "../../components/common/MainContent";
const { Sider, Header, Content } = Layout;

function MainLayout({ children }) {
  return (
    <Layout>
      <Header>
        <CustomHeader />
      </Header>
      <Content>
        <LeftSidbar />
        <MainContent />
        <RightSidbar />
      </Content>
    </Layout>
  );
}

export default MainLayout;
