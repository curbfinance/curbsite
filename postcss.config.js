module.exports = {
  plugins: {
    'tailwindcss/nesting': {},  // Enables nested CSS (optional but useful)
    'postcss-import': {},       // For importing CSS files
    'tailwindcss': {},
    'autoprefixer': {
      flexbox: 'no-2009'        // Improves CSS grid/flex support
    },
    'postcss-flexbugs-fixes': {}, // Fixes common flexbox issues
    ...(process.env.NODE_ENV === 'production'
      ? {
          'cssnano': {          // Minifies CSS in production
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true
                },
                // Needed for wallet adapter classes
                mergeIdents: false,
                reduceIdents: false
              }
            ]
          }
        }
      : {})
  }
}
