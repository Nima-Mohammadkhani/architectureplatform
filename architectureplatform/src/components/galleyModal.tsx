import Modal from "./ui/Modal";
import { motion } from "framer-motion";
import Icon from "./ui/Icon";
import { Icategories, Iprojects } from "../types/ui";

interface GalleryModalProps {
  selectedProject: Iprojects;
  categories: Icategories[];
  setSelectedProject: (project: Iprojects | null) => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  selectedProject,
  categories,
  setSelectedProject,
}) => {
  return (
    <Modal isOpen={true} onClose={() => setSelectedProject(null)} size="xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Icon
            name="X"
            className="absolute top-0 left-0 rounded-full m-4 border bg-white w-5 h-5 text-gray-700 z-10"
            onClick={() => setSelectedProject(null)}
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 xl:h-full object-cover rounded-l-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-l-lg"></div>
            </div>

            <div className="p-6 xl:p-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="mb-4">
                <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                  {
                    categories.find(
                      (cat) => cat.id === selectedProject.category
                    )?.name
                  }
                </span>
              </div>

              <h2 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {selectedProject.title}
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed text-sm xl:text-base">
                {selectedProject.description}
              </p>

              <div className="space-y-3 mb-6 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-500 text-sm flex items-center">
                    <Icon
                      name="Square"
                      className="w-4 h-4 ml-2 text-yellow-600"
                    />
                    مساحت:
                  </span>
                  <span className="font-medium text-gray-900">
                    {selectedProject.area}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-500 text-sm flex items-center">
                    <Icon
                      name="Calendar"
                      className="w-4 h-4 ml-2 text-yellow-600"
                    />
                    سال اجرا:
                  </span>
                  <span className="font-medium text-gray-900">
                    {selectedProject.year}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-500 text-sm flex items-center">
                    <Icon
                      name="MapPin"
                      className="w-4 h-4 ml-2 text-yellow-600"
                    />
                    موقعیت:
                  </span>
                  <span className="font-medium text-gray-900">
                    {selectedProject.location}
                  </span>
                </div>
              </div>

              {selectedProject.gallery &&
                selectedProject.gallery.length > 1 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center">
                      <Icon
                        name="Image"
                        className="w-5 h-5 ml-2 text-yellow-600"
                      />
                      تصاویر بیشتر
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProject.gallery.slice(1).map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`تصویر ${index + 2} از ${selectedProject.title}`}
                          className="w-full h-24 object-cover rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default GalleryModal;
