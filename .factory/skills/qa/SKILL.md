---
name: qa
description: >
  Run QA tests for MarkusAI. Analyzes git diff to determine affected areas,
  runs configured test flows with multiple personas, and generates diff-targeted tests.
  Uses agent-browser for web testing. Use when testing PRs, releases, or smoke testing environments.
---

# QA Orchestrator

**SCOPE: This skill performs manual/functional QA only -- verifying that the application actually works by interacting with it as a real user would (browser, API calls). Do NOT run or report on CI checks, linting, ESLint, typecheck, unit tests, or any static analysis. Those are handled by separate workflows.**

## Step 1: Load Configuration

Read `.factory/skills/qa/config.yaml` for environment URLs, credentials, personas, and app definitions.

## Step 2: Determine Target Environment

Use the default_target from config unless the user specifies a different environment. The default is `local` at `http://localhost:8000`.

**Before testing, ensure the dev server is running.** If `http://localhost:8000` is not responding:
1. Run `composer run dev` in the background (starts PHP server + queue worker + Vite)
2. Wait for the server to respond (poll localhost:8000 for up to 30 seconds)
3. If it fails to start, report as BLOCKED with instructions

## Step 3: Analyze Git Diff

Run `git diff` to determine what changed. Map changed files to apps using the path_patterns in config.yaml.

The web app covers ALL path patterns:
- `app/**` -- PHP backend code (controllers, models, services, actions, jobs)
- `resources/js/**` -- React frontend (pages, components, hooks, types)
- `routes/**` -- Route definitions
- `config/**` -- Configuration files
- `database/**` -- Migrations, factories, seeders
- `public/**` -- Public assets

Files that don't match ANY app's path_patterns (e.g., `.factory/skills/**`, `docs/**`, `README.md`, `.gitignore`) are NOT associated with any app. Do NOT run app test flows for them.

For the web app (affected):

- Run relevant flows from `.factory/skills/qa-web/SKILL.md`
- Generate ADDITIONAL targeted tests based on the specific changes in the diff

If NO app is affected by the diff (e.g., docs-only or config-only changes), report as INCONCLUSIVE: "No app code changed -- QA not applicable for this diff."

## Step 4: Pre-flight Checks

Before running any tests:

1. **Dev server check:** Verify `http://localhost:8000` responds. If not, start it with `composer run dev` in the background.
2. **Queue worker check:** The dev command starts a queue worker. Verify it's running (needed for draft generation jobs).
3. **Database state:** Run `php artisan migrate:fresh` to reset the database to a clean state before testing.

If a pre-flight check fails, report it as BLOCKED with the specific error and remediation steps.

## Step 5: Execute Diff-Relevant Flows Only

Read the sub-skill from `.factory/skills/qa-web/SKILL.md`.

The sub-skill contains a MENU of available test flows. You must:

1. Read the diff carefully and identify which flows are relevant to the change
2. Run those flows PLUS any adjacent flows that verify the change integrates correctly
3. Do NOT run completely unrelated flows
4. If no existing flow covers the change, write a NEW ad-hoc test that directly verifies the changed behavior
5. Do NOT run unit tests, lint, typecheck, or any automated test suite

## Step 6: Evidence Capture

After each significant test step, capture evidence using agent-browser:

- Use `agent-browser snapshot` to capture the page's accessibility tree as text evidence
- Save screenshot files to `./qa-results/$RUN_ID/` for artifact upload
- Do NOT embed `![image](url)` markdown in the report -- screenshot images cannot be displayed inline in GitHub PR comments
- Reference screenshot filenames and note they are available in downloadable artifacts

Evidence quality rules:

- Focus on RELEVANT content. Trim snapshots to the meaningful part.
- Label each snapshot clearly: what it shows and why it matters.
- NEVER embed broken image links.

## Step 7: Test Quality Gate

TEST QUALITY REQUIREMENTS:

1. CHANGE-SPECIFIC FIRST. Prioritize tests that directly verify the behavioral change in the diff.
2. INTEGRATION TESTS ARE VALID. Tests verifying the change integrates correctly with existing features.
3. NO UNRELATED FLOWS. Do NOT test features completely unrelated to the diff.
4. NO AUTOMATED TEST SUITES. Do NOT run Pest, PHPUnit, npm test, or any CI-style checks.
5. NEGATIVE TESTS. Include at least 1 test verifying error handling or boundary conditions.
6. INTERACTIVE TESTING. Test by actually interacting with the app as a real user would.
7. INCONCLUSIVE IF UNSURE. If you cannot articulate what the PR changes, mark as INCONCLUSIVE.

## Step 8: Handle Failures

**Never silently skip a flow.** If a flow cannot complete, report it as BLOCKED with what was tried and how the user can fix it. Then continue to the next flow -- never abort the entire run for a single failure.

## Step 9: Generate Report

Generate the report at `./qa-results/report.md` using `.factory/skills/qa/REPORT-TEMPLATE.md`.

The report MUST follow the template. Key rules:

- Start with `## QA Report` heading followed by the test results table
- Result column MUST use emojis: :white_check_mark: PASS, :x: FAIL, :no_entry: BLOCKED, :warning: FLAKY, :grey_question: INCONCLUSIVE
- Keep it CONCISE. Table + short "Action Required" section + collapsed screenshots.
- Do NOT include verbose explanations of what the diff does.
- Do NOT report setup/prerequisite steps as test rows.
- Put ALL evidence in a single collapsed `<details>` block.
- For web evidence: embed accessibility tree snapshots as text. Reference screenshot filenames for visual proof.

## Step 10: Suggest Skill Updates (Failure Learning)

After generating the report, check if any BLOCKED or FAIL results revealed a **testing environment insight** that would help future QA runs succeed.

Since `failure_learning` is `auto_commit`, the workflow MUST:

1. Include the suggestion table in the report
2. Write a `qa-results/skill-updates.json` file with structured edits

**`skill-updates.json` format:**

```json
[
  {
    "file": ".factory/skills/qa-web/SKILL.md",
    "section": "Known Failure Modes",
    "action": "append",
    "content": "<markdown to append>"
  }
]
```

Fields:
- `file`: relative path to the skill file to edit
- `section`: the markdown heading to find
- `action`: `append` or `replace`
- `content`: the exact markdown to insert

The workflow will parse this file and apply the edits, then commit directly.

Format the suggestions table:

## Suggested Skill Updates (N issues found)

| #   | Severity        | File     | Issue               | Fix Prompt                                                                           |
| --- | --------------- | -------- | ------------------- | ------------------------------------------------------------------------------------ |
| 1   | <emoji> <level> | `<file>` | <short description> | <details><summary>Copy</summary><br>`<full droid prompt to fix>`</details> |

**Severity levels:**
- `🔴 Breaking` -- Causes test failures every run
- `🟡 Degraded` -- Causes intermittent failures
- `🔵 Info` -- New knowledge that improves future runs

Do NOT suggest updates for failures already covered in Known Failure Modes, bad selectors, or expected behavior changes from the PR.
