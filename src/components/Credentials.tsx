import { motion } from 'motion/react'
import { Award, GraduationCap } from 'lucide-react'
import { credentials, philosophy } from '../content/profile'
import { EASE, Reveal, ScrollText, SectionHeading } from './primitives'

const icons = { Education: GraduationCap, Certification: Award } as const

export function Credentials() {
  return (
    <section className="section credentials" id="credentials">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Education & certification"
          title="The qualifications behind the advice."
        />

        <ul className="credential-list">
          {credentials.map((item, i) => {
            const Icon = icons[item.kind as keyof typeof icons] ?? Award
            return (
              <motion.li
                className="credential"
                key={item.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.12 * i }}
              >
                <span className="credential__icon" aria-hidden="true">
                  <Icon size={26} strokeWidth={1.4} />
                </span>
                <div>
                  <p className="credential__kind">{item.kind}</p>
                  <h3 className="credential__title">{item.title}</h3>
                  <p className="credential__issuer">{item.issuer}</p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function Philosophy() {
  return (
    <section className="section philosophy" aria-labelledby="philosophy-title">
      <div className="container">
        <Reveal className="eyebrow">
          <span className="eyebrow__index">06</span>
          <span className="eyebrow__rule" aria-hidden="true" />
          <span id="philosophy-title">How I think about this work</span>
        </Reveal>

        <ScrollText className="philosophy__statement" text={philosophy.statement} />

        <div className="principles">
          {philosophy.principles.map((principle, i) => (
            <Reveal className="principle" key={principle.title} delay={0.1 * i}>
              <span className="principle__index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="principle__title">{principle.title}</h3>
              <p className="principle__body">{principle.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
