---
inclusion: always
---

# Grimoire Project Guidelines

## Code Style

### TypeScript
- Use strict type checking
- Define interfaces for all data structures
- Prefer `const` over `let`
- Use descriptive variable names

### React
- Functional components only
- Use hooks for state management
- Keep components focused and small
- Props should be typed with interfaces

### CSS/Styling
- Use Tailwind utility classes
- Custom animations in index.html `<style>` block
- Follow naming convention: `animate-{name}`
- Use semantic color names (not hex codes in JSX)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── services/           # External service integrations
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main application
└── index.tsx          # Entry point

public/
├── sounds/            # Audio files
└── videos/            # Video files
```

## Component Guidelines

### File Organization
- One component per file
- Export component as default
- Keep related types in same file or types.ts

### Component Structure
```typescript
// 1. Imports
import React from 'react';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Component
export const Component: React.FC<Props> = ({ props }) => {
  // 4. State
  // 5. Effects
  // 6. Handlers
  // 7. Render
};
```

## Halloween Theme Guidelines

### Colors
- **Primary:** Purple (#7c3aed, #9333ea)
- **Accent:** Orange (#ea580c, #f97316)
- **Danger:** Red (#dc2626, #ef4444)
- **Success:** Green (#16a34a, #22c55e)
- **Background:** Black/Dark Gray (#000000, #0f0518)

### Typography
- **Display:** Nosifer (dripping blood font)
- **Headings:** Creepster (spooky font)
- **Body:** Crimson Text (readable serif)

### Tone
- Mysterious and spooky
- Educational but entertaining
- Use words like: crypt, haunted, cursed, forbidden, banished
- Avoid: cute, friendly, bright

## AI Integration

### Gemini AI
- Use structured schemas for consistent output
- Add system instructions for Halloween tone
- Handle errors gracefully
- Validate AI responses

### Content Generation
- Curriculum: modules with topics
- Topics: encounters with educational content
- Each encounter: content + quiz question

## Animation Guidelines

### Performance
- Keep animations under 3 seconds
- Use CSS transforms (not position changes)
- Limit simultaneous animations
- Test on slower devices

### Timing
- Fast: 0.3s (hover effects)
- Medium: 0.5-1s (transitions)
- Slow: 2-3s (ambient animations)

## Audio/Video Guidelines

### File Formats
- Audio: MP3 (best compatibility)
- Video: MP4 + WebM (fallback)

### Volume Levels
- Ambient music: 0.3 (30%)
- Sound effects: 0.8 (80%)
- Jump scares: 0.8 (80%)

### Implementation
- Always provide fallback
- Handle autoplay restrictions
- Clean up on unmount

## User Experience

### Progression
- Sequential unlocking (one at a time)
- Clear visual feedback (locked/current/completed)
- Auto-scroll to current position

### Feedback
- Immediate response to actions
- Visual indicators for state changes
- Celebrate victories
- Gentle penalties for mistakes

### Accessibility
- Readable font sizes (16px minimum)
- High contrast colors
- Clear focus states
- Keyboard navigation support

## Testing Checklist

Before committing:
- [ ] TypeScript compiles without errors
- [ ] All components render correctly
- [ ] Animations are smooth
- [ ] Audio plays correctly
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Performance is acceptable

## Deployment

### Environment Variables
```
VITE_GEMINI_API_KEY=your_api_key_here
```

### Build Command
```bash
npm run build
```

### Vercel Settings
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: Vite

## Common Patterns

### Loading States
```typescript
const [isLoading, setIsLoading] = useState(false);

// Show loading UI
if (isLoading) return <LoadingSpinner />;
```

### Error Handling
```typescript
try {
  // API call
} catch (err) {
  setError("User-friendly message");
  console.error(err);
}
```

### Conditional Rendering
```typescript
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
```

## Git Workflow

### Commit Messages
- `feat:` New feature
- `fix:` Bug fix
- `style:` Styling changes
- `refactor:` Code refactoring
- `docs:` Documentation
- `perf:` Performance improvement

### Example
```
feat: add jump scare ghost animation
fix: correct audio playback on mobile
style: update button hover effects
```

---

*These guidelines ensure consistent, high-quality code throughout the Grimoire project.*
