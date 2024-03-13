export default {
    API_URL: import.meta.env.PROD ? import.meta.env?.VITE_API_URL || 'https://to-webp-converter.onrender.com/api' : 'http://localhost:5000/api'
}