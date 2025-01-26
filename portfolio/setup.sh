#!/bin/bash

echo "Creating project structure..."

# Create directories
mkdir -p \
  app \
  components/{ui,common} \
  layouts \
  styles \
  utils \
  services/cms \
  public/images \
  types \
  lib \
  config \
  cms/{hooks,providers,schemas}

# Create core files
touch \
  app/layout.tsx \
  app/page.tsx \
  styles/globals.css \
  utils/index.ts \
  services/cms/client.ts \
  types/index.ts \
  lib/constants.ts \
  config/site.ts

echo "Project structure created successfully!"