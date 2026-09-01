import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Hr,
  Link,
} from "@react-email/components";
import { t } from "./theme";

export default function ContactNotification({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>{`${name}, via the portfolio wire: ${message.slice(0, 70)}`}</Preview>
      <Body style={{ margin: 0, backgroundColor: t.bg, fontFamily: t.font, color: t.fg }}>
        <Container style={{ maxWidth: 560, padding: "40px 24px" }}>
          <Text
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: t.muted,
              fontFamily: t.mono,
              margin: "0 0 12px",
            }}
          >
            ● iwanbraun.dev — inbound
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
            Someone wants to work with you
          </Text>
          <Container style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, padding: "20px 20px" }}>
            <Text style={{ fontSize: 15, lineHeight: "24px", whiteSpace: "pre-wrap" as const, margin: 0 }}>
              {message}
            </Text>
          </Container>
          <Hr style={{ borderColor: t.border, margin: "28px 0" }} />
          <Text style={{ fontSize: 13, color: t.muted, margin: 0 }}>
            {name} ·{" "}
            <Link href={`mailto:${email}`} style={{ color: t.accent }}>
              {email}
            </Link>{" "}
            — reply lands directly with them.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
