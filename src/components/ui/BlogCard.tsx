'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { uz } from 'date-fns/locale';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  createdAt: Date;
  tags: string[];
}

export default function BlogCard({ slug, title, excerpt, coverImage, createdAt, tags }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/blog/${slug}`}>
        <div style={{ position: 'relative', height: '224px', overflow: 'hidden' }}>
          <img
            src={coverImage}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 25%',
              transition: 'transform 0.5s'
            }}
            className="group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6">
          <time className="text-pink-500 text-sm font-medium">
            {format(new Date(createdAt), 'd MMMM, yyyy', { locale: uz })}
          </time>
          <h3 className="font-bold text-xl text-gray-900 mt-2 mb-3 group-hover:text-pink-500 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 line-clamp-2 mb-4">{excerpt}</p>
          <span className="text-pink-500 font-medium inline-flex items-center group-hover:underline">
            Батафсил ўқиш
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
