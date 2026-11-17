import { MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import './App.css'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Credentials, Philosophy } from './components/Credentials'
import { Expertise, Services } from './components/Expertise'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Journey } from './components/Journey'
import { Nav } from './components/Nav'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
}

export default function App() {
  useSmoothScroll()

  return (
    // reducedMotion="user" switches off transform animations for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Expertise />
        <Services />
        <Credentials />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
