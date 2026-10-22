import { motion } from "framer-motion";
export default function VoidBackground() {
  return <motion.div aria-hidden className="fixed inset-0 -z-10" style={{ background: "radial-gradient(60% 50% at 50% 40%, #3b1470 0%, #150826 55%, #070312 100%)" }} animate={{ opacity: [0.9, 1, 0.9] }} transition={{ duration: 8, repeat: Infinity }} />;
}
