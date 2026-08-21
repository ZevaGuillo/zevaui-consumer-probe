// A small but honest consumer: one ordinary import, one ASI-style import
// (no semicolon — Prettier `semi: false` style), and one commented-out decoy
// that must never reach the report.
import { Button, Card } from "@zevaui/components";
import { Badge } from "@zevaui/components"

// import { Ghost } from "@zevaui/components";

export function App() {
  return (
    <Card>
      <Badge tone="info">ok</Badge>
      <Button>Click</Button>
    </Card>
  );
}
