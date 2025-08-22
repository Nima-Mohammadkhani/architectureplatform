import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Itestimonial } from "../types/ui";

const testimonials: Itestimonial[] = [
  {
    id: 1,
    name: "علی احمدی",
    role: "مدیر پروژه",
    company: "شرکت ساختمانی تهران",
    content:
      "کیفیت کار و دقت در جزئیات فوق‌العاده بود. تیم معماری ما را کاملاً راضی کرد و پروژه در زمان مقرر تحویل داده شد.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 2,
    name: "فاطمه محمدی",
    role: "صاحب خانه",
    company: "ویلای شخصی",
    content:
      "طراحی داخلی خانه ما کاملاً مطابق با سلیقه و نیازهایمان بود. فضای ایجاد شده هم زیبا و هم کاربردی است.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 3,
    name: "محمد رضایی",
    role: "مدیرعامل",
    company: "مجتمع تجاری پارس",
    content:
      "مشاوره‌های تخصصی و طراحی خلاقانه باعث موفقیت پروژه ما شد. مشتریان از فضای ایجاد شده بسیار راضی هستند.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 4,
    name: "زهرا کریمی",
    role: "معمار",
    company: "دفتر معماری سبز",
    content:
      "همکاری با این تیم تجربه‌ای ارزشمند بود. نوآوری و خلاقیت در طراحی‌هایشان کاملاً مشهود است.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            نظرات <span className="text-yellow-600">مشتریان</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            آنچه مشتریان ما درباره کیفیت کار و خدماتمان می‌گویند
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-yellow-500 mb-4">
                <Quote className="w-8 h-8" />
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-2">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  <p className="text-yellow-600 text-xs font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  98%
                </div>
                <div className="text-gray-600">رضایت مشتریان</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  4.9
                </div>
                <div className="text-gray-600">امتیاز کلی</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">پروژه موفق</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
