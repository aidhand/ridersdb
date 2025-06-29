export default defineAppConfig({
  site: {
    name: "RideDB",
    description: "Search, compare and find motorcycles, gear, and accessories",
  },

  ui: {
    colors: {
      primary: "sky",
      neutral: "zinc",
      // OAuth Provider Brand Colors
      discord: "discord",
      microsoft: "microsoft",
      google: "google",
      spotify: "spotify",
      facebook: "facebook",
      twitter: "twitter",
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
