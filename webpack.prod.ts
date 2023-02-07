import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: {
    app: path.resolve(__dirname, 'src', 'index'),
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx', ],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@/components': path.resolve(__dirname, 'src/components/'),
      '@/store': path.resolve(__dirname, 'src/store/'),
      '@/images': path.resolve(__dirname, 'src/images/'),
      '@/styles': path.resolve(__dirname, 'src/styles/'),
      '@/hooks': path.resolve(__dirname, 'src/hooks/'),
      '@/reducers': path.resolve(__dirname, 'src/reducers/'),
      '@/utils': path.resolve(__dirname, 'src/utils/'),
      '@/data': path.resolve(__dirname, 'src/data/'),
      '@/layouts': path.resolve(__dirname, 'src/layouts/'),
      '@/actions': path.resolve(__dirname, 'src/actions/'),
      '@/pages': path.resolve(__dirname, 'src/pages/'),
      '@/types': path.resolve(__dirname, 'src/types/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, 'node_modules'),
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: [ 'last 2 chrome versions', ], },
              },
            ],
            [ '@babel/preset-react', {
              runtime: 'automatic',
              importSource: '@emotion/react',
            }, ],
            '@babel/preset-typescript',
            '@emotion/babel-preset-css-prop',
          ],
          plugins: [ '@emotion/babel-plugin', 'babel-plugin-macros', ],
        },
      },
      {
        test: /\.(css|scss)/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
};

export default config;
