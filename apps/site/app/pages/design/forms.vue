<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="Forms"
      description="Form components, patterns, and guidelines for the RidersDB design system."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Forms' },
      ]"
      :navigation-items="[]"
    />
    <div class="">
      <!-- Form Components -->
      <DesignPageSection
        id="components"
        title="Form Components"
        description="Input fields, textareas, selects, checkboxes, and radios."
      >
        <div class="space-y-8">
          <!-- Input Field -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Input Field
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div class="space-y-4">
                <UFormGroup
                  label="Default Input"
                  name="default"
                >
                  <UInput placeholder="Enter text..." />
                </UFormGroup>

                <UFormGroup
                  label="Required Field"
                  name="required"
                  required
                >
                  <UInput placeholder="This field is required" />
                </UFormGroup>

                <UFormGroup
                  label="With Help Text"
                  name="help"
                  help="This is helper text"
                >
                  <UInput placeholder="Input with help" />
                </UFormGroup>

                <UFormGroup
                  label="Disabled Input"
                  name="disabled"
                >
                  <UInput
                    placeholder="Disabled input"
                    disabled
                  />
                </UFormGroup>
              </div>
            </div>

            <div class="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                Code Example
              </h4>
              <pre
                class="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto"
              ><code>&lt;UFormGroup label="Email" name="email" required&gt;
  &lt;UInput
    type="email"
    placeholder="Enter your email"
    v-model="form.email"
  /&gt;
