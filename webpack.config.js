const path = require('path');
const { ESLINT_ENABLE } = require('./config');

module.exports = function (env = {}, argv) {
  let config = null;
  if (env.dev) {
    config = require('./config/dev');
  } else if (env.prod) {
    config = require('./config/prod');
  }  else if (env.pre) {
    config = require('./config/pre');
  } else {
    config = require('./config/test');
  }

  return {
    //公共的
    entry: {
      app: './src/index',
      vendors: ['react', 'react-amap', 'react-amap-plugin-geolocation', 'react-dom', 'react-redux', 'react-router-dom', 'antd', 'redux']
    },
    module: {
      rules: [
        //js/jsx
        {
          test: /\.jsx?$/i, exclude: /node_modules/, use: [
            //babel
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react']
              }
            },
            //eslint
            /*...[
              {
                loader: 'eslint-loader',
                options: {
                  outputReport: {
                    filePath: 'eslint.html',
                    formatter: require('eslint/lib/formatters/html')
                  }
                }
              }
            ]*/
          ]
        },
        //css
        {
          test: /\.css$/i, use: ['style-loader', 'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          }]
        },
        //图片
        {
          test: /\.(png|jpg|gif)$/i, use: {
            loader: 'url-loader',
            options: {
              outputPath: 'imgs/',
              limit: 10 * 1024
            }
          }
        },
        //字体
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/i, use: {
            loader: 'url-loader',
            options: {
              outputPath: 'fonts/',
              limit: 10 * 1024
            }
          }
        },
        //less
        { test: /\.less$/i, use: ['style-loader', 'css-loader', 'less-loader'] },
      ]
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src/'),
      }
    },
    //特定的
    ...config
  };
};
