# Build environment
FROM node:20 AS builder

# Configure pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest
RUN corepack enable

# Install system dependencies
RUN apt-get update && \
    apt-get install -y make python3 g++ && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
RUN rm -rf /app
COPY --chown=node:node . /app
RUN make install

# Production environment
FROM node:20-slim

WORKDIR /app
COPY --from=builder /app /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest
RUN corepack enable

RUN apt-get update && \
    apt-get install -y make && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
# Expose port
EXPOSE 3000
