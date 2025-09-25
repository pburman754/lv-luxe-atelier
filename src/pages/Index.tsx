import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import CollectionBanner from '@/components/CollectionBanner';
import QuickViewModal from '@/components/QuickViewModal';
import Footer from '@/components/Footer';

// Product interface for modal
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

const Index = () => {
  // State for quick view modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle quick view
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Featured Products */}
        <ProductGrid onQuickView={handleQuickView} />

        {/* Collection Banners */}
        <CollectionBanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </motion.div>
  );
};

export default Index;
