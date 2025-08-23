import { useState } from "react";
import { motion } from "framer-motion";
import { IblogProduct, Icategories } from "../types/ui";
import Card from "../components/ui/card";
import PageHeader from "../components/ui/pageHeader";
import Icon from "../components/ui/Icon";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories: Icategories[] = [
    { id: "all", name: "همه مقالات" },
    { id: "architecture", name: "معماری" },
    { id: "interior", name: "طراحی داخلی" },
    { id: "trends", name: "ترندهای روز" },
    { id: "tips", name: "نکات کاربردی" },
  ];

  const posts: IblogProduct[] = [
    {
      id: 1,
      title: "اصول طراحی معماری مدرن در ایران",
      excerpt:
        "نگاهی به تحول معماری مدرن در ایران و تأثیر آن بر طراحی ساختمان‌های معاصر",
      content: "معماری مدرن در ایران تحولات بسیار زیادی را طی کرده است...",
      category: "architecture",
      author: "مهندس احمدی",
      date: "۱۴۰۳/۱۲/۱۰",
      readTime: "۸ دقیقه",
      image: "/image/slider/1.webp",
      tags: ["معماری مدرن", "طراحی", "ایران"],
    },
    {
      id: 2,
      title: "نکات طلایی برای طراحی داخلی مینیمال",
      excerpt:
        "چگونه فضای خانه را با کمترین وسایل به زیباترین شکل ممکن طراحی کنیم",
      content: "طراحی مینیمال یکی از محبوب‌ترین سبک‌های طراحی داخلی است...",
      category: "interior",
      author: "مریم صالحی",
      date: "۱۴۰۳/۱۲/۰۸",
      readTime: "۶ دقیقه",
      image: "/image/slider/3.webp",
      tags: ["مینیمال", "طراحی داخلی", "دکوراسیون"],
    },
    {
      id: 3,
      title: "استفاده از نور طبیعی در معماری",
      excerpt:
        "تکنیک‌های مختلف برای بهره‌برداری بهتر از نور طبیعی در طراحی ساختمان",
      content: "نور طبیعی یکی از مهم‌ترین عناصر در طراحی معماری است...",
      category: "architecture",
      author: "دکتر رضایی",
      date: "۱۴۰۳/۱۲/۰۵",
      readTime: "۱۰ دقیقه",
      image: "/image/slider/2.jpeg",
      tags: ["نور طبیعی", "معماری", "طراحی"],
    },
    {
      id: 4,
      title: "ترندهای رنگ‌بندی در دکوراسیون ۲۰۲۵",
      excerpt: "آشنایی با جدیدترین ترندهای رنگ برای طراحی داخلی در سال آینده",
      content: "رنگ‌ها در طراحی داخلی نقش بسیار مهمی دارند...",
      category: "trends",
      author: "سارا احمدی",
      date: "۱۴۰۳/۱۲/۰۲",
      readTime: "۵ دقیقه",
      image: "/image/slider/4.jpeg",
      tags: ["رنگ", "ترند", "دکوراسیون"],
    },
    {
      id: 5,
      title: "راهنمای انتخاب مبلمان مناسب",
      excerpt: "نکات مهم برای انتخاب مبلمان متناسب با فضا و سلیقه شخصی",
      content:
        "انتخاب مبلمان مناسب می‌تواند تأثیر بسیار زیادی بر زیبایی خانه داشته باشد...",
      category: "tips",
      author: "علی موسوی",
      date: "۱۴۰۳/۱۱/۲۸",
      readTime: "۷ دقیقه",
      image: "/image/slider/3.webp",
      tags: ["مبلمان", "انتخاب", "طراحی داخلی"],
    },
    {
      id: 6,
      title: "معماری پایدار و محیط زیست",
      excerpt: "اهمیت معماری سبز و تأثیر آن بر محیط زیست و کیفیت زندگی",
      content: "معماری پایدار یکی از مهم‌ترین چالش‌های معماری معاصر است...",
      category: "architecture",
      author: "مهندس کریمی",
      date: "۱۴۰۳/۱۱/۲۵",
      readTime: "۹ دقیقه",
      image: "/image/slider/1.webp",
      tags: ["معماری پایدار", "محیط زیست", "معماری سبز"],
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          pageName="وبلاگ"
          title="معماری"
          description="مقالات تخصصی، راهنماها و آخرین اخبار دنیای معماری و طراحی"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-96 object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-4xl mx-auto px-8 text-white">
                <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm mb-4 inline-block">
                  {
                    categories.find((cat) => cat.id === featuredPost.category)
                      ?.name
                  }
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-xl text-gray-200 mb-6 max-w-2xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-6 space-x-reverse text-gray-300">
                  <div className="flex items-center">
                    <Icon name="User" className="w-4 h-4 ml-2" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center">
                    <Icon name="Calendar" className="w-4 h-4 ml-2" />
                    {featuredPost.date}
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <div className="mb-12">
              <div className="relative mb-6">
                <Icon
                  name="Search"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                />
                <Input
                  type="text"
                  placeholder="جستجو در مقالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-yellow-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              {filteredPosts.slice(1).map((post, index) => (
                <Card
                  key={index}
                  post={post}
                  categories={categories}
                  type="blog"
                />
              ))}
            </motion.div>

            {filteredPosts.length > 6 && (
              <div className="text-center">
                <Button
                  title="مقالات بیشتر"
                  className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                />
              </div>
            )}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-xl text-gray-500">
                  هیچ مقاله‌ای با این معیارها پیدا نشد.
                </p>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  آخرین مقالات
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex space-x-3 space-x-reverse group cursor-pointer"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {post.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  برچسب‌های محبوب
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(posts.flatMap((post) => post.tags))].map(
                    (tag, index) => (
                      <Button
                        title={tag}
                        key={index}
                        className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-yellow-600 hover:text-white transition-colors"
                        onClick={() => setSearchTerm(tag)}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="bg-yellow-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-2">خبرنامه ما</h3>
                <p className="text-yellow-100 mb-4 text-sm">
                  از آخرین مقالات و اخبار معماری با خبر شوید
                </p>
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="ایمیل شما"
                    className="w-full px-3 py-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <Button
                    title="عضویت"
                    className="w-full bg-white text-yellow-600 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
