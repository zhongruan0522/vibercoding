# Vibe Coding - 优秀文章&项目部分

## 优秀文章&项目

### Codex杂谈

#### Codex Prompt 调试技巧

每次修改 [AGENTS.md](https://agents.md/) 后，多使用 `ctrl+T` 查看其思考过程，看看命令的调用、思考过程是否符合你的预期。若不符，直接与 Codex 对话询问该如何调整 [`AGENTS.md`](http://agents.md/)，多重复几轮一般都能得到比较满意的结果。

```plaintext
[开始]
  |
  v
[修改 [`AGENTS.md`](http://AGENTS.md)]
  |
  v
[Ctrl+T 查看当前思考过程/轨迹]
  |
  v
{是否符合你的预期?}
        |是
        v
   [提交/应用变更]───►(结束或进入下一任务)
        ^
        |否
        |
        v
[与 Codex 对话：询问如何调整 [`AGENTS.md`](http://AGENTS.md)]
        |
        v
[根据建议再次修改 [`AGENTS.md`](http://AGENTS.md)]
        |
        └───────────────循环回到───────────────┐
                                            v
                              [Ctrl+T 查看当前思考过程/轨迹]
```

#### Spec-kit （实验性）

模仿 [spec-kit](https://github.com/github/spec-kit) 建立了一套实现新功能的规范，包含三个流程：spec, plan 和 do。

还在尝试优化中，因此未利用 [codex/prompts.md](https://github.com/openai/codex/blob/main/docs/prompts.md) 方式注入指令，而是通过 [`AGENTS.md`](http://agents.md/) 来时刻调整测试，在对话时输入 `/spec` 和 `/plan` 和 `/do` 即可。

1. /spec 开头，输入你想要实现的功能，Codex 会自动在 specs 文件夹下生成一个 Markdown 文件
2. /plan 开头，Codex 会自动在 plans 文件夹下生成一个带有日期的 Markdown 文件
3. /do 会自动按照 plan 任务实现。

不必严格遵从上述三个顺序来执行，如果 spec 文件不符预期，完全可以继续多轮对话调整满意后，再输入 `/plan` 来引导生成 plan 文件。

```markdown
## Stage-Gated Workflow (spec/plan/do)

- Mode: Opt-in. The workflow applies only when the user explicitly uses `/spec`, `/plan`, or `/do`. Routine Q&A or trivial edits do not require these stages.
- Triggers: A message containing one of `/spec`, `/plan`, or `/do` activates or advances the workflow. Once active, stages must proceed in order with explicit user approval to advance.
- Guardrails:
  - Do not modify source code before `/do`. Documentation/spec files may be edited only in `/spec`.
  - Do not skip stages or proceed without user confirmation once the workflow is active.
  - If scope changes, return to the appropriate prior stage for approval.
  - Respect sandbox/approval settings for all actions.

- When to Use
  - Use the workflow for new features, structural refactors, multi-file changes, or work needing traceability.
  - Skip the workflow (no triggers) for routine Q&A, diagnostics, or one-off trivial edits.

- Entry Points and Prerequisites
  - `/spec` is the canonical entry point for new efforts.
  - `/plan` requires an approved `/spec`. If unclear which spec applies, pause and ask the user to identify the correct file(s) under `specs/`.
  - `/do` requires an approved `/plan`.

- `/spec` (Specifications; docs only)
  - Purpose: Capture a concrete, reviewable specification using spec-kit style.
  - Output: Markdown spec(s) under `specs/` (no code changes). Share a concise diff summary and links to updated files; wait for approval.
  - Style: Specs are canonical and final. Do not include change logs or “correction/更正” notes. Incorporate revisions directly so the document always reflects the current agreed state. Historical context belongs in PR descriptions, commit messages, or the conversation — not in the spec.
  - Recommended contents:
    - Problem statement and context
    - Goals and non-goals
    - Requirements and constraints (functional, UX, performance, security)
    - UX/flows and API/IPC contracts (as applicable)
    - Acceptance criteria and success metrics
    - Alternatives considered and open questions
    - Rollout/backout considerations and telemetry (if relevant)

- `/plan` (High-level Plan; docs only)
  - Purpose: Turn the approved spec into an ordered, verifiable implementation plan.
  - Inputs: Approved spec file(s) in `specs/`.
  - Ambiguity: If the relevant spec is unclear, pause and request clarification before writing the plan.
  - Style: Plans are canonical and should not include change logs or “correction/更正” notes. Incorporate revisions directly so the plan always reflects the current agreed state. Historical notes should live in PR descriptions, commit messages, or the conversation.
  - Output:
    - An ordered plan via `update_plan` (short, verifiable steps; Task is merged into Plan and tracked here).
    - A plan document in `plans/` named `YYYY-MM-DD-short-title.md`, containing:
      - Scope and links to authoritative spec(s)
      - Assumptions and out-of-scope items
      - Phases/milestones mapped to acceptance criteria
      - Impacted areas, dependencies, risks/mitigations
      - Validation strategy (tests/lint/build) and rollout/backout notes
      - Approval status and next stage
  - Handoff: Await user approval of the plan before `/do`.

- `/do` (Execution)
  - Purpose: Implement approved plan steps with minimal, focused changes and file operations.
  - Actions:
    - Use `apply_patch` for file edits; group related changes and keep diffs scoped to approved steps.
    - Provide concise progress updates and a final summary of changes.
    - Validate appropriately: run `pnpm lint`, `pnpm format`, `pnpm build`, and relevant tests.
    - If material changes to the plan are needed, pause and return to `/plan` (or `/spec`) for approval.
  - Output: Implemented changes, validation results, and a concise change summary linked to the plan checklist.

### Plans Directory

- Location: `plans/` at the repository root.
- Filename: `YYYY-MM-DD-short-title.md` (kebab-case title; consistent dating).
- Style: Plan docs are the canonical source of truth for the implementation approach; avoid embedding change logs or “correction/更正” notes. Update the plan in place as decisions evolve.
- Contents:
  - Title and summary
  - Scope and linked specs (paths under `specs/`)
  - Assumptions / Out of scope
  - Step-by-step plan (short, verifiable)
  - Validation strategy (tests/lint/build)
  - Approval status and next stage
- Process:
  - During `/plan`, create or update the relevant file in `plans/` and share a short summary in the conversation. Await approval before `/do`.
```

#### WSL2

如果你在 Windows 下让 Codex 执行任务，你会发现它经常调用命令失败然后重试，如此循环。虽然最终都会成功，但浪费了很多时间，个人推测这是因为 GPT-5 Unix Shell 训练数据太多而 Powershell 数据太少导致的幻觉，Codex 总是下意识调用 Unix Shell 命令来处理。

那么有没有办法解决呢？当然有！打不过就加入——WSL2。

以 Windows 11 为例，在 Powershell 执行 `wsl --install` 即可安装 WSL2。

这种情况下，有两种方式选择：

- Windows 端代码+WSL2 Codex 环境，适用于开发 Windows 端的程序，比如 Electron Windows，.NET 等
- WSL2 代码 + WSL2 Codex 环境，比如 Vue Web 开发

对于后者，所有都能正常在 WSL2 环境内运行，就不做说明了，而前者 Windows + WSL2 混用就需要解决一个问题：如何在 WSL2 调用 Windows 端的 `npm/pnpm`，执行定义好的 `pnpm typecheck` `pnpm lint:fix` 等。

在 WSL2 Codex 对话时，要求其调用 pwsh.exe 来执行 `pnpm typecheck` 来检查，如此即可。

```bash
we're in WSL2, please using pwsh.exe to run `pnpm <script>`
```

#### 完整 [AGENTS.md](http://agents.md/)

还在调整中，不要完全照抄，最好还是通过 `ctrl+T` 查看整个过程，如果遇到 Codex 经常会出错的命令，选择性的修删适合自己的 [`AGENTS.md`](http://agents.md/)。

主要适配内容：

- Windows/WSL2 支持，优先使用 Powershell 支持的命令，对于任何 npm 包安装都必须请示用户，避免混乱的依赖项
- 使用 fd,ripgrep,ast-grep 搜索文件、文本和代码片段，更快更直接
- spec/plan/do 工作流，先确定规范，再编写计划，最后实现

```markdown
# AGENTS Guidelines

## Windows Environment Notice

- Prefer PowerShell (`pwsh`/`powershell`) when on Windows.
- Prefer using pwsh.exe to run `pnpm <script>` when on WSL2.
- WSL2 may be used for non-package-manager commands only (e.g., `rg`, `tar`). Avoid running Node builds in WSL due to OS mismatch.
- WSL2 cross-drive performance: accessing repos under `/mnt/c|d|e/...` goes through a filesystem bridge and can be slower for full scans. Prefer scoping to subtrees, excluding heavy folders, or running the same searches with native Windows binaries in PowerShell for large/iterative scans.
- Do not auto-run dependency installs. The user must run `pnpm install` in Windows PowerShell manually and then confirm completion.
- Do not modify `package.json`/lockfiles to add or update dependencies without explicit user approval. Propose dependencies in `/spec` or `/plan`, and ask the user to run `pnpm add <pkg>` (or `pnpm install`) and confirm.
- Do not call Unix text tools directly in PowerShell (e.g., `sed`, `awk`, `cut`, `head`, `tail`). Use PowerShell-native equivalents instead:
  - `head` → `Select-Object -First N`
  - `tail` → `Get-Content -Tail N`
  - paging → `Out-Host -Paging` or `more`
  - substitution/replace → `-replace` with `Get-Content`/`Set-Content`

## Tool Priority

- Filename search: `fd`.
- Text/content search: `rg` (ripgrep).
- AST/structural search: `sg` (ast-grep) — preferred for code-aware queries (imports, call expressions, JSX/TSX nodes).

### AST-grep Usage

- Announce intent and show the exact command before running complex patterns.
- Common queries:
  - Find imports from `node:path` (TypeScript/TSX):
    - `ast-grep -p "import $$ from 'node:path'" src --lang ts,tsx,mts,cts`
  - Find CommonJS requires of `node:path`:
    - `ast-grep -p "require('node:path')" src --lang js,cjs,mjs,ts,tsx`
  - Suggest rewrite (do not auto-apply in code unless approved):
    - Search: `ast-grep -p "import $$ from 'node:path'" src --lang ts,tsx`
    - Proposed replacement: `import $$ from 'pathe'`

### Search Hygiene (fd/rg/sg)

- Exclude bulky folders to keep searches fast and relevant: `.git`, `node_modules`, `coverage`, `out`, `dist`.
- Prefer running searches against a scoped path (e.g., `src`) to implicitly avoid vendor and VCS directories.
- Examples:
  - `rg -n "pattern" -g "!{.git,node_modules,coverage,out,dist}" src`
  - `fd --hidden --exclude .git --exclude node_modules --exclude coverage --exclude out --exclude dist --type f ".tsx?$" src`
- ast-grep typically respects `.gitignore`; target `src` to avoid scanning vendor folders:
  - `ast-grep -p "import $$ from '@shared/$$'" src --lang ts,tsx,mts,cts`
  - If needed, add ignore patterns to your ignore files rather than disabling ignores.

## Temporary Research Files

- Canonical location: store all temporary research artifacts (downloaded READMEs, API docs, scratch notes) under `docs/research/`.
- Do not place temporary files at the repository root or outside `docs/research/`.
- Commit policy: avoid committing temporary files unless they are necessary for traceability during `/spec` or `/plan`. If committed, keep the scope minimal and store them under `docs/` only.
- Naming: use descriptive names with date or task context (e.g., `docs/research/2025-09-11-wsl-notes.md`).
- Cleanup: after completing a task (`/do`), evaluate whether each temporary file is still required. Remove unneeded files, or promote essential content into curated docs under `docs/` or into `specs/`/`plans/`.

## Stage-Gated Workflow (spec/plan/do)

- Mode: Opt-in. The workflow applies only when the user explicitly uses `/spec`, `/plan`, or `/do`. Routine Q&A or trivial edits do not require these stages.
- Triggers: A message containing one of `/spec`, `/plan`, or `/do` activates or advances the workflow. Once active, stages must proceed in order with explicit user approval to advance.
- Guardrails:
  - Do not modify source code before `/do`. Documentation/spec files may be edited only in `/spec`.
  - Do not skip stages or proceed without user confirmation once the workflow is active.
  - If scope changes, return to the appropriate prior stage for approval.
  - Respect sandbox/approval settings for all actions.

- When to Use
  - Use the workflow for new features, structural refactors, multi-file changes, or work needing traceability.
  - Skip the workflow (no triggers) for routine Q&A, diagnostics, or one-off trivial edits.

- Entry Points and Prerequisites
  - `/spec` is the canonical entry point for new efforts.
  - `/plan` requires an approved `/spec`. If unclear which spec applies, pause and ask the user to identify the correct file(s) under `specs/`.
  - `/do` requires an approved `/plan`.

- `/spec` (Specifications; docs only)
  - Purpose: Capture a concrete, reviewable specification using spec-kit style.
  - Output: Markdown spec(s) under `specs/` (no code changes). Share a concise diff summary and links to updated files; wait for approval.
  - Style: Specs are canonical and final. Do not include change logs or “correction/更正” notes. Incorporate revisions directly so the document always reflects the current agreed state. Historical context belongs in PR descriptions, commit messages, or the conversation — not in the spec.
  - Recommended contents:
    - Problem statement and context
    - Goals and non-goals
    - Requirements and constraints (functional, UX, performance, security)
    - UX/flows and API/IPC contracts (as applicable)
    - Acceptance criteria and success metrics
    - Alternatives considered and open questions
    - Rollout/backout considerations and telemetry (if relevant)

- `/plan` (High-level Plan; docs only)
  - Purpose: Turn the approved spec into an ordered, verifiable implementation plan.
  - Inputs: Approved spec file(s) in `specs/`.
  - Ambiguity: If the relevant spec is unclear, pause and request clarification before writing the plan.
  - Style: Plans are canonical and should not include change logs or “correction/更正” notes. Incorporate revisions directly so the plan always reflects the current agreed state. Historical notes should live in PR descriptions, commit messages, or the conversation.
  - Output:
    - An ordered plan via `update_plan` (short, verifiable steps; Task is merged into Plan and tracked here).
    - A plan document in `plans/` named `YYYY-MM-DD-short-title.md`, containing:
      - Scope and links to authoritative spec(s)
      - Assumptions and out-of-scope items
      - Phases/milestones mapped to acceptance criteria
      - Impacted areas, dependencies, risks/mitigations
      - Validation strategy (tests/lint/build) and rollout/backout notes
      - Approval status and next stage
  - Handoff: Await user approval of the plan before `/do`.

- `/do` (Execution)
  - Purpose: Implement approved plan steps with minimal, focused changes and file operations.
  - Actions:
    - Use `apply_patch` for file edits; group related changes and keep diffs scoped to approved steps.
    - Provide concise progress updates and a final summary of changes.
    - Validate appropriately: run `pnpm lint`, `pnpm format`, `pnpm build`, and relevant tests.
    - If material changes to the plan are needed, pause and return to `/plan` (or `/spec`) for approval.
  - Output: Implemented changes, validation results, and a concise change summary linked to the plan checklist.

### Plans Directory

- Location: `plans/` at the repository root.
- Filename: `YYYY-MM-DD-short-title.md` (kebab-case title; consistent dating).
- Style: Plan docs are the canonical source of truth for the implementation approach; avoid embedding change logs or “correction/更正” notes. Update the plan in place as decisions evolve.
- Contents:
  - Title and summary
  - Scope and linked specs (paths under `specs/`)
  - Assumptions / Out of scope
  - Step-by-step plan (short, verifiable)
  - Validation strategy (tests/lint/build)
  - Approval status and next stage
- Process:
  - During `/plan`, create or update the relevant file in `plans/` and share a short summary in the conversation. Await approval before `/do`.
```

#### 经验之谈

- **主动让 Codex 调用特定工具**：不要把所有的注意事项都写入到 [AGENTS.md](http://agents.md/) 中，用户还会需要担负一些心智针对不同的场景引导 Codex 使用更为合适的工具，比如用 `git diff` 可能更能提供准确的上下文。
- **尽可能在对话时提供完整的信息来源**：Codex 查找代码的方式非常原始，如 grep, ripgrep 等，很有可能搜不到你想要的内容。比如你想要询问为什么实例化了两次，请顺带给出两次出现的地方：函数、文件名等信息，能减少 Codex 的误判或者搜索代码的时间。Codex 提供了 `@` 快捷命令来帮助你快速搜索文件名。
- **网页搜索尽量使用网页端 ChatGPT-5-Thinking**：搜索更快更完整，非常擅长对于 GitHub 项目的检索：包括不限于源码、项目结构、issue、PR等。特别适合了解某个开源项目的功能，单独开一个长对话和 ChatGPT 聊聊，受益良多。