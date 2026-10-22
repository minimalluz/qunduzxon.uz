'use client';

import Link from 'next/link';
import { FiPlay, FiClock, FiEye } from 'react-icons/fi';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  category: string;
}

export default function VideoCard({ id, title, thumbnail, duration, views, category }: VideoCardProps) {
  const categoryLabels: Record<string, string> = {
    tv: 'Телекўрсатув',
    radio: 'Радио',
    food: 'Фудблог',
    lifestyle: 'Лайфстайл',
  };

  const formatViews = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/videos/${id}`}>
        <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
          <img
            src={thumbnail}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              transition: 'transform 0.5s'
            }}
            className="group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <FiPlay className="text-pink-500 text-2xl ml-1" />
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
            <FiClock className="inline mr-1" />
            {duration}
          </div>
          <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-3 py-1 rounded-full">
            {categoryLabels[category] || category}
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 group-hover:text-pink-500 transition-colors line-clamp-2 mb-3">
            {title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm">
            <FiEye className="mr-1" />
            <span>{formatViews(views)} кўриш</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
