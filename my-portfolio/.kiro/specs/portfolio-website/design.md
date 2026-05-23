# Design Document: Portfolio Website

## Overview

The portfolio website is a modern, single-page React application featuring a dark-themed design with orange accents. The application provides a professional showcase for skills, projects, and experience with comprehensive theming, authentication, and responsive design capabilities.

### Key Features

- **Loading Experience**: Animated loading screen with progress indicator (1-100%) and Tiger logo
- **Dual Theme System**: Dark mode (default) and light mode with smooth transitions
- **Content Sections**: Hero, About, Portfolio, Testimonials, and Contact sections
- **Navigation**: Sticky navigation bar with smooth scrolling to sections
- **Authentication**: Login/logout functionality for protected features
- **Responsive Design**: Optimized layouts for mobile, tablet, laptop, and desktop devices
- **Professional Polish**: Consistent spacing, typography, and visual feedback

### Technology Stack

- **Framework**: React 19.2.6
- **Styling**: CSS Modules or styled-components for component-scoped styles
- **State Management**: React Context API for theme and authentication state
- **Storage**: localStorage for theme persistence
- **Testing**: Jest + React Testing Library for unit tests, fast-check for property-based tests
- **Build Tool**: Create React App (react-scripts)

## Architecture

### Component Hierarchy

```
App
├── ThemeProvider (Context)
│   └── AuthProvider (Context)
│       ├── LoadingScreen
│       └── MainContent
│           ├── NavigationBar
│           │   ├── NavLinks (Skills, Projects, Hobbies)
│           │   └── ThemeToggle
│           ├── HeroSection
│           ├── AboutSection
│           ├── PortfolioSection
│           ├── TestimonialsSection
│           └── ContactSection
```

### State Management Architecture

**Theme State** (ThemeContext):
- Current theme: 'dark' | 'light'
- Theme toggle function
- Theme persistence to localStorage

**Authentication State** (AuthContext):
- Authentication status: boolean
- User data: object | null
- Login function: (credentials) => Promise<void>
- Logout function: () => void

**Loading State** (Local component state):
- Loading progress: 0-100
- Loading complete: boolean

### Data Flow

1. **Application Initialization**:
   - App mounts → LoadingScreen displays
   - Theme loaded from localStorage (default: 'dark')
   - Loading progress animates 1% → 100%
   - MainContent renders after loading complete

2. **Theme Switching**:
   - User clicks ThemeToggle
   - ThemeContext updates theme state
   - Theme persisted to localStorage
   - CSS variables update for smooth transition
   - All components re-render with new theme

3. **Navigation**:
   - User clicks nav link
   - Smooth scroll to target section
   - No route changes (single-page app)

4. **Authentication**:
   - User submits login form
   - AuthContext validates credentials
   - Auth state updates
   - Protected UI elements become visible
   - Logout clears auth state

## Components and Interfaces

### Core Components

#### LoadingScreen Component

**Purpose**: Display animated loading screen with progress indicator

**Props**: None (manages own state)

**State**:
```typescript
{
  progress: number; // 0-100
  isComplete: boolean;
}
```

**Behavior**:
- Mounts with progress at 0
- Animates progress from 1 to 100 over ~2-3 seconds
- Displays Tiger logo (centered)
- Displays progress percentage
- Calls onComplete callback when progress reaches 100
- Unmounts with fade-out transition

**Styling**:
- Black background
- Centered logo and progress text
- White text for progress percentage
- Smooth fade-out animation

---

#### ThemeProvider Component

**Purpose**: Manage theme state and provide theme context to all components

**Props**:
```typescript
{
  children: ReactNode;
}
```

**Context Value**:
```typescript
{
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}
```

**Behavior**:
- Loads initial theme from localStorage (default: 'dark')
- Provides theme state to all descendants
- Persists theme changes to localStorage
- Updates CSS custom properties on theme change

**localStorage Key**: `portfolio-theme`

---

#### AuthProvider Component

**Purpose**: Manage authentication state and provide auth context

**Props**:
```typescript
{
  children: ReactNode;
}
```

**Context Value**:
```typescript
{
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}
```

**Behavior**:
- Maintains authentication state
- Validates credentials (mock implementation for now)
- Provides login/logout functions
- Could be extended to use JWT tokens or session storage

---

#### NavigationBar Component

**Purpose**: Provide navigation links and theme toggle

**Props**:
```typescript
{
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}
```

**Features**:
- Fixed/sticky positioning
- Links to: Skills, Projects, Hobbies sections
- Smooth scroll behavior
- Theme toggle button
- Responsive: hamburger menu on mobile, full nav on desktop

