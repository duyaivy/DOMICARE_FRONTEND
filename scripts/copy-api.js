import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcDir = path.resolve(__dirname, '../api')
const destDir = path.resolve(__dirname, '../dist/api')

// Create dist/api directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

// Copy api folder to dist
fs.cpSync(srcDir, destDir, { recursive: true })

console.log('✅ Copied api folder to dist/api')
