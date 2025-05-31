export default defineAppConfig({
  site: {
    name: "RideDB",
    description: "Search, compare and find motorcycles, gear, and accessories",
  },

  ui: {
    colors: {
      primary: "sky",
      neutral: "zinc",
    },

    button: {
      slots: {
        base: "cursor-pointer inline-flex items-center gap-2",
      },

      defaultVariants: {
        size: "lg",
      },
    },

    input: {
      slots: {
        base: "min-w-64",
      },

      defaultVariants: {
        size: "lg",
      },
    },

    select: {
      slots: {
        base: "min-w-64",
      },

      defaultVariants: {
        size: "lg",
      },
    },

    textarea: {
      slots: {
        base: "min-w-64",
      },

      defaultVariants: {
        size: "lg",
      },
    },
  },
});
