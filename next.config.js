const stylexPlugin = require('@stylexjs/nextjs-plugin');

const nextConfig = {
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.module.rules.unshift({
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/i,
                use: {
                    loader: '@next/font/google',
                },
            });

            // Exclude next/font module from Babel processing
            const babelRule = config.module.rules.find(
                (rule) => rule.loader === 'babel-loader'
            );
            if (babelRule) {
                babelRule.exclude.push(/node_modules\/(?!(next)\/).*/);
            }
        }

        return config;
    },
};

module.exports = stylexPlugin({
    filename: 'stylex-bundle.css',
    rootDir: __dirname,
})(nextConfig);