import Hero from '@/components/sections/Hero';
import VideoCard from '@/components/ui/VideoCard';
import BlogCard from '@/components/ui/BlogCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiAward, FiMic, FiCamera, FiHeart } from 'react-icons/fi';

const featuredVideos = [
  {
    id: '1',
    title: 'Эрталабки кўрсатув - Янги кун билан',
    thumbnail: '/images/video1.jpg',
    duration: '2:45',
    views: 15000,
    category: 'tv',
  },
  {
    id: '2',
    title: 'Ўзбек ошини тайёрлашнинг сирлари',
    thumbnail: '/images/video2.jpg',
    duration: '3:20',
    views: 28000,
    category: 'food',
  },
  {
    id: '3',
    title: 'Радио эфир - Мусиқа ва суҳбат',
    thumbnail: '/images/video3.jpg',
    duration: '1:55',
    views: 12000,
    category: 'radio',
  },
];

const latestPosts = [
  {
    slug: 'mazzali-osh-tayyorlash',
    title: 'Мазали ош тайёрлаш сирлари',
    excerpt: 'Ҳақиқий ўзбек ошини тайёрлашнинг энг муҳим қоидалари ва махфий ингредиентлари ҳақида.',
    coverImage: '/images/blog1.jpg',
    createdAt: new Date('2024-10-15'),
    tags: ['Таом', 'Рецепт'],
  },
  {
    slug: 'teleboshlovchi-tajribam',
    title: 'Телебошловчи бўлиш тажрибам',
    excerpt: 'Камера олдида гапириш қандай ўрганилади ва қандай қилиб профессионал бўлиш мумкин.',
    coverImage: '/images/blog2.jpg',
    createdAt: new Date('2024-10-10'),
    tags: ['Карьера', 'Маслаҳат'],
  },
  {
    slug: 'eng-yaxshi-taomlar',
    title: 'Энг яхши таомлар рейтинги',
    excerpt: '2024 йилда синаб кўрган энг мазали таомларим ва ресторанлар тавсияси.',
    coverImage: '/images/blog3.jpg',
    createdAt: new Date('2024-10-05'),
    tags: ['Фудблог', 'Рейтинг'],
  },
];

const stats = [
  { icon: FiAward, number: '15+', label: 'Йиллик тажриба' },
  { icon: FiMic, number: '1000+', label: 'Телекўрсатувлар' },
  { icon: FiCamera, number: '500+', label: 'Видеолар' },
  { icon: FiHeart, number: '500K', label: 'Обуначилар' },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* About Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl transform -rotate-6 scale-105 opacity-20" />
                <div className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about.jpg"
                    alt="Қундузхон Абдуллаева"
                    fill
                    className="object-cover object-[center_25%]"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Салом! Мен{' '}
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  Қундузхонман
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Мен теле ва радио бошловчиман, шунингдек фудблогер сифатида фаолият юритаман.
                Ўзбек таомлари ва жаҳон ошхонасини кўрсатиш орқали томошабинларга янги таъмлар
                оламини очиб бераман.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Телевидение ва радиода ишлаш орқали минглаб одамларга илҳом бағишлаб,
                уларнинг кунларини янада ёрқинроқ қилишга ҳаракат қиламан.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link href="/about">
                <Button>
                  Батафсил
                  <FiArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Охирги видеолар
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Энг сўнгги телекўрсатувлар, радио эфирлар ва фудблог видеоларим
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/videos">
              <Button variant="outline">
                Барча видеолар
                <FiArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Блогдан охирги мақолалар
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ҳаёт, таом, карьера ва илҳом ҳақидаги фикрларим
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button variant="outline">
                Барча мақолалар
                <FiArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-500 to-rose-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ҳамкорлик қилишни хоҳлайсизми?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">
            Реклама, ҳамкорлик ёки бошқа таклифлар учун мен билан боғланинг.
            Сизнинг лойиҳангизни биргаликда амалга оширамиз.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Боғланиш
              <FiArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
