import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "./ui/Icon";
import { Slide } from "../types/ui";
import Button from "./ui/Button";

const slides: Slide[] = [
  {
    id: 1,
    title: "طراحی معماری مدرن",
    subtitle: "آینده‌نگر و پایدار",
    description:
      "ما فضاهایی طراحی می‌کنیم که زندگی را بهتر می‌کند. از خانه‌های مسکونی تا فضاهای تجاری، با نگاهی نو و مدرن.",
    image: "/image/slider/1.webp",
    ctaText: "مشاهده نمونه‌کارها",
    ctaLink: "/gallery",
    category: "معماری",
  },
  {
    id: 2,
    title: "دکوراسیون داخلی حرفه‌ای",
    subtitle: "زیبایی و کارایی",
    description:
      "ترکیب هنر و علم برای ایجاد فضاهای داخلی که هم زیبا هستند و هم کاربردی. از مینیمال تا لوکس.",
    image: "/image/slider/2.jpeg",
    ctaText: "شروع پروژه",
    ctaLink: "/consultation",
    category: "دکوراسیون",
  },
  {
    id: 3,
    title: "طراحی پایدار و سبز",
    subtitle: "محیط زیست دوست",
    description:
      "معماری پایدار که با طبیعت هماهنگ است. استفاده از انرژی‌های تجدیدپذیر و مصالح دوستدار محیط زیست.",
    image: "/image/slider/3.webp",
    ctaText: "مشاوره رایگان",
    ctaLink: "/calculator",
    category: "پایدار",
  },
  {
    id: 4,
    title: "طراحی شهری و منظر",
    subtitle: "شهرهای آینده",
    description:
      "طراحی فضاهای شهری که زندگی اجتماعی را بهبود می‌بخشد. پارک‌ها، پیاده‌روها و فضاهای عمومی.",
    image: "/image/slider/4.jpeg",
    ctaText: "مشاهده پروژه‌ها",
    ctaLink: "/gallery",
    category: "شهری",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ opacity: 0, x: direction * 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 300 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block bg-yellow-500/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium mb-6"
                >
                  {slides[currentSlide].category}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-light text-white mb-4 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl font-light text-yellow-400 mb-6"
                >
                  {slides[currentSlide].subtitle}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to={slides[currentSlide].ctaLink}
                    className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg transition-all duration-300 font-medium text-lg group hover:scale-105 hover:shadow-2xl"
                  >
                    {slides[currentSlide].ctaText}
                    <Icon
                      name="ChevronLeft"
                      className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
      >
        <Icon
          name="ChevronLeft"
          className="w-6 h-6 group-hover:translate-x-1 transition-transform"
        />
      </Button>

      <Button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
      >
        <Icon
          name="ChevronRight"
          className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
        />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <Button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-yellow-500 scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          className="h-full bg-yellow-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentSlide}
        />
      </div>
    </section>
  );
};

export default Slider;
