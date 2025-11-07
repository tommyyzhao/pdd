# NextJS 16 + React 19 Starter with Prompt-Driven Development

This example demonstrates building a modern NextJS 16 / React 19 application using **Prompt-Driven Development (PDD)** methodology, where prompts are the source of truth and code is generated from them.

## 🎯 Key Features

- **NextJS 16** with Turbopack (stable)
- **React 19.2** with latest features
- **Tailwind CSS v4** - CSS-first configuration
- **TypeScript 5** - Type-safe development
- **Storybook 8** - Component documentation and testing
- **PDD Methodology** - Prompts as source of truth

## 📁 Project Structure

```
nextjs-react-starter/
├── prompts/                       # PDD prompt files (source of truth)
│   ├── counter_typescript.prompt
│   └── counter_story_typescript.prompt
├── pdd/                          # Generated code from prompts
│   ├── Counter.tsx
│   └── Counter.stories.tsx
├── app/                          # NextJS application
│   ├── app/                      # App router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/               # React components (from pdd/)
│   │   ├── Counter.tsx
│   │   └── Counter.stories.tsx
│   ├── .storybook/              # Storybook configuration
│   │   ├── main.ts
│   │   └── preview.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── postcss.config.mjs
└── .pddrc                        # PDD configuration
```

## 🚀 Getting Started

### Prerequisites

1. **Node.js 24+** and **bun** package manager
2. **uv** (Python package manager)
3. **API Key** (one of the following):
   - `ANTHROPIC_API_KEY` (recommended - Claude Sonnet 4.5)
   - `OPENAI_API_KEY`
   - `GEMINI_API_KEY`

### Step 1: Install uv and bun

```bash
# Install uv (Python package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install bun (JavaScript runtime & package manager)
curl -fsSL https://bun.sh/install | bash

# Add to PATH and reload shell
source ~/.bashrc  # or ~/.zshrc
```

### Step 2: Install PDD CLI

```bash
# Navigate to pdd root directory
cd /home/user/pdd

# Create virtual environment and install pdd with uv
uv venv
source .venv/bin/activate
uv pip install -e .

# Verify installation
pdd --version  # Should show: pdd, version 0.0.65
```

### Step 3: Set up API Keys

Choose ONE of the following:

```bash
# Option 1: Anthropic (Recommended)
export ANTHROPIC_API_KEY="sk-ant-..."

# Option 2: OpenAI
export OPENAI_API_KEY="sk-..."

# Option 3: Google Gemini
export GEMINI_API_KEY="..."
```

### Step 4: Generate Components with PDD

```bash
cd /home/user/pdd/examples/nextjs-react-starter

# Activate pdd environment
source ../../.venv/bin/activate

# Generate Counter component from prompt
pdd --local generate prompts/counter_typescript.prompt

# Generate Storybook story from prompt
pdd --local generate prompts/counter_story_typescript.prompt
```

The generated files will appear in the `pdd/` directory.

### Step 5: Install NextJS Dependencies

```bash
cd app
bun install
```

### Step 6: Copy Generated Components

```bash
# Copy pdd-generated components to app
cp ../pdd/Counter.tsx components/
cp ../pdd/Counter.stories.tsx components/
```

### Step 7: Run the Application

```bash
# Development mode
bun run dev

# Build for production
bun run build
bun run start

# Run Storybook
bun run storybook
```

## 📝 PDD Methodology

### How It Works

1. **Write Prompts** - Create `.prompt` files describing what you want
2. **Generate Code** - Use `pdd generate` or `pdd sync` to create code from prompts
3. **Prompts as Source** - The prompts are the authoritative specification, not the code
4. **Regenerate** - When requirements change, update the prompt and regenerate

### Example: Counter Component

**Prompt** (`prompts/counter_typescript.prompt`):
```
Create a Counter React component in TypeScript that demonstrates basic state management and user interaction.

Requirements:
- Use TypeScript with proper type annotations
- Use React hooks (useState) for state management
- Export as a named export "Counter"
- Component should have:
  * A heading displaying "Counter Demo"
  * A display showing the current count value
  * An increment button labeled "Increment"
  * A decrement button labeled "Decrement"
  * A reset button labeled "Reset" that sets count back to 0
...
```

