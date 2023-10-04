import { Typography } from "antd";
import { ResolvedData } from "../types/data";
const { Link, Text, Paragraph } = Typography;

export default function Result({
  url,
  short,
  rate_limit,
  rate_limit_reset,
}: ResolvedData) {
  return (
    <>
      <Text type="success"> Merged Profiles {url}</Text>
      <br />
      <Link copyable href={short} target="_blank">
        {short}
      </Link>
      <br />
      <Paragraph type="secondary">
        You can Merge profiles {rate_limit} more times before rate limit resets
        after {rate_limit_reset} minutes.
      </Paragraph>
    </>
  );
}
