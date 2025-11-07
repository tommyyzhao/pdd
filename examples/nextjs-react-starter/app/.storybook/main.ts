import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    // Add TypeScript loader
    config.module?.rules?.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
      ],
    });

    // Configure CSS/PostCSS for Tailwind v4
    // Find and modify the CSS rule to use PostCSS with Tailwind
    const cssRule = config.module?.rules?.find(
      (rule) =>
        rule &&
        typeof rule === 'object' &&
        'test' in rule &&
        rule.test instanceof RegExp &&
        rule.test.test('test.css')
    );

    if (cssRule && typeof cssRule === 'object' && 'use' in cssRule) {
      // Add postcss-loader with Tailwind v4 configuration
      const cssLoaders = Array.isArray(cssRule.use) ? cssRule.use : [cssRule.use];
      cssRule.use = [
        ...cssLoaders,
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              plugins: [
                require.resolve('@tailwindcss/postcss'),
              ],
            },
          },
        },
      ];
    }

    return config;
  },
};

export default config;
