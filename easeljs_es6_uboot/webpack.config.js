var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
module.exports = {
    context: __dirname, 
    entry: "./es6/main.js",
    output: {
        path: __dirname ,
        filename: "./dist/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
	    { test: /\.jpg$/,
	      exclude: /node_modules/,
	      loader: 'file-loader'  }, 
	    { test: /\.png$/,
	       exclude: /node_modules/,
	       loader: 'file-loader'
	    }
        ],
 	rules: [
    	{
      	test: /\.js$/,
      	exclude: /(node_modules|bower_components)/,
      	use: {
        	loader: 'babel-loader',
       		 options: {
          	presets: ['env']
        }
      }
    }
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
