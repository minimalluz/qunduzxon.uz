'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiX, FiVolume2, FiVolumeX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const categories = [
  { id: 'all', label: 'Барчаси' },
  { id: 'tv', label: 'ТВ ва Радио' },
  { id: 'food', label: 'Фудблог' },
  { id: 'lifestyle', label: 'Лайфстайл' },
];

const videos = [
  { id: 1, src: '/videos/Qunduzxonim-1.mp4', title: 'Қундузхоним', category: 'tv' },
  { id: 2, src: '/videos/VID_20240313_102406_049.mp4', title: 'Эрталабки эфир', category: 'tv' },
  { id: 3, src: '/videos/VID_20240408_171441_707.mp4', title: 'Кулинария', category: 'food' },
  { id: 4, src: '/videos/VID_20240625_143429_939.mp4', title: 'Янги рецепт', category: 'food' },
  { id: 5, src: '/videos/VID_20240625_155327_747.mp4', title: 'Таом тайёрлаш', category: 'food' },
  { id: 6, src: '/videos/VID_20240625_155638_397.mp4', title: 'Мазали таом', category: 'food' },
  { id: 7, src: '/videos/VID_20240625_192114_968.mp4', title: 'Ҳаёт лаҳзалари', category: 'lifestyle' },
  { id: 8, src: '/videos/VID_20240625_192320_506.mp4', title: 'Кундалик ҳаёт', category: 'lifestyle' },
  { id: 9, src: '/videos/VID_20240625_192540_133.mp4', title: 'Илҳом', category: 'lifestyle' },
  { id: 10, src: '/videos/VID_20240626_174345_189.mp4', title: 'Радио эфир', category: 'tv' },
  { id: 11, src: '/videos/VID_20240626_174510_318.mp4', title: 'Студияда', category: 'tv' },
  { id: 12, src: '/videos/VID_20240626_174921_890.mp4', title: 'Интервю', category: 'tv' },
  { id: 13, src: '/videos/VID_20240626_175147_760.mp4', title: 'Қисқа видео', category: 'lifestyle' },
  { id: 14, src: '/videos/VID_20240626_175236_873.mp4', title: 'Табассум', category: 'lifestyle' },
  { id: 15, src: '/videos/VID_20240626_175441_178.mp4', title: 'Ширинлик', category: 'food' },
  { id: 16, src: '/videos/VID_20240626_175924_238.mp4', title: 'Рецепт', category: 'food' },
  { id: 17, src: '/videos/VID_20240626_180252_113.mp4', title: 'Маслаҳат', category: 'lifestyle' },
  { id: 18, src: '/videos/VID_20240626_180423_159.mp4', title: 'Лаҳзалар', category: 'lifestyle' },
];

function VideoCard({ video, onClick }: { video: typeof videos[0]; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer bg-gray-900 shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover object-center"
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Play overlay */}
      <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
          <FiPlay className="text-pink-500 text-2xl ml-1" />
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white font-medium text-sm">{video.title}</p>
      </div>

      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-3 py-1 rounded-full">
          {categories.find(c => c.id === video.category)?.label || video.category}
        </span>
      </div>
    </motion.div>
  );
}

function VideoModal({
  video,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}: {
  video: typeof videos[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-10 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
        onClick={onClose}
      >
        <FiX size={28} />
      </button>

      {/* Mute button */}
      <button
        className="absolute top-4 left-4 z-10 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
        onClick={(e) => { e.stopPropagation(); toggleMute(); }}
      >
        {isMuted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
      </button>

      {/* Navigation buttons */}
      {hasPrev && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <FiChevronLeft size={32} />
        </button>
      )}

      {hasNext && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <FiChevronRight size={32} />
        </button>
      )}

      {/* Video container - Instagram Reels style */}
      <div
        className="relative w-full h-full max-w-[400px] max-h-[90vh] md:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-contain bg-black"
          autoPlay
          loop
          playsInline
          controls={false}
          onClick={(e) => {
            e.stopPropagation();
            const vid = e.currentTarget;
            if (vid.paused) vid.play();
            else vid.pause();
          }}
        />

        {/* Video info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <h3 className="text-white font-bold text-lg mb-2">{video.title}</h3>
          <p className="text-white/70 text-sm">@qunduzxon</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const currentIndex = selectedVideo
    ? filteredVideos.findIndex(v => v.id === selectedVideo.id)
    : -1;

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedVideo(filteredVideos[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredVideos.length - 1) {
      setSelectedVideo(filteredVideos[currentIndex + 1]);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Видеолар
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto"
          >
            Телекўрсатувлар, радио эфирлар ва фудблог видеоларим
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 md:gap-3 pb-2 md:justify-center scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap text-sm md:text-base ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid - Instagram Reels Style */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4"
          >
            <AnimatePresence>
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <VideoCard
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Бу категорияда видеолар топилмади</p>
            </div>
          )}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Янада кўпроқ видеолар Instagram да
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://instagram.com/abdullayeva_qunduzxon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @abdullayeva_qunduzxon
              <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">Нотиқлик</span>
            </a>
            <a
              href="https://instagram.com/qunduzxon_abdullayeva"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @qunduzxon_abdullayeva
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">Шахсий</span>
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
            onPrev={goToPrev}
            onNext={goToNext}
            hasPrev={currentIndex > 0}
            hasNext={currentIndex < filteredVideos.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
