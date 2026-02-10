# Planning Guide

A landing page and interactive demonstration platform for MotionFlow AI, an innovative plugin for the Logitech MX Creative Console that combines physical controls with AI-powered creative workflows across professional applications.

**Experience Qualities**:
1. **Immersive** - Users should feel transported into the future of creative work through interactive demos and visceral animations
2. **Trustworthy** - Professional case studies and real metrics build confidence in the product's value
3. **Empowering** - Clear demonstrations show users exactly how they'll work faster and create better

**Complexity Level**: Complex Application (advanced functionality with multiple interactive views and persistent state)
- This is a sophisticated marketing and demonstration platform with multiple interactive simulations, persistent user preferences, community features, calculator tools, and rich multimedia content requiring coordination across many components and data flows.

## Essential Features

### Interactive Console Simulator (ENHANCED)
- **Functionality**: Simulates the physical MX Creative Console with rotatable dials, real-time AI generation, and advanced settings including quality presets, style selection, and configuration saving
- **Purpose**: Let users experience the product without owning hardware with full control over generation parameters
- **Trigger**: User lands on demo section or clicks "Try Interactive Demo"
- **Progression**: View idle state → Choose basic or advanced mode → Adjust dial slider → Select quality and style → Watch parameter change → Click generate → See AI processing animation → View generated result with metrics → Save/share/download configuration
- **Success criteria**: Users spend >60s interacting, try multiple styles and quality settings, save at least one configuration

### Application-Specific Scenarios
- **Functionality**: 8 different app simulations (Blender, Premiere, Photoshop, etc.) with custom parameters
- **Purpose**: Show how the plugin adapts to different creative tools
- **Trigger**: User clicks app tab in scenarios section
- **Progression**: Select application → Adjust parameter dial → Click activate → Watch AI processing → See result specific to that app → View success metrics
- **Success criteria**: Users try at least 2 different applications

### User Profile & Gamification (NEW - ENHANCED)
- **Functionality**: GitHub-integrated user profile with avatar, stats, achievements, and XP system
- **Purpose**: Create engaging, personalized experience that encourages exploration
- **Trigger**: Automatic on page load, accessible via top-right profile button
- **Progression**: View profile → See stats and achievements → Track progress → Level up through interactions → Unlock badges
- **Success criteria**: Users check profile multiple times, engage with achievement system

### Quick Actions Menu (NEW)
- **Functionality**: Floating action button with quick access to key sections
- **Purpose**: Improved navigation and user convenience
- **Trigger**: Always visible in bottom-right, expands on click
- **Progression**: Click FAB → View action options → Select action → Navigate to section or perform action
- **Success criteria**: Users utilize quick actions for faster navigation

### Featured Announcements Banner (NEW)
- **Functionality**: Dismissible banner carousel showing important updates and promotions
- **Purpose**: Highlight new features, promotions, and community updates
- **Trigger**: Appears on page load if not previously dismissed
- **Progression**: View announcement → Read details → Click CTA or dismiss → See next announcement
- **Success criteria**: Users engage with announcements, click CTAs

### ROI Calculator (ENHANCED)
- **Functionality**: Interactive calculator showing time/cost savings with save/load functionality
- **Purpose**: Help decision-makers justify the purchase
- **Trigger**: User navigates to ROI calculator section
- **Progression**: Enter team size → Select tools used → Input hourly rate → See projected savings in time/money → Save calculation for later
- **Success criteria**: Users complete calculation and see compelling ROI

### Community Preset Browser (ENHANCED)
- **Functionality**: Browse, filter, search, and favorite community-created dial configurations
- **Purpose**: Show ecosystem value and inspire use cases
- **Trigger**: User clicks "Explore Community Presets"
- **Progression**: Browse preset cards → Use search and filters → Preview preset details → Favorite presets → See download count and ratings
- **Success criteria**: Users interact with at least 3 presets, save favorites

### Video Showcase Gallery
- **Functionality**: Embedded video demonstrations of real usage
- **Purpose**: Show actual product in action with real professionals
- **Trigger**: User scrolls to video section
- **Progression**: View video grid → Click video thumbnail → Watch in modal player → Navigate to next video → Share or download
- **Success criteria**: >50% of users play at least one video

### Pricing Comparison Tool
- **Functionality**: Compare different licensing tiers with feature matrix
- **Purpose**: Help users choose the right plan
- **Trigger**: User navigates to pricing section
- **Progression**: View tier cards → Toggle annual/monthly → Compare features → Select tier → See what's included → Start trial or purchase
- **Success criteria**: Users understand pricing structure clearly

### Personal Preferences & Bookmarks (ENHANCED)
- **Functionality**: Save favorite presets, demo configurations, and ROI calculations with persistence
- **Purpose**: Personalized experience that persists across sessions
- **Trigger**: User clicks save/bookmark buttons throughout site
- **Progression**: User interacts → Clicks save → Confirmation toast → Data persists → Return later and see saved items
- **Success criteria**: Returning users see their saved content

### Workflow Comparison Tool (NEW)
- **Functionality**: Interactive side-by-side comparison showing traditional workflows vs MotionFlow AI with feature matrices, time breakdowns, and animated demonstrations
- **Purpose**: Clearly communicate the value proposition and time savings to decision-makers
- **Trigger**: User scrolls past interactive demo section
- **Progression**: View comparison table → Explore time savings breakdown → Watch animated workflow comparison → See physical control benefits → Understand ROI
- **Success criteria**: Users engage with both comparison views, watch full animation sequence

## Edge Case Handling

