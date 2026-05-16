import PoetryTabs from "@/components/PoetryTabs"
import MusicPlayer from "@/components/MusicPlayer"
import FeedbackForm from "@/components/FeedbackForm"

const NAV_LINKS = [
  { href: "#about", label: "О себе" },
  { href: "#petersburg", label: "Петербург" },
  { href: "#poetry", label: "Стихи" },
  { href: "#music", label: "Музыка" },
  { href: "#feedback", label: "Отзывы" },
]

function Header() {
  return (
    <header className="header-bar sticky top-0 left-0 right-0 z-50 py-3">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
        <nav className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-pill font-serif text-base sm:text-lg font-semibold px-5 sm:px-6 py-2.5 sm:py-3"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] min-h-screen flex items-end justify-center overflow-hidden pb-20 md:pb-28">
      <div className="absolute inset-0 z-0">
        {/* Mobile: use shorter image so text is fully visible. Desktop: full hero. */}
        <picture>
          <source media="(max-width: 767px)" srcSet="/v2_hero_mobile.png" />
          <img src="/v2_hero.png" alt="Санкт-Петербург" className="absolute inset-0 w-full h-full object-cover md:object-center" style={{ objectPosition: 'center top' }} />
        </picture>
        <div className="hero-overlay absolute inset-0" />
        {/* Extra dark gradient at bottom for button readability */}
        <div className="absolute bottom-0 left-0 right-0 h-48 md:h-56" style={{
          background: 'linear-gradient(to top, rgba(20, 12, 5, 0.7) 0%, rgba(20, 12, 5, 0.4) 40%, transparent 100%)',
        }} />
      </div>
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto mb-4">
        <a href="#poetry" className="btn-gold inline-flex items-center gap-2 px-10 py-4 font-serif text-base md:text-lg">
          Открыть мир стихов
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-float">
        <svg className="w-6 h-6" style={{ color: 'rgba(200, 164, 92, 0.4)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="relative py-20 md:py-28 px-4 overflow-hidden">
      {/* SPb-inspired warm background */}
      <div className="absolute inset-0 z-0" style={{
        background: 'linear-gradient(160deg, #FAF7F2 0%, #F5EDE0 30%, #EDE2D0 60%, #F5EDE0 100%)',
      }} />
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at 80% 20%, rgba(200, 164, 92, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(196, 139, 127, 0.06) 0%, transparent 50%)',
      }} />
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Portrait */}
        <div className="relative max-w-md mx-auto">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl" style={{ boxShadow: '0 8px 40px rgba(60, 36, 21, 0.12), 0 2px 8px rgba(200, 164, 92, 0.2)' }}>
            <div className="absolute -inset-1 rounded-2xl z-0" style={{ background: 'linear-gradient(135deg, rgba(200, 164, 92, 0.5), rgba(196, 139, 127, 0.3), rgba(200, 164, 92, 0.5))' }} />
            <img src="/juliasamoilova1.jpg" alt="Юлия Самойлова — поэтесса" className="absolute inset-0 w-full h-full object-cover object-top rounded-2xl relative z-10" />
          </div>
          {/* Decorative corners */}
          <div className="absolute -top-3 -right-3 w-16 h-16 rounded-xl z-20" style={{ border: '2px solid rgba(200, 164, 92, 0.2)', borderLeft: 'none', borderBottom: 'none' }} />
          <div className="absolute -bottom-3 -left-3 w-16 h-16 rounded-xl z-20" style={{ border: '2px solid rgba(200, 164, 92, 0.2)', borderRight: 'none', borderTop: 'none' }} />
        </div>
        {/* Bio */}
        <div id="about">
          <div className="ornament mb-6 justify-start">
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#8B7355' }}>Биография</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gold-gradient">
            О себе
          </h2>
          <div className="space-y-4 font-serif text-base sm:text-lg leading-[1.9]" style={{ color: '#6B4C3B' }}>
            <p>
              Поэтесса из Санкт-Петербурга — города, который сам по себе
              является величайшим стихотворением, написанным архитекторами и стихией.
              С детства она дышит воздухом белых ночей, ходит по гранитным набережным
              и слушает, как Нева перешёптывается с мостами.
            </p>
            <p>
              Её поэзия — это не просто слова на бумаге. Это разговор души с миром,
              где каждая строка пропитана ароматом петербургских двориков, звоном
              колоколов и бесконечным небом северной столицы. Природа, любовь, семья,
              духовность, память — темы, которые она коснулась так тонко и глубоко,
              что читатель волей-неволей останавливается, чтобы прислушаться к себе.
            </p>
            <p>
              Более 285 стихотворений, опубликованных на литературных порталах,
              находят отклик в сердцах читателей по всей России. И за каждым
              стихотворением — живая история, прожитая с открытым сердцем.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8" style={{ borderTop: '1px solid rgba(200, 164, 92, 0.15)' }}>
            {[
              { number: "285+", label: "стихотворений" },
              { number: "8", label: "тем" },
              { number: "∞", label: "чувств" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="font-display text-2xl md:text-3xl font-bold mb-1" style={{ color: '#C8A45C' }}>{stat.number}</div>
                <div className="text-xs sm:text-sm font-serif" style={{ color: '#8B7355' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PetersburgSection() {
  return (
    <section id="petersburg" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Rich SPb background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #E8D5B8 0%, #D4C4A0 25%, #C8B898 50%, #D8C8A8 75%, #E0D0B8 100%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(200, 164, 92, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(196, 139, 127, 0.1) 0%, transparent 50%)',
        }} />
        {/* Subtle ornamental pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233C2415' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="ornament mb-6">
          <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#8B7355' }}>Вдохновение</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-gold-gradient">
          Город, который дышит стихами
        </h2>
        <div className="font-serif text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed space-y-6" style={{ color: '#5C3D2E' }}>
          <p>
            Санкт-Петербург — не просто город. Это живая поэма, написанная мрамором и гранитом,
            залитая серебряным светом белых ночей. Здесь каждый мост хранит тайну, каждый дворник-колодец
            шепчет предания, а невские туманы рождают миры, которых не существует нигде больше на земле.
          </p>
          <p>
            Это город, где Пушкин гулял по набережным и мечтал, где Достоевский искал
            человеческую душу в лабиринте улиц, где Ахматова слушала, как время течёт
            сквозь решётки решётчатых оград. И в этом великом хоре голосов звучит
            и голос Юлии Самойловой — тихий, но пронзительный, как весенний луч,
            пробившийся сквозь петербургскую облачность.
          </p>
        </div>
        {/* Decorative Petersburg elements */}
        <div className="flex items-center justify-center gap-8 mt-12">
          {[
            { icon: "🏛", label: "Дворцы" },
            { icon: "🌉", label: "Мосты" },
            { icon: "🌙", label: "Белые ночи" },
            { icon: "⚓", label: "Нева" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl sm:text-3xl mb-1">{item.icon}</div>
              <div className="text-xs sm:text-sm font-serif" style={{ color: '#8B7355' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CreativeTextSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 overflow-hidden">
      {/* Vibrant warm background with golden glow */}
      <div className="absolute inset-0 z-0" style={{
        background: 'linear-gradient(170deg, #F8F0E3 0%, #F3E8D5 25%, #EDDCC5 50%, #F0E5D0 75%, #F8F0E3 100%)',
      }} />
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(200, 164, 92, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 20% 100%, rgba(196, 123, 90, 0.08) 0%, transparent 40%), radial-gradient(ellipse at 80% 100%, rgba(123, 158, 123, 0.06) 0%, transparent 40%)',
      }} />
      {/* Decorative floating circles */}
      <div className="absolute top-10 left-[10%] w-32 h-32 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #C8A45C, transparent)' }} />
      <div className="absolute bottom-10 right-[15%] w-40 h-40 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #C48B7F, transparent)' }} />
      <div className="absolute top-1/2 right-[5%] w-24 h-24 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #7B9E7B, transparent)' }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="ornament mb-6">
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#8B7355' }}>Размышления</span>
          </div>
        </div>

        <div className="space-y-8 font-serif text-lg sm:text-xl md:text-2xl leading-[2]" style={{ color: '#5C3D2E' }}>
          <p className="text-center" style={{ color: '#A68B3E', fontWeight: 500 }}>
            Есть города, которые можно увидеть. А есть Петербург — его нужно слышать.
          </p>
          <p>
            Он говорит с тобой шёпотом невской воды по утрам, звоном трамваев на проспекте,
            скрипом снега под ногами в февральский вечер. Он находит тебя в неожиданные
            моменты — когда солнце не заходит за горизонт и небо окрашивается в цвета,
            которых нет ни в одной палитре художника.
          </p>
          <p>
            И когда город заговорит, случается чудо: появляются строки. Не из головы —
            из самой дыхания мостовых, из теней дворцовых арок, из света, что струится
            сквозь витражи казанского собора. Они приходят сами, эти слова, — сто́ит лишь
            замереть на мгновение и позволить Петербургу заглянуть тебе в душу.
          </p>
          <p>
            Именно так рождаются стихи Юлии Самойловой. Не из сухих черновиков, не из
            литературных амбиций, а из живого, тёплого, неукротимого чувства — любви
            к городу, который дал ей голос, и к миру, который дал ей повод заговорить.
          </p>
        </div>
      </div>
    </section>
  )
}

function QuoteBanner() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
        background: 'linear-gradient(135deg, #F3EDE3 0%, #EDE4D5 50%, #F0E8D8 100%)',
      }} />
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(200, 164, 92, 0.08) 0%, transparent 60%)',
      }} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <blockquote className="relative">
          <span className="quote-mark absolute -top-6 left-0 text-6xl md:text-8xl select-none">&laquo;</span>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl italic leading-relaxed pt-8" style={{ color: 'rgba(60, 36, 21, 0.8)' }}>
            Поэзия — это когда слова начинают звучать,{" "}
            <span style={{ color: '#A68B3E' }}>
              а тишина обретает голос
            </span>
          </p>
          <footer className="mt-6 font-serif text-sm tracking-widest uppercase" style={{ color: '#8B7355' }}>
            — Юлия Самойлова
          </footer>
          <span className="quote-mark absolute -bottom-6 right-0 text-6xl md:text-8xl select-none">&raquo;</span>
        </blockquote>
      </div>
    </section>
  )
}

