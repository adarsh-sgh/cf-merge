import { ConfigProvider, Typography, theme } from "antd";
import "./App.css";
import HandleForm from "./component/HandleForm";
const { Text, Title } = Typography;
function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className="page-intro">
        <header className="App-header">
          <Title>Merge Profiles</Title>
        </header>
        <Text>Enter multiple codeforces account to merge </Text>
        <br />
        <Text>Generated link will point to highest rated account</Text>
      </div>
      <HandleForm />
    </ConfigProvider>
  );
}

export default App;