&lt;/UFormGroup&gt;</code></pre>
            </div>
          </div>

          <!-- Textarea -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Textarea
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div class="space-y-4">
                <UFormGroup
                  label="Message"
                  name="message"
                >
                  <UTextarea
                    placeholder="Enter your message..."
                    :rows="4"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Resizable Textarea"
                  name="resizable"
                >
                  <UTextarea
                    placeholder="This textarea can be resized"
                    resize
                  />
                </UFormGroup>
              </div>
            </div>
          </div>

          <!-- Select -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Select
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div class="space-y-4">
                <UFormGroup
                  label="Country"
                  name="country"
                >
                  <USelect
                    placeholder="Select a country"
                    :options="[
                      { label: 'United States', value: 'us' },
                      { label: 'Canada', value: 'ca' },
                      { label: 'United Kingdom', value: 'uk' },
                      { label: 'Germany', value: 'de' },
                    ]"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Multiple Select"
                  name="skills"
                >
                  <USelectMenu
                    placeholder="Select skills"
                    multiple
                    :options="[
                      'JavaScript',
                      'TypeScript',
                      'Vue.js',
                      'React',
                      'Node.js',
                    ]"
                  />
                </UFormGroup>
              </div>
            </div>
          </div>

          <!-- Checkbox and Radio -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Checkbox & Radio
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div class="space-y-6">
                <UFormGroup
                  label="Preferences"
                  name="preferences"
                >
                  <div class="space-y-2">
                    <UCheckbox label="Email notifications" />
                    <UCheckbox label="SMS notifications" />
                    <UCheckbox label="Marketing updates" />
                  </div>
                </UFormGroup>

                <UFormGroup
                  label="Payment Method"
                  name="payment"
                >
                  <URadioGroup
                    :options="[
                      { label: 'Credit Card', value: 'card' },
                      { label: 'PayPal', value: 'paypal' },
                      { label: 'Bank Transfer', value: 'bank' },
                    ]"
                  />
                </UFormGroup>
              </div>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <!-- Input Variants -->
      <DesignPageSection
        id="inputs"
        title="Input Field Variants"
        description="Sizes, types, and icon usage for inputs."
      >
        <div class="space-y-8">
          <!-- Sizes -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Sizes
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8"
            >
              <div class="space-y-6">
                <UFormGroup
                  label="Small Input"
                  name="small"
                >
                  <UInput
                    size="sm"
                    placeholder="Small input"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Medium Input (Default)"
                  name="medium"
                >
                  <UInput
                    size="md"
                    placeholder="Medium input"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Large Input (Recommended)"
                  name="large"
                >
                  <UInput
                    size="lg"
                    placeholder="Large input for better readability"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Extra Large Input"
                  name="xl"
                >
                  <UInput
                    size="xl"
                    placeholder="Extra large input for primary forms"
                  />
                </UFormGroup>
              </div>
            </div>
          </div>

          <!-- Input Types -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Input Types
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormGroup
                  label="Email"
                  name="email"
                >
                  <UInput
                    type="email"
                    placeholder="email@example.com"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Password"
                  name="password"
                >
                  <UInput
                    type="password"
                    placeholder="Password"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Number"
                  name="number"
                >
                  <UInput
                    type="number"
                    placeholder="123"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Date"
                  name="date"
                >
                  <UInput type="date" />
                </UFormGroup>

                <UFormGroup
                  label="URL"
                  name="url"
                >
                  <UInput
                    type="url"
                    placeholder="https://example.com"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Search"
                  name="search"
                >
                  <UInput
                    type="search"
                    placeholder="Search..."
                  />
                </UFormGroup>
              </div>
            </div>
          </div>

          <!-- With Icons -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Inputs with Icons
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div class="space-y-4">
                <UFormGroup
                  label="Search"
                  name="search-icon"
                >
                  <UInput
                    placeholder="Search products..."
                    icon="i-heroicons-magnifying-glass"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Email"
                  name="email-icon"
                >
                  <UInput
                    type="email"
                    placeholder="Enter email"
                    icon="i-heroicons-envelope"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Amount"
                  name="amount"
                >
                  <UInput
                    placeholder="0.00"
                    trailing-icon="i-heroicons-currency-dollar"
                  />
                </UFormGroup>
              </div>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <!-- Validation -->
      <DesignPageSection
        id="validation"
        title="Form Validation"
        description="Validation states and guidelines."
      >
        <div class="space-y-8">
          <!-- Validation States -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Validation States
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div class="space-y-4">
                <UFormGroup
                  label="Valid Input"
                  name="valid"
                >
                  <UInput
                    placeholder="This input is valid"
                    color="success"
                    trailing-icon="i-heroicons-check-circle"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Invalid Input"
                  name="invalid"
                  error="This field is required"
                >
                  <UInput
                    placeholder="This input has an error"
                    color="error"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Warning Input"
                  name="warning"
                  help="This value looks unusual"
                >
                  <UInput
                    placeholder="This input has a warning"
                    color="warning"
                  />
                </UFormGroup>
              </div>
            </div>
          </div>

          <!-- Validation Guidelines -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Validation Guidelines
            </h3>
            <div
              class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
            >
              <ul class="space-y-3 text-blue-800 dark:text-blue-200">
                <li class="flex items-start">
                  <span
                    class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"
                  ></span>
                  <span
                    ><strong>Real-time validation:</strong> Validate fields as
                    users type or leave the field</span
                  >
                </li>
                <li class="flex items-start">
                  <span
                    class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"
                  ></span>
                  <span
                    ><strong>Clear error messages:</strong> Use specific,
                    actionable error messages</span
                  >
                </li>
                <li class="flex items-start">
                  <span
                    class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"
                  ></span>
                  <span
                    ><strong>Visual indicators:</strong> Use color, icons, and
                    borders to indicate state</span
                  >
                </li>
                <li class="flex items-start">
                  <span
                    class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"
                  ></span>
                  <span
                    ><strong>Prevent errors:</strong> Use input masks, character
                    limits, and format hints</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <!-- Form Patterns -->
      <DesignPageSection
        id="patterns"
        title="Form Patterns"
        description="Common form patterns like login and contact forms."
      >
        <div class="space-y-8">
          <!-- Login Form -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Login Form Pattern
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 max-w-md"
            >
              <form class="space-y-4">
                <UFormGroup
                  label="Email"
                  name="email"
                  required
                >
                  <UInput
                    type="email"
                    placeholder="Enter your email"
                    icon="i-heroicons-envelope"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Password"
                  name="password"
                  required
                >
                  <UInput
                    type="password"
                    placeholder="Enter your password"
                    icon="i-heroicons-lock-closed"
                  />
                </UFormGroup>

                <div class="flex items-center justify-between">
                  <UCheckbox label="Remember me" />
                  <UButton
                    variant="link"
                    size="sm"
                    >Forgot password?</UButton
                  >
                </div>

                <UButton
                  type="submit"
                  block
                >
                  Sign In
                </UButton>
              </form>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Contact Form Pattern
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 max-w-2xl"
            >
              <form class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UFormGroup
                    label="First Name"
                    name="firstName"
                    required
                  >
                    <UInput placeholder="John" />
                  </UFormGroup>

                  <UFormGroup
                    label="Last Name"
                    name="lastName"
                    required
                  >
                    <UInput placeholder="Doe" />
                  </UFormGroup>
                </div>

                <UFormGroup
                  label="Email"
                  name="email"
                  required
                >
                  <UInput
                    type="email"
                    placeholder="john@example.com"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Subject"
                  name="subject"
                >
                  <USelect
                    placeholder="Select a subject"
                    :options="[
                      'General Inquiry',
                      'Technical Support',
                      'Billing Question',
                      'Feature Request',
                    ]"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Message"
                  name="message"
                  required
                >
                  <UTextarea
                    placeholder="Tell us how we can help..."
                    :rows="5"
                  />
                </UFormGroup>

                <div class="flex justify-end">
                  <UButton type="submit"> Send Message </UButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <!-- Accessibility -->
      <DesignPageSection
        id="accessibility"
        title="Form Accessibility"
        description="Accessibility best practices and WCAG compliance."
      >
        <div class="space-y-6">
          <div
            class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6"
          >
            <h3
              class="text-lg font-semibold text-green-800 dark:text-green-200 mb-4"
            >
              Accessibility Best Practices
            </h3>
            <ul class="space-y-3 text-green-700 dark:text-green-300">
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>Label every input:</strong> Use proper labels or
                  aria-label attributes</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>Keyboard navigation:</strong> Ensure all form
                  elements are keyboard accessible</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>Error announcements:</strong> Use aria-live regions
                  for dynamic error messages</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>Required field indicators:</strong> Mark required
                  fields clearly for screen readers</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>Focus management:</strong> Provide clear focus
                  indicators and logical tab order</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>Color independence:</strong> Don't rely solely on
                  color to convey information</span
                >
              </li>
            </ul>
          </div>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              WCAG Compliance
            </h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Our form components are designed to meet WCAG 2.1 AA standards:
            </p>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Minimum contrast ratios of 4.5:1 for normal text</li>
              <li>• Touch targets of at least 44x44 pixels</li>
              <li>• Clear focus indicators with 3:1 contrast ratio</li>
              <li>• Semantic HTML structure with proper ARIA attributes</li>
            </ul>
          </div>
        </div>
      </DesignPageSection>
    </div>
  </BasePageWrapper>
</template>

<script setup lang="ts">
// SEO meta
definePageMeta({
  title: "Forms - RidersDB Design System",
});
</script>
