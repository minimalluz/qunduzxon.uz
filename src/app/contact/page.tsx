'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiMail, FiPhone, FiMapPin, FiSend, FiInstagram, FiYoutube } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import Button from '@/components/ui/Button';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call - replace with actual Firebase submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Form data:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();

    setTimeout(() => setIsSubmitted(false), 5000);
  };

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
            Алоқа
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Саволлар, таклифлар ёки ҳамкорлик учун мен билан боғланинг
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Боғланиш маълумотлари
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Ҳамкорлик, реклама ёки бошқа таклифлар учун қуйидаги усуллар орқали
                мен билан боғланишингиз мумкин.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-pink-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a href="mailto:info@qunduzxon.uz" className="text-gray-600 hover:text-pink-500 transition-colors">
                      info@qunduzxon.uz
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-pink-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Телефон</h3>
                    <a href="tel:+998901234567" className="text-gray-600 hover:text-pink-500 transition-colors">
                      +998 90 123 45 67
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-pink-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Манзил</h3>
                    <p className="text-gray-600">Тошкент, Ўзбекистон</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h3 className="font-semibold text-gray-900 mb-4">Ижтимоий тармоқлар</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <a
                      href="https://instagram.com/abdullayeva_qunduzxon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-sm font-medium hover:shadow-lg transition-all"
                    >
                      <FiInstagram size={18} />
                      <span>@abdullayeva_qunduzxon</span>
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://instagram.com/qunduzxon_abdullayeva"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-sm font-medium hover:shadow-lg transition-all"
                    >
                      <FiInstagram size={18} />
                      <span>@qunduzxon_abdullayeva</span>
                    </a>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white hover:shadow-lg transition-all"
                    >
                      <FiYoutube size={22} />
                    </a>
                    <a
                      href="https://t.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white hover:shadow-lg transition-all"
                    >
                      <FaTelegram size={22} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Хабар юбориш</h2>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6"
                  >
                    Раҳмат! Хабарингиз муваффақиятли юборилди.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Исмингиз *
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'Исмингизни киритинг' })}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      } focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all`}
                      placeholder="Исмингиз"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email киритинг',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Нотўғри email формат',
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all`}
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Мавзу
                    </label>
                    <input
                      type="text"
                      {...register('subject')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                      placeholder="Хабар мавзуси"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Хабар *
                    </label>
                    <textarea
                      {...register('message', { required: 'Хабарни киритинг' })}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.message ? 'border-red-500' : 'border-gray-200'
                      } focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none`}
                      placeholder="Хабарингизни ёзинг..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" isLoading={isSubmitting}>
                    <FiSend className="mr-2" />
                    Юбориш
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
