module.exports = {
  full: true,
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
    },
    {
      name: 'removeViewBox',
      params: {
        active: false,
      },
    },
    {
      name: 'removeDimensions',
      params: {
        active: true,
      },
    },
    {
      name: 'convertColors',
      params: {
        currentColor: true,
      },
    },
  ],
}
