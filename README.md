# zevaui-consumer-probe

Minimal external consumer of ZevaUI's reusable usage-audit workflow.

Exists to prove cross-repository resolution of
`uses: ZevaGuillo/ZevaUI/.github/workflows/audit-ds-usage.yml@v1` — the one
path a same-repo self-invocation cannot cover (RF-UAW14, ADR-0009).

Expected report: `components: ["Badge", "Button", "Card"]`,
`dsVersion: "^0.1.0"` (`declared` — no lockfile, no install on purpose).

## Why this repo has a `packageManager` field

It did not, until 2026-09-30, and that omission is the reason the probe was
green through work it should have had an opinion about.

`actions/setup-node@v5` defaults `package-manager-cache` to `true`, and on that
default it reads `$GITHUB_WORKSPACE/package.json`. Inside the reusable workflow
`$GITHUB_WORKSPACE` is THIS repository, not ZevaUI. A `packageManager` field
here therefore sends a job that deliberately installs no package manager off to
resolve a pnpm store. Without the field, that branch is never entered, and the
probe reports "green" for a shape no real pnpm consumer has.

So the field is now here, set to `pnpm@10.13.1` to match ZevaUI's own, and
there is deliberately **no lockfile** — the second of the two consumer shapes
the reusable workflow's own comment names. The probe is a canary, and a canary
that cannot inhale is furniture.

Consequence worth knowing: `ds-usage.yml` points at `@v1`, and `v1` is
currently on `actions/setup-node@v4`, which has no implicit caching. The probe
is green there. The moment `v1` moves onto a revision using `setup-node@v5`,
this repository's next run exercises the pnpm path for real. That is the point.

## What this probe does NOT cover

The workflow here passes no `with:` and no `permissions:`, by design — it
exercises every default. That means it only ever measures the first of the
three scenarios ZevaUI's `v1` tag annotation requires before the tag may move:

- covered: minimal caller, submission steps skipped, registry untouched.
- NOT covered: a caller granting `id-token: write` with `registry-url` set,
  expecting `201` and a readable row.
- NOT covered: the same caller with a deliberately wrong `app`, expecting
  `403 (identity_mismatch)`.

The submission path is `continue-on-error`, so a regression in it degrades to a
warning and a registry that silently receives nothing. A green run here is not
evidence about that path. Read the registry.

## `setup-node cache counterfactual`

A dispatch-only A/B harness (`.github/workflows/`) that reconstructs the broken
`setup-node@v5` shape locally, because no revision of ZevaUI ever published it:
the v4->v5 bump and the `package-manager-cache: false` that neutralises it
landed in the same commit. Two jobs, one input apart. `no-fix` is expected to
be red; that is why the harness never runs on a push.
