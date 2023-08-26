import { Button, Form, Select } from "antd";

export default function HandleForm() {
  return (
    <Form
      onFinish={value => {
        console.log(value);
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
