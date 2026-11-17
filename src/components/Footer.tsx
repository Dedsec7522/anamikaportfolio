import { ArrowUp, Mail } from 'lucide-react'
import { company, contact, nav, profile } from '../content/profile'
import { WhatsAppIcon } from './primitives'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <p className="footer__name">{profile.name}</p>
            <p className="footer__role">
              {profile.role}, {company.name} · {profile.credential}
            </p>
            <p className="footer__role">
              {company.registration} · {company.arn}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="footer__links">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {(contact.email || contact.phone || contact.social.length > 0) && (
            <ul className="footer__contact">
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`}>
                    <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.whatsapp && (
                <li>
                  <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
                    <WhatsAppIcon size={18} aria-hidden="true" />
                    WhatsApp
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a>
                </li>
              )}
              {contact.social.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="footer__bottom">
          <p>
            © {YEAR} {profile.name}. All rights reserved.
          </p>
          <a href="#top" className="footer__top-link">
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
