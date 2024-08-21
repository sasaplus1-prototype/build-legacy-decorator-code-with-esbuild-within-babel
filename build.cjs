const fs = require('node:fs/promises');
const path = require('node:path');
const esbuild = require('esbuild');
const { transform } = require('@babel/core');

const babelOptions = {
  presets: [],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};

esbuild.build({
  entryPoints: [path.resolve('./index.mjs')],
  bundle: true,
  outfile: path.resolve('./index.js'),
  plugins: [
    {
      name: 'babel',
      setup(build) {
        build.onLoad({ filter: /\.(?:[cm]?[jt]s|[jt]sx)$/ }, async (args) => {
          const source = await fs.readFile(args.path, 'utf8');
          const result = transform(source, babelOptions);
          return { contents: result.code, loader: 'jsx' };
        });
      },
    },
  ],
});
