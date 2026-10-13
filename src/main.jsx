import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronDown,
  Leaf,
  MapPin,
  Menu,
  Mountain,
  MoveUpRight,
  Sprout,
  TreePine,
  Waves,
  X,
} from 'lucide-react';
import './styles.css';

const LOGO = '/images/pentora-logo.png';
const IMAGES = {
  hero: '/manus-storage/async-images/pDmnY54MKRlWFAbza2RbvC/image-1.webp',
  plantation: '/manus-storage/async-images/pDmnY54MKRlWFAbza2RbvC/image-2.webp',
  cave: '/manus-storage/async-images/pDmnY54MKRlWFAbza2RbvC/image-3.webp',
  farm: '/manus-storage/async-images/pDmnY54MKRlWFAbza2RbvC/image-4.webp',
  vision: '/manus-storage/async-images/pDmnY54MKRlWFAbza2RbvC/image-5.webp',
  plantationDetail: '/manus-storage/async-images/g78HoZaxvhwdT3Y43XgpsB/image-1.webp',
  caveInterior: '/manus-storage/async-images/g78HoZaxvhwdT3Y43XgpsB/image-2.webp',
  farmExperience: '/manus-storage/async-images/g78HoZaxvhwdT3Y43XgpsB/image-3.webp',
};

const projects = [
  {
    number: '01',
    slug: 'sandalwood-plantation',
    title: 'Sandalwood Plantation',
    shortTitle: 'Plantation',
    category: 'Group Farming Project',
    location: 'Pulpally, Wayanad',
    image: IMAGES.plantation,
    gallery: [IMAGES.plantation, IMAGES.plantationDetail, IMAGES.hero],
    accent: '#b99654',
    intro: 'A considered plantation experience where land, stewardship and long-term value grow together.',
    details: 'A group farming concept shaped around the quiet rhythm of sandalwood, thoughtful land planning and a more connected way to participate in Wayanad’s natural landscape.',
    points: ['Sandalwood-led land planning', 'Wayanad highland setting', 'A group farming experience'],
    cta: 'Explore Plantation',
  },
  {
    number: '02',
    slug: 'sandalwood-cave-forest',
    title: 'Sandalwood Cave Forest',
    shortTitle: 'Cave Forest',
    category: 'Eco-Friendly Premium Resort',
    location: 'Vadanakkavala, Pulpally, Wayanad',
    image: IMAGES.cave,
    gallery: [IMAGES.cave, IMAGES.caveInterior, IMAGES.vision],
    accent: '#2e8262',
    intro: 'A forest retreat imagined around elemental architecture, private water and slow luxury.',
    details: 'A hospitality concept that folds sculptural cave-model cottages into a forest setting, creating intimate stays with a strong sense of place and a lighter footprint.',
    points: ['Cave-model cottages', 'Private waterfall pools', 'Immersive forest setting'],
    cta: 'Discover the Resort',
  },
  {
    number: '03',
    slug: 'sandalwood-farm-forest',
    title: 'Sandalwood Farm Forest',
    shortTitle: 'Farm Forest',
    category: 'Integrated Farming, Farm Tourism & Research',
    location: 'Kabinigiri, Pulpally, Wayanad',
    image: IMAGES.farm,
    gallery: [IMAGES.farm, IMAGES.farmExperience, IMAGES.plantation],
    accent: '#799052',
    intro: 'A living landscape that brings farm stays, research and regenerative thinking into one place.',
    details: 'An integrated farm tourism and research concept with A-frame cottages, agricultural landscapes and a closer look at the practices that shape a more resilient future.',
    points: ['A-frame farm cottages', 'Agricultural experiences', 'Sandalwood research centre'],
    cta: 'Explore Farm Forest',
  },
];

const features = [
  { icon: TreePine, title: 'Nature-inspired development', text: 'Concepts shaped by the land, the climate and the quiet character of Wayanad.' },
  { icon: Building2, title: 'Carefully planned concepts', text: 'Thoughtful destinations designed to feel relevant today and considered for tomorrow.' },
  { icon: Sprout, title: 'Plantation & agriculture', text: 'A focus on land-led initiatives that bring cultivation and value into the conversation.' },
  { icon: Mountain, title: 'Luxury hospitality', text: 'Nature stays and experiences that feel intimate, restorative and memorable.' },
  { icon: Leaf, title: 'Farming & research', text: 'Integrated experiences that connect food, ecology, learning and place.' },
  { icon: Waves, title: 'Dedicated support', text: 'A clear, human enquiry experience from the first conversation onward.' },
];

function useScrollReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    nodes.forEach((node, index) => node.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useScrollParallax() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-parallax]');
    let frame = 0;
    const update = () => {
      const viewport = window.innerHeight;
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const distance = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        const speed = Number(node.dataset.parallax || 0.08);
        node.style.setProperty('--parallax-y', `${distance * speed * -100}px`);
      });
      frame = 0;
    };
    const handleScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', handleScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
}

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Splash({ onFinish }) {
  useEffect(() => {
    const timer = window.setTimeout(onFinish, 1900);
    return () => window.clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash" role="status" aria-label="Loading Pentora Realtors Calicut">
      <div className="splash-glow" />
      <div className="splash-content">
        <div className="splash-mark"><img src={LOGO} alt="Pentora Realtors" /></div>
        <span className="splash-line" />
        <p>Real estate · nature · vision</p>
      </div>
      <button className="splash-skip" onClick={onFinish}>Enter site <ArrowUpRight size={14} /></button>
    </div>
  );
}

function Brand({ compact = false }) {
  return (
    <button className={`brand ${compact ? 'brand-compact' : ''}`} onClick={() => navigate('/')} aria-label="Go to Pentora home">
      <span className="brand-image"><img src={LOGO} alt="" /></span>
      <span className="brand-copy"><strong>PENTORA</strong><small>REALTORS CALICUT</small></span>
    </button>
  );
}

function Header({ scrolled, menuOpen, setMenuOpen }) {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const go = (id) => {
    setMenuOpen(false);
    setProjectsOpen(false);
    if (window.location.pathname !== '/') navigate('/');
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <span className="scroll-progress" aria-hidden="true" />
      <Brand />
      <nav className="desktop-nav" aria-label="Primary navigation">
        <button onClick={() => go('home')}>Home</button>
        <div className="nav-dropdown" onMouseEnter={() => setProjectsOpen(true)} onMouseLeave={() => setProjectsOpen(false)}>
          <button onClick={() => go('projects')} className="dropdown-toggle">Our Projects <ChevronDown size={14} /></button>
          <div className={`dropdown-panel ${projectsOpen ? 'show' : ''}`}>
            {projects.map((project) => <button key={project.slug} onClick={() => navigate(`/projects/${project.slug}`)}><span>{project.number}</span>{project.title}<ArrowUpRight size={14} /></button>)}
          </div>
        </div>
        <button onClick={() => go('vision')}>Our Vision</button>
        <button onClick={() => go('gallery')}>Gallery</button>
        <button onClick={() => go('contact')}>Contact</button>
      </nav>
      <button className="header-cta" onClick={() => go('contact')}>Start a conversation <ArrowUpRight size={15} /></button>
      <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      <div className="mobile-nav">
        <button onClick={() => go('home')}>Home <ArrowRight size={15} /></button>
        <span className="mobile-nav-label">Our Projects</span>
        {projects.map((project) => <button key={project.slug} className="mobile-project-link" onClick={() => navigate(`/projects/${project.slug}`)}><span>{project.number}</span>{project.title}<ArrowUpRight size={14} /></button>)}
        <button onClick={() => go('vision')}>Our Vision <ArrowRight size={15} /></button>
        <button onClick={() => go('gallery')}>Gallery <ArrowRight size={15} /></button>
        <button onClick={() => go('contact')}>Contact <ArrowRight size={15} /></button>
      </div>
    </header>
  );
}

function SectionIntro({ eyebrow, title, copy, align = 'left' }) {
  return <div className={`section-intro align-${align}`} data-reveal><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function Button({ children, onClick, variant = 'dark', icon = true, type = 'button' }) {
  return <button type={type} className={`button button-${variant}`} onClick={onClick}>{children}{icon && <ArrowUpRight size={16} />}</button>;
}

function Hero({ onExplore }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handle = () => setOffset(Math.min(window.scrollY * 0.12, 90));
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);
  return (
    <section className="hero" id="home">
      <div className="hero-media" style={{ transform: `translateY(${offset}px)` }} />
      <div className="hero-overlay" />
      <div className="hero-grain" />
      <div className="hero-content shell">
        <div className="hero-kicker"><span /> Wayanad, Kerala <span className="kicker-rule" /> Since 2014</div>
        <h1>Invest in <em>Nature.</em><br />Build Your Legacy.</h1>
        <p>Discover exceptional opportunities in sustainable sandalwood plantations, luxury forest resorts, and integrated farm tourism with Pentora Realtors Calicut.</p>
        <div className="hero-actions"><Button onClick={onExplore}>Explore our projects</Button><Button variant="ghost" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact our team</Button></div>
      </div>
      <div className="hero-bottom shell"><span className="hero-scroll"><i /> Scroll to explore</span><span className="hero-coordinate">11° 41′ N &nbsp;·&nbsp; 76° 05′ E</span></div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section-pad" id="about">
      <div className="shell about-grid">
        <div className="about-visual" data-reveal>
          <div className="about-image"><img src={IMAGES.plantation} alt="Sandalwood plantation in Wayanad" /></div>
          <div className="about-stamp"><span>Our place</span><strong>Way<br />anad</strong><small>11° 41′ N</small></div>
          <span className="vertical-label">PENTORA / 01</span>
        </div>
        <div className="about-copy">
          <SectionIntro eyebrow="About Pentora" title={<>Creating Value<br /><em>Through Nature</em> & Vision</>} copy="Pentora Realtors Calicut is a real-estate brand focused on plantation development, nature-inspired hospitality and integrated farming experiences." />
          <p className="about-lead" data-reveal>We imagine meaningful destinations where land, nature, tourism and long-term value can exist in a more considered relationship.</p>
          <div className="stat-row" data-reveal><div><strong>03</strong><span>Signature<br />projects</span></div><div><strong>01</strong><span>Landscape<br />to explore</span></div><div><strong>∞</strong><span>Ways to<br />belong</span></div></div>
          <button className="text-link" onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}>Discover our vision <ArrowRight size={17} /></button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured = false }) {
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`} style={{ '--accent': project.accent }} data-reveal>
      <button className="project-image-wrap" onClick={() => navigate(`/projects/${project.slug}`)} aria-label={`View ${project.title}`}><img src={project.image} alt={`${project.title} in Wayanad`} /><span className="project-number">{project.number}</span><span className="project-image-arrow"><ArrowUpRight size={21} /></span></button>
      <div className="project-card-body"><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.intro}</p><div className="project-meta"><span><i /> {project.location}</span><button onClick={() => navigate(`/projects/${project.slug}`)}>{project.cta} <ArrowRight size={15} /></button></div></div>
    </article>
  );
}

function Projects() {
  return (
    <section className="projects-section section-pad" id="projects">
      <div className="shell"><SectionIntro eyebrow="The Pentora portfolio" title={<>Three ways to<br /><em>come closer</em> to nature.</>} copy="Distinct concepts. One enduring relationship with place." /><div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0} />)}</div><div className="projects-footnote"><span>01 — 03</span><p>Each project is a different expression of the same belief: that a life well lived can also be a life well rooted.</p></div></div>
    </section>
  );
}

function Vision() {
  return (
    <section className="vision-section" id="vision"><div className="vision-image" data-parallax="0.12" /><div className="vision-overlay" /><div className="shell vision-content" data-reveal><span className="eyebrow eyebrow-light">Our vision</span><h2>A vision rooted<br />in <em>nature.</em><br />A future built<br />on value.</h2><div className="vision-copy"><span className="vision-line" /><p>Creating destinations where sustainable agriculture, responsible development, nature, tourism, and innovation come together to shape meaningful experiences and lasting value.</p></div></div><span className="vision-side-label">ROOTED IN PLACE / BUILT FOR TOMORROW</span></section>
  );
}

function WhyChoose() {
  return <section className="why-section section-pad"><div className="shell"><div className="why-heading"><SectionIntro eyebrow="The Pentora difference" title={<>A more considered<br /><em>way forward.</em></>} /><p data-reveal>Every Pentora project begins with listening — to the land, the opportunity and the people who will shape its next chapter.</p></div><div className="feature-grid">{features.map(({ icon: Icon, title, text }, index) => <div className="feature-card" key={title} data-reveal style={{ '--delay': `${index * 60}ms` }}><span className="feature-index">0{index + 1}</span><Icon size={25} strokeWidth={1.3} /><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>;
}

function Gallery() {
  return <section className="gallery-section section-pad" id="gallery"><div className="shell"><div className="gallery-heading"><SectionIntro eyebrow="A sense of place" title={<>Look closer.<br /><em>Feel further.</em></>} /><span>Wayanad / Kerala<br />A living archive of<br />nature and possibility.</span></div><div className="gallery-grid"><button className="gallery-tile gallery-large" onClick={() => navigate('/projects/sandalwood-plantation')} data-reveal><img src={IMAGES.hero} alt="Misty hills of Wayanad" /><span>01 / The landscape <ArrowUpRight size={17} /></span></button><button className="gallery-tile gallery-tall" onClick={() => navigate('/projects/sandalwood-cave-forest')} data-reveal><img src={IMAGES.cave} alt="Cave forest retreat" /><span>02 / The retreat <ArrowUpRight size={17} /></span></button><button className="gallery-tile gallery-small" onClick={() => navigate('/projects/sandalwood-farm-forest')} data-reveal><img src={IMAGES.farm} alt="Farm forest cottage" /><span>03 / The experience <ArrowUpRight size={17} /></span></button></div></div></section>;
}

function LocationMap() {
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Pulpally%2C%20Wayanad%2C%20Kerala';
  return <section className="location-section section-pad" id="location"><div className="shell location-grid"><div className="location-copy"><SectionIntro eyebrow="Find your way here" title={<>Closer to the<br /><em>quiet heart</em> of Wayanad.</>} copy="Our projects are rooted around Pulpally, where plantation landscapes, forest edges and a slower way of living meet." /><div className="location-list"><a href={mapUrl} target="_blank" rel="noreferrer"><span>01</span><div><strong>Sandalwood Plantation</strong><small>Pulpally, Wayanad</small></div><ArrowUpRight size={15} /></a><a href="https://www.google.com/maps/search/?api=1&query=Vadanakkavala%2C%20Pulpally%2C%20Wayanad" target="_blank" rel="noreferrer"><span>02</span><div><strong>Sandalwood Cave Forest</strong><small>Vadanakkavala, Pulpally</small></div><ArrowUpRight size={15} /></a><a href="https://www.google.com/maps/search/?api=1&query=Kabinigiri%2C%20Pulpally%2C%20Wayanad" target="_blank" rel="noreferrer"><span>03</span><div><strong>Sandalwood Farm Forest</strong><small>Kabinigiri, Pulpally</small></div><ArrowUpRight size={15} /></a></div></div><a className="map-card" href={mapUrl} target="_blank" rel="noreferrer" aria-label="Open Pentora project locations in Google Maps"><div className="map-grid-lines" /><div className="map-route map-route-one" /><div className="map-route map-route-two" /><div className="map-pin map-pin-main"><MapPin size={20} /></div><div className="map-pin map-pin-two"><MapPin size={15} /></div><div className="map-pin map-pin-three"><MapPin size={15} /></div><div className="map-card-label"><span>Explore the region</span><strong>Open in Google Maps <ArrowUpRight size={16} /></strong></div><div className="map-coordinates">11° 41′ N<br />76° 05′ E</div></a></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event) => { event.preventDefault(); setSent(true); };
  return <section className="contact-section section-pad" id="contact"><div className="shell contact-grid"><div className="contact-copy"><SectionIntro eyebrow="Start a conversation" title={<>Your next opportunity<br /><em>starts here.</em></>} copy="Tell us what you’re looking for. Our team will be in touch to help you find your place in the Pentora story." /><div className="contact-details"><a href="mailto:pentoraCalicut@gmail.com"><span>Email</span>pentoraCalicut@gmail.com <ArrowUpRight size={15} /></a><a href="tel:+918157080906"><span>Phone</span>+91 8157080906 <ArrowUpRight size={15} /></a><a href="https://instagram.com/pentora_realtors" target="_blank" rel="noreferrer"><span>Instagram</span>@pentora_realtors <ArrowUpRight size={15} /></a></div></div><div className="enquiry-card" data-reveal><div className="enquiry-top"><span>01 / Enquiry</span><span>We usually reply within 24 hours.</span></div>{sent ? <div className="success-state"><span className="success-check">✓</span><h3>Thank you for reaching out.</h3><p>Your message is ready for the Pentora team. We’ll be in touch shortly.</p><button className="text-link" onClick={() => setSent(false)}>Send another enquiry <ArrowRight size={17} /></button></div> : <form onSubmit={handleSubmit}><div className="form-row"><label><span>Your name</span><input name="name" required placeholder="Enter your name" /></label><label><span>Phone number</span><input name="phone" required placeholder="+91" /></label></div><div className="form-row"><label><span>Email address</span><input type="email" name="email" required placeholder="you@email.com" /></label><label><span>Project of interest</span><select name="project" defaultValue=""><option value="" disabled>Select a project</option>{projects.map((project) => <option key={project.slug}>{project.title}</option>)}</select></label></div><label><span>How can we help?</span><textarea name="message" rows="4" placeholder="Tell us a little about what you’re looking for..." /></label><button type="submit" className="form-submit">Send enquiry <ArrowUpRight size={17} /></button></form>}</div></div></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="shell"><div className="footer-top"><Brand compact /><p>Premium real estate.<br />Sustainable possibilities.</p><div className="footer-links"><span>Explore</span><button onClick={() => navigate('/')}>Home</button><button onClick={() => navigate('/#projects')}>Our projects</button><button onClick={() => navigate('/#contact')}>Contact</button></div><div className="footer-links"><span>Projects</span>{projects.map((project) => <button key={project.slug} onClick={() => navigate(`/projects/${project.slug}`)}>{project.shortTitle}</button>)}</div></div><div className="footer-bottom"><span>© 2024 Pentora Realtors Calicut</span><span>Wayanad, Kerala · India</span><span>Invest in nature. Build your legacy.</span></div></div></footer>;
}

function HomePage() {
  return <><Hero onExplore={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} /><Projects /><Vision /><WhyChoose /><Gallery /><LocationMap /><Contact /><Footer /></>;
}

function ProjectPage({ project }) {
  useScrollReveal();
  return <main className="project-page"><section className="project-hero" style={{ '--project-image': `url(${project.image})`, '--project-accent': project.accent }}><div className="project-hero-shade" /><div className="shell project-hero-content"><span className="eyebrow eyebrow-light">Project {project.number} · {project.category}</span><h1>{project.title.split(' ').map((word, index) => <React.Fragment key={`${word}-${index}`}>{index === 0 ? word : <><br /><em>{word}</em></>}</React.Fragment>)}</h1><p>{project.location}</p></div><div className="project-hero-footer shell"><span>Scroll to explore</span><ArrowDownRight size={19} /><span className="project-hero-code">PENTORA / {project.number}</span></div></section><section className="project-intro section-pad"><div className="shell project-intro-grid"><div><span className="eyebrow">A closer look</span><h2>{project.intro}</h2></div><div><p className="large-copy">{project.details}</p><div className="project-points">{project.points.map((point) => <span key={point}><i />{point}</span>)}</div></div></div></section><section className="project-gallery"><div className="shell"><div className="project-gallery-header"><span className="eyebrow">The details</span><p>Every detail is an invitation to slow down, look around and imagine what comes next.</p></div><div className="project-gallery-grid">{project.gallery.map((image, index) => <div className={`project-photo project-photo-${index}`} key={image}><img src={image} alt={`${project.title} project view ${index + 1}`} /></div>)}</div></div></section><section className="project-cta section-pad"><div className="shell"><span className="eyebrow">Make it yours</span><h2>Let’s explore what<br /><em>could grow here.</em></h2><Button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 60); }}>Enquire about {project.shortTitle}</Button></div></section><Footer /></main>;
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [splash, setSplash] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const project = useMemo(() => projects.find((item) => path === `/projects/${item.slug}`), [path]);

  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => { const handle = () => setScrolled(window.scrollY > 36); window.addEventListener('scroll', handle, { passive: true }); return () => window.removeEventListener('scroll', handle); }, []);
  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--scroll-progress', `${max > 0 ? (window.scrollY / max) * 100 : 0}%`);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => { window.removeEventListener('scroll', updateProgress); window.removeEventListener('resize', updateProgress); };
  }, []);
  useScrollReveal();
  useScrollParallax();

  useEffect(() => { document.body.classList.toggle('no-scroll', splash); return () => document.body.classList.remove('no-scroll'); }, [splash]);

  return <>{splash && <Splash onFinish={() => setSplash(false)} />}<Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />{project ? <ProjectPage project={project} /> : <HomePage />}</>;
}

createRoot(document.getElementById('root')).render(<App />);
