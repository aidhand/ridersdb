export default defineAppConfig({
  site: {
    name: "RideDB",
    description: "Search, compare and find motorcycles, gear, and accessories",
  },

  ui: {
    // Extend existing colors with your brand colors
    colors: {
      primary: "sky",
      secondary: "slate",
      neutral: "zinc",

      // OAuth Provider Brand Colors
      discord: "discord",
      microsoft: "microsoft",
      google: "google",
      spotify: "spotify",
      facebook: "facebook",
      twitter: "twitter",
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
