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
        base: "cursor-pointer",
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
