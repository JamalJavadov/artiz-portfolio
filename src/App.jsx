import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Box,
  Camera,
  Clapperboard,
  MonitorPlay,
  Mouse,
  Pause,
  Play,
  Send,
  Sparkles,
} from "lucide-react";

const works = [
  {
    id: "lamp",
    number: "01",
    title: "Ağıllı işıqlandırma",
    shortTitle: "Masa lampası",
    category: "3D Product Animation",
    description: "Fokus üçün dizayn edildi",
    client: "Product concept",
    format: "9:16 Reels",
    tools: "Blender / CapCut",
    thumb: "/assets/work-lamp.jpg",
    video: "/media/lamp.mp4",
    duration: "00:15",
  },
  {
    id: "keyboard",
    number: "02",
    title: "Minimal klaviatura",
    shortTitle: "Minimal setup",
    category: "Reklam Videosu",
    description: "Maksimum rahatlıq üçün motion",
    client: "Retail promo",
    format: "9:16 Story",
    tools: "3D scene / Edit",
    thumb: "/assets/work-keyboard.jpg",
    video: "/media/keyboard.mp4",
    duration: "00:12",
  },
  {
    id: "kraft",
    number: "03",
    title: "Qablaşdırma buradan başlayır",
    shortTitle: "Kraft paket",
    category: "Social Media Videosu",
    description: "Kraft materialdan peşəkar qutu həllərinə",
    client: "Packaging ad",
    format: "9:16 Reels",
    tools: "Product render",
    thumb: "/assets/work-kraft.jpg",
    video: "/media/kraft.mp4",
    duration: "00:14",
  },
  {
    id: "coffee",
    number: "04",
    title: "Coffee reklam videosu",
    shortTitle: "Coffee promo",
    category: "Reels Content",
    description: "Kafe brendi üçün isti, premium məhsul təqdimatı",
    client: "Cafe promo",
    format: "9:16 Vertical cut",
    tools: "Edit / Color / Motion",
    thumb: "/assets/work-coffee.jpg",
    video: "/media/coffee.mp4",
    duration: "00:20",
  },
];

const services = [
  {
    icon: Box,
    image: "/assets/gallery-2.png",
    index: "01",
    title: "3D Product Animation",
    body: "Məhsulu səhnə, kamera və hərəkətlə daha diqqətçəkən formada təqdim edirəm.",
  },
  {
    icon: Sparkles,
    image: "/assets/gallery-3.png",
    index: "02",
    title: "Logo Animation",
    body: "Logo üçün qısa intro, reveal və sosial media açılış animasiyaları hazırlayıram.",
  },
  {
    icon: Clapperboard,
    image: "/assets/gallery-5.png",
    index: "03",
    title: "Reels & Motion",
    body: "Instagram və TikTok üçün 9:16 formatda sürətli, aydın reklam cut-ları.",
  },
];

const galleryImages = [
  {
    src: "/assets/gallery-1.png",
    title: "Soft product frame",
    caption: "Sakit fon, premium məhsul təqdimatı",
  },
  {
    src: "/assets/gallery-2.png",
    title: "Clean studio render",
    caption: "Reels üçün vertikal kompozisiya",
  },
  {
    src: "/assets/gallery-3.png",
    title: "Motion still",
    caption: "Animasiya öncəsi art direction",
  },
  {
    src: "/assets/gallery-4.png",
    title: "Minimal scene",
    caption: "Apple-style işıq və material",
  },
  {
    src: "/assets/gallery-5.png",
    title: "Campaign visual",
    caption: "Sosial media üçün key visual",
  },
  {
    src: "/assets/gallery-6.png",
    title: "Brand texture",
    caption: "Logo motion üçün atmosfer",
  },
];

