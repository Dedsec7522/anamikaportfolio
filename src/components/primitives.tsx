import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useEffect, useRef, type ReactNode } from 'react'

/** The one easing curve used across the site: quick start, long soft landing. */
export const EASE = [0.22, 1, 0.36, 1] as const

const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

interface MaskedLineProps {
  children: ReactNode
  delay?: number
  /** Animate on mount (hero) instead of waiting for the element to scroll into view. */
  onMount?: boolean
}

/** A line of text that rises out of an invisible mask. */
export function MaskedLine({ children, delay = 0, onMount = false }: MaskedLineProps) {
  // The mask itself is observed: the text inside starts fully clipped, so it can never
  // report as "in view" on its own.
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, VIEWPORT)
  return (
    <span className="mask-line" ref={ref}>
      <motion.span
        className="mask-line__inner"
        initial={{ y: '112%' }}
        animate={{ y: onMount || inView ? '0%' : '112%' }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: ReactNode
  lead?: string
  light?: boolean
}

export function SectionHeading({ index, eyebrow, title, lead, light }: SectionHeadingProps) {
  return (
    <header className={`section-heading${light ? ' section-heading--light' : ''}`}>
      <Reveal className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        <span className="eyebrow__rule" aria-hidden="true" />
        {eyebrow}
      </Reveal>
      <h2 className="section-heading__title">
        <MaskedLine>{title}</MaskedLine>
      </h2>
      {lead && (
        <Reveal delay={0.15}>
          <p className="section-heading__lead">{lead}</p>
        </Reveal>
      )}
    </header>
  )
}

export interface IconProps {
  size?: number
  strokeWidth?: number
  'aria-hidden'?: boolean | 'true' | 'false'
}

/** WhatsApp glyph. Lucide ships no brand icons, so this one is drawn inline. */
export function WhatsAppIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={rest['aria-hidden']}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const formatNumber =(n: number) => n.toLocaleString('en-IN')

/** Counts up to `to` once visible. Screen readers get the final value straight away. */
export function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (reduceMotion) {
      node.textContent = formatNumber(to)
      return
    }
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = formatNumber(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [inView, to, reduceMotion])

  return (
    <>
      <span ref={ref} aria-hidden="true">
        0
      </span>
      <span className="sr-only">{formatNumber(to)}</span>
    </>
  )
}

function ScrollWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

/** Text whose words come into focus one by one as the reader scrolls through it. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrollWord
          key={`${word}-${i}`}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        />
      ))}
    </p>
  )
}