**Generated Code** (`pdd/Counter.tsx`):
```typescript
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-bold">Counter Demo</h2>
      <div className="text-4xl font-mono">{count}</div>
      <div className="flex gap-2">
        <button onClick={decrement} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          Decrement
        </button>
        <button onClick={reset} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          Reset
        </button>
        <button onClick={increment} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          Increment
        </button>
      </div>
    </div>
  );
}
```

### Storybook as "UI Tests"

In PDD, Storybook stories serve as the UI equivalent of unit tests - they verify the visual behavior and document component usage.

**Story Prompt** (`prompts/counter_story_typescript.prompt`):
```
Create a Storybook story file for the Counter component in TypeScript.

Requirements:
- Use Storybook 8.x format with CSF3 (Component Story Format 3)
- TypeScript with proper type annotations
- Import the Counter component from "./Counter"
- Define the meta configuration with:
  * title: "Components/Counter"
  * component: Counter
  * tags: ['autodocs']
...
```

**Generated Story** (`pdd/Counter.stories.tsx`):
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Counter } from './Counter';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {};
```

## 🛠 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.0.1 | React framework with App Router |
| React | 19.0.0 | UI library with latest features |
| TypeScript | 5.x | Type-safe development |
| Tailwind CSS | 4.0.0 | Utility-first CSS framework |
| Storybook | 8.5.0 | Component development & documentation |
| bun | 1.3.1+ | Fast JavaScript runtime & package manager |
| uv | 0.8+ | Fast Python package manager |
| pdd-cli | 0.0.65 | Prompt-driven development tool |

## 📚 Learn More

### PDD Resources

- [PDD Whitepaper](../../docs/whitepaper_with_benchmarks/whitepaper_w_benchmarks.md)
- [PDD Doctrine](../../docs/prompt-driven-development-doctrine.md)
- [PDD CLI Documentation](../../README.md)

### Framework Documentation

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Storybook](https://storybook.js.org)

## 🎨 Tailwind CSS v4 Notes

Tailwind v4 introduced significant changes:

- **CSS-first configuration** - No `tailwind.config.js` needed
- **@import "tailwindcss"** in CSS files
- **PostCSS plugin** - `@tailwindcss/postcss`
- **Auto-scanning** - Automatically detects files to scan

## 🔄 Regenerating Components

When requirements change, update the prompt and regenerate:

```bash
# 1. Edit the prompt file
vim prompts/counter_typescript.prompt

# 2. Regenerate with --force flag
pdd --local --force generate prompts/counter_typescript.prompt

# 3. Copy updated component to app
cp pdd/Counter.tsx app/components/
```

## 🧪 Testing

### NextJS Build

```bash
cd app
bun run build
```

### Storybook Build

```bash
bun run build-storybook
```

### Run Storybook Locally

```bash
bun run storybook
# Open http://localhost:6006
```

## 🤝 Contributing

This is an example project demonstrating PDD methodology. To extend it:

1. Create new prompt files in `prompts/`
2. Generate components with `pdd generate`
3. Integrate generated code into the NextJS app
4. Create Storybook stories for documentation

## 📄 License

This example is part of the PDD project and follows the same MIT license.

## ⚡️ Quick Reference

```bash
# Generate from prompt
pdd --local generate prompts/your_component_typescript.prompt

# Generate with sync (includes tests, examples, verification)
pdd --local sync prompts/your_component_typescript.prompt --force

# Run NextJS dev server
bun run dev

# Run Storybook
bun run storybook

# Build everything
bun run build && bun run build-storybook
```

## 🎯 Next Steps

1. ✅ Basic Counter component working
2. 🚧 Add shadcn/ui components (optional)
3. 🚧 Add more complex components (forms, lists, etc.)
4. 🚧 Add API integration examples
5. 🚧 Add testing with Jest/Vitest

---

**Built with ❤️ using Prompt-Driven Development**
