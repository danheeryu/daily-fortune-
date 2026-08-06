#!/usr/bin/env python3
"""PreToolUse hook: block Write/Edit calls whose new content looks like a
hardcoded secret (API key, token, etc.), except when the target is a .env
file (e.g. .env, .env.local), where such values are expected to live."""

import json
import re
import sys
from pathlib import Path

SECRET_PATTERNS = [
    (r"sk-[A-Za-z0-9_-]{10,}", "OpenAI/Stripe/OpenRouter-style secret key (sk-...)"),
    (r"AKIA[0-9A-Z]{16}", "AWS access key ID (AKIA...)"),
    (r"gh[pousr]_[A-Za-z0-9]{20,}", "GitHub token (ghp_/gho_/ghu_/ghs_/ghr_...)"),
    (r"AIza[0-9A-Za-z_-]{20,}", "Google API key (AIza...)"),
    (r"xox[baprs]-[A-Za-z0-9-]{10,}", "Slack token (xox...)"),
    (r"sb_secret_[A-Za-z0-9_-]{10,}", "Supabase secret key (sb_secret_...)"),
]


def is_env_file(file_path: str) -> bool:
    name = Path(file_path).name
    return name == ".env" or name.startswith(".env.")


def get_new_content(tool_name: str, tool_input: dict) -> str:
    if tool_name == "Write":
        return tool_input.get("content", "") or ""
    if tool_name == "Edit":
        return tool_input.get("new_string", "") or ""
    return ""


def main() -> None:
    payload = json.load(sys.stdin)
    tool_name = payload.get("tool_name", "")
    tool_input = payload.get("tool_input", {}) or {}
    file_path = tool_input.get("file_path", "") or ""

    if is_env_file(file_path):
        sys.exit(0)

    content = get_new_content(tool_name, tool_input)

    for pattern, label in SECRET_PATTERNS:
        match = re.search(pattern, content)
        if match:
            snippet = match.group(0)
            masked = snippet[:8] + "..." if len(snippet) > 8 else snippet
            reason = (
                f'Blocked write to "{file_path}": content looks like a secret '
                f'({label}), matched "{masked}". If this belongs in an env '
                f"file, use .env / .env.local instead."
            )
            print(reason, file=sys.stderr)
            print(
                json.dumps(
                    {
                        "systemMessage": reason,
                        "hookSpecificOutput": {
                            "hookEventName": "PreToolUse",
                            "permissionDecision": "deny",
                            "permissionDecisionReason": reason,
                        },
                    }
                )
            )
            sys.exit(0)

    sys.exit(0)


if __name__ == "__main__":
    main()
