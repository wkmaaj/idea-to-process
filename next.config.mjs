/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    MONGODB_URI: 'mongodb://admin:pwd123!@localhost:27020',
    OLLAMA_MODEL: 'llama3.1'
  }
}

export default nextConfig
