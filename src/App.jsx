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
  X,
} from "lucide-react";

const brandMark = "/assets/artiz-logo-mark-small.png";

const works = [
  {
    id: "paper-bags",
    number: "01",
    title: "Kraft paketlər reklam videosu",
    shortTitle: "Paper Bags",
    category: "3D Product Animation",
    description: "paperbags.az üçün təbii, davamlı və premium kraft paket təqdimatı",
    client: "paperbags.az",
    format: "9:16 Reels",
    tools: "3D scene / Edit / Motion",
    thumb: "/assets/work-artiz-new.jpg",
    video: "/media/artiz-new-showreel.mp4",
    duration: "00:20",
    width: 1080,
    height: 1920,
  },
  {
    id: "lamp",
    number: "02",
    title: "Ağıllı işıqlandırma",
    shortTitle: "Masa lampası",
    category: "3D Product Animation",
    description: "Fokus üçün dizayn edildi",
    client: "Product concept",
    format: "9:16 Reels",
    tools: "Blender / CapCut",
    thumb: "/assets/work-lamp.jpg",
    video: "/media/lamp.mp4",
    duration: "00:17",
    width: 1080,
    height: 1920,
  },
  {
    id: "keyboard",
    number: "03",
    title: "Minimal klaviatura",
    shortTitle: "Minimal setup",
    category: "Reklam Videosu",
    description: "Maksimum rahatlıq üçün motion",
    client: "Retail promo",
    format: "9:16 Story",
    tools: "3D scene / Edit",
    thumb: "/assets/work-keyboard.jpg",
    video: "/media/keyboard.mp4",
    duration: "00:35",
    width: 1080,
    height: 1920,
  },
  {
    id: "kraft",
    number: "04",
    title: "Qablaşdırma buradan başlayır",
    shortTitle: "Kraft paket",
    category: "Social Media Videosu",
    description: "Kraft materialdan peşəkar qutu həllərinə",
    client: "Packaging ad",
    format: "9:16 Reels",
    tools: "Product render",
    thumb: "/assets/work-kraft.jpg",
    video: "/media/kraft.mp4",
    duration: "00:26",
    width: 1080,
    height: 1920,
  },
  {
    id: "coffee",
    number: "05",
    title: "Coffee reklam videosu",
    shortTitle: "Coffee promo",
    category: "Reels Content",
    description: "Kafe brendi üçün isti, premium məhsul təqdimatı",
    client: "Cafe promo",
    format: "16:9 Wide cut",
    tools: "Edit / Color / Motion",
    thumb: "/assets/work-coffee.jpg",
    video: "/media/coffee.mp4",
    duration: "00:20",
    width: 1280,
    height: 720,
  },
];

const worksWithAspect = works.map((work) => {
  const aspectValue = work.width / work.height;
  return {
    ...work,
    aspectValue,
    aspectRatio: `${work.width} / ${work.height}`,
    orientation: aspectValue > 1 ? "landscape" : "portrait",
  };
});

const services = [
  {
    icon: Box,
    image: "/assets/gallery-2.jpg",
    index: "01",
    title: "3D Product Animation",
    body: "Məhsulu səhnə, kamera və hərəkətlə daha diqqətçəkən formada təqdim edirəm.",
  },
  {
    icon: Sparkles,
    image: "/assets/gallery-3.jpg",
    index: "02",
    title: "Logo Animation",
    body: "Logo üçün qısa intro, reveal və sosial media açılış animasiyaları hazırlayıram.",
  },
  {
    icon: Clapperboard,
    image: "/assets/gallery-5.jpg",
    index: "03",
    title: "Reels & Motion",
    body: "Instagram və TikTok üçün 9:16 formatda sürətli, aydın reklam cut-ları.",
  },
];

const galleryImages = [
  {
    src: "/assets/gallery-1.jpg",
    title: "Soft product frame",
    caption: "Sakit fon, premium məhsul təqdimatı",
  },
  {
    src: "/assets/gallery-2.jpg",
    title: "Clean studio render",
    caption: "Reels üçün vertikal kompozisiya",
  },
  {
    src: "/assets/gallery-3.jpg",
    title: "Motion still",
    caption: "Animasiya öncəsi art direction",
  },
  {
    src: "/assets/gallery-4.jpg",
    title: "Minimal scene",
    caption: "Apple-style işıq və material",
  },
  {
    src: "/assets/gallery-5.jpg",
    title: "Campaign visual",
    caption: "Sosial media üçün key visual",
  },
  {
    src: "/assets/gallery-6.jpg",
    title: "Brand texture",
    caption: "Logo motion üçün atmosfer",
  },
];