- **No hardware owned** - All demos are simulations, clearly labeled as previews
- **Slow AI generation** - Show loading states with progress indicators and time estimates
- **Unsupported browser** - Graceful degradation with static content, warning message
- **Empty saved items** - Show helpful onboarding prompts to explore and save
- **Calculator edge cases** - Validate inputs, handle zero/negative values, cap maximums
- **Video playback issues** - Fallback to thumbnail with external link
- **Mobile experience** - Touch-friendly controls, simplified layouts, priority content
- **First-time users** - Featured banner with onboarding hints, achievement tooltips
- **Returning users** - Persistent state restored, welcome back messages
- **Profile not loading** - Graceful fallback with generic user experience
- **Quick actions overlap** - Smart positioning to avoid overlapping with other UI elements
- **Achievement unlock spam** - Batch notifications, subtle celebration animations

## Design Direction

The design should evoke a sense of technological sophistication and creative empowerment. Users should feel they're interacting with cutting-edge professional tools that respect their expertise. The aesthetic combines the precision of professional software interfaces with the warmth and energy of creative work - dark, focused backgrounds with vibrant, energetic accent colors that pulse with possibility.

## Color Selection

A dark, tech-forward palette with vibrant accent colors that suggest AI intelligence and creative energy.

- **Primary Color**: `oklch(0.75 0.15 200)` - Bright cyan-blue suggesting technology and intelligence
- **Secondary Colors**: `oklch(0.35 0.12 280)` - Deep purple for depth and sophistication; `oklch(0.25 0.03 250)` - Rich dark blue for muted backgrounds
- **Accent Color**: `oklch(0.70 0.22 340)` - Vibrant pink-magenta for calls-to-action and energy
- **Foreground/Background Pairings**:
  - Background `oklch(0.18 0.02 250)` : Foreground `oklch(0.98 0 0)` - Ratio 15.8:1 ✓
  - Primary `oklch(0.75 0.15 200)` : Background `oklch(0.18 0.02 250)` - Ratio 7.2:1 ✓
  - Accent `oklch(0.70 0.22 340)` : Background `oklch(0.18 0.02 250)` - Ratio 6.1:1 ✓
  - Card `oklch(0.22 0.03 250)` : Foreground `oklch(0.98 0 0)` - Ratio 14.3:1 ✓

## Font Selection

Typography should balance technical precision with creative expressiveness - geometric sans-serifs that feel modern and professional.

- **Typographic Hierarchy**:
  - H1 (Hero Title): Space Grotesk Bold/72px/tight (-0.02em) - Commanding presence
  - H2 (Section Headers): Space Grotesk SemiBold/48px/tight - Clear hierarchy
  - H3 (Card Titles): Space Grotesk SemiBold/24px/normal - Readable emphasis
  - Body Text: Inter Regular/16px/relaxed (1.6em line-height) - Maximum readability
  - UI Elements: Inter Medium/14px/normal - Clarity and precision
  - Code/Metrics: Inter SemiBold/monospace feel/14px - Technical accuracy

## Animations

Animations should reinforce the connection between physical dial movement and digital response, creating a satisfying cause-and-effect relationship.

- **Dial rotations**: Smooth spring physics (framer-motion) that follow user input with slight momentum
- **AI generation**: Pulsing glow effects and rotating elements suggesting computation
- **Card hovers**: Subtle lift and glow suggesting interactivity
- **Page transitions**: Smooth fade and slide combinations (300ms ease-out)
- **Success states**: Celebratory scale-up with spring bounce
- **Metrics counting**: Animated number counting on scroll into view
- **Background elements**: Slow-moving gradients and particles suggesting ambient intelligence

## Component Selection

- **Components**: 
  - Shadcn `Card`, `Button`, `Badge` for consistent surfaces and actions
  - Shadcn `Slider` for dial simulation with custom styling
  - Shadcn `Tabs` for application switching and content organization
  - Shadcn `Dialog` for video player and detailed preset views
  - Shadcn `Avatar` for testimonials and community presets
  - Shadcn `Tooltip` for feature explanations and help text
  - Shadcn `Select` and `Input` for calculator forms
  - Custom dial visualization using `motion.div` with rotation transforms
  - Custom preset cards with image placeholders and metadata

- **Customizations**: 
  - Gradient-enhanced buttons with `bg-gradient-to-r from-primary to-accent`
  - Glass-morphism cards using custom `.glass-effect` class
  - Animated gradient mesh background with multiple radial gradients
  - Custom dial component with rotation indicator and glow effects
  - Video player modal with custom controls
  - Pricing comparison table with highlight column

- **States**:
  - Buttons: Default with gradient, hover with opacity change, active with scale down, disabled with reduced opacity
  - Sliders: Active dial with glow effect, dragging with cursor change
  - Cards: Default with subtle border, hover with border color shift and slight scale
  - Video thumbnails: Play button overlay on hover, loading spinner during playback
  - Saved items: Filled heart/bookmark icon with color change

- **Icon Selection**: 
  - Phosphor Icons (duotone weight) for visual richness
  - `Sparkle` for AI features, `Lightning` for speed, `Cpu` for technology
  - `Play`/`Pause` for media controls, `Heart` for favorites
  - `Calculator` for ROI tool, `Users` for community
  - `Download` for reports, `Share` for social actions

- **Spacing**: 
  - Section padding: `py-32` for generous breathing room
  - Card padding: `p-8` for content comfort
  - Grid gaps: `gap-6` to `gap-8` for clear separation
  - Element spacing: `space-y-4` to `space-y-6` for related content

- **Mobile**: 
  - Stack all two-column layouts vertically on `<lg` breakpoint
  - Hero text scales from `text-5xl` on mobile to `text-8xl` on desktop
  - Tab navigation switches to scrollable horizontal on mobile
  - Dial simulator remains functional with touch events
  - Video grid changes from 3 columns to 1 on mobile
  - Calculator inputs stack vertically with full width
