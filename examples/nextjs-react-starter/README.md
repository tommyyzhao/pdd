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
│   └── Counter_TypeScriptReact.prompt
├── app/                          # NextJS application
│   ├── app/                      # App router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/               # React components (pdd generates here)
│   │   ├── Counter.tsx           # Generated from prompts/
│   │   ├── Counter.stories.tsx   # Generated from prompts/
│   │   └── __tests__/            # Generated tests
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

### Step 4: Install NextJS Dependencies

```bash
cd app
bun install
```

### Step 5: Generate Components with PDD

```bash
cd /home/user/pdd/examples/nextjs-react-starter

# Activate pdd environment
source ../../.venv/bin/activate

# Generate Counter component with Storybook story using sync
# Files are generated directly in app/components/
pdd --local --force sync Counter
```

The generated files will appear directly in `app/components/`:
- `app/components/Counter.tsx` - The component
- `app/components/Counter.stories.tsx` - Storybook story
- `app/components/__tests__/Counter.test.tsx` - Tests (if generated)

**Important**:
- Use `TypeScriptReact` as the language suffix for React components to get `.tsx` files
- Use `sync` instead of `generate` to get component + stories + tests (the "dev unit")
- Capitalize the basename (`Counter` not `counter`) for React components
- No manual copying needed - files generate where they're used!

```bash
cd app
bun install
```

### Step 6: Run the Application

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

**Single Prompt** (`prompts/Counter_TypeScriptReact.prompt`) generates both component and story:

```
You are an expert React and TypeScript developer building a modern Counter
component using React 19 with TypeScript, Tailwind CSS v4, and Storybook 8.

## Requirements

1. **Component (`Counter.tsx`)**:
   - Export as named export `Counter`
   - Use React 19 hooks (`useState`)
   - Client component (add 'use client' directive)

2. **Component Features**:
   - Display heading "Counter Demo"
   - Show current count value
   - Three buttons: Decrement, Reset, Increment

3. **Storybook Story (`Counter.stories.tsx`)**:
   - Use Storybook 8 CSF3 format
   - Meta with title "Components/Counter"
   - At least one Default story

## Deliverables
Generate two files:
1. Counter.tsx - The React component
2. Counter.stories.tsx - The Storybook story
```

**Generated Code** (`app/components/Counter.tsx`):
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

In PDD, Storybook stories serve as the UI equivalent of unit tests - they verify the visual behavior and document component usage. **Stories are generated together with the component** in a single prompt, following the PDD "dev unit" principle (one prompt → code + examples + tests).

**Generated Story** (`app/components/Counter.stories.tsx`):
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

## 🎯 Flexible Output Paths

pdd supports multiple output locations through **contexts** in `.pddrc`. Generate files to different directories based on their purpose:

### Available Contexts

```yaml
# .pddrc
contexts:
  default:    # Components → app/components/
  lib:        # Libraries → app/lib/
  utils:      # Utilities → app/utils/
  hooks:      # React Hooks → app/hooks/
```

### Usage Examples

```bash
# Generate a component (default context)
pdd --local --force sync Counter
# → app/components/Counter.tsx

# Generate a utility function (lib context)
pdd --local --force --context lib sync api
# → app/lib/api.ts

# Generate helpers (utils context)
pdd --local --force --context utils sync formatters
# → app/utils/formatters.ts

# Generate a React hook (hooks context)
pdd --local --force --context hooks sync useCounter
# → app/hooks/useCounter.tsx
```

### List Available Contexts

```bash
pdd --list-contexts
```

### Alternative: Manual Output Path

For one-off custom paths, use `--output`:

```bash
pdd generate prompts/MyComponent_TypeScriptReact.prompt --output app/custom/path/MyComponent.tsx
```

## 🔄 Regenerating Components

When requirements change, update the prompt and regenerate:

```bash
# 1. Edit the prompt file
vim prompts/Counter_TypeScriptReact.prompt

# 2. Regenerate with sync --force
# Files regenerate directly to their context's output path
pdd --local --force sync Counter

# Or regenerate to a different location
pdd --local --force --context utils sync Counter
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

1. Create new prompt files in `prompts/` using appropriate naming:
   - Components: `ComponentName_TypeScriptReact.prompt`
   - Utils/Lib: `functionName_typescript.prompt`
   - Hooks: `useHookName_TypeScriptReact.prompt`

2. Generate with the appropriate context:
   ```bash
   pdd --local --force sync ComponentName              # → app/components/
   pdd --local --force --context lib sync myUtil       # → app/lib/
   pdd --local --force --context hooks sync useMyHook  # → app/hooks/
   ```

3. Files generate directly to their context location - no copying needed!

4. Stories and tests are generated together with the component (dev unit principle)

## 📄 License

This example is part of the PDD project and follows the same MIT license.

## ⚡️ Quick Reference

```bash
# List available contexts
pdd --list-contexts

# Generate to different locations using contexts
pdd --local --force sync YourComponent           # default → app/components/
pdd --local --force --context lib sync api       # lib → app/lib/
pdd --local --force --context utils sync helpers # utils → app/utils/
pdd --local --force --context hooks sync useAuth # hooks → app/hooks/

# Manual output path (one-off)
pdd generate prompts/MyFile_typescript.prompt --output app/custom/path/

# Run development
bun run dev      # NextJS dev server
bun run storybook # Storybook on :6006

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
