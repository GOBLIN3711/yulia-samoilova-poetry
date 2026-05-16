import poems from '@/data/poems.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return poems.map((_, index) => ({
    id: String(index),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const index = parseInt(id, 10);
  const poem = poems[index];
  if (!poem) return { title: 'Стихотворение не найдено' };

  return {
    title: `${poem.title} — Юлия Самойлова`,
    description: `Стихотворение «${poem.title}» поэтессы Юлии Самойловой. ${poem.category}, ${poem.year}.`,
  };
}

export default async function PoemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = parseInt(id, 10);

  if (index < 0 || index >= poems.length) {
    notFound();
  }

  const poem = poems[index];
  const lines = poem.text.split('\n').filter(line => line.trim() !== '');

  return (
    <main className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <header className="bg-[#3C2415] py-5 px-4 md:px-6">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#C8A45C] hover:text-white transition-colors duration-200 group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform duration-200"
            >
              <polyline points="15,18 9,12 15,6" />
            </svg>
            <span className="text-sm font-medium">Назад к стихам</span>
          </Link>
        </div>
      </header>

      {/* Poem Content */}
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[#D4C5B5]/50 shadow-sm p-6 md:p-10">
          {/* Title */}
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#3C2415] mb-6 leading-tight">
            {poem.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 bg-[#F5F0EB] text-[#8B7355] text-sm rounded-full border border-[#D4C5B5]/50">
              {poem.category}
            </span>
            <span className="text-[#8B7355] text-sm">{poem.year}</span>
          </div>

          {/* Divider */}
          <div className="w-16 h-0.5 bg-[#C8A45C] mb-8" />

          {/* Poem Text */}
          <div className="leading-relaxed">
            {lines.map((line, i) => (
              <p
                key={i}
                className="text-[#3C2415] text-lg md:text-xl leading-loose"
                style={{ textIndent: line.startsWith(' ') ? '2em' : undefined }}
              >
                {line.trim() || '\u00A0'}
              </p>
            ))}
          </div>

          {/* Source Link */}
          {poem.url && (
            <div className="mt-10 pt-6 border-t border-[#EDE6DD]">
              <a
                href={poem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C8A45C] hover:text-[#3C2415] text-sm transition-colors duration-200"
              >
                <span>Читать на stihi.ru</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Back to all poems */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3C2415] text-white rounded-full hover:bg-[#4a3322] transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Все стихотворения
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-[#3C2415] py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-[#D4C5B5] text-sm">
            © 2026 Юлия Самойлова. Все права защищены.
          </p>
        </div>
      </footer>
    </main>
  );
}
