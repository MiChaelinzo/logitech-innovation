# Planning Guide

**Experience Qualities**:

**Experience Qualities**:
- This is a sophisticated marketing and demonstration platform with multiple interactive simulations, persistent user preferences, 
## Essential Features
### Interactive Console Simulator (ENHANCED)

**Complexity Level**: Complex Application (advanced functionality with multiple interactive views and persistent state)
- This is a sophisticated marketing and demonstration platform with multiple interactive simulations, persistent user preferences, community features, calculator tools, and rich multimedia content requiring coordination across many components and data flows.

## Essential Features

### Interactive Console Simulator (ENHANCED)
- **Functionality**: Simulates the physical MX Creative Console with rotatable dials, real-time AI generation, and advanced settings including quality presets, style selection, and configuration saving
- **Purpose**: Let users experience the product without owning hardware with full control over generation parameters
- **Trigger**: User lands on demo section or clicks "Try Interactive Demo"
- **Functionality**: Floating action button with quick access to key sections
- **Trigger**: Always visible in bottom-right, expands on click

### Featured Announcements Banner 
- **Purpose**: Highlight new features, promotions, and community updates
- **Progression**: View announcement → Read details → Click CTA or di

- **Functionality**: Interactive calculator showing time/cost savings with save/load functionality
- **Trigger**: User navigates to ROI calculator section

### Community Preset Browser (ENHANCED)
- **Purpose**: Show ecosystem value and inspire use cases
- **Progression**: Browse preset cards → Use search and filters → Preview preset de

- **Functionality**: Embedded video demonstrations of real usage
- **Trigger**: User scrolls to video section

### Pricing Comparison Tool
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
- **Metrics counting**: Animated number countin


  - Shadcn `Card`, `Button`, `Badge` for consistent surfaces and a

  - Shadcn `Avatar` for testimonials and commun
  - Shadcn `Select` and `Input` for calculator forms
  - Custom preset cards with image placeholders and metadata
- **Customizations**: 
  - Glass-morphism cards using custom `.glass-effect` class
  - Custom dial component with rotation indicator and glow effe

- **States**:
  - Sliders: Active dial with glow effect, dragging with cursor change
  - Video thumbnails: Play button overlay on hover, loading spinner during playback

  - Phosphor Icons (duotone weight) for visual richness
  - `Play`/`Pause` for media controls, `Heart` for favorites

- **Spacing**: 

  - Element spacing: `space-y-4` to `space-y-6` for related content
- **Mobile**: 
  - Hero text scales from `text-5xl` on mobile to `text-8xl` on desktop
  - Dial simulator remains functional with touch events
  - Calculator inputs stack vertically with full width


























































  - Shadcn `Select` and `Input` for calculator forms

  - Custom preset cards with image placeholders and metadata

- **Customizations**: 

  - Glass-morphism cards using custom `.glass-effect` class





- **States**:

  - Sliders: Active dial with glow effect, dragging with cursor change

  - Video thumbnails: Play button overlay on hover, loading spinner during playback



  - Phosphor Icons (duotone weight) for visual richness

  - `Play`/`Pause` for media controls, `Heart` for favorites



- **Spacing**: 



  - Element spacing: `space-y-4` to `space-y-6` for related content

- **Mobile**: 

  - Hero text scales from `text-5xl` on mobile to `text-8xl` on desktop

  - Dial simulator remains functional with touch events

  - Calculator inputs stack vertically with full width