function AboutYuriy() {
  return (
    <section className="relative py-20 md:py-28 px-4 overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 z-0" style={{
        background: 'linear-gradient(160deg, #FAF7F2 0%, #F5EDE0 30%, #F0E5D5 60%, #FAF7F2 100%)',
      }} />
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at 70% 30%, rgba(196, 123, 90, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(200, 164, 92, 0.06) 0%, transparent 50%)',
      }} />
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C8A45C' stroke-width='1'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Yuriy photo */}
        <div className="relative max-w-xs mx-auto md:order-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl" style={{ boxShadow: '0 8px 40px rgba(60, 36, 21, 0.1), 0 2px 8px rgba(196, 123, 90, 0.15)' }}>
            <div className="absolute -inset-1 rounded-2xl z-0" style={{ background: 'linear-gradient(135deg, rgba(196, 123, 90, 0.4), rgba(200, 164, 92, 0.3), rgba(196, 123, 90, 0.4))' }} />
            <img src="/yuriy.png" alt="Юрий — музыкальный творец" className="absolute inset-0 w-full h-full object-contain rounded-2xl relative z-10" />
          </div>
          <div className="absolute -top-3 -left-3 w-16 h-16 rounded-xl z-20" style={{ border: '2px solid rgba(196, 123, 90, 0.2)', borderRight: 'none', borderBottom: 'none' }} />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xl z-20" style={{ border: '2px solid rgba(196, 123, 90, 0.2)', borderLeft: 'none', borderTop: 'none' }} />
        </div>
        {/* Text */}
        <div className="md:order-1">
          <div className="ornament mb-6 justify-start">
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#8B7355' }}>Музыкальный творец</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, #C47A5A, #C48B7F, #D4A843)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            О Юрии
          </h2>
          <div className="space-y-4 font-serif text-base sm:text-lg leading-[1.9]" style={{ color: '#6B4C3B' }}>
            <p>
              Юрий — музыкант и звукорежиссёр с тонким чувством гармонии, который взял
              стихи Юлии Самойловой и превратил их в нечто большее, чем просто песни.
              Используя современные возможности искусственного интеллекта как инструмента,
              он создал цикл музыкальных композиций, где каждое слово поэзии обрело
              свой собственный голос, свою мелодию, своё дыхание.
            </p>
            <p>
              Каждая композиция — это диалог между двумя творческими мирами: словом
              и звуком. Стихи Юлии — душа каждой песни, её сердце и смысл. Музыка Юрия —
              крылья, которые поднимают эти стихи над страницей и несут их прямо
              к слушателю. Вместе они создают атмосферу, в которой хочется остановиться,
              закрыть глаза и просто слушать.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-8 pt-8" style={{ borderTop: '1px solid rgba(196, 123, 90, 0.15)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(200, 164, 92, 0.15), rgba(196, 139, 127, 0.15))' }}>
              <svg className="w-6 h-6" style={{ color: '#C8A45C' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <div>
              <span className="font-display text-sm font-semibold" style={{ color: '#3C2415' }}>Поэзия + AI</span>
              <span className="font-serif text-sm block" style={{ color: '#8B7355' }}>Слова — Юлия Самойлова, мелодия — Юрий</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Divider() {
  return (
    <div className="max-w-xs mx-auto px-4 py-4">
      <div className="decorative-line" />
    </div>
  )
}

function Footer() {
  return (
    <footer id="contacts" className="relative py-16 md:py-20 px-4 safe-bottom overflow-hidden">
      {/* Warm background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, #EDE4D5 0%, #F3EDE3 50%, #EDE4D5 100%)',
      }} />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="spb-ornament mb-10" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-10">
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-display text-3xl font-bold mb-4 text-gold-gradient">Юлия Самойлова</h3>
            <p className="font-serif text-lg leading-relaxed" style={{ color: '#3C2415' }}>
              Поэтесса из Санкт-Петербурга. Стихи, наполненные душой северной столицы и любовью к каждому мгновению жизни.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-base tracking-[0.2em] uppercase mb-4 font-bold" style={{ color: '#3C2415' }}>Навигация</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-serif text-lg transition-colors hover:underline" style={{ color: '#4A3020' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-base tracking-[0.2em] uppercase mb-4 font-bold" style={{ color: '#3C2415' }}>Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://stihi.ru/avtor/juliasamoilova1" target="_blank" rel="noopener noreferrer" className="font-serif text-lg transition-colors hover:underline" style={{ color: '#4A3020' }}>
                  Стихи.ру ↗
                </a>
              </li>
              <li>
                <span className="font-serif text-lg" style={{ color: '#4A3020' }}>Санкт-Петербург, Россия</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="spb-ornament mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-serif text-base" style={{ color: '#3C2415' }}>
          <p>&copy; 2025 Юлия Самойлова. Все права защищены.</p>
          <div className="flex items-center gap-4">
            <a href="/admin" className="transition-colors hover:underline font-semibold" style={{ color: '#A68B3E' }}>
              admin
            </a>
            <p className="font-semibold" style={{ color: '#C8A45C' }}>Создано с ♡ в Санкт-Петербурге</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF7F2' }}>
      <Header />
      <main className="flex-1">
        <Hero />
        <Divider />
        <About />
        <Divider />
        <PetersburgSection />
        <Divider />
        <CreativeTextSection />
        <Divider />
        <QuoteBanner />
        <Divider />
        <PoetryTabs />
        <Divider />
        <AboutYuriy />
        <Divider />
        <MusicPlayer />
        <Divider />
        <FeedbackForm />
      </main>
      <Footer />
    </div>
  )
}
