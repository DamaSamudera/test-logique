import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { ConfigProvider } from "antd";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7b34dd",
            borderRadius: 4,
          },
        }}
      >
        <Router />
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
