import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { PointerEvent } from 'react'
import { expertise, services } from '../content/profile'
import { EASE, Reveal, SectionHeading } from './primitives'

/** Feeds the pointer position to CSS so each card can light up under the cursor. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--px', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--py', `${event.clientY - rect.top}px`)
}

export function Expertise() {
  return (
    <section className="section expertise" id="expertise">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Expertise"
          title="What I bring to the table."
          lead="Four disciplines I have built my career on, and that shape every piece of advice I give."
        />

        <ul className="cards">
          {expertise.map(({ icon: Icon, title, body }, i) => (
            <motion.li
              className="card"
              key={title}
              onPointerMove={trackPointer}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.08 * i }}
            >
              <span className="card__number" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="card__icon" aria-hidden="true">
                <Icon size={24} strokeWidth={1.5} />
              </span>
              <h3 className="card__title">{title}</h3>
              <p className="card__body">{body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="container services__grid">
        <div className="services__intro">
          <SectionHeading
            light
            index="04"
            eyebrow="Services"
            title="How I can help."
            lead="Whichever of these brings you here, the starting point is the same: understanding what you are trying to achieve."
          />
          <Reveal delay={0.2}>
            <a href="#contact" className="btn btn--light">
              <span>Discuss your goals</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <ul className="service-list">
          {services.map(({ icon: Icon, title, body }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 * i }}
            >
              <a href="#contact" className="service" aria-label={`${title} — get in touch`}>
                <span className="service__index" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="service__main">
                  <span className="service__title">
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    {title}
                  </span>
                  <span className="service__body">{body}</span>
                </span>
                <span className="service__arrow" aria-hidden="true">
                  <ArrowUpRight size={22} strokeWidth={1.5} />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
