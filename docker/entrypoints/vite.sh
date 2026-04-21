#!/bin/sh
set -x

# Docker Desktop on Windows sometimes provides an incomplete PATH; pnpm lives under PNPM_HOME.
export PNPM_HOME="${PNPM_HOME:-/root/.local/share/pnpm}"
export PATH="$PNPM_HOME:/usr/local/bin:/usr/local/sbin:/usr/sbin:/usr/bin:/sbin:/bin"

rm -rf /app/tmp/pids/server.pid
rm -rf /app/tmp/cache/*

# Avoid --force / prune on every start: it re-downloads all packages and delays port 3036 for a long time.
pnpm install

echo "Ready to run Vite development server."

exec "$@"
