// Generates optimised, responsive images from the originals in /source-assets.
// Run with: npm run images
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'source-assets')
const out = path.join(root, 'public', 'images')
await mkdir(out, { recursive: true })

// 1. Studio portrait -> hero. Natural proportions preserved (3:4).
const portrait = path.join(src, 'portrait.webp')
for (const w of [480, 800, 1086]) {
  await sharp(portrait).resize({ width: w }).webp({ quality: 82 }).toFile(path.join(out, `portrait-${w}.webp`))
}
await sharp(portrait).resize({ width: 800 }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(out, 'portrait-800.jpg'))

// Social share card (1200x630), cropped around the face.
await sharp(portrait)
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(out, 'og-image.jpg'))

// 2. Desk photograph, extracted from the profile-card screenshot.
// The photo is circular in the source, so we cut the square just inside its ring
// and the site always presents it in a round frame.
const card = path.join(src, 'profile-card.png')
const cx = 419, cy = 316, r = 180
const desk = sharp(card).extract({ left: cx - r, top: cy - r, width: r * 2, height: r * 2 })
await desk.clone().resize({ width: 720, kernel: 'lanczos3' }).webp({ quality: 86 }).toFile(path.join(out, 'desk-720.webp'))
await desk.clone().webp({ quality: 88 }).toFile(path.join(out, 'desk-360.webp'))

console.log('Images written to public/images')
