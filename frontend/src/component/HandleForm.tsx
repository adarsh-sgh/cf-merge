import { Button, Form, Select } from "antd";
import { getMergedLinks } from "../utils/links";

export default function HandleForm() {
  return (
    <Form
      onFinish={async value => {
        console.log(value);
        const data = await getMergedLinks(value.handles);
        console.log(data);
      }}
    >
      <Form.Item label="Handles" name="handles">
        <Select
          mode="tags"
          style={{ width: "100%", minWidth: "300px" }}
          tokenSeparators={[",", " "]}
          placeholder="Type comma-separated handles"
          dropdownStyle={{ display: "none" }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Merge Profiles
        </Button>
      </Form.Item>
    </Form>
  );
}
