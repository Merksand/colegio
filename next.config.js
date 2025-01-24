/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {},
    },
    // env: {
    //     DB_HOST: process.env.DB_HOST || 'localhost',
    //     DB_USER: process.env.DB_USER || 'root',
    //     DB_PASSWORD: process.env.DB_PASSWORD || 'Miguelangelomy1',
    //     DB_NAME: process.env.DB_NAME || 'BD_COLEGIO1',
    // },
};

module.exports = nextConfig;
