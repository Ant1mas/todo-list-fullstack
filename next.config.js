const nextConfig = {
  basePath: '',
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // For Docker. Comment this line to use `yarn start`.
}

module.exports = nextConfig