**Styling**:
- Dark mode: dark background, white text, orange accents
- Light mode: light background, black text
- Smooth transitions on theme change

---

#### HeroSection Component

**Purpose**: Display professional introduction with photo

**Props**:
```typescript
{
  name: string;
  title: string;
  introduction: string;
  photoUrl: string;
}
```

**Layout**:
- Desktop: Photo on left, text on right (or vice versa)
- Mobile: Stacked layout (photo above text)
- Centered content with max-width constraint

**Styling**:
- Large, prominent typography for name
- Professional photo with border/shadow
- Orange accent for title or key words

---

#### AboutSection Component

**Purpose**: Display experience and skills information

**Props**:
```typescript
{
  yearsOfExperience: number;
  skills: string[];
}
```

**Layout**:
- Experience displayed prominently
- Skills in grid or list format
- Responsive grid: 1 column (mobile) → 2-3 columns (desktop)

**Styling**:
- Skill tags with orange accents
- Clear visual hierarchy

---

#### PortfolioSection Component

**Purpose**: Showcase work samples and projects

**Props**:
```typescript
{
  projects: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    tags?: string[];
  }>;
}
```

**Layout**:
- Grid layout: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Card-based design for each project
- Hover effects on desktop

**Styling**:
- Project cards with consistent spacing
- Orange accent on hover or active state
- Images with aspect ratio preservation

---

#### TestimonialsSection Component

**Purpose**: Display client or colleague testimonials

**Props**:
```typescript
{
  testimonials: Array<{
    id: string;
    text: string;
    author: string;
    role?: string;
  }>;
}
```

**Layout**:
- Carousel or grid layout
- 1 testimonial (mobile) → 2-3 testimonials (desktop)

**Styling**:
- Quote styling with attribution
- Orange accent for author names or quotes

---

#### ContactSection Component

**Purpose**: Provide contact information and methods

**Props**:
```typescript
{
  email: string;
  phone?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}
```

**Layout**:
- Centered content
- Contact methods displayed clearly
- Social links as icons or buttons

**Styling**:
- Orange accent for links
- Clear call-to-action styling

---

#### ThemeToggle Component

**Purpose**: UI control for switching themes

**Props**:
```typescript
{
  currentTheme: 'dark' | 'light';
  onToggle: () => void;
}
```

**Behavior**:
- Toggle button or switch UI
- Visual indicator of current theme
- Smooth transition animation

**Styling**:
- Icon-based (sun/moon) or text-based toggle
- Orange accent in dark mode

## Data Models

### Theme Model

```typescript
type Theme = 'dark' | 'light';

interface ThemeConfig {
  theme: Theme;
  colors: {
    background: string;
    text: string;
    accent: string;
    cardBackground: string;
    border: string;
  };
}
```

**Dark Theme Colors**:
- Background: `#0a0a0a` or `#1a1a1a`
- Text: `#ffffff`
- Accent: `#ff6b35` (orange)
- Card Background: `#2a2a2a`
- Border: `#3a3a3a`

**Light Theme Colors**:
- Background: `#ffffff`
- Text: `#000000`
- Accent: `#ff6b35` (orange, maintained)
- Card Background: `#f5f5f5`
- Border: `#e0e0e0`

---

### Project Model

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  link?: string;
}
```

---

### Testimonial Model

```typescript
interface Testimonial {
  id: string;
  text: string;
  author: string;
  role?: string;
  company?: string;
}
```

---

### User Model

```typescript
interface User {
  username: string;
  // Additional fields as needed for authentication
}

interface AuthCredentials {
  username: string;
  password: string;
}
```

---

### Contact Model

```typescript
interface ContactInfo {
  email: string;
  phone?: string;
  socialLinks?: SocialLink[];
}

interface SocialLink {
  platform: string; // 'github', 'linkedin', 'twitter', etc.
  url: string;
  icon?: string;
}
```

## Error Handling

### Theme Persistence Errors

**Scenario**: localStorage is unavailable or throws errors

**Handling**:
- Wrap localStorage calls in try-catch blocks
- Fall back to default theme ('dark') if read fails
- Log error to console for debugging
- Continue application execution without theme persistence

```javascript
function loadTheme() {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    return saved === 'light' ? 'light' : 'dark';
  } catch (error) {
    console.error('Failed to load theme:', error);
    return 'dark';
  }
}
```

---

### Authentication Errors

**Scenario**: Login fails due to invalid credentials

**Handling**:
- Return error message from login function
- Display error message to user
- Clear password field
- Maintain focus on form for retry

**Scenario**: Network error during authentication (future API integration)

**Handling**:
- Catch network errors
- Display user-friendly error message
- Provide retry mechanism
- Log error details for debugging

---

### Image Loading Errors

**Scenario**: Project images or profile photo fail to load

**Handling**:
- Use `onError` handler on `<img>` elements
- Display placeholder image or fallback UI
- Maintain layout stability (use aspect ratio boxes)
- Log failed image URLs for debugging

```javascript
<img
  src={imageUrl}
  alt={title}
  onError={(e) => {
    e.target.src = '/placeholder.png';
  }}
