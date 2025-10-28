# Vibe Coding - 优秀文章&项目部分

## 优秀文章&项目

### 向大家分享个自己平时使用的codex的AGENTS.md，抛砖引玉

[点击访问原帖](https://linux.do/t/topic/1100437?u=zhongruan)
~~~
# AGENTS.md — Optimized & Claude Merge (English)

> Unified agent guidance: merges the original AGENTS optimized content with the “Claude Development Guide” philosophy, technical standards, and decision framework. The development-process section from the Claude guide (Implementation Flow / Planning & Staging) is intentionally excluded per request.

-–

## Summary

This document standardizes agent behaviors, tooling, and engineering principles across code and browser automation tasks. It balances pragmatic engineering practices (from the original AGENTS.md) with the clear philosophy, technical standards, and decision framework inspired by the Claude guide. Use this as the single source of truth for how to approach changes, automation, and quality control.

-–

## 1. Philosophy

### Core Beliefs

* **Incremental over big-bang**: Prefer small, compile-and-testable changes rather than large, risky rewrites.

* **Learn from existing code**: Study current designs and patterns before implementing changes.

* **Pragmatism over dogma**: Adapt rules to the project’s reality when warranted.

* **Clear intent > clever code**: Favor straightforward, easy-to-read implementations. Avoid cleverness that harms maintainability.

### Simplicity Means

* Single Responsibility: each function/class should have one clear responsibility.

* Avoid premature abstraction: only abstract when multiple concrete uses justify it.

* Prefer boring and reliable solutions over flashy, brittle techniques.

* If a piece of code requires extra explanation to be understood, it is likely too complex.

-–

## 2. Search & File Discovery

* **Prefer `rg` (ripgrep) over `grep`** for recursive code searches — it is faster, respects `.gitignore` by default, and supports modern features. Example: `rg -n “TODO” --hidden`.

* **Prefer `fd` over `find`** for concise file listing and filtering. Example: `fd --extension ts --hidden src/`.

* **Fallback**: When `rg`/`fd` are not available, use `grep`/`find` with safe flags. Example fallback: `find . -type f -name “*.py” -print0 | xargs -0 grep -n “TODO”`.

* **Limit scope**: Operate from the repository root and avoid scanning large external mounts.

-–

## 3. Code Reading & Diff

* **Prefer `bat`** for reading files with syntax highlighting.

* **Prefer `delta`** as the pager for diffs and `git` output.

* **Fallback**: Use `less -R` and `git diff --color` when necessary.

-–

## 4. Quality Gates (required before proposing changes)

* Always run, locally or in CI, in this order:

1. **lint** (e.g. `npm run lint`, `flake8 .`).

2. **type-check** (e.g. `mypy .`, `tsc --noEmit`).

3. **test** (e.g. `pytest`, `npm test`).

* **Block PRs** if checks fail. Add reproduction commands and CI excerpts to the PR description.

-–

## 5. Conventions

* Use consistent flags and document them (e.g. `rg -uu` when hidden files are required).

* Keep operations within the repo root; avoid external mounts.

* **Communication language:** All communication must be in **Simplified Chinese** (简体中文). Adaptation to another language is allowed only when explicitly requested by the team or project.

-–

## 6. Serena Toolchain (Tooling Requirements)

**High-level rule:** Use Serena helpers for code navigation and edits when available.

* **Activate project**: Call `serena__activate_project` at session start to set context.

* **Search & edit via helpers**: Use `find_symbol`, `search_for_pattern`, `apply_patch`, `replace_symbol_body`, etc.

* **Thinking guards**: Invoke `think_about_task_adherence` and `think_about_whether_you_are_done` before and after major steps.

* **Restart LSP**: Run `restart_language_server` if external edits appear or LSP state drifts.

**Typical sequence**:

1. `serena__activate_project`

2. `search_for_pattern(“pattern”)`

3. `find_symbol(“Name”)`

4. `apply_patch(…)`

5. `summarize_changes` and open PR

**Do not** edit files directly outside of Serena unless absolutely necessary — document reasons and restart the language server afterward.

-–

## 7. Context7 (Library resolution & docs)

* Resolve library identifiers: `context7__resolve-library-id(“”)`.

* Fetch docs: `context7__get-library-docs()`.

* Include resolved IDs and versions when justifying API choices in PRs.

-–

## 8. Sequential Thinking (Multi-step / Ambiguous Tasks)

* For multi-step or ambiguous tasks, use `sequential-thinking__sequentialthinking` to produce a short chain of thoughts and a clear actionable plan.

* Keep outputs concise and include next actionable steps for reviewers.

-–

## 9. Playwright MCP (Browser Automation)

**Purpose:** Use Playwright MCP for reproducible browser interactions and evidence capture (snapshots, screenshots, authenticated flows).

**Install & start server (example)**

```bash

npm i --save-dev @playwright/mcp playwright

npx playwright install

npx @playwright/mcp serve --port 6112

```

**Recommended workflow**:

1. `mcp__playwright__browser_install` — ensure browsers are present.

2. `mcp__playwright__browser_navigate(ref, url)` — navigate to page.

3. Immediately call `mcp__playwright__browser_snapshot(ref)` to capture a stable DOM snapshot and obtain a `ref` handle.

4. Perform actions based on that `ref`: `browser_click`, `browser_fill_form`, `browser_file_upload`, `browser_wait_for`.

5. Capture evidence with `browser_take_screenshot` and store artifacts securely.

**Best practices**:

* Always base follow-ups on the latest `browser_snapshot` ref.

* Use `browser_file_upload` for file inputs instead of typing paths manually.

* Use `browser_wait_for` for async waits rather than fixed sleeps.

* Store sensitive artifacts securely and avoid committing PII.

-–

## 10. Playwright MCP Debugging & Security

* If selectors fail, refresh `browser_snapshot` and re-evaluate selectors.

* If browsers are missing, run `npx playwright install` and restart MCP server.

* **Security**: Do not commit credentials or screenshots with PII to the repository; use secure artifact storage.

-–

## 11. Code & Commit Standards (from Claude Guide)

### Every Commit Must

* Compile successfully.

* Pass all existing tests.

* Include tests for any new behavior.

* Conform to project formatting and lint rules.

### Before Committing

* Run formatters and linters.

* Self-review your changes.

* Write commit messages that explain **why** (not just what).

### Error Handling

* Fail fast with descriptive errors and debugging context (parameters, state).

* Handle errors at appropriate layers; avoid deep bubbling.

* Never silently swallow exceptions.

-–

## 12. Architecture Principles (from Claude Guide)

* Favor composition over inheritance; prefer dependency injection for testability.

* Prefer interfaces over singletons to preserve extensibility and testability.

* Make data flow and dependencies explicit.

* Follow test-driven practices; do not disable tests — fix failing tests promptly.

-–

## 13. Decision Framework (from Claude Guide)

When multiple valid solutions exist, prefer in this order:

1. **Testability**: Can we write tests easily for this approach?

2. **Readability**: Will someone understand the code quickly in 6 months?

3. **Consistency**: Does it fit existing patterns in the codebase?

4. **Simplicity**: Is it the simplest solution that works?

5. **Reversibility**: How costly is it to change later if needed?

-–

## 14. When Stuck — Escalation & Troubleshooting (Claude guidance)

**Rule:** Try at most three distinct attempts per problem. If unresolved, stop and escalate with documentation.

Required artifact when escalating:

1. A list of concrete approaches tried.

2. Full error outputs (logs, stack traces).

3. Your diagnosis of failure reasons.

4. 2–3 alternative examples or patterns from similar problems.

5. Questions that challenge current assumptions: can we split the problem smaller? Is the current abstraction the right level?

6. Possible alternative angles (use different framework features, remove abstractions rather than add them, change architectural pattern).

-–

## 15. Playbook / Checklist (Quick Start)

1. `serena__activate_project`

2. `context7__resolve-library-id(“”)` (if external APIs are needed)

3. `context7__get-library-docs()`

4. `mcp__playwright__browser_install` (if browser automation required)

5. `mcp__playwright__browser_navigate` → `mcp__playwright__browser_snapshot`

6. Use Serena helpers for code changes

7. Run `lint`, `type-check`, `test`

8. Prepare PR with reproduction commands, evidence, and rationale

-–

## 16. Appendices

**Common local commands**

* `rg -n “pattern” --hidden`

* `fd --extension py src/`

* `git -c core.pager=delta diff`

* `npx playwright install`

**Change log**

* Merged Claude guide philosophy, technical standards, and decision framework into the existing AGENTS optimized document; removed Claude’s development-process section as requested; retained Playwright MCP, Serena, and Context7 workflows and best practices.

-–

*End of AGENTS.md — Optimized & Claude Merge.*
~~~