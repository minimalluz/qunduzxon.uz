'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link href={`/videos/${id}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center"
            >
              <FiPlay className="text-pink-500 text-2xl ml-1" />
            </motion.div>
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
    </motion.div>
  );
}
