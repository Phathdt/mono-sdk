import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    sourcemap: true,
  },
  clean: true,
  sourcemap: true,
  treeshake: true,
  minify: false,
  target: 'es2022',
  skipNodeModulesBundle: true,
  external: ['@phathdt/mono-1'],
});