/>
```

---

### Scroll Navigation Errors

**Scenario**: Target section doesn't exist when nav link is clicked

**Handling**:
- Check if element exists before scrolling
- Log warning if section not found
- Gracefully fail without breaking navigation

```javascript
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn(`Section not found: ${sectionId}`);
  }
}
```

---

### Responsive Layout Errors

**Scenario**: Content overflow or layout breaks on specific screen sizes

**Handling**:
- Use CSS overflow properties appropriately
- Test breakpoints thoroughly
- Implement min/max width constraints
- Use flexible units (rem, %, vw) over fixed pixels

## Testing Strategy

### Overview

The portfolio website testing strategy combines unit tests for component behavior and integration tests for user workflows. Given the nature of this feature (primarily UI rendering, layout, and user interactions), property-based testing has limited applicability. Most testing will focus on:

1. **Component Unit Tests**: Verify individual components render correctly and handle props
2. **Integration Tests**: Verify user workflows (theme switching, navigation, authentication)
3. **Snapshot Tests**: Catch unintended UI changes
4. **Responsive Design Tests**: Verify layouts at different viewport sizes
5. **Accessibility Tests**: Ensure WCAG compliance where applicable

### Why Property-Based Testing Is Limited Here

Property-based testing (PBT) is most effective for testing pure functions with clear input/output behavior and universal properties. This portfolio website feature consists primarily of:

- **UI Rendering**: React components that render JSX based on props (snapshot tests are more appropriate)
- **Layout and Styling**: CSS-based responsive design (visual regression tests are more appropriate)
- **User Interactions**: Click handlers, scroll behavior, form submissions (example-based integration tests are more appropriate)
- **Side Effects**: localStorage access, DOM manipulation (mock-based tests are more appropriate)

However, there are a few areas where PBT could provide value:

1. **Theme Persistence Logic**: Testing that theme save/load operations are consistent
2. **Data Transformation**: If we add filtering, sorting, or search functionality for projects
3. **Input Validation**: If we add contact forms with validation logic

For this initial design, we'll focus on example-based unit and integration tests, with the option to add property-based tests if we introduce more complex data transformation logic in the future.

### Test Categories

#### 1. Component Unit Tests (Jest + React Testing Library)

**LoadingScreen Component**:
- Renders with initial progress of 0
- Displays Tiger logo
- Animates progress from 1 to 100
- Calls onComplete when progress reaches 100
- Displays progress percentage correctly

**ThemeProvider Component**:
- Provides default theme ('dark') on first load
- Loads saved theme from localStorage
- Updates theme when toggleTheme is called
- Persists theme to localStorage on change
- Handles localStorage errors gracefully

**NavigationBar Component**:
- Renders all navigation links (Skills, Projects, Hobbies)
- Renders theme toggle button
- Calls scroll function when nav link is clicked
- Displays mobile menu on small screens
- Displays full nav on large screens

**HeroSection Component**:
- Renders name, title, and introduction
- Renders professional photo
- Handles missing photo gracefully
- Adapts layout for mobile vs desktop

**AboutSection Component**:
- Renders years of experience
- Renders all skills in the list
- Displays skills in grid format

**PortfolioSection Component**:
- Renders all project cards
- Displays project title and description
- Handles missing images gracefully
- Applies grid layout correctly

**TestimonialsSection Component**:
- Renders all testimonials
- Displays testimonial text and author
- Handles optional role/company fields

**ContactSection Component**:
- Renders email address
- Renders phone number if provided
- Renders social links if provided
- Displays contact methods clearly

**ThemeToggle Component**:
- Displays current theme state
- Calls onToggle when clicked
- Shows appropriate icon for current theme

**AuthProvider Component**:
- Provides initial unauthenticated state
- Updates state on successful login
- Clears state on logout
- Rejects invalid credentials

#### 2. Integration Tests

**Theme Switching Workflow**:
- User loads app → sees dark theme
- User clicks theme toggle → sees light theme
- User refreshes page → light theme persists
- User clicks theme toggle again → returns to dark theme

**Navigation Workflow**:
- User clicks "Skills" link → scrolls to About section
- User clicks "Projects" link → scrolls to Portfolio section
- User clicks "Hobbies" link → scrolls to appropriate section

**Authentication Workflow**:
- User sees login form when not authenticated
- User enters valid credentials → becomes authenticated
- User sees logout button when authenticated
- User clicks logout → returns to unauthenticated state

**Loading Workflow**:
- App starts → loading screen displays
- Progress animates from 1 to 100
- Loading screen fades out
- Main content displays

#### 3. Responsive Design Tests

Test each major component at breakpoints:
- Mobile: 320px, 375px, 414px
- Tablet: 768px, 834px
- Laptop: 1024px, 1366px
- Desktop: 1920px, 2560px

Verify:
- No horizontal scrolling
- Content is readable
- Touch targets are appropriately sized (mobile)
- Layout adapts correctly
- Images scale appropriately

#### 4. Accessibility Tests

- All images have alt text
- Navigation is keyboard accessible
- Theme toggle is keyboard accessible
- Color contrast meets WCAG AA standards
- Focus indicators are visible
- Semantic HTML is used appropriately

#### 5. Snapshot Tests

Create snapshots for:
- Each component in dark theme
- Each component in light theme
- Each component at mobile width
- Each component at desktop width

### Test Configuration

**Jest Configuration** (already configured via Create React App):
- Test environment: jsdom
- Test match: `**/*.test.js`
- Coverage threshold: 80% for statements, branches, functions, lines

**React Testing Library Best Practices**:
- Query by accessible roles and labels
- Avoid testing implementation details
- Test user behavior, not internal state
- Use `userEvent` for realistic interactions

### Future Testing Enhancements

If we add more complex features, consider:

1. **Property-Based Tests** for:
   - Project filtering/search logic
   - Form validation rules
   - Data transformation functions

2. **Visual Regression Tests** using:
   - Percy, Chromatic, or BackstopJS
   - Automated screenshot comparison

3. **Performance Tests**:
   - Lighthouse CI for performance metrics
   - Bundle size monitoring
   - Loading time benchmarks

4. **End-to-End Tests** using:
   - Cypress or Playwright
   - Full user journey testing
   - Cross-browser compatibility

### Test Execution

**Run all tests**:
```bash
npm test
```

**Run tests in CI mode**:
```bash
npm test -- --coverage --watchAll=false
```

**Run specific test file**:
```bash
npm test -- LoadingScreen.test.js
```

### Success Criteria

- All unit tests pass
- All integration tests pass
- Code coverage ≥ 80%
- No accessibility violations in automated tests
- All components render correctly in both themes
- All components adapt correctly to different screen sizes

###
src/
│
├── assets/
│   ├── images/
│   │   ├── tiger-logo.png
│   │   ├── hero-photo.jpg
│   │   └── project-1.png
│   │
│   └── icons/
│
├── components/
│   │
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Loader.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── SectionTitle.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── hero/
│   │   ├── HeroSection.tsx
│   │   └── HeroSection.module.css
│   │
│   ├── about/
│   │   ├── AboutSection.tsx
│   │   ├── SkillsGrid.tsx
│   │   └── AboutSection.module.css
│   │
│   ├── portfolio/
│   │   ├── PortfolioSection.tsx
│   │   ├── ProjectCard.tsx
│   │   └── PortfolioSection.module.css
│   │
│   ├── testimonials/
│   │   ├── TestimonialsSection.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── TestimonialsSection.module.css
│   │
│   ├── contact/
│   │   ├── ContactSection.tsx
│   │   ├── ContactForm.tsx
│   │   └── ContactSection.module.css
│   │
│   └── auth/
│       ├── LoginForm.tsx
│       ├── LogoutButton.tsx
│       └── AuthStatus.tsx
│
├── contexts/
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
│
├── hooks/
│   ├── useTheme.ts
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   ├── useScrollReveal.ts
│   └── useWindowSize.ts
│
├── data/
│   ├── projects.ts
│   ├── testimonials.ts
│   ├── skills.ts
│   └── socialLinks.ts
│
├── pages/
│   └── Home.tsx
│
├── styles/
│   ├── globals.css
│   ├── variables.css
│   ├── animations.css
│   ├── themes.css
│   └── responsive.css
│
├── types/
│   ├── project.ts
│   ├── testimonial.ts
│   ├── user.ts
│   └── theme.ts
│
├── utils/
│   ├── scrollToSection.ts
│   ├── constants.ts
│   ├── authHelpers.ts
│   └── themeStorage.ts
│
├── App.tsx
├── main.tsx
└── index.css