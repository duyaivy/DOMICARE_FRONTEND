const config = {
  baseUrl: import.meta.env.VITE_API_URL || '',
  maxSizeUploadAvatar: 1048576 * 2,
  googleId: import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
}

export default config
