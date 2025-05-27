# RidersDB UI Style Guide

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Design Principles](#component-design-principles)
6. [UI Components](#ui-components)
7. [Icons](#icons)
8. [Accessibility](#accessibility)
9. [Dark Mode](#dark-mode)
10. [Responsive Design](#responsive-design)
11. [Code Standards](#code-standards)

---

## Design Philosophy

### Core Principles

Our design system is built on the foundation of modern UI libraries like shadcn/ui, Nuxt UI, and Tailwind UI, emphasizing:

- **Simplicity & Clarity**: Clean, uncluttered interfaces that prioritize content
- **Consistency**: Predictable patterns and behaviors across all components
- **Accessibility First**: WCAG 2.1 AA compliance built into every component
- **Performance**: Lightweight, optimized components that load fast
- **Flexibility**: Customizable components that adapt to different use cases

### Visual Identity

- **Clean & Modern**: Minimalist aesthetic with purposeful use of whitespace
- **Professional**: Suitable for data-intensive automotive applications
- **Approachable**: Friendly and intuitive for users of all technical levels
- **Scalable**: Design patterns that work from mobile to desktop

---

## Color System

### Semantic Color Palette

Our color system emphasizes shading and opacity modifiers over exact color specifications for better theme consistency:

```css
/* Base Colors - Use these as foundations */
--color-primary: theme("colors.blue.500");
--color-neutral: theme("colors.zinc.500");
--color-success: theme("colors.green.500");
--color-warning: theme("colors.orange.500");
--color-error: theme("colors.red.500");
--color-info: theme("colors.blue.500");
```

### Preferred Shading Approach

Instead of specifying exact colors with dark mode variants, use opacity modifiers:

```css
/* ❌ Avoid: Explicit color specifications */
.bg-neutral-200 {
  background-color: theme("colors.zinc.200");
}
.dark:bg-neutral-800 {
  background-color: theme("colors.zinc.800");
}

/* ✅ Preferred: Shading with opacity */
.bg-neutral-400/20 {
  background-color: rgb(161 161 170 / 0.2);
}
.bg-neutral-500/10 {
  background-color: rgb(113 113 122 / 0.1);
}
```

### Usage Guidelines

- **Primary**: Use for main actions, links, and brand elements
- **Neutral**: Use for text, borders, and backgrounds
- **Success**: Use for positive actions and confirmations
- **Warning**: Use for cautions and alerts
- **Error**: Use for errors and destructive actions
- **Info**: Use for informational messages

### Color Application Examples

```css
/* Backgrounds with opacity */
.bg-primary-500/10     /* Light primary background */
.bg-primary-500/20     /* Medium primary background */
.bg-neutral-500/5      /* Subtle neutral background */
.bg-neutral-500/10     /* Light neutral background */

/* Borders with opacity */
.border-neutral-500/20 /* Subtle borders */
.border-primary-500/30 /* Primary borders */

/* Text with opacity for hierarchy */
.text-neutral-500/90   /* Primary text */
.text-neutral-500/70   /* Secondary text */
.text-neutral-500/50   /* Muted text */
```

### Shading Best Practices

1. **Use opacity modifiers** (`/10`, `/20`, `/30`) instead of color scale variants (`-100`, `-200`, `-300`)
2. **Start with base colors** (`-500`) and adjust opacity rather than picking lighter/darker variants
3. **Consistent opacity levels**: Use increments of 5-10% for subtle differences
4. **Theme adaptability**: Opacity-based colors automatically adapt to light/dark themes

### Brand Colors

- **Primary Blue**: `blue-500` with opacity modifiers for variants
- **Neutral Gray**: `zinc-500` with opacity modifiers for text hierarchy
- **Background**: Automatically handled by theme system

---

## Typography

### Font Family

```css
--font-sans: "Inter Variable", sans-serif;
```

Inter Variable provides excellent readability and modern appearance across all weights and sizes.

### Type Scale

```css
/* Heading Scale */
.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
} /* 36px */
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
} /* 30px */
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
} /* 24px */
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
} /* 20px */
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
} /* 18px */

/* Body Scale */
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
} /* 16px */
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
} /* 14px */
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
} /* 12px */
```

### Typography Hierarchy

- **H1**: `text-4xl font-bold` - Page titles
- **H2**: `text-3xl font-semibold` - Section headers
- **H3**: `text-2xl font-semibold` - Subsection headers
- **H4**: `text-xl font-medium` - Component headers
- **Body**: `text-base` - Default body text
- **Caption**: `text-sm text-neutral-500/70` - Supporting text
- **Label**: `text-sm font-medium text-neutral-500/90` - Form labels

### Font Weights

- **Light**: `font-light` (300) - Rarely used, only for large decorative text
- **Regular**: `font-normal` (400) - Default body text
- **Medium**: `font-medium` (500) - Emphasis, labels
- **Semibold**: `font-semibold` (600) - Headings, important text
- **Bold**: `font-bold` (700) - Strong emphasis, titles

---

## Spacing & Layout

### Spacing Scale

Follow a consistent 4px-based spacing scale:

```css
/* Spacing Scale (4px base) */
.p-1 {
  padding: 0.25rem;
} /* 4px */
.p-2 {
  padding: 0.5rem;
} /* 8px */
.p-3 {
  padding: 0.75rem;
} /* 12px */
.p-4 {
  padding: 1rem;
} /* 16px */
.p-6 {
  padding: 1.5rem;
} /* 24px */
.p-8 {
  padding: 2rem;
} /* 32px */
.p-12 {
  padding: 3rem;
} /* 48px */
.p-16 {
  padding: 4rem;
} /* 64px */
.p-24 {
  padding: 6rem;
} /* 96px */
```

### Layout Patterns

#### Container

```vue
<BaseContainer>
  <!-- Content with consistent max-width and padding -->
</BaseContainer>
```

#### Grid System

```vue
<BaseGrid cols="1 md:2 lg:3" gap="6">
  <!-- Responsive grid items -->
</BaseGrid>
```

#### Vertical Spacing

- **Tight**: `gap-2` (8px) - Related items
- **Normal**: `gap-4` (16px) - Default spacing
- **Relaxed**: `gap-6` (24px) - Section spacing
- **Loose**: `gap-12` (48px) - Major section breaks

### Breakpoints

```css
/* Custom Breakpoints */
--breakpoint-2xs: 32rem; /* 512px */
--breakpoint-xs: 48rem; /* 768px */
--breakpoint-sm: 56rem; /* 896px */
--breakpoint-md: 64rem; /* 1024px */
--breakpoint-lg: 72rem; /* 1152px */
--breakpoint-xl: 80rem; /* 1280px */
--breakpoint-2xl: 96rem; /* 1536px */
--breakpoint-3xl: 112rem; /* 1792px */
```

---

## Component Design Principles

### Hierarchy

1. **Atoms**: Basic building blocks (buttons, inputs, icons)
2. **Molecules**: Simple combinations (search bar, navigation item)
3. **Organisms**: Complex components (header, product grid, forms)
4. **Templates**: Page layouts
5. **Pages**: Complete interfaces

### Component Structure

```vue
<script setup lang="ts">
// Props with proper TypeScript definitions
interface Props {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
});
</script>

<template>
  <component
    :class="[
      'base-classes',
      variants[props.variant],
      sizes[props.size],
      { 'disabled-classes': props.disabled },
    ]"
  >
    <slot />
  </component>
</template>
```

### Variant System

All components should support consistent variant patterns:

- **primary**: Main action variant
- **secondary**: Secondary action variant
- **outline**: Outlined variant
- **ghost**: Minimal variant
- **subtle**: Low-emphasis variant

### Size System

Consistent sizing across components:

- **xs**: Extra small (rare use)
- **sm**: Small
- **md**: Medium (default)
- **lg**: Large
- **xl**: Extra large (headers, heroes)

---

## UI Components

### Buttons

```vue
<!-- Primary button -->
<UButton variant="solid" color="primary" size="md">
  Primary Action
</UButton>

<!-- Secondary button -->
<UButton variant="outline" color="neutral" size="md">
  Secondary Action
</UButton>

<!-- Icon button -->
<UButton icon="i-tabler-plus" variant="solid" color="primary" size="md">
  Add Item
</UButton>
```

### Forms

```vue
<!-- Form input -->
<UFormGroup label="Product Name" required>
  <UInput
    v-model="productName"
    placeholder="Enter product name"
    :error="errors.productName"
  />
</UFormGroup>

<!-- Select dropdown -->
<UFormGroup label="Category">
  <USelect
    v-model="category"
    :options="categoryOptions"
    placeholder="Select category"
  />
</UFormGroup>
```

### Navigation

```vue
<!-- Back button -->
<BackButton text="Back to Products" to="/products" />

<!-- Breadcrumb -->
<UBreadcrumb>
  <UBreadcrumbItem href="/">Home</UBreadcrumbItem>
  <UBreadcrumbItem href="/products">Products</UBreadcrumbItem>
  <UBreadcrumbItem>Details</UBreadcrumbItem>
</UBreadcrumb>
```

### Cards

```vue
<UCard>
  <template #header>
    <h3 class="text-lg font-semibold">Card Title</h3>
  </template>

  <p class="text-neutral-600">Card content goes here.</p>

  <template #footer>
    <UButton variant="outline">Action</UButton>
  </template>
</UCard>
```

### Data Display

```vue
<!-- Table -->
<UTable
  :rows="products"
  :columns="columns"
  :loading="loading"
  :empty-state="{
    icon: 'i-tabler-database-off',
    label: 'No products found',
  }"
/>

<!-- Badge -->
<UBadge variant="solid" color="success">Active</UBadge>
<UBadge variant="outline" color="warning">Pending</UBadge>
```

---

## Icons

### Preferred Icon Libraries

Our design system primarily uses two icon libraries for consistency and comprehensive coverage:

#### Primary: Tabler Icons

- **Prefix**: `i-tabler-*`
- **Style**: Clean, modern outline icons with consistent stroke width
- **Usage**: General UI icons, interface elements, actions
- **Size**: Designed for 24x24px but scales well
- **Examples**:
  ```vue
  <UIcon name="i-tabler-plus" />
  <UIcon name="i-tabler-search" />
  <UIcon name="i-tabler-settings" />
  <UIcon name="i-tabler-user" />
  ```

#### Secondary: Lucide Icons

- **Prefix**: `i-lucide-*`
- **Style**: Minimal, elegant outline icons
- **Usage**: Specialized icons not available in Tabler, decorative elements
- **Size**: Designed for flexibility across sizes
- **Examples**:
  ```vue
  <UIcon name="i-lucide-moon" />
  <UIcon name="i-lucide-sun" />
  <UIcon name="i-lucide-check" />
  <UIcon name="i-lucide-x" />
  ```

### Icon Usage Guidelines

#### Selection Priority

1. **First choice**: Check Tabler Icons for the needed icon
2. **Second choice**: Use Lucide Icons if not available in Tabler
3. **Last resort**: Use other icon libraries only when absolutely necessary

#### Common Icons Reference

| Purpose    | Tabler                           | Lucide                           | Usage                       |
| ---------- | -------------------------------- | -------------------------------- | --------------------------- |
| Add/Create | `i-tabler-plus`                  | `i-lucide-plus`                  | Add buttons, create actions |
| Search     | `i-tabler-search`                | `i-lucide-search`                | Search inputs, filters      |
| Settings   | `i-tabler-settings`              | `i-lucide-settings`              | Configuration, preferences  |
| User       | `i-tabler-user`                  | `i-lucide-user`                  | Profile, account            |
| Home       | `i-tabler-home`                  | `i-lucide-home`                  | Navigation, dashboard       |
| Edit       | `i-tabler-edit`                  | `i-lucide-edit`                  | Edit actions, modify        |
| Delete     | `i-tabler-trash`                 | `i-lucide-trash`                 | Delete, remove actions      |
| Close      | `i-tabler-x`                     | `i-lucide-x`                     | Close modals, dismiss       |
| Menu       | `i-tabler-menu`                  | `i-lucide-menu`                  | Navigation menu toggle      |
| Theme      | `i-tabler-sun` / `i-tabler-moon` | `i-lucide-sun` / `i-lucide-moon` | Theme switching             |

#### Icon Implementation

```vue
<!-- Basic icon usage -->
<UIcon name="i-tabler-plus" class="w-5 h-5" />

<!-- Icon in button -->
<UButton icon="i-tabler-plus" variant="solid" color="primary">
  Add Product
</UButton>

<!-- Icon with trailing position -->
<UButton trailing-icon="i-tabler-arrow-right" variant="outline">
  View Details
</UButton>

<!-- Icon in navigation -->
<ULink href="/products" class="flex items-center gap-2">
  <UIcon name="i-tabler-package" class="w-4 h-4" />
  Products
</ULink>
```

#### Icon Sizing

- **Extra Small**: `w-3 h-3` (12px) - Inline with small text
- **Small**: `w-4 h-4` (16px) - Navigation, small buttons
- **Medium**: `w-5 h-5` (20px) - Default button icons, form elements
- **Large**: `w-6 h-6` (24px) - Card headers, prominent actions
- **Extra Large**: `w-8 h-8` (32px) - Hero sections, large cards

#### Accessibility

- **Always provide alternative text** when icons convey meaning
- **Use ARIA labels** for icon-only buttons
- **Ensure sufficient contrast** for icon visibility
- **Test with screen readers** to verify icon meaning is conveyed

```vue
<!-- Icon-only button with accessibility -->
<UButton
  icon="i-tabler-search"
  variant="ghost"
  aria-label="Search products"
  title="Search products"
/>

<!-- Icon with descriptive text (preferred) -->
<UButton icon="i-tabler-plus">
  Add Product
</UButton>
```

### Migration from Other Icon Libraries

When updating existing code:

1. **Replace Heroicons**: Prefer Tabler equivalents when available
2. **Update prefixes**: Change `i-heroicons-*` to `i-tabler-*` or `i-lucide-*`
3. **Check functionality**: Ensure icons render correctly after changes
4. **Update documentation**: Keep icon references current

---

## Accessibility

### WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Keyboard Navigation**: Full keyboard support with logical tab order
- **Screen Readers**: Proper ARIA labels and semantic HTML

### Focus Management

```css
/* Focus ring utilities using opacity */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2;
}

.focus-ring-inset {
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-inset;
}
```

### Semantic HTML

```vue
<!-- Use proper heading hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Use semantic elements -->
<nav aria-label="Main navigation"></nav>
```

### ARIA Labels

```vue
<!-- Screen reader support -->
<button aria-label="Close dialog">
  <Icon name="close" />
</button>

<img src="..." alt="Product image showing..." />

<input aria-describedby="help-text" />
<div id="help-text">Helper text here</div>
```

---

## Dark Mode

### Implementation

Dark mode is handled automatically by the theme system and opacity-based colors:

```css
body {
  @apply text-neutral-500/90 bg-white;
  @apply dark:text-neutral-400/90 dark:bg-black;
}

/* Opacity-based colors adapt automatically */
.card {
  @apply bg-neutral-500/5 border border-neutral-500/20;
  /* No dark: variants needed - opacity adapts to theme */
}
```

### Color Considerations

- Use opacity-based colors that adapt automatically to theme changes
- Avoid explicit `dark:` prefixes when using opacity modifiers
- Test all components in both light and dark modes
- Use semantic color names rather than specific shade numbers
- Leverage the automatic theme adaptation of opacity-based colors

### Toggle Component

```vue
<ThemeToggle />
```

---

## Responsive Design

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens:

```vue
<div
  class="
  grid grid-cols-1 gap-4
  md:grid-cols-2 md:gap-6
  lg:grid-cols-3 lg:gap-8
"
></div>
```

### Breakpoint Usage

- **2xs-xs**: Mobile phones (512px-768px)
- **sm-md**: Tablets (896px-1024px)
- **lg-xl**: Desktop (1152px-1280px)
- **2xl-3xl**: Large screens (1536px+)

### Common Patterns

```vue
<!-- Responsive padding -->
<div class="px-4 sm:px-6 lg:px-8"></div>
```

---

## Code Standards

### Vue Component Guidelines

1. **Single File Components**: Always use `.vue` files with `<script setup>`
2. **TypeScript**: Use TypeScript for all props and complex logic
3. **Composition API**: Prefer Composition API over Options API
4. **Props**: Use `defineProps` with TypeScript interfaces
5. **Naming**: Use PascalCase for components, camelCase for props

### CSS Guidelines

1. **Utility-First**: Use Tailwind utilities whenever possible
2. **Custom CSS**: Only add custom CSS when utilities aren't sufficient
3. **Scoped Styles**: Use `<style scoped>` for component-specific styles
4. **CSS Variables**: Use for dynamic theming and complex calculations

### File Structure

```
components/
├── base/           # Foundation components (Container, Grid)
├── site/           # Site-specific components (Header, Nav)
├── ui/             # Reusable UI components
└── [feature]/      # Feature-specific components
```

### Component Naming

- **Base Components**: `Base[Name].vue` (BaseContainer, BaseGrid)
- **Site Components**: `Site[Name].vue` (SiteHeader, SiteNav)
- **UI Components**: Use Nuxt UI components with `U` prefix
- **Feature Components**: `[Feature][Name].vue` (ProductCard, ProductList)

### Props Interface

```typescript
interface Props {
  // Required props first
  title: string;

  // Optional props with defaults
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;

  // Complex types
  items?: Array<{ id: string; name: string }>;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  items: () => [],
});
```

### Event Handling

```vue
<script setup lang="ts">
// Define emits
const emit = defineEmits<{
  click: [event: MouseEvent];
  change: [value: string];
}>();

// Event handlers
const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>
```

---

## Implementation Examples

### Page Layout

```vue
<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <SiteHeader />

    <main class="py-8">
      <BaseContainer>
        <div class="space-y-8">
          <div>
            <BackButton />
            <h1 class="text-3xl font-bold mt-4">Page Title</h1>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <!-- Main content -->
            </div>
            <aside>
              <!-- Sidebar -->
            </aside>
          </div>
        </div>
      </BaseContainer>
    </main>
  </div>
</template>
```

### Form Layout

```vue
<UForm :state="form" @submit="onSubmit">
  <div class="space-y-6">
    <UFormGroup label="Product Name" required>
      <UInput v-model="form.name" />
    </UFormGroup>

    <UFormGroup label="Description">
      <UTextarea v-model="form.description" />
    </UFormGroup>

    <div class="flex gap-4">
      <UButton type="submit" variant="solid" color="primary">
        Save Product
      </UButton>
      <UButton variant="outline" @click="cancel">
        Cancel
      </UButton>
    </div>
  </div>
</UForm>
```

---

## Best Practices Summary

1. **Consistency**: Use established patterns and components
2. **Accessibility**: Test with screen readers and keyboard navigation
3. **Performance**: Optimize images and minimize custom CSS
4. **Responsiveness**: Design mobile-first, enhance for desktop
5. **Maintainability**: Keep components simple and focused
6. **Documentation**: Comment complex logic and prop interfaces
7. **Testing**: Test components in both light and dark modes
8. **Version Control**: Use semantic versioning for component updates

---

This style guide should be treated as a living document, updated as the design system evolves and new patterns emerge. All team members should familiarize themselves with these guidelines to ensure consistent, high-quality user interfaces across the RidersDB application.
