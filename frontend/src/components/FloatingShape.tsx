import { motion } from "framer-motion";
import React from "react";

interface FloatingShapeProps {
  color: string;
  size: string;
  top: number | string;
  left: number | string;
  delay?: number;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({ color, size, top, left, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
    style={{ top, left }}
    animate={{ y: ["0%", "100%", "0%"], x: ["0%", "100%", "0%"], rotate: [0, 360] }}
    transition={{ duration: 20, ease: "linear", repeat: Infinity, delay }}
  />
);

export default FloatingShape;
