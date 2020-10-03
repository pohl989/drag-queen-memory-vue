const path = require("path");

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  chainWebpack: config => {
    // Add "node_modules" alias
    config.resolve.alias.set(
      "node_modules",
      path.join(__dirname, "./node_modules")
    );

    // Disable "prefetch" plugin since it's not properly working in some browsers
    config.plugins.delete("prefetch");
  }
};
