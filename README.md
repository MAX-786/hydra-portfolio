# Portfolio Frontend

This is a Next.js frontend project designed to integrate with the Volto Hydra decoupled editor for headless Plone. The current integration level is Level 1, with plans to advance to Level 3 in the future.

## What is Volot Hydra?

Hydra aka volto-hydra is a proof-of-concept addon for Volto that decouples the frontend from the Plone backend, allowing for a more flexible editing experience. It achieves this by embedding the frontend within an iframe and establishing a two-way communication channel between the iframe and the admin UI using hydra.js


## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MAX-786/hydra-portfolio
cd portfolio
```
2. Go to `portfolio` directory:
```bash
cd portfolio
```

3. Install dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

### Running the Development Server

Start the development server:

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

Build the application for production:

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm build
```

Locally preview the production build:

```bash
# npm
npm run preview

# yarn
yarn preview

# pnpm
pnpm preview
```

### Asynchronously Loading the Hydra Bridge (for level 2 and further)

To load the Hydra bridge asynchronously, add the following function and call it at any point where you want to load the bridge. Since your application will be loaded inside an iframe in Volto Hydra, the iframe will be passed a `_edit={true/false}` parameter that we can check for. If this parameter is present and set to true, we should be inside the editor and in edit mode.

```js
function loadBridge(callback) {
    const existingScript = document.getElementById("hydraBridge");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "your-hydra-js-path";
      script.id = "hydraBridge";
      document.body.appendChild(script);
      script.onload = () => {
        callback();
      };
    } else {
      callback();
    }
}

if (window.location.search.includes('_edit')) {
  loadBridge(() => {
    const { initBridge } = window;
    const hydraBridgeInstance = new initBridge();
  });
}
```

## Future Plans

- **Level 2: Enable Frontend Block Selection and Quanta Toolbar**
- **Level 3: Enable Real-time Changes While Editing**

## Learn More

For more information on Volto Hydra, visit the [Volto Hydra GitHub repository](https://github.com/collective/volto-hydra).