export function App() {
  const [theme, setTheme] = useState("light");
  const [activeId, setActiveId] = useState("lamp");
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useScrollScenes();

  const activeWork = useMemo(
    () => works.find((work) => work.id === activeId) ?? works[0],
    [activeId],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const updateProgress = () => {
      if (!video.duration) return;
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [activeWork]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [activeWork, isPlaying]);

  return (
    <main className="site-shell">
      <Header theme={theme} setTheme={setTheme} />

      <section className="hero" id="top" data-scroll-scene>
        <div className="hero-copy">
          <div className="hero-status">
            <span>ARTIZ.AZ</span>
            <span>Freelance motion studio</span>
            <span>Baku / Remote</span>
          </div>
          <p className="section-kicker">3D Motion Designer</p>
          <h1 data-title="3D motion reklamları və sosial video kontent">
            3D motion reklamları və sosial video kontent.
          </h1>
          <p className="hero-subtitle">
            Kiçik və orta bizneslər üçün məhsul animasiyası, logo motion və
            Reels formatında təmiz, premium reklam videoları hazırlayıram.
          </p>
          <div className="hero-meta" aria-label="Portfolio tags">
            <span>3D Product</span>
            <span>Logo Motion</span>
            <span>9:16 Reels</span>
          </div>
          <div className="hero-actions">
            <a className="button primary" href="#works">
              İşlərə bax <ArrowRight size={18} />
            </a>
            <a className="button secondary" href="#contact">
              DM ilə danışaq <ArrowRight size={18} />
            </a>
          </div>
          <div className="stats" aria-label="Portfolio stats">
            <span>
              <strong>9:16</strong>
              Reels formatı
            </span>
            <span>
              <strong>15s</strong>
              Orta reklam cut
            </span>
            <span>
              <strong>3D</strong>
              Product scene
            </span>
          </div>
        </div>

        <div className="hero-stage" aria-label="ARTIZ showreel">
          <figure className="hero-poster hero-poster-left" aria-hidden="true">
            <img src="/assets/gallery-2.png" alt="" />
          </figure>
          <div className="stage-glass">
            <VideoPanel
              activeWork={activeWork}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              progress={progress}
              videoRef={videoRef}
            />
            <ThumbRail activeId={activeId} setActiveId={setActiveId} />
            <div className="project-notes">
              <span>{activeWork.client}</span>
              <span>{activeWork.format}</span>
              <span>{activeWork.tools}</span>
            </div>
          </div>
          <article className="live-note">
            <span>Live motion preview</span>
            <strong>{activeWork.title}</strong>
            <p>{activeWork.description}</p>
          </article>
          <figure className="hero-poster hero-poster-right" aria-hidden="true">
            <img src="/assets/gallery-6.png" alt="" />
          </figure>
        </div>

        <a className="scroll-cue" href="#works" aria-label="Scroll to works">
          <Mouse size={22} />
          <span>Scroll etdikcə yığılır</span>
        </a>
      </section>

      <section className="works-section scroll-scene" id="works" data-scroll-scene>
        <div className="section-heading assemble-heading">
          <div>
            <p className="section-kicker">Seçilmiş işlər</p>
            <h2>Hər kadr brendin ritminə uyğun.</h2>
          </div>
          <a href="#contact">
            Layihə başladaq <ArrowRight size={18} />
          </a>
        </div>

        <div className="work-grid">
          {works.map((work, index) => (
            <button
              className={`work-card ${activeId === work.id ? "is-active" : ""}`}
              key={work.id}
              style={{ "--item-index": index }}
              type="button"
              onClick={() => setActiveId(work.id)}
            >
              <img src={work.thumb} alt={`${work.shortTitle} video still`} />
              <span className="play-badge">
                <Play size={24} fill="currentColor" />
              </span>
              <span className="work-card-copy">
                <small>{work.number}</small>
                <strong>{work.shortTitle}</strong>
                <em>{work.category}</em>
              </span>
              <span className="work-duration">{work.duration}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-section scroll-scene" data-scroll-scene>
        <div className="section-heading assemble-heading">
          <div>
            <p className="section-kicker">Vizual dil</p>
            <h2>Hərəkət üçün qurulan vizual dil.</h2>
          </div>
          <span className="section-note">Warm type, tactile 3D, clean motion</span>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((item, index) => (
            <article
              className="gallery-card"
              key={item.src}
              style={{ "--item-index": index }}
            >
              <img src={item.src} alt={item.title} />
              <div>
                <strong>{item.title}</strong>
                <span>{item.caption}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-section scroll-scene" id="services" data-scroll-scene>
        <div className="assemble-heading">
          <p className="section-kicker">Xidmətlər</p>
          <h2>Fikirdən hərəkətə, hərəkətdən təsirə.</h2>
        </div>
        <div className="service-strip">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                className="service"
                key={service.title}
                style={{ "--item-index": index }}
              >
                <div className="service-visual">
                  <img src={service.image} alt="" />
                  <span>{service.index}</span>
                </div>
                <div>
                  <Icon size={34} strokeWidth={1.7} />
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  <a href="#contact" aria-label={`${service.title} üçün yaz`}>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="contact-section scroll-scene" id="contact" data-scroll-scene>
        <div className="contact-copy assemble-left">
          <p className="section-kicker">Əlaqə</p>
          <h2>Layihənizi motion ilə daha premium göstərək.</h2>
          <p>
            Məhsulunuzu, kampaniyanızı və ya logo animasiyanızı 9:16 sosial
            video formatına çevirə bilərəm.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="https://instagram.com/artiz.az">
              <Camera size={18} />
              Instagram-a yaz
            </a>
            <a className="button secondary" href="mailto:hello@artiz.az">
              DM göndər
              <Send size={18} />
            </a>
          </div>
        </div>
        <div className="profile-preview assemble-right" aria-label="Instagram portfolio preview">
          <div className="contact-poster contact-poster-back">
            <img src="/assets/gallery-4.png" alt="ARTIZ campaign visual" />
          </div>
          <div className="contact-poster contact-poster-front">
            <img src="/assets/gallery-6.png" alt="ARTIZ brand texture" />
            <div className="contact-glass-note">
              <img src="/assets/artiz-logo-mark.png" alt="" />
              <div>
                <strong>ARTIZ.AZ</strong>
                <span>Ideas in motion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <a className="brand" href="#top" aria-label="ARTIZ.AZ home">
          <img src="/assets/artiz-logo-mark.png" alt="" />
          <span>ARTIZ.AZ</span>
        </a>
        <span>© 2026 ARTIZ.AZ. Bütün hüquqlar qorunur.</span>
        <div className="socials">
          <Camera size={20} />
          <MonitorPlay size={20} />
          <Play size={20} />
        </div>
      </footer>
    </main>
  );
}

function Header({ theme, setTheme }) {
  return (
    <header className="header">
      <a className="brand" href="#top" aria-label="ARTIZ.AZ home">
        <img src="/assets/artiz-logo-mark.png" alt="" />
        <span>ARTIZ.AZ</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#works">İşlər</a>
        <a href="#services">Xidmətlər</a>
        <a href="#services">Proses</a>
        <a href="#contact">Əlaqə</a>
      </nav>
      <div className="header-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle light and dark mode"
        >
          <span className={theme === "dark" ? "is-active" : ""}>Dark</span>
          <span className={theme === "light" ? "is-active" : ""}>Light</span>
        </button>
        <a className="button nav-cta" href="#contact">
          DM ilə danış <ArrowRight size={17} />
        </a>
      </div>
    </header>
  );
}

function VideoPanel({ activeWork, isPlaying, setIsPlaying, progress, videoRef }) {
  return (
    <article className="video-panel">
      <video
        ref={videoRef}
        key={activeWork.id}
        src={activeWork.video}
        poster={activeWork.thumb}
        muted
        loop
        playsInline
      />
      <div className="video-shade" />
      <div className="video-title">
        <strong>{activeWork.title}</strong>
        <span>{activeWork.description}</span>
      </div>
      <div className="player-controls">
        <button
          type="button"
          onClick={() => setIsPlaying((current) => !current)}
          aria-label={isPlaying ? "Pause showreel" : "Play showreel"}
        >
          {isPlaying ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" />
          )}
        </button>
        <span>00:02 / {activeWork.duration}</span>
        <div className="progress-track">
          <span style={{ width: `${Math.max(progress, 14)}%` }} />
        </div>
      </div>
    </article>
  );
}

function ThumbRail({ activeId, setActiveId }) {
  return (
    <div className="thumb-rail" aria-label="Showreel thumbnails">
      {works.map((work) => (
        <button
          className={activeId === work.id ? "is-active" : ""}
          key={work.id}
          type="button"
          onClick={() => setActiveId(work.id)}
          aria-label={`${work.shortTitle} seç`}
        >
          <img src={work.thumb} alt="" />
        </button>
      ))}
    </div>
  );
}

function useScrollScenes() {
  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll("[data-scroll-scene]"));
    const hero = document.querySelector(".hero");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      scenes.forEach((scene) => {
        scene.style.setProperty("--scene-progress", "1");
        scene.style.setProperty("--scene-rest", "0");
      });
      hero?.style.setProperty("--hero-scroll", "0");
      return undefined;
    }

    let frame = 0;
    const clamp = (value) => Math.min(1, Math.max(0, value));
    const easeOut = (value) => 1 - Math.pow(1 - value, 3);

    const update = () => {
      const viewport = window.innerHeight || 1;

      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const start = viewport * 0.95;
        const end = viewport * 0.22;
        const raw = clamp((start - rect.top) / (start - end));
        const progress = easeOut(raw);
        scene.style.setProperty("--scene-progress", progress.toFixed(4));
        scene.style.setProperty("--scene-rest", (1 - progress).toFixed(4));
      });

      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        const travel = Math.max(heroRect.height - viewport * 0.52, 1);
        const heroProgress = clamp(-heroRect.top / travel);
        hero.style.setProperty("--hero-scroll", heroProgress.toFixed(4));
      }

      frame = 0;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);
}
