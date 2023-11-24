import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['client/index.ts'],
    outfile: 'public/js/bundle.js',
    bundle: true,
    minify: true,
});
