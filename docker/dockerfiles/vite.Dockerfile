FROM chatwoot:development

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Ensure pnpm exists: some cached builds of the base image omit the dev-only pnpm install step.
RUN npm install -g pnpm@10.2.0

RUN chmod +x docker/entrypoints/vite.sh

EXPOSE 3036
CMD ["bin/vite", "dev"]
