export default {
    API_URL: import.meta.env.PROD ?
        (import.meta.env?.VITE_API_URL || 'https://to-webp-converter.onrender.com/api') :
        'http://localhost:5000/api',
    IS_ONLINE_REQUEST_TIMEOUT: 1000 * 60 * 14
}
console.log('import.meta.env', import.meta.env)