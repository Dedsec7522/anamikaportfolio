import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { nav, profile } from '../content/profile'
import { observeSections } from '../hooks/useSmoothScroll'
import { EASE } from './primitives'

const sectionIds = nav.map((item) => item.id)

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Solid bar once the page has moved; tuck away while reading down, return on scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > previous && y > 480)
    if (y < 200) setActive('')
  })

  useEffect(() => observeSections(sectionIds, setActive), [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}
        initial={{ y: -90 }}
        animate={{ y: hidden && !open ? -90 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="container nav__inner">
          <a href="#top" className="nav__brand" aria-label={`${profile.name} — back to top`}>
            <span className="nav__monogram" aria-hidden="true">
              AG
            </span>
            <span className="nav__name">{profile.name}</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {nav.slice(0, -1).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav__link"
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="nav__indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <a href="#contact" className="btn btn--small nav__cta">
            <span>Get in touch</span>
          </a>

          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav className="mobile-menu__links" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 }}
                >
                  <span className="mobile-menu__index">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <p className="mobile-menu__foot">
              {profile.role} · {profile.credential}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
