const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      alias: {
        "~": "./src"
      }
    }
  ]
];
