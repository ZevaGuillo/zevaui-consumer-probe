# zevaui-consumer-probe

Minimal external consumer of ZevaUI's reusable usage-audit workflow.

Exists to prove cross-repository resolution of
`uses: ZevaGuillo/ZevaUI/.github/workflows/audit-ds-usage.yml@v1` — the one
path a same-repo self-invocation cannot cover (RF-UAW14, ADR-0009).

Expected report: `components: ["Badge", "Button", "Card"]`,
`dsVersion: "^0.1.0"` (`declared` — no lockfile, no install on purpose).
