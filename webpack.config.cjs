module.exports = {
  // ... other configuration options
  resolve: {
    fallback: {
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      buffer: false,
      util: false,
      assert: false,
      os: false,
      zlib: false,
      http: false,
      https: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
      process: false,
      timers: false,
    },
  },
};
