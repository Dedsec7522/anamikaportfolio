import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CircleCheck, Info, Mail, MapPin, Phone } from 'lucide-react'
import { useId, useState, type ComponentType, type FormEvent } from 'react'
import { contact, profile } from '../content/profile'
import { EASE, Reveal, SectionHeading, WhatsAppIcon, type IconProps } from './primitives'

type Field = 'name' | 'email' | 'phone' | 'message'
type Values = Record<Field, string>
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'unconfigured' | 'error'

const EMPTY: Values = { name: '', email: '', phone: '', message: '' }

function validate(values: Values): Partial<Values> {
  const errors: Partial<Values> = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.phone.trim() && !/^[+\d][\d\s-]{6,17}$/.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number, or leave this blank.'
  if (values.message.trim().length < 10) errors.message = 'A sentence or two about what you need is enough.'
  return errors
}

async function deliver(values: Values): Promise<Status> {
  if (contact.formEndpoint) {
    const response = await fetch(contact.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    })
    return response.ok ? 'sent' : 'error'
  }
  if (contact.email) {
    const subject = encodeURIComponent(`Enquiry from ${values.name}`)
    const body = encodeURIComponent(
      `${values.message}\n\n${values.name}\n${values.email}${values.phone ? `\n${values.phone}` : ''}`,
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    return 'mailto'
  }
  return 'unconfigured'
}

const feedback: Partial<Record<Status, { tone: 'ok' | 'info' | 'bad'; text: (name: string) => string }>> = {
  sent: { tone: 'ok', text: (name) => `Thank you, ${name}. Your message is on its way and I will reply personally.` },
  mailto: { tone: 'ok', text: () => 'Your email app should now be open with the message ready to send.' },
  unconfigured: {
    tone: 'info',
    text: () =>
      'Your details are valid, but this form is not connected to an inbox yet. Add an email address or form endpoint in src/content/profile.ts to start receiving messages.',
  },
  error: { tone: 'bad', text: () => 'Something went wrong while sending. Please try again in a moment.' },
}

export function Contact() {
  const id = useId()
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Partial<Values>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [sentName, setSentName] = useState('')

  const update = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const blur = (field: Field) => {
    const message = validate(values)[field]
    setErrors((e) => ({ ...e, [field]: values[field] || field !== 'phone' ? message : undefined }))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as Field[])[0]
    if (firstInvalid) {
      document.getElementById(`${id}-${firstInvalid}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const result = await deliver(values)
      setSentName(values.name.trim().split(' ')[0])
      setStatus(result)
      if (result === 'sent') setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const field = (name: Field, label: string, props: { type?: string; autoComplete?: string; optional?: boolean }) => (
    <div className={`field${errors[name] ? ' field--invalid' : ''}`}>
      <label htmlFor={`${id}-${name}`}>
        {label}
        {props.optional && <span className="field__optional">Optional</span>}
      </label>
      <input
        id={`${id}-${name}`}
        name={name}
        type={props.type ?? 'text'}
        autoComplete={props.autoComplete}
        value={values[name]}
        required={!props.optional}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `${id}-${name}-error` : undefined}
        onChange={(e) => update(name, e.target.value)}
        onBlur={() => blur(name)}
      />
      {errors[name] && (
        <p className="field__error" id={`${id}-${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  )

  const details = [
    contact.email && { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    contact.whatsapp && {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: contact.phone || `+${contact.whatsapp}`,
      href: `https://wa.me/${contact.whatsapp}`,
      external: true,
    },
    contact.phone && { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, '')}` },
    contact.location && { icon: MapPin, label: 'Office', value: contact.location, href: undefined },
  ].filter(Boolean) as { icon: ComponentType<IconProps>; label: string; value: string; href?: string; external?: boolean }[]

  const note = feedback[status]

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__intro">
          <SectionHeading
            light
            index="07"
            eyebrow="Contact"
            title="Let’s talk about where you want to go."
            lead="Tell me a little about your goals and what is on your mind. Every conversation starts with listening."
          />

          {details.length > 0 && (
            <ul className="contact__details">
              {details.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <span className="contact__icon">
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span>
                    <small>{label}</small>
                    {href ? (
                      <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {contact.social.length > 0 && (
            <ul className="contact__social">
              {contact.social.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <Reveal delay={0.2}>
            <p className="contact__signoff">
              — {profile.name}
              <span>
                {profile.role}, {profile.credential}
              </span>
            </p>
          </Reveal>
        </div>

        <motion.form
          className="form"
          noValidate
          onSubmit={submit}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="form__row">
            {field('name', 'Your name', { autoComplete: 'name' })}
            {field('email', 'Email address', { type: 'email', autoComplete: 'email' })}
          </div>
          {field('phone', 'Phone number', { type: 'tel', autoComplete: 'tel', optional: true })}

          <div className={`field${errors.message ? ' field--invalid' : ''}`}>
            <label htmlFor={`${id}-message`}>How can I help?</label>
            <textarea
              id={`${id}-message`}
              name="message"
              rows={5}
              value={values.message}
              required
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? `${id}-message-error` : undefined}
              onChange={(e) => update('message', e.target.value)}
              onBlur={() => blur('message')}
            />
            {errors.message && (
              <p className="field__error" id={`${id}-message-error`}>
                {errors.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn form__submit" disabled={status === 'sending'}>
            <span>{status === 'sending' ? 'Sending…' : 'Send message'}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>

          <div aria-live="polite">
            <AnimatePresence mode="wait">
              {note && (
                <motion.p
                  key={status}
                  className={`form__note form__note--${note.tone}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {note.tone === 'ok' ? (
                    <CircleCheck size={18} aria-hidden="true" />
                  ) : (
                    <Info size={18} aria-hidden="true" />
                  )}
                  {note.text(sentName)}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
