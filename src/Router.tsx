import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import { Layout } from "antd";
import Music from "./Pages/Music/Music";

const Router = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Content style={{ padding: "0 25rem" }}>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music/:search" element={<Music />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Layout.Content>
      <Layout.Footer
        style={{
          height: "3rem",
          position: "sticky",
          bottom: 0,
          textAlign: "center",
        }}
      >
        ©{new Date().getFullYear()} Created by Dama Samudera
      </Layout.Footer>
    </Layout>
  );
};

export default Router;
