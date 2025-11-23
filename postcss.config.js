export default {
  plugins: {
    autoprefixer: {},
    cssnano: {
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          minifyFontValues: true,
          minifySelectors: true,
          minifyParams: true,
          colormin: true,
          convertValues: true,
          discardDuplicates: true,
          discardEmpty: true,
          discardOverridden: true,
          mergeRules: true,
          reduceIdents: false,
          zindex: false,
        },
      ],
    },
  },
};
