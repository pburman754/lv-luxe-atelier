import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Plus, Minus, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  // Modal state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sample product images (in real app, would come from product data)
  const productImages = product ? [product.image, product.image, product.image] : [];
  
  // Sample sizes
  const sizes = ['Small', 'Medium', 'Large'];
  
  // Sample product details
  const productDetails = {
    description: 'Crafted from the finest materials with meticulous attention to detail, this piece embodies the essence of luxury and timeless elegance.',
    features: [
      'Premium leather construction',
      'Gold-tone hardware',
      'Interior compartments',
      'Dust bag included',
      'Lifetime craftsmanship guarantee'
    ],
    materials: 'Epi Leather, Textile Lining',
    dimensions: '31.0 x 28.0 x 14.0 cm',
    care: 'Clean with soft, dry cloth. Avoid exposure to water and direct sunlight.'
  };

  // Navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // Quantity handlers
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Close modal on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-luxury-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-luxury"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Left Side - Product Images */}
              <div className="relative bg-luxury-beige">
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 bg-luxury-white/90 hover:bg-luxury-white p-2 rounded-full transition-luxury shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5 text-luxury-black" />
                </motion.button>

                {/* Main Image */}
                <div className="relative aspect-square">
                  <motion.img
                    key={currentImageIndex}
                    src={productImages[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Image Navigation */}
                  {productImages.length > 1 && (
                    <>
                      <motion.button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-luxury-white/90 hover:bg-luxury-white p-2 rounded-full transition-luxury shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft className="h-5 w-5 text-luxury-black" />
                      </motion.button>
                      
                      <motion.button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-luxury-white/90 hover:bg-luxury-white p-2 rounded-full transition-luxury shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight className="h-5 w-5 text-luxury-black" />
                      </motion.button>
                    </>
                  )}

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-luxury ${
                          currentImageIndex === index 
                            ? 'bg-luxury-gold' 
                            : 'bg-luxury-white/50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isNew && (
                      <span className="bg-luxury-gold text-luxury-black px-3 py-1 text-xs font-montserrat font-semibold uppercase tracking-wide">
                        New
                      </span>
                    )}
                    {product.isOnSale && (
                      <span className="bg-destructive text-destructive-foreground px-3 py-1 text-xs font-montserrat font-semibold uppercase tracking-wide">
                        Sale
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Product Details */}
              <div className="p-8 overflow-y-auto max-h-[90vh]">
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  
                  {/* Product Header */}
                  <div>
                    <p className="text-luxury-gold font-montserrat text-sm font-medium uppercase tracking-wide mb-2">
                      {product.category}
                    </p>
                    <h2 className="text-3xl font-playfair font-bold text-luxury-black mb-4">
                      {product.name}
                    </h2>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl font-montserrat font-bold text-luxury-black">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground font-montserrat line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground font-montserrat leading-relaxed">
                      {productDetails.description}
                    </p>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <h3 className="font-montserrat font-semibold text-luxury-black mb-3">
                      Size
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <motion.button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border-2 font-montserrat font-medium transition-luxury ${
                            selectedSize === size
                              ? 'border-luxury-gold bg-luxury-gold text-luxury-black'
                              : 'border-border text-muted-foreground hover:border-luxury-gold'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h3 className="font-montserrat font-semibold text-luxury-black mb-3">
                      Quantity
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <motion.button
                          onClick={decreaseQuantity}
                          className="p-2 hover:bg-muted transition-luxury"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus className="h-4 w-4" />
                        </motion.button>
                        <span className="px-4 py-2 font-montserrat font-medium min-w-[3rem] text-center">
                          {quantity}
                        </span>
                        <motion.button
                          onClick={increaseQuantity}
                          className="p-2 hover:bg-muted transition-luxury"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-luxury-black text-luxury-white hover:bg-luxury-gold hover:text-luxury-black transition-luxury font-montserrat font-medium"
                      disabled={!selectedSize}
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-2 border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-luxury-white transition-luxury font-montserrat font-medium"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                      {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </Button>
                  </div>

                  {/* Product Details */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <div>
                      <h4 className="font-montserrat font-semibold text-luxury-black mb-2">
                        Features
                      </h4>
                      <ul className="space-y-1 text-muted-foreground font-montserrat text-sm">
                        {productDetails.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-luxury-gold rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      <div>
                        <span className="font-montserrat font-semibold text-luxury-black">Materials: </span>
                        <span className="text-muted-foreground font-montserrat">
                          {productDetails.materials}
                        </span>
                      </div>
                      <div>
                        <span className="font-montserrat font-semibold text-luxury-black">Dimensions: </span>
                        <span className="text-muted-foreground font-montserrat">
                          {productDetails.dimensions}
                        </span>
                      </div>
                      <div>
                        <span className="font-montserrat font-semibold text-luxury-black">Care: </span>
                        <span className="text-muted-foreground font-montserrat">
                          {productDetails.care}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;