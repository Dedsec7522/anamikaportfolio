import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { about, asset, company, profile, stats } from '../content/profile'
import { Counter, EASE, Reveal, SectionHeading } from './primitives'

const RING_TEXT = `${profile.credential} · ${profile.role} · `

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 140])
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section className="section about" id="about" ref={ref}>
      <div className="container about__grid">
        <motion.div className="about__visual" style={{ y: photoY }}>
          <motion.div
            className="about__portrait"
            initial={{ opacity: 0, scale: 0.86 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            {/* Text set on a circle, turning slowly as the section scrolls past. */}
            <motion.svg className="about__ring" viewBox="0 0 400 400" style={{ rotate: ringRotate }} aria-hidden="true">
              <defs>
                <path id="about-ring-path" d="M200,200 m-184,0 a184,184 0 1,1 368,0 a184,184 0 1,1 -368,0" />
              </defs>
              <text>
                <textPath href="#about-ring-path" textLength="1150">
                  {RING_TEXT.repeat(2)}
                </textPath>
              </text>
            </motion.svg>
            <div className="about__photo">
              <img
                src={asset('images/desk-720.webp')}
                srcSet={`${asset('images/desk-360.webp')} 360w, ${asset('images/desk-720.webp')} 720w`}
                sizes="(min-width: 960px) 320px, 240px"
                width={720}
                height={720}
                alt={`${profile.name} writing at her desk`}
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </motion.div>

        <div className="about__copy">
          <SectionHeading index="01" eyebrow="About me" title={about.heading} />
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={paragraph} delay={0.08 * i}>
              <p className={i === 0 ? 'about__lead' : 'about__text'}>{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.1}>
            <p className="about__pull">{about.pullLine}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="about__company">
              <p className="about__company-label">Co-founder of</p>
              <p className="about__company-name">{company.name}</p>
              <p className="about__company-meta">
                {company.registration} · <strong>{company.arn}</strong>
              </p>
              <p className="about__company-meta">{company.founded}</p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container">
        <div className="stats">
          {stats.map((stat, i) => (
            <Reveal className="stats__item" key={stat.label} delay={0.1 * i}>
              <p className="stats__value">
                {stat.prefix && <span className="stats__prefix">{stat.prefix}</span>}
                <Counter to={stat.value} />
                {stat.suffix}
              </p>
              <p className="stats__label">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
