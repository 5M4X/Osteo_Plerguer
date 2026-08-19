import { useEffect, useState } from 'react'

const navigation = [
  { href: '#approche', label: 'L’approche' },
  { href: '#consultation', label: 'La consultation' },
  { href: '#pour-qui', label: 'Pour qui ?' },
  { href: '#cabinet', label: 'Le cabinet' },
  { href: '#avis', label: 'Avis' },
]

const audiences = [
  { number: '01', title: 'À chaque âge', text: 'Enfant, adolescent, adulte ou senior : une prise en charge adaptée à votre quotidien et à vos objectifs.', image: 'images/CV2.png' },
  { number: '02', title: 'Sport & mouvement', text: 'Pour accompagner la reprise, préparer une échéance ou retrouver de la confiance dans vos mouvements.', image: 'images/tens.jpg' },
  { number: '03', title: 'Grossesse & post-partum', text: 'Un accompagnement pensé pour les changements du corps, avant et après la naissance.', image: 'images/plume.jpg' },
]

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`
const reviewsWidgetId = '038d8a04-0da2-4bef-89b2-63a521efd7d6'

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Brand() {
  return <><img className="brand-logo" src={assetUrl('images/LogoMLB.png')} alt="" /><span><strong>OSTÉO</strong><small>PLERGUER</small></span></>
}

function GoogleReviews() {
  useEffect(() => {
    const scriptId = 'elfsight-platform'
    if (document.getElementById(scriptId)) return

    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://apps.elfsight.com/p/platform.js'
    script.defer = true
    document.body.appendChild(script)
  }, [])

  return <div className={`elfsight-app-${reviewsWidgetId}`} />
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const syncHeader = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', syncHeader, { passive: true })
    syncHeader()
    return () => window.removeEventListener('scroll', syncHeader)
  }, [])

  useEffect(() => {
    const onEscape = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#accueil" aria-label="Retour à l’accueil"><Brand /></a>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="appointment header-appointment" href="https://www.doctolib.fr/osteopathe/plerguer/maxime-lebreton" target="_blank" rel="noreferrer">Prendre rendez-vous <Arrow /></a>
        <button className={`menu-button ${menuOpen ? 'is-open' : ''}`} type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
        <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
          <a className="appointment" href="https://www.doctolib.fr/osteopathe/plerguer/maxime-lebreton" target="_blank" rel="noreferrer" onClick={closeMenu}>Prendre rendez-vous <Arrow /></a>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Cabinet d’ostéopathie · Plerguer</p>
            <h1 id="hero-title">Retrouver de la <em>liberté</em> dans vos mouvements.</h1>
            <p className="hero-lead">Une approche attentive, personnalisée et fondée sur l’écoute pour vous accompagner durablement.</p>
            <div className="hero-actions">
              <a className="appointment" href="https://www.doctolib.fr/osteopathe/plerguer/maxime-lebreton" target="_blank" rel="noreferrer">Prendre rendez-vous <Arrow /></a>
              <a className="text-link" href="tel:+33629211977">06 29 21 19 77</a>
            </div>
          </div>
          <div className="hero-art">
            <img src={assetUrl('images/Cabinet.jpg')} alt="Maxime Lebreton dans son cabinet d’ostéopathie" />
            <div className="hero-shade" />
            <p>Prendre le temps<br />d’aller mieux.</p>
            <span className="hero-stamp">Du lundi<br />au samedi</span>
          </div>
          <a className="scroll-note" href="#approche"><span>Découvrir</span><i /></a>
        </section>

        <section className="intro-band" id="approche" aria-labelledby="approche-title">
          <div className="section-label"><span>01</span> L’approche</div>
          <h2 id="approche-title">Un soin pensé <em>avec vous.</em></h2>
          <div className="intro-text"><p>Chaque consultation commence par un temps d’échange. Votre ressenti, vos habitudes et votre contexte sont essentiels pour comprendre votre situation dans sa globalité.</p><p>Les conseils et le traitement sont ensuite ajustés à vos besoins, avec un objectif simple : vous aider à mieux comprendre votre corps et à retrouver du confort.</p></div>
        </section>

        <section className="consultation-section" id="consultation" aria-labelledby="consultation-title">
          <div className="consultation-art"><img src={assetUrl('images/mains.jpg')} alt="Illustration de deux mains, symbole du soin manuel" /></div>
          <div className="consultation-copy"><div className="section-label"><span>02</span> Votre rendez-vous</div><h2 id="consultation-title">45 minutes pour faire le point <em>ensemble.</em></h2><p>Un bilan complet est réalisé à chaque rendez-vous afin de vous proposer une prise en charge cohérente et adaptée.</p><ol><li><span>01</span><div><strong>Échanger</strong><p>Comprendre votre motif de consultation, votre quotidien et vos attentes.</p></div></li><li><span>02</span><div><strong>Examiner</strong><p>Observer, tester et identifier les éléments utiles à votre accompagnement.</p></div></li><li><span>03</span><div><strong>Accompagner</strong><p>Traiter, conseiller et vous donner des repères concrets pour la suite.</p></div></li></ol></div>
        </section>

        <section className="audiences-section" id="pour-qui" aria-labelledby="audiences-title"><div className="section-label"><span>03</span> Pour qui ?</div><div className="audiences-heading"><h2 id="audiences-title">Tous concernés<br /><em>par le bien-être.</em></h2><p>Les contraintes du quotidien, les changements de rythme ou une activité physique peuvent générer gêne et inconfort. L’ostéopathie propose un accompagnement global, à chaque étape de la vie.</p></div><div className="audience-grid">{audiences.map((item) => <article key={item.number}><img src={assetUrl(item.image)} alt="" aria-hidden="true" /><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><i aria-hidden="true">→</i></article>)}</div></section>

        <section className="cabinet-section" id="cabinet" aria-labelledby="cabinet-title"><div className="cabinet-card"><div className="map-pin" aria-hidden="true">●</div><p className="section-label"><span>04</span> Le cabinet</p><h2 id="cabinet-title">À Plerguer,<br /><em>près de vous.</em></h2><address>Salle 5, Square Bertrand Robidou<br />35540 Plerguer</address><a className="text-link" href="https://maps.google.com/?q=Square+Bertrand+Robidou+35540+Plerguer" target="_blank" rel="noreferrer">Voir l’itinéraire <Arrow /></a></div><div className="info-card"><p className="info-kicker">Horaires</p><div className="hours"><p><span>Lundi — vendredi</span><strong>9h — 13h · 14h — 19h</strong></p><p><span>Samedi</span><strong>9h — 13h</strong></p></div><div className="access"><p className="info-kicker">Accès</p><p>Rez-de-chaussée · Salle d’attente porte 5<br />Parking de la Maison de Santé à proximité</p></div><a className="appointment" href="https://www.doctolib.fr/osteopathe/plerguer/maxime-lebreton" target="_blank" rel="noreferrer">Prendre rendez-vous <Arrow /></a></div></section>

        <section className="reviews-section" id="avis" aria-labelledby="reviews-title"><div className="reviews-heading"><p className="section-label"><span>05</span> Avis</p><h2 id="reviews-title">Ils en parlent<br /><em>mieux que nous.</em></h2><p>Découvrez les avis laissés par les patients du cabinet.</p></div><GoogleReviews /></section>

        <section className="contact-banner" aria-labelledby="contact-title"><div><p className="section-label"><span>06</span> Contact</p><h2 id="contact-title">Une question avant<br /><em>votre rendez-vous ?</em></h2></div><div><p>Vous pouvez réserver directement en ligne ou contacter le cabinet par téléphone.</p><a className="big-phone" href="tel:+33629211977">06 29 21 19 77 <Arrow /></a></div></section>
      </main>

      <footer><a className="brand" href="#accueil"><Brand /></a><p>Cabinet d’ostéopathie<br />Maxime Lebreton</p><div><a href="https://www.doctolib.fr/osteopathe/plerguer/maxime-lebreton" target="_blank" rel="noreferrer">Rendez-vous en ligne</a><span>© {new Date().getFullYear()}</span></div></footer>
    </div>
  )
}
