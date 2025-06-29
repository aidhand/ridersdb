<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="Data Display"
      description="Patterns and components for presenting data, including tables, lists, and code blocks."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Data Display' },
      ]"
      :navigation-items="[]"
    />
    <div class="">
      <DesignPageSection
        id="tables"
        title="Tables"
        description="Use tables for structured data. Ensure proper alignment and accessibility."
      >
        <div class="overflow-x-auto">
          <table
            class="min-w-full border border-neutral-200 dark:border-neutral-800 rounded-lg"
          >
            <thead class="bg-neutral-50 dark:bg-neutral-900">
              <tr>
                <th
                  class="px-4 py-2 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200"
                >
                  Name
                </th>
                <th
                  class="px-4 py-2 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200"
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-4 py-2 text-neutral-900 dark:text-white">
                  Example
                </td>
                <td class="px-4 py-2 text-neutral-700 dark:text-neutral-300">
                  123
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DesignPageSection>
      <DesignPageSection
        id="code-blocks"
        title="Code Blocks"
        description="Use font-mono for code and technical content."
      >
        <pre
          class="text-sm font-mono bg-neutral-50 dark:bg-neutral-900 p-4 rounded overflow-x-auto"
        >
const value = 123;
console.log(value);</pre
        >
      </DesignPageSection>
    </div>
  </BasePageWrapper>
</template>

<script setup lang="ts">
// No additional logic needed for static data display page
</script>
