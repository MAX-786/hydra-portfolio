# Stage 1: Build environment
FROM node:20 AS builder

# Configure pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
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

# Stage 2: Production environment
FROM node:20-slim

WORKDIR /app
COPY --from=builder /app /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Keep make available for production commands
RUN apt-get update && \
    apt-get install -y make && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
# Expose port and start application
EXPOSE 3000
