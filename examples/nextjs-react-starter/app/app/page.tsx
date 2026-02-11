import { Counter } from '@/components/Counter';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          NextJS 16 + React 19 Starter
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Built with Prompt-Driven Development (PDD)
        </p>
        <div className="flex justify-center">
          <Counter />
        </div>
      </div>
    </main>
  );
}
