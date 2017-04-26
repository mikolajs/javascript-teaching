var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
module.exports = {
    context: __dirname + "/app",
    entry: "./entry.js",
    output: {
        path: __dirname + "/dist",
        filename: "./bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
         new BrowserSyncPlugin({
            host: 'localhost',
            port: 8080,
            server: {
                baseDir: 'dist'
            },
            ui: false,
            online: false,
            notify: false
        })
    ]
};
