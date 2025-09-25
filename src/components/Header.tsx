import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  // State management for mobile menu and search
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation items with dropdown structure
  const navItems = [
    {
      name: 'Women',
      dropdownItems: ['Handbags', 'Ready-to-Wear', 'Shoes', 'Accessories', 'Watches & Jewelry']
    },
    {
      name: 'Men',
      dropdownItems: ['Bags', 'Ready-to-Wear', 'Shoes', 'Accessories', 'Watches & Jewelry']
    },
    {
      name: 'Bags',
      dropdownItems: ['Handbags', 'Shoulder Bags', 'Clutches', 'Travel Bags', 'Business Bags']
    },
    {
      name: 'Shoes',
      dropdownItems: ['Sneakers', 'Loafers', 'Boots', 'Heels', 'Sandals']
    },
    {
      name: 'Accessories',
      dropdownItems: ['Scarves', 'Belts', 'Sunglasses', 'Small Leather Goods', 'Technology']
    },
    {
      name: 'Gifts',
      dropdownItems: ['For Her', 'For Him', 'Gift Cards', 'Personalization', 'Gift Guide']
    }
  ];

  // Scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-luxury ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-elegant' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - Left Side */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-2xl font-playfair font-bold text-luxury-gold tracking-wider">
              LOUIS VUITTON
            </h1>
          </motion.div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <motion.button
                  className="text-foreground hover:text-luxury-gold transition-luxury font-montserrat font-medium"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.button>
                
                {/* Dropdown Menu */}
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-background shadow-luxury rounded-lg p-6 min-w-48 border border-border">
                    {item.dropdownItems.map((dropdownItem, idx) => (
                      <motion.a
                        key={dropdownItem}
                        href="#"
                        className="block py-2 text-sm text-muted-foreground hover:text-luxury-gold transition-luxury"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {dropdownItem}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            
            {/* Search */}
            <div className="relative">
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.div
                    className="flex items-center"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-3 py-2 bg-transparent border-b border-luxury-gold focus:outline-none text-foreground placeholder-muted-foreground"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsSearchOpen(false)}
                      className="ml-2 hover:text-luxury-gold"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(true)}
                    className="hover:text-luxury-gold transition-luxury"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </AnimatePresence>
            </div>

            {/* Account */}
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-luxury-gold transition-luxury"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Shopping Bag */}
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-luxury-gold transition-luxury relative"
            >
              <ShoppingBag className="h-5 w-5" />
              <motion.span
                className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black text-xs rounded-full h-4 w-4 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                2
              </motion.span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:text-luxury-gold transition-luxury"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-20 bg-background z-40"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 space-y-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <h3 className="text-lg font-playfair font-semibold text-luxury-gold mb-3">
                    {item.name}
                  </h3>
                  <div className="space-y-2 pl-4">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem}
                        href="#"
                        className="block text-muted-foreground hover:text-luxury-gold transition-luxury"
                      >
                        {dropdownItem}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;