const heroProcess = [
  {
    label: "Brief",
    title: "Məhsul və mesaj",
    detail: "Məqsəd, auditoriya və əsas səhnə tonu dəqiqləşir.",
  },
  {
    label: "Scene",
    title: "3D səhnə",
    detail: "Material, işıq, kamera və məhsul kompozisiyası qurulur.",
  },
  {
    label: "Motion",
    title: "Reels cut",
    detail: "9:16 format, ritm, yazılar və final export hazırlanır.",
  },
];

export function App() {
  const [theme, setTheme] = useState("light");
  const [activeId, setActiveId] = useState("paper-bags");
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [viewerWork, setViewerWork] = useState(null);
  const videoRef = useRef(null);
  const preloadAssets = useMemo(
    () => [
      brandMark,
      "/assets/artiz-logo-white-bg.jpg",
      ...worksWithAspect.flatMap((work) => [work.thumb, work.video]),
      ...galleryImages.map((image) => image.src),
    ],
    [],
  );
  const { isLoaded, progress: loadProgress } = useAssetPreloader(preloadAssets);

  useScrollScenes();

  const activeWork = useMemo(
    () => worksWithAspect.find((work) => work.id === activeId) ?? worksWithAspect[0],
    [activeId],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    setProgress(0);
    setCurrentTime(0);
    setDuration(0);

    const updateProgress = () => {
      if (!video.duration) return;
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const updateDuration = () => {
      if (!video.duration) return;
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateDuration);
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
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
    <>
      {!isLoaded ? <SiteLoader progress={loadProgress} /> : null}
      <CustomCursor />
      <main
        className={`site-shell ${isLoaded ? "is-site-ready" : "is-site-loading"}`}
        aria-hidden={!isLoaded ? "true" : undefined}
      >
      <Header theme={theme} setTheme={setTheme} />

      <section className="hero" id="top" data-scroll-scene>
        <div className="hero-copy">
          <div className="hero-status">
            <span>ARTIZ.AZ</span>
            <span>Motion studio</span>
            <span>Baku / Remote</span>
          </div>
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
              Reels
            </span>
            <span>
              <strong>16:9</strong>
              Reklam
            </span>
            <span>
              <strong>3D</strong>
              Product
            </span>
          </div>
          <div className="hero-process" aria-label="ARTIZ production process">
            <div className="hero-process-bg" aria-hidden="true">
              <img className="process-float-card process-card-one" src="/assets/work-kraft.jpg" alt="" decoding="async" />
              <img className="process-float-card process-card-two" src="/assets/work-coffee.jpg" alt="" decoding="async" />
              <img className="process-float-card process-card-three" src="/assets/gallery-3.jpg" alt="" decoding="async" />
            </div>
            <div className="hero-process-head">
              <span>Proses</span>
              <strong>Brief-dən hazır reklama</strong>
            </div>
            <div className="hero-process-steps">
              {heroProcess.map((step, index) => (
                <article key={step.label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <small>{step.label}</small>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-stage" aria-label="ARTIZ showreel">
          <figure className="hero-poster hero-poster-left" aria-hidden="true">
            <img src="/assets/gallery-2.jpg" alt="" decoding="async" />
          </figure>
          <div className={`stage-glass is-${activeWork.orientation}`}>
            <VideoPanel
              activeWork={activeWork}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              progress={progress}
              currentTime={currentTime}
              duration={duration}
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
            <span>Seçilmiş preview</span>
            <strong>{activeWork.title}</strong>
            <p>{activeWork.description}</p>
          </article>
          <figure className="hero-poster hero-poster-right" aria-hidden="true">
            <img src="/assets/gallery-6.jpg" alt="" decoding="async" />
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
            <h2>Hər kadr brendin ritminə uyğun.</h2>
          </div>
          <a href="#contact">
            Layihə başladaq <ArrowRight size={18} />
          </a>
        </div>

        <div className="work-grid">
          {works.map((work, index) => (
            <WorkCard
              activeId={activeId}
              index={index}
              key={work.id}
              setActiveId={setActiveId}
              setViewerWork={setViewerWork}
              work={worksWithAspect[index]}
            />
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
              <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
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
                  <img src={service.image} alt="" loading="lazy" decoding="async" />
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
            <img
              src="/assets/gallery-4.jpg"
              alt="ARTIZ campaign visual"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="contact-poster contact-poster-front">
            <img
              src="/assets/gallery-6.jpg"
              alt="ARTIZ brand texture"
              loading="lazy"
              decoding="async"
            />
            <div className="contact-glass-note">
              <img src={brandMark} alt="" />
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
          <img src={brandMark} alt="" />
          <span>ARTIZ.AZ</span>
        </a>
        <span>© 2026 ARTIZ.AZ. Bütün hüquqlar qorunur.</span>
        <div className="socials">
          <Camera size={20} />
          <MonitorPlay size={20} />
          <Play size={20} />
        </div>
      </footer>

      <nav className="mobile-action-bar" aria-label="Mobile contact shortcuts">
        <a href="#works">Portfolio</a>
        <a href="https://instagram.com/artiz.az">Instagram</a>
      </nav>

        {viewerWork ? (
          <VideoLightbox work={viewerWork} onClose={() => setViewerWork(null)} />
        ) : null}
      </main>
    </>
  );
}

function CustomCursor() {
  const [cursor, setCursor] = useState({
    isActive: false,
    label: "",
    isPressed: false,
    isVisible: false,
    x: -80,
    y: -80,
  });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return undefined;

    const interactiveSelector = "a, button, video, [role='button']";

    const updateCursor = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const interactiveTarget = target?.closest(interactiveSelector);
      const isVideoTarget = Boolean(target?.closest("video, .work-card, .video-panel"));
      setCursor((current) => ({
        ...current,
        isActive: Boolean(interactiveTarget),
        isVisible: true,
        label: interactiveTarget ? (isVideoTarget ? "PLAY" : "OPEN") : "",
        x: event.clientX,
        y: event.clientY,
      }));
    };

    const pressCursor = () => {
      setCursor((current) => ({ ...current, isPressed: true }));
    };

    const releaseCursor = () => {
      setCursor((current) => ({ ...current, isPressed: false }));
    };

    const hideCursor = () => {
      setCursor((current) => ({ ...current, isVisible: false }));
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mousedown", pressCursor);
    window.addEventListener("mouseup", releaseCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mousedown", pressCursor);
      window.removeEventListener("mouseup", releaseCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${cursor.isVisible ? "is-visible" : ""} ${
        cursor.isActive ? "is-active" : ""
      } ${cursor.isPressed ? "is-pressed" : ""}`}
      style={{ "--cursor-x": `${cursor.x}px`, "--cursor-y": `${cursor.y}px` }}
      aria-hidden="true"
    >
      <span className="custom-cursor-ring" />
      <span className="custom-cursor-orbit" />
      <span className="custom-cursor-dot" />
      <span className="custom-cursor-label">{cursor.label}</span>
    </div>
  );
}

function Header({ theme, setTheme }) {
  return (
    <header className="header">
      <div className="header-progress" aria-hidden="true">
        <span />
      </div>
      <a className="brand" href="#top" aria-label="ARTIZ.AZ home">
        <img src={brandMark} alt="" />
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
      <div className="mobile-quick-nav" aria-label="Mobile quick navigation">
        <a href="#works">İşlər</a>
        <a href="#services">Xidmətlər</a>
        <a href="#contact">Əlaqə</a>
      </div>
    </header>
  );
}

function VideoPanel({
  activeWork,
  currentTime,
  duration,
  isPlaying,
  setIsPlaying,
  progress,
  videoRef,
}) {
  const seek = (event) => {
    const video = videoRef.current;
    if (!video?.duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
  };

  return (
    <article
      className={`video-panel is-${activeWork.orientation}`}
      style={{ "--media-aspect": activeWork.aspectRatio }}
    >
      <video
        ref={videoRef}
        key={activeWork.id}
        src={activeWork.video}
        poster={activeWork.thumb}
        preload="auto"
        autoPlay={isPlaying}
        muted
        loop
        playsInline
        onClick={() => setIsPlaying((current) => !current)}
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
        <span>
          {formatTime(currentTime)} / {duration ? formatTime(duration) : activeWork.duration}
        </span>
        <button
          className="progress-track"
          type="button"
          onClick={seek}
          aria-label={`${activeWork.shortTitle} video vaxtını dəyiş`}
        >
          <span style={{ width: `${Math.max(progress, 14)}%` }} />
        </button>
      </div>
    </article>
  );
}

function WorkCard({ activeId, index, setActiveId, setViewerWork, work }) {
  return (
    <button
      className={`work-card is-${work.orientation} ${
        activeId === work.id ? "is-active" : ""
      }`}
      style={{
        "--item-index": index,
        "--media-aspect": work.aspectRatio,
      }}
      type="button"
      onClick={() => {
        setActiveId(work.id);
        setViewerWork(work);
      }}
      aria-label={`${work.shortTitle} videosuna bax`}
    >
      <video
        src={work.video}
        poster={work.thumb}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
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
  );
}

function VideoLightbox({ onClose, work }) {
  const lightboxVideoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.classList.add("is-viewer-open");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("is-viewer-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const video = lightboxVideoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {
      // Native controls remain visible if the browser blocks autoplay.
    });
  }, [work.id]);

  return (
    <div className="video-lightbox" role="dialog" aria-modal="true" aria-label={work.title}>
      <button className="lightbox-backdrop" type="button" onClick={onClose} aria-label="Bağla" />
      <article
        className={`lightbox-player is-${work.orientation}`}
        style={{ "--media-aspect": work.aspectRatio }}
      >
        <div className="lightbox-topline">
          <div>
            <span>{work.category}</span>
            <strong>{work.title}</strong>
          </div>
          <button type="button" onClick={onClose} aria-label="Video player-i bağla">
            <X size={22} />
          </button>
        </div>
        <video
          ref={lightboxVideoRef}
          key={work.id}
          src={work.video}
          poster={work.thumb}
          controls
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <div className="lightbox-meta">
          <span>{work.format}</span>
          <span>{work.width}x{work.height}</span>
          <span>{work.duration}</span>
        </div>
      </article>
    </div>
  );
}

function SiteLoader({ progress }) {
  const safeProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className="site-loader" role="status" aria-live="polite">
      <div className="loader-panel">
        <div className="loader-brand">
          <img src={brandMark} alt="" />
          <span>ARTIZ.AZ</span>
        </div>
        <strong>{safeProgress}%</strong>
        <div className="loader-track" aria-hidden="true">
          <span style={{ transform: `scaleX(${safeProgress / 100})` }} />
        </div>
        <p>Motion preview yüklənir</p>
      </div>
    </div>
  );
}

function useAssetPreloader(assets) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const uniqueAssets = [...new Set(assets)];
    const startedAt = window.performance.now();
    const minimumDuration = 700;

    if (!uniqueAssets.length) {
      setProgress(100);
      setIsLoaded(true);
      return undefined;
    }

    let completed = 0;
    const loadedBytes = new Map();
    const totalBytes = new Map();

    const updateProgress = () => {
      if (cancelled) return;

      const total = [...totalBytes.values()].reduce((sum, value) => sum + value, 0);
      const loaded = [...loadedBytes.values()].reduce((sum, value) => sum + value, 0);
      const fileProgress = (completed / uniqueAssets.length) * 100;
      const byteProgress = total > 0 ? (loaded / total) * 100 : fileProgress;
      const nextProgress = Math.max(fileProgress, byteProgress * 0.92);
      setProgress(Math.min(99, Math.round(nextProgress)));
    };

    const preloadAsset = async (url) => {
      try {
        const response = await fetch(url, { cache: "force-cache" });
        if (!response.ok) throw new Error(`Could not load ${url}`);

        const length = Number(response.headers.get("content-length"));
        if (!response.body || !Number.isFinite(length) || length <= 0) {
          await response.blob();
          totalBytes.set(url, 1);
          loadedBytes.set(url, 1);
          return;
        }

        totalBytes.set(url, length);
        const reader = response.body.getReader();
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          received += value.byteLength;
          loadedBytes.set(url, received);
          updateProgress();
        }
      } catch {
        totalBytes.set(url, 1);
        loadedBytes.set(url, 1);
      } finally {
        completed += 1;
        updateProgress();
      }
    };

    Promise.all(uniqueAssets.map((asset) => preloadAsset(asset))).then(() => {
      const elapsed = window.performance.now() - startedAt;
      window.setTimeout(() => {
        if (cancelled) return;
        setProgress(100);
        window.setTimeout(() => {
          if (!cancelled) setIsLoaded(true);
        }, 160);
      }, Math.max(0, minimumDuration - elapsed));
    });

    return () => {
      cancelled = true;
    };
  }, [assets]);

  return { isLoaded, progress };
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
          <img src={work.thumb} alt="" decoding="async" />
        </button>
      ))}
    </div>
  );
}

function formatTime(value) {
  if (!Number.isFinite(value)) return "00:00";

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function useScrollScenes() {
  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll("[data-scroll-scene]"));
    const hero = document.querySelector(".hero");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    if (reduceMotion) {
      scenes.forEach((scene) => {
        scene.style.setProperty("--scene-progress", "1");
        scene.style.setProperty("--scene-rest", "0");
      });
      hero?.style.setProperty("--hero-scroll", "0");
      root.style.setProperty("--page-progress", "0");
      return undefined;
    }

    let frame = 0;
    const clamp = (value) => Math.min(1, Math.max(0, value));
    const easeOut = (value) => 1 - Math.pow(1 - value, 3);

    const update = () => {
      const viewport = window.innerHeight || 1;
      const scrollable = Math.max(root.scrollHeight - viewport, 1);
      const pageProgress = clamp(window.scrollY / scrollable);
      root.style.setProperty("--page-progress", pageProgress.toFixed(4));

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
