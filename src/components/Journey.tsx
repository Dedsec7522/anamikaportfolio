import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { journey } from '../content/profile'
import { EASE, SectionHeading } from './primitives'

export function Journey() {
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.55'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <section className="section journey" id="journey">
      <div className="container journey__grid">
        <div className="journey__intro">
          <SectionHeading
            index="02"
            eyebrow="Professional journey"
            title="From a first role to building Redolent."
            lead="Three chapters, one constant: doing the work carefully."
          />
        </div>

        <div className="timeline" ref={listRef}>
          <span className="timeline__rail" aria-hidden="true">
            <motion.span className="timeline__fill" style={{ scaleY: progress }} />
          </span>
          <ol>
          {journey.map((step, i) => (
            <motion.li
              className="timeline__item"
              key={step.year}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: '0px 0px -30% 0px' }}
            >
              <motion.span
                className="timeline__node"
                aria-hidden="true"
                variants={{ hidden: { scale: 0 }, shown: { scale: 1 } }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              />
              <motion.div
                className="timeline__card"
                variants={{ hidden: { opacity: 0, x: 36 }, shown: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.05 * i }}
              >
                <p className="timeline__year">{step.year}</p>
                <div>
                  <p className="timeline__kicker">{step.kicker}</p>
                  <h3 className="timeline__title">{step.title}</h3>
                  <p className="timeline__body">{step.body}</p>
                </div>
              </motion.div>
            </motion.li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
