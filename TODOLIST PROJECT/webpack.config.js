// 파일 경로와 웹팩 라이브러리 로딩
var path = require('path')          // output 속성에서 사용할 노드 path 라이브러리
var webpack = require('webpack')    // 웹팩 플러그인에서 사용할 node_modules의 웹팩 라이브러리.

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [.
          'vue-style-loader',       // index.html 에 <style> 태그로 삽입됨.
          'css-loader'              // CSS 파일 -> Javascript로 변환.
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',       // 역시 Javascript로 변환.
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',      // 자바스크립트 파일의 ES6 문법을 모든 브라우저에서 호환 가능한 Javascript로 변환.
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',       // 이미지 파일들.
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']         // 뷰 라이브러리의 여러 유형 중 어떤 걸 선택할지 지정.
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false                                      // 웹팩으로 빌드한 파일의 크기가 250kB를 넘으면 경고 메시지를 표시할지 설정.
  },
  devtool: '#eval-source-map'                         // 옵션.
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
