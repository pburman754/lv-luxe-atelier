import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import hero images
import heroBags from '@/assets/hero-bags.jpg';
import heroFashion from '@/assets/hero-fashion.jpg';
import heroJewelry from '@/assets/hero-jewelry.jpg';

const Hero = () => {
  // Carousel slides data
  const slides = [
    {
      id: 1,
      image: heroBags,
      title: 'Iconic Handbags',
      subtitle: 'Discover the artistry of luxury leather craftsmanship',
      cta: 'Explore Collection',
      overlayPosition: 'left'
    },
    {
      id: 2,
      image: heroFashion,
      title: 'Ready-to-Wear',
      subtitle: 'Timeless elegance meets contemporary design',
      cta: 'Shop Now',
      overlayPosition: 'center'
    },
    {
      id: 3,
      image: heroJewelry,
      title: 'Fine Jewelry',
      subtitle: 'Exceptional pieces that define luxury',
      cta: 'View Collection',
      overlayPosition: 'right'
    }
  ];

  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Text overlay position classes
  const getOverlayPosition = (position: string) => {
    switch (position) {
      case 'left':
        return 'items-start text-left pl-8 lg:pl-16';
      case 'right':
        return 'items-end text-right pr-8 lg:pr-16';
      default:
        return 'items-center text-center';
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-black">
      {/* Slide Container */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Background Image with Parallax Effect */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "linear" }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/70 via-transparent to-luxury-black/70" />
            
            {/* Content Overlay */}
            <div className={`absolute inset-0 flex flex-col justify-center ${getOverlayPosition(slides[currentSlide].overlayPosition)} px-4 lg:px-8`}>
              <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              >
                {/* Subtitle */}
                <motion.p
                  className="text-luxury-gold font-montserrat font-light text-sm lg:text-base tracking-widest uppercase mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Main Title */}
                <motion.h1
                  className="text-luxury-white font-playfair text-4xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <Button
                    size="lg"
                    className="bg-transparent border-2 border-luxury-white text-luxury-white hover:bg-luxury-white hover:text-luxury-black transition-luxury font-montserrat font-medium px-8 py-4 text-base"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {slides[currentSlide].cta}
                    </motion.span>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 lg:px-8 pointer-events-none">
        <motion.button
          onClick={prevSlide}
          className="pointer-events-auto bg-luxury-black/20 hover:bg-luxury-black/40 text-luxury-white p-3 rounded-full backdrop-blur-sm transition-luxury"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
        
        <motion.button
          onClick={nextSlide}
          className="pointer-events-auto bg-luxury-black/20 hover:bg-luxury-black/40 text-luxury-white p-3 rounded-full backdrop-blur-sm transition-luxury"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-luxury ${
              currentSlide === index 
                ? 'w-8 bg-luxury-gold' 
                : 'w-2 bg-luxury-white/50 hover:bg-luxury-white/80'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-luxury-gold"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 5, ease: "linear", repeat: Infinity }}
        key={currentSlide}
      />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 text-luxury-white/60 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-montserrat tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-luxury-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;