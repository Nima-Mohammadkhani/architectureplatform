import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/ui/card";
import { Icategories, Iprojects } from "../types/ui";
import Icon from "../components/ui/Icon";
import Input from "../components/ui/Input";
import PageHeader from "../components/ui/pageHeader";
import Button from "../components/ui/Button";
import GalleryModal from "../components/galleyModal";
const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Iprojects | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categories: Icategories[] = [
    { id: "all", name: "همه پروژه‌ها" },
    { id: "residential", name: "مسکونی" },
    { id: "commercial", name: "تجاری" },
    { id: "interior", name: "دکوراسیون داخلی" },
    { id: "conceptual", name: "طراحی مفهومی" },
  ];

  const projects: Iprojects[] = [
    {
      id: 1,
      title: "ویلای مدرن شمال",
      category: "residential",
      area: "450 متر مربع",
      year: "2024",
      location: "شمال ایران",
      image: "/image/slider/1.webp",
      description: "طراحی ویلای مدرن با استفاده از مصالح محلی و معماری معاصر",
      gallery: [
        "/image/slider/1.webp",
        "/image/slider/2.jpeg",
        "/image/slider/3.webp",
      ],
    },
    {
      id: 2,
      title: "مجتمع تجاری مرکزی",
      category: "commercial",
      area: "2500 متر مربع",
      year: "2023",
      location: "تهران",
      image: "/image/slider/4.jpeg",
      description: "طراحی مجتمع تجاری با رویکرد پایدار و انرژی سبز",
      gallery: ["/image/slider/4.jpeg", "/image/slider/1.webp"],
    },
    {
      id: 3,
      title: "آپارتمان مینیمال",
      category: "interior",
      area: "120 متر مربع",
      year: "2024",
      location: "تهران",
      image: "/image/slider/2.jpeg",
      description: "طراحی داخلی مینیمال با تأکید بر نور طبیعی",
      gallery: ["/image/slider/2.jpeg", "/image/slider/3.webp"],
    },
    {
      id: 4,
      title: "مفهوم فضای کاری آینده",
      category: "conceptual",
      area: "800 متر مربع",
      year: "2024",
      location: "طراحی مفهومی",
      image: "/image/slider/3.webp",
      description: "طراحی مفهومی برای فضای کاری هوشمند و انطباق‌پذیر",
      gallery: ["/image/slider/3.webp", "/image/slider/1.webp"],
    },
    {
      id: 5,
      title: "خانه باغ سنتی-مدرن",
      category: "residential",
      area: "350 متر مربع",
      year: "2023",
      location: "اصفهان",
      image: "/image/slider/1.webp",
      description: "ترکیب معماری سنتی ایرانی با عناصر مدرن",
      gallery: ["/image/slider/1.webp", "/image/slider/1.webp"],
    },
    {
      id: 6,
      title: "رستوران بوتیک",
      category: "commercial",
      area: "200 متر مربع",
      year: "2023",
      location: "شیراز",
      image: "/image/slider/3.webp",
      description: "طراحی داخلی رستوران با الهام از فرهنگ محلی",
      gallery: ["/image/slider/3.webp"],
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          pageName="گالری"
          title="پروژه‌ها"
          description="مجموعه‌ای از بهترین پروژه‌های معماری و طراحی داخلی ما"
        />

        <div className="mb-12">
          <div className="relative mb-8">
            <Icon
              name="Search"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <Input
              type="text"
              placeholder="جستجو در پروژه‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                project={project}
                index={index}
                type="gallery"
                categories={categories}
                setSelectedProject={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-500">
              هیچ پروژه‌ای با این معیارها پیدا نشد.
            </p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <GalleryModal
            selectedProject={selectedProject}
            categories={categories}
            setSelectedProject={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
