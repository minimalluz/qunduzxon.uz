'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiInstagram, FiYoutube, FiPlay } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg mb-4"
            >
              Ассалому алайкум, мен
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Қундузхон
              <span className="block bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Абдуллаева
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-pink-500 font-medium mb-8"
            >
              Теле ва Радио бошловчи | Нотиқлик эксперти
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-lg mb-10 max-w-xl mx-auto lg:mx-0"
            >
              15 йиллик тажрибага эга теле ва радио бошловчи. Нотиқлик санъати ва оммавий нутқ бўйича эксперт.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link href="/videos">
                <Button size="lg" className="w-full sm:w-auto">
                  <FiPlay className="mr-2" />
                  Видеоларни кўриш
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Боғланиш
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col gap-3 items-center lg:items-start"
            >
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/abdullayeva_qunduzxon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-sm font-medium hover:shadow-lg transition-all"
                >
                  <FiInstagram size={18} />
                  <span>Нотиқлик</span>
                </a>
                <a
                  href="https://instagram.com/qunduzxon_abdullayeva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-sm font-medium hover:shadow-lg transition-all"
                >
                  <FiInstagram size={18} />
                  <span>Шахсий</span>
                </a>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-red-500 hover:shadow-xl transition-all"
                >
                  <FiYoutube size={20} />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-500 hover:shadow-xl transition-all"
                >
                  <FaTelegram size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl transform rotate-6 scale-105 opacity-20" />
              <div className="relative w-72 h-[400px] sm:w-80 sm:h-[450px] md:w-96 md:h-[520px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero.jpg"
                  alt="Қундузхон Абдуллаева"
                  fill
                  className="object-cover object-[center_20%]"
                  priority
                />
              </div>
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4"
              >
                <p className="text-3xl font-bold text-pink-500">100+</p>
                <p className="text-sm text-gray-500">Телекўрсатувлар</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4"
              >
                <p className="text-3xl font-bold text-pink-500">15+</p>
                <p className="text-sm text-gray-500">Йиллик тажриба</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
