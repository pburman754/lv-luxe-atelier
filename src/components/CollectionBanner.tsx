import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Import hero images for banners
import heroBags from '@/assets/hero-bags.jpg';
import heroFashion from '@/assets/hero-fashion.jpg';

const CollectionBanner = () => {
  // Banner sections data
  const banners = [
    {
      id: 1,
      image: heroBags,
      title: 'The Art of Travel',
      subtitle: 'Iconic Luggage Collection',
      description: 'Explore our legendary travel pieces, where tradition meets innovation in every stitch and detail.',
      cta: 'Discover Travel',
      layout: 'left', // text on left, image on right
      theme: 'dark'
    },
    {
      id: 2,
      image: heroFashion,
      title: 'Seasonal Elegance',
      subtitle: 'Spring Summer 2024',
      description: 'Embrace the season with pieces that capture the essence of luxury and contemporary sophistication.',
      cta: 'Shop Collection',
      layout: 'right', // text on right, image on left
      theme: 'light'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const textVariantsRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2
      }
    }
  };

  return (
    <section className="py-16 lg:py-24">
      {banners.map((banner, index) => (
        <motion.div
          key={banner.id}
          className={`relative min-h-screen flex items-center ${
            banner.theme === 'dark' 
              ? 'bg-luxury-black text-luxury-white' 
              : 'bg-luxury-beige text-luxury-black'
          } ${index > 0 ? 'mt-16 lg:mt-24' : ''}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
              banner.layout === 'right' ? 'lg:grid-flow-col-dense' : ''
            }`}>
              
              {/* Text Content */}
              <motion.div
                className={`space-y-8 ${
                  banner.layout === 'right' 
                    ? 'lg:col-start-2 lg:text-right' 
                    : 'lg:text-left'
                }`}
                variants={banner.layout === 'right' ? textVariantsRight : textVariants}
              >
                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="text-luxury-gold font-montserrat font-light text-sm lg:text-base tracking-widest uppercase">
                    {banner.subtitle}
                  </span>
                </motion.div>

                {/* Main Title */}
                <motion.h2
                  className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {banner.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  className={`text-lg lg:text-xl font-montserrat font-light leading-relaxed max-w-lg ${
                    banner.layout === 'right' ? 'lg:ml-auto' : ''
                  } ${
                    banner.theme === 'dark' 
                      ? 'text-luxury-white/80' 
                      : 'text-muted-foreground'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {banner.description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Button
                    size="lg"
                    className={`${
                      banner.theme === 'dark'
                        ? 'bg-transparent border-2 border-luxury-white text-luxury-white hover:bg-luxury-white hover:text-luxury-black'
                        : 'bg-luxury-black text-luxury-white hover:bg-luxury-gold hover:text-luxury-black border-2 border-luxury-black hover:border-luxury-gold'
                    } transition-luxury font-montserrat font-medium px-8 py-4 text-base`}
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {banner.cta}
                    </motion.span>
                  </Button>
                </motion.div>

                {/* Decorative Element */}
                <motion.div
                  className={`w-20 h-px ${
                    banner.theme === 'dark' ? 'bg-luxury-gold' : 'bg-luxury-black'
                  } ${banner.layout === 'right' ? 'lg:ml-auto' : ''}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>

              {/* Image Content */}
              <motion.div
                className={`relative ${
                  banner.layout === 'right' ? 'lg:col-start-1' : ''
                }`}
                variants={imageVariants}
              >
                <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-lg">
                  {/* Main Image */}
                  <motion.img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/20 to-transparent" />
                  
                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-20 h-20 bg-luxury-gold/20 rounded-full blur-xl"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className="absolute -bottom-6 -left-6 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl"
                    animate={{
                      y: [0, 15, 0],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>

                {/* Image Caption */}
                <motion.div
                  className="absolute bottom-6 left-6 bg-luxury-white/90 backdrop-blur-sm px-4 py-2 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <p className="text-luxury-black font-montserrat text-sm font-medium">
                    Crafted Excellence
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-current rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-current rounded-full" />
          </div>

          {/* Parallax Background Elements */}
          <motion.div
            className="absolute top-20 right-20 w-2 h-2 bg-luxury-gold rounded-full hidden lg:block"
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-32 left-16 w-1 h-1 bg-luxury-gold rounded-full hidden lg:block"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </motion.div>
      ))}
    </section>
  );
};

export default CollectionBanner;