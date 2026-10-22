'use client';

import Link from 'next/link';
import { FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Қундузхон
            </Link>
            <p className="mt-4 text-gray-400 leading-relaxed">
              15 йиллик тажрибага эга теле ва радио бошловчи, нотиқлик санъати бўйича эксперт.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex gap-2">
                <a
                  href="https://instagram.com/abdullayeva_qunduzxon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-pink-500 transition-colors text-sm"
                >
                  <FiInstagram size={14} />
                  <span>Нотиқлик</span>
                </a>
                <a
                  href="https://instagram.com/qunduzxon_abdullayeva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-pink-500 transition-colors text-sm"
                >
                  <FiInstagram size={14} />
                  <span>Шахсий</span>
                </a>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <FiYoutube size={18} />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  <FaTelegram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Тезкор ҳаволалар</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Мен ҳақимда
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Портфолио
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Видеолар
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Блог
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Алоқа
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Категориялар</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/videos?category=tv" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Телекўрсатувлар
                </Link>
              </li>
              <li>
                <Link href="/videos?category=radio" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Радио эфирлар
                </Link>
              </li>
              <li>
                <Link href="/videos?category=food" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Фудблог
                </Link>
              </li>
              <li>
                <Link href="/videos?category=lifestyle" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Лайфстайл
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Алоқа</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <FiMail className="text-pink-400" />
                <span>info@qunduzxon.uz</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiPhone className="text-pink-400" />
                <span>+998 90 123 45 67</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiMapPin className="text-pink-400" />
                <span>Тошкент, Ўзбекистон</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Қундузхон Абдуллаева. Барча ҳуқуқлар ҳимояланган.</p>
        </div>
      </div>
    </footer>
  );
}
