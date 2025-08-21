import { motion } from "framer-motion";
import { Ielements } from "../types/ui";

const FloatingElements = () => {
  const elements: Ielements[] = [
    {
      id: 1,
      type: "circle",
      size: "w-20 h-20",
      color: "bg-yellow-500/10",
      position: "top-20 right-10",
      animation: { y: [0, -20, 0], rotate: [0, 180, 360] },
      duration: 6,
    },
    {
      id: 2,
      type: "square",
      size: "w-16 h-16",
      color: "bg-gray-900/10",
      position: "bottom-20 left-10",
      animation: { y: [0, 15, 0], rotate: [0, -90, -180] },
      duration: 8,
    },
    {
      id: 3,
      type: "triangle",
      size: "w-12 h-12",
      color: "bg-blue-500/10",
      position: "top-1/3 left-20",
      animation: { x: [0, 10, 0], scale: [1, 1.2, 1] },
      duration: 7,
    },
    {
      id: 4,
      type: "circle",
      size: "w-8 h-8",
      color: "bg-green-500/10",
      position: "bottom-1/3 right-20",
      animation: { y: [0, -15, 0], opacity: [0.5, 1, 0.5] },
      duration: 5,
    },
    {
      id: 5,
      type: "diamond",
      size: "w-14 h-14",
      color: "bg-purple-500/10",
      position: "top-1/2 left-1/4",
      animation: { rotate: [0, 45, 90, 135, 180], scale: [1, 1.1, 1] },
      duration: 10,
    },
  ];

  const renderShape = (element: Ielements) => {
    switch (element.type) {
      case "circle":
        return (
          <div className={`${element.size} ${element.color} rounded-full`} />
        );
      case "square":
        return (
          <div className={`${element.size} ${element.color} rounded-lg`} />
        );
      default:
        return (
          <div className={`${element.size} ${element.color} rounded-full`} />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.position}`}
          animate={element.animation}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderShape(element)}
        </motion.div>
      ))}

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-yellow-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
