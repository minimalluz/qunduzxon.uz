'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiAward, FiMic, FiCamera, FiHeart, FiStar, FiTrendingUp } from 'react-icons/fi';

const achievements = [
  {
    icon: FiAward,
    title: '15+',
    description: 'Йиллик тажриба',
  },
  {
    icon: FiMic,
    title: '1000+',
    description: 'Телекўрсатувлар',
  },
  {
    icon: FiCamera,
    title: '500+',
    description: 'Видеолар',
  },
  {
    icon: FiHeart,
    title: '500K',
    description: 'Обуначилар',
  },
];

const timeline = [
  {
    year: '2009',
    title: 'Карьера бошланиши',
    description: 'Теле ва радио соҳасида биринчи қадамлар',
  },
  {
    year: '2012',
    title: 'Профессионал ривожланиш',
    description: 'Нотиқлик санъатини чуқур ўрганиш',
  },
  {
    year: '2015',
    title: 'Миллий телеканал',
    description: 'Миллий телеканалда доимий бошловчи',
  },
  {
    year: '2018',
    title: 'Нотиқлик эксперти',
    description: 'Оммавий нутқ бўйича тренинглар бошлаш',
  },
  {
    year: '2021',
    title: 'Янги лойиҳалар',
    description: 'Бир нечта янги телекўрсатув лойиҳалари',
  },
  {
    year: '2024',
    title: '15 йиллик юбилей',
    description: 'Соҳада 15 йиллик тажриба ва минглаб шогирдлар',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl transform -rotate-6 scale-105 opacity-20" />
                <div className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about.jpg"
                    alt="Қундузхон Абдуллаева"
                    fill
                    className="object-cover object-[center_25%]"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Мен ҳақимда
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Ассалому алайкум! Мен <span className="text-pink-500 font-semibold">Қундузхон Абдуллаева</span> -
                15 йиллик тажрибага эга теле ва радио бошловчи, нотиқлик санъати бўйича эксперт.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Менинг асосий мақсадим - одамларга самарали мулоқот қилиш, оммавий нутқ сўзлаш
                ва ўз фикрларини аниқ ифодалаш санъатини ўргатиш. 15 йил давомида минглаб
                телекўрсатувлар олиб бордим ва юзлаб шогирдларга нотиқлик маҳоратини ўргатдим.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Теле ва радио эфирларда ҳар куни минглаб одамлар билан учрашиш, уларга илҳом
                бағишлаш - менинг энг катта бахтим!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50"
              >
                <item.icon className="w-10 h-10 text-pink-500 mx-auto mb-4" />
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{item.title}</p>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Менинг йўлим
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Карьера давомидаги муҳим қадамлар ва ютуқлар
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 mb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold">
                    {item.year.slice(2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-pink-200 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <span className="text-pink-500 font-semibold">{item.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Қобилиятларим
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white text-center"
            >
              <FiMic className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Телебошловчилик</h3>
              <p className="text-white/80">
                15 йиллик тажриба билан камера олдида профессионал бошловчилик
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-center"
            >
              <FiStar className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Нотиқлик санъати</h3>
              <p className="text-white/80">
                Оммавий нутқ, самарали мулоқот ва нотиқлик бўйича эксперт
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white text-center"
            >
              <FiTrendingUp className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Тренинг ва коучинг</h3>
              <p className="text-white/80">
                Нотиқлик ва оммавий нутқ бўйича шахсий тренинглар
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
