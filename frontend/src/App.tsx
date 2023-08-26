import { ConfigProvider, theme } from "antd";
import "./App.css";
import HandleForm from "./component/HandleForm";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <HandleForm />
    </ConfigProvider>
  );
}

export default App;
