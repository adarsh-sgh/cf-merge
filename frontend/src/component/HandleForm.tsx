import { Button, Form, Select } from "antd";
import { useState } from "react";
import { getMergedLinks } from "../utils/links";
import { ResolvedData } from "../types/data";
import Result from "./Result";

export default function HandleForm() {
  const [resolvedData, setResolvedData] = useState<ResolvedData>();
  return (
    <>
      <Form
        onFinish={async value => {
          console.log(value);
          const data = await getMergedLinks(value.handles);
          console.log(data);
          setResolvedData(data);
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
      {resolvedData?.url && <Result {...resolvedData} />}
    </>
  );
}
