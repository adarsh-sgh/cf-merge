import { Button, Form, Select, Typography } from "antd";
import { useState } from "react";
import { ResolvedData } from "../types/data";
import { getMergedLinks } from "../utils/links";
import Result from "./Result";
const { Text } = Typography;
export default function HandleForm() {
  const [resolvedData, setResolvedData] = useState<ResolvedData>();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <>
      <Form
        onFinish={async value => {
          setLoading(true);
          setErr(null);
          setResolvedData(undefined);
          try {
            const data = await getMergedLinks(value.handles);
            setResolvedData(data);
          } catch (e) {
            if (e instanceof ErrorEvent) {
              setErr(e.message || "Something went wrong");
            } else {
              setErr("Something went wrong");
            }
          }
          setLoading(false);
        }}
      >
        <Form.Item label="Handles" name="handles">
          <Select
            mode="tags"
            style={{ width: "100%", minWidth: "300px" }}
            tokenSeparators={[",", " "]}
            placeholder="Type comma-separated handles"
            dropdownStyle={{ display: "none" }}
            suffixIcon={null}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Merge Profiles
          </Button>
        </Form.Item>
      </Form>
      {resolvedData?.url && <Result {...resolvedData} />}
      {err && <Text type="danger">{err}</Text>}
    </>
  );
}
