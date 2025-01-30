import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface NavToggleButtonProps {
  onClick: () => void;
  isNavVisible: boolean;
  showScrollNav: boolean;
}

export default function NavToggleButton({
  onClick,
  isNavVisible,
  showScrollNav,
}: NavToggleButtonProps) {
  return (
    <motion.button
      aria-label="Toggle navigation"
      onClick={onClick}
      className="fixed left-0 top-1/2 z-20 -translate-y-1/2 bg-blue-600 text-white shadow-lg rounded-full w-12 h-12 flex flex-col items-end justify-center overflow-hidden"
      animate={{
        x: isNavVisible ? 256 : showScrollNav ? -48 : 0,
        width: isNavVisible ? 48 : 24,
        borderTopLeftRadius: isNavVisible ? 24 : 0,
        borderBottomLeftRadius: isNavVisible ? 24 : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="flex items-center justify-center w-12 h-12"
        animate={{ x: isNavVisible ? 0 : 6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {isNavVisible ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </motion.div>
    </motion.button>
  );
}
