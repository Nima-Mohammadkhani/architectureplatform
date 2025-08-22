import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/ui/card";
import { Icategories, Iprojects } from "../types/ui";
import Icon from "../components/ui/Icon";
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
      image:
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "طراحی ویلای مدرن با استفاده از مصالح محلی و معماری معاصر",
      gallery: [
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: 2,
      title: "مجتمع تجاری مرکزی",
      category: "commercial",
      area: "2500 متر مربع",
      year: "2023",
      location: "تهران",
      image:
        "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "طراحی مجتمع تجاری با رویکرد پایدار و انرژی سبز",
      gallery: [
        "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: 3,
      title: "آپارتمان مینیمال",
      category: "interior",
      area: "120 متر مربع",
      year: "2024",
      location: "تهران",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "طراحی داخلی مینیمال با تأکید بر نور طبیعی",
      gallery: [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: 4,
      title: "مفهوم فضای کاری آینده",
      category: "conceptual",
      area: "800 متر مربع",
      year: "2024",
      location: "طراحی مفهومی",
      image:
        "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "طراحی مفهومی برای فضای کاری هوشمند و انطباق‌پذیر",
      gallery: [
        "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: 5,
      title: "خانه باغ سنتی-مدرن",
      category: "residential",
      area: "350 متر مربع",
      year: "2023",
      location: "اصفهان",
      image:
        "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "ترکیب معماری سنتی ایرانی با عناصر مدرن",
      gallery: [
        "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: 6,
      title: "رستوران بوتیک",
      category: "commercial",
      area: "200 متر مربع",
      year: "2023",
      location: "شیراز",
      image:
        "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "طراحی داخلی رستوران با الهام از فرهنگ محلی",
      gallery: [
        "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
            گالری <span className="text-yellow-600">پروژه‌ها</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            مجموعه‌ای از بهترین پروژه‌های معماری و طراحی داخلی ما
          </p>
        </motion.div>

        <div className="mb-12">
          <div className="relative mb-8">
            <Icon
              name="Search"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <input
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 left-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <Icon name="X" className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div>
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>

                  <div className="p-8">
                    <div className="mb-4">
                      <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">
                        {
                          categories.find(
                            (cat) => cat.id === selectedProject.category
                          )?.name
                        }
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {selectedProject.title}
                    </h2>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-500">مساحت:</span>
                        <span className="font-medium">
                          {selectedProject.area}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">سال اجرا:</span>
                        <span className="font-medium">
                          {selectedProject.year}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">موقعیت:</span>
                        <span className="font-medium">
                          {selectedProject.location}
                        </span>
                      </div>
                    </div>

                    {selectedProject.gallery &&
                      selectedProject.gallery.length > 1 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">
                            تصاویر بیشتر
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedProject.gallery
                              .slice(1)
                              .map((img, index) => (
                                <img
                                  key={index}
                                  src={img}
                                  alt=""
                                  className="w-full h-20 object-cover rounded"
                                />
                              ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
