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
        <button
          onClick={decrement}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Decrement
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Reset
        </button>
        <button
          onClick=increment}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Increment
        </button>
      </div>
    </div>
  );
}
