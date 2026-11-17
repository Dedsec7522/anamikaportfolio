import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { asset, disciplines, profile } from '../content/profile'
import { EASE, MaskedLine } from './primitives'

/** Rising curves that draw themselves in behind the hero — a quiet nod to long-term growth. */
function GrowthLines() {
  const paths = [
    'M-20 520 C 220 500, 380 430, 560 400 S 900 300, 1100 210 S 1340 120, 1460 60',
    'M-20 600 C 240 590, 420 540, 620 500 S 940 420, 1120 330 S 1340 230, 1460 190',
    'M-20 680 C 260 676, 460 640, 680 606 S 980 540, 1160 460 S 1360 370, 1460 330',
  ]
  return (
    <svg className="hero__lines" viewBox="0 0 1440 720" preserveAspectRatio="none" aria-hidden="true">
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 - i * 0.28 }}
          transition={{ duration: 2.8, ease: EASE, delay: 0.5 + i * 0.25 }}
        />
      ))}
    </svg>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Kept inside the photo's 1.12 overscale so the frame never shows an empty edge.
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const linesY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__backdrop" style={{ y: linesY }} aria-hidden="true">
        <GrowthLines />
      </motion.div>

      <div className="container hero__grid">
        <motion.div className="hero__copy" style={{ y: copyY }}>
          <motion.p
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            <span className="hero__dot" aria-hidden="true" />
            {profile.role} · {profile.credential}
          </motion.p>

          <h1 className="hero__title">
            <MaskedLine onMount delay={0.3}>
              {profile.firstName}
            </MaskedLine>
            <MaskedLine onMount delay={0.42}>
              <em>{profile.lastName}</em>
            </MaskedLine>
          </h1>

          <motion.p
            className="hero__intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          >
            {profile.intro}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1 }}
          >
            <a href="#contact" className="btn">
              <span>Start a conversation</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href="#about" className="link-arrow">
              My story
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <div className="hero__visual">
          <motion.div
            className="hero__frame-outline"
            aria-hidden="true"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x: 18, y: 18 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.1 }}
          />
          <motion.div
            className="hero__frame"
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 999px 999px 20px 20px)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 999px 999px 20px 20px)' }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
          >
            <motion.div
              className="hero__photo"
              style={{ y: photoY }}
              initial={{ scale: 1.24 }}
              animate={{ scale: 1.12 }}
              transition={{ duration: 2, ease: EASE, delay: 0.35 }}
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${asset('images/portrait-480.webp')} 480w, ${asset('images/portrait-800.webp')} 800w, ${asset('images/portrait-1086.webp')} 1086w`}
                  sizes="(min-width: 960px) 36vw, 82vw"
                />
                <img
                  src={asset('images/portrait-800.jpg')}
                  width={1086}
                  height={1448}
                  alt={`Portrait of ${profile.name} in her office`}
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}
          >
            <span className="hero__badge-mark">{profile.credentialShort}</span>
            <span>
              <strong>{profile.credential}</strong>
              <small>In financial services since 2005</small>
            </span>
          </motion.div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <div className="marquee__group" key={copy}>
              {[...disciplines, ...disciplines].map((item, i) => (
                <span key={`${item}-${i}`}>
                  {item}
                  <i />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
