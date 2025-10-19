# Background Store Usage

The background store has been created using Zustand. Here's how to use it:

## Store Location
- `src/store/useBackgroundStore.ts`

## Available State & Actions
- `isBackgroundVisible`: boolean (default: false)
- `toggleBackground()`: function to toggle the background visibility

## Example Usage

```tsx
'use client';

import { useBackgroundStore } from '@/store/useBackgroundStore';

export default function YourComponent() {
  const { isBackgroundVisible, toggleBackground } = useBackgroundStore();

  return (
    <div>
      <button onClick={toggleBackground}>
        {isBackgroundVisible ? 'Hide' : 'Show'} Background
      </button>
      
      {isBackgroundVisible && (
        <div className="background">
          {/* Your background content */}
        </div>
      )}
    </div>
  );
}
```

## Provider
The `BackgroundStoreProvider` has been added to `layout.tsx` and wraps your entire application.

Note: Zustand doesn't require a provider to work, but the provider is there for consistency and potential future enhancements.
