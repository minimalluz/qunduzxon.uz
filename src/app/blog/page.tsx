'use client';

import { motion } from 'framer-motion';
import BlogCard from '@/components/ui/BlogCard';

const posts = [
  {
    slug: 'mazzali-osh-tayyorlash',
    title: 'Мазали ош тайёрлаш сирлари',
    excerpt: 'Ҳақиқий ўзбек ошини тайёрлашнинг энг муҳим қоидалари ва махфий ингредиентлари ҳақида батафсил маълумот.',
    coverImage: '/images/blog1.jpg',
    createdAt: new Date('2024-10-15'),
    tags: ['Таом', 'Рецепт'],
  },
  {
    slug: 'teleboshlovchi-tajribam',
    title: 'Телебошловчи бўлиш тажрибам',
    excerpt: 'Камера олдида гапириш қандай ўрганилади ва қандай қилиб профессионал телебошловчи бўлиш мумкин.',
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
  {
    slug: 'hayot-haqida-fikrlar',
    title: 'Ҳаёт ҳақида фикрлар',
    excerpt: 'Ҳаёт ҳамиша инсонга кутилмаган совғаларни тайёрлайди. Шунинг учун ҳар бир кунни қадрлаш керак.',
    coverImage: '/images/1723772211100.jpg',
    createdAt: new Date('2024-09-28'),
    tags: ['Ҳаёт', 'Фикрлар'],
  },
  {
    slug: 'instagram-qanday-osdim',
    title: 'Instagram да қандай ўсдим',
    excerpt: 'Ижтимоий тармоқларда аудитория йиғиш ва контент яратиш бўйича шахсий тажрибам.',
    coverImage: '/images/1723772209682.jpg',
    createdAt: new Date('2024-09-20'),
    tags: ['SMM', 'Тажриба'],
  },
  {
    slug: 'somsa-retsepti',
    title: 'Уйда сомса тайёрлаш',
    excerpt: 'Энг мазали уй сомсасини тайёрлашнинг босқичма-босқич кўрсатмаси.',
    coverImage: '/images/1723772210015.jpg',
    createdAt: new Date('2024-09-15'),
    tags: ['Рецепт', 'Таом'],
  },
];

export default function BlogPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Блог
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Ҳаёт, таом, карьера ва илҳом ҳақидаги фикрларим
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-pink-500 to-rose-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Янги мақолалардан хабардор бўлинг
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Email манзилингизни қолдиринг ва янги мақолалар ҳақида биринчи бўлиб билинг
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email манзилингиз"
              className="flex-1 px-6 py-3 rounded-full outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-white text-pink-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Обуна бўлиш
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
