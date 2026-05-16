'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import poems from '@/data/poems.json';
import Link from 'next/link';

const categories = [
  "Размышления",
  "Любовная лирика",
  "Семья и родные",
  "Санкт-Петербург",
  "Природа и времена года",
  "Духовная поэзия",
  "О Родине и мире",
];

interface Track {
  title: string;
  src: string;
}

const tracks: Track[] = [
  { title: "Слушай тишину", src: "/music/slushay-tishinu.mp3" },
  { title: "Скриншоты без ответа", src: "/music/skrinshoty.mp3" },
];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

  const filteredPoems = poems.filter(p => p.category === activeTab);

  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(audio.currentTime);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsReady(true);
    };

    const onCanPlayThrough = () => {
      setIsReady(true);
    };

    const onTimeUpdate = updateProgress;
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
    const onError = () => {
      setIsReady(false);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('canplaythrough', onCanPlayThrough);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('canplaythrough', onCanPlayThrough);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [updateProgress]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !isReady) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
    setProgress(parseFloat(e.target.value));
  };

  const switchTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setIsReady(false);
    // Force reload
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.load();
      }
    }, 50);
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="relative w-full min-h-[55vh] md:min-h-[65vh] lg:min-h-[75vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/v2_hero.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 px-4">
          <Link
            href="#poems"
            className="px-8 py-3.5 bg-[#C8A45C] hover:bg-[#b8943e] text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base md:text-lg tracking-wide"
          >
            Открыть мир стихов
          </Link>
        </div>
      </section>

      {/* Music Player Section */}
      <section className="w-full bg-[#3C2415] py-6 md:py-8">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A45C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <h2 className="text-[#C8A45C] font-serif text-lg md:text-xl font-semibold">Музыка и стихи</h2>
          </div>

          {/* Track Selection */}
          <div className="flex gap-3 mb-5">
            {tracks.map((track, i) => (
              <button
                key={i}
                onClick={() => switchTrack(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  currentTrack === i
                    ? 'bg-[#C8A45C] text-[#3C2415] shadow-md'
                    : 'bg-[#4a3322] text-[#D4C5B5] hover:bg-[#5a4332] hover:text-white'
                }`}
              >
                {track.title}
              </button>
            ))}
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              disabled={!isReady}
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isReady
                  ? 'bg-[#C8A45C] hover:bg-[#b8943e] text-[#3C2415] shadow-lg hover:scale-110'
                  : 'bg-[#4a3322] text-[#8B7355] cursor-wait'
              }`}
            >
              {!isReady ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="animate-spin">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>

            <div className="flex-1 flex items-center gap-3">
              <span className="text-[#D4C5B5] text-xs font-mono w-10 text-right tabular-nums">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 relative h-5 flex items-center">
                <div className="w-full h-1 bg-[#5a4332] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C8A45C] rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <input
                  ref={progressRef}
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleSeek}
                  className="player-progress absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  style={{ background: 'transparent' }}
                />
              </div>
              <span className="text-[#D4C5B5] text-xs font-mono w-10 tabular-nums">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          <p className="text-[#8B7355] text-xs mt-3 italic">
            {tracks[currentTrack].title}
          </p>

          <audio
            ref={audioRef}
            preload="metadata"
            key={currentTrack}
            src={tracks[currentTrack].src}
          />
        </div>
      </section>

      {/* Poetry Tabs Section */}
      <section id="poems" className="flex-1 w-full bg-[#F5F0EB] py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Mobile: Photo above tabs */}
          <div className="md:hidden mb-8">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/juliasamoilova1.jpg"
                alt="Юлия Самойлова"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3C2415]/40 to-transparent" />
            </div>
          </div>

          {/* Section Title */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3C2415] mb-3">
              Стихотворения
            </h2>
            <div className="w-20 h-0.5 bg-[#C8A45C] mx-auto" />
          </div>

          {/* Category Tabs */}
          <div className="mb-6 overflow-x-auto tabs-scroll pb-1">
            <div className="flex gap-2 min-w-max md:justify-center md:flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeTab === cat
                      ? 'bg-[#3C2415] text-white shadow-md'
                      : 'bg-[#EDE6DD] text-[#8B7355] hover:bg-[#D4C5B5] hover:text-[#3C2415]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Poems + Photo Layout */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Poem List */}
            <div className="flex-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[#D4C5B5]/50 shadow-sm p-4 md:p-6">
                <div className="max-h-96 overflow-y-auto poem-list pr-2">
                  {filteredPoems.length === 0 ? (
                    <p className="text-[#8B7355] text-center py-8 italic">
                      В этой категории пока нет стихотворений
                    </p>
                  ) : (
                    <ul className="space-y-1">
                      {filteredPoems.map((poem, idx) => {
                        const poemIndex = poems.indexOf(poem);
                        return (
                          <li key={poemIndex}>
                            <Link
                              href={`/poem/${poemIndex}`}
                              className="block py-3 px-4 rounded-xl text-[#3C2415] hover:bg-[#F5F0EB] transition-all duration-200 group border-b border-[#EDE6DD] last:border-0"
                            >
                              <div className="flex items-center justify-between">
                                <span className="group-hover:text-[#C8A45C] transition-colors duration-200 text-sm md:text-base font-medium">
                                  {poem.title}
                                </span>
                                <span className="text-xs text-[#8B7355] ml-3 flex-shrink-0">
                                  {poem.year}
                                </span>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <p className="text-xs text-[#8B7355] mt-4 text-center">
                  {filteredPoems.length} {filteredPoems.length === 1 ? 'стихотворение' : filteredPoems.length < 5 ? 'стихотворения' : 'стихотворений'}
                </p>
              </div>
            </div>

            {/* Desktop: Photo on right side */}
            <div className="hidden md:block flex-shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-xl w-full lg:w-80 h-[480px] lg:h-[560px]">
                <img
                  src="/juliasamoilova1.jpg"
                  alt="Юлия Самойлова"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3C2415]/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-serif text-xl font-semibold drop-shadow-lg">
                    Юлия Самойлова
                  </p>
                  <p className="text-white/80 text-sm mt-1 drop-shadow">
                    Санкт-Петербург
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#3C2415] py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-center gap-3">
          <p className="text-[#D4C5B5] text-sm">
            © 2026 Юлия Самойлова. Все права защищены.
          </p>
          <Link
            href="/admin"
            className="text-[#8B7355] text-xs hover:text-[#C8A45C] transition-colors duration-200"
          >
            admin
          </Link>
        </div>
      </footer>
    </main>
  );
}
