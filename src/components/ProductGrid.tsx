import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import product images
import productBag1 from '@/assets/product-bag-1.jpg';
import productWallet from '@/assets/product-wallet.jpg';
import productShoes from '@/assets/product-shoes.jpg';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

interface ProductGridProps {
  onQuickView?: (product: Product) => void;
}

const ProductGrid = ({ onQuickView }: ProductGridProps) => {
  // Sample product data
  const products: Product[] = [
    {
      id: 1,
      name: 'Neverfull MM',
      price: '$1,750',
      image: productBag1,
      category: 'Handbags',
      isNew: true
    },
    {
      id: 2,
      name: 'Zippy Wallet',
      price: '$835',
      originalPrice: '$920',
      image: productWallet,
      category: 'Small Leather Goods',
      isOnSale: true
    },
    {
      id: 3,
      name: 'Archlight Sneaker',
      price: '$1,090',
      image: productShoes,
      category: 'Shoes'
    },
    {
      id: 4,
      name: 'Twist MM',
      price: '$4,400',
      image: productBag1,
      category: 'Handbags',
      isNew: true
    },
    {
      id: 5,
      name: 'Multiple Wallet',
      price: '$665',
      image: productWallet,
      category: 'Small Leather Goods'
    },
    {
      id: 6,
      name: 'Run Away Sneaker',
      price: '$890',
      originalPrice: '$990',
      image: productShoes,
      category: 'Shoes',
      isOnSale: true
    }
  ];

  // State for wishlist
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Toggle wishlist
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-luxury-beige">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-playfair font-bold text-luxury-black mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Featured Collections
          </motion.h2>
          <motion.p
            className="text-muted-foreground font-montserrat text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover our most coveted pieces, crafted with exceptional savoir-faire and timeless elegance
          </motion.p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative bg-background rounded-lg overflow-hidden shadow-elegant hover:shadow-luxury transition-all duration-500"
              whileHover={{ y: -8 }}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <motion.span
                      className="bg-luxury-gold text-luxury-black px-3 py-1 text-xs font-montserrat font-semibold uppercase tracking-wide"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      New
                    </motion.span>
                  )}
                  {product.isOnSale && (
                    <motion.span
                      className="bg-destructive text-destructive-foreground px-3 py-1 text-xs font-montserrat font-semibold uppercase tracking-wide"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Sale
                    </motion.span>
                  )}
                </div>

                {/* Wishlist Button */}
                <motion.button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-luxury-white/90 rounded-full hover:bg-luxury-white transition-luxury shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      wishlist.includes(product.id)
                        ? 'fill-destructive text-destructive'
                        : 'text-muted-foreground'
                    }`}
                  />
                </motion.button>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-luxury-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="flex space-x-3">
                    <motion.button
                      onClick={() => onQuickView?.(product)}
                      className="bg-luxury-white text-luxury-black p-3 rounded-full hover:bg-luxury-gold transition-luxury shadow-lg"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Eye className="h-5 w-5" />
                    </motion.button>
                    
                    <motion.button
                      className="bg-luxury-white text-luxury-black p-3 rounded-full hover:bg-luxury-gold transition-luxury shadow-lg"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Product Information */}
              <div className="p-6">
                {/* Category */}
                <motion.p
                  className="text-luxury-gold font-montserrat text-sm font-medium uppercase tracking-wide mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {product.category}
                </motion.p>

                {/* Product Name */}
                <motion.h3
                  className="font-playfair text-xl font-semibold text-luxury-black mb-3 group-hover:text-luxury-gold transition-luxury"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {product.name}
                </motion.h3>

                {/* Price */}
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-xl font-montserrat font-bold text-luxury-black">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground font-montserrat line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </motion.div>

                {/* Add to Cart Button */}
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    className="w-full bg-luxury-black text-luxury-white hover:bg-luxury-gold hover:text-luxury-black transition-luxury font-montserrat font-medium"
                    size="lg"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Add to Cart
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-luxury-white transition-luxury font-montserrat font-medium px-12 py-4"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              View All Products
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;