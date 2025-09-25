import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter, Youtube, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  // State for mobile collapsible sections
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Footer sections data
  const footerSections = [
    {
      id: 'services',
      title: 'Client Services',
      links: [
        'Contact Us',
        'My Account',
        'Find a Store',
        'Size Guide',
        'Care & Repair',
        'Art of Gifting'
      ]
    },
    {
      id: 'company',
      title: 'The Company',
      links: [
        'Careers',
        'Fashion Shows',
        'Arts & Culture',
        'Sustainability',
        'Press',
        'Investor Relations'
      ]
    },
    {
      id: 'collections',
      title: 'Collections',
      links: [
        'Women',
        'Men',
        'Bags',
        'Small Leather Goods',
        'Shoes',
        'Accessories'
      ]
    },
    {
      id: 'legal',
      title: 'Legal',
      links: [
        'Terms of Sale',
        'Privacy Policy',
        'Cookie Policy',
        'Accessibility',
        'Do Not Sell My Info',
        'California Transparency'
      ]
    }
  ];

  // Social media links
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Youtube', icon: Youtube, href: '#' }
  ];

  // Toggle mobile section
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-luxury-black text-luxury-white">
      
      {/* Newsletter Section */}
      <div className="border-b border-luxury-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl lg:text-4xl font-playfair font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Stay Connected
            </motion.h2>
            
            <motion.p
              className="text-luxury-white/80 font-montserrat text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Be the first to discover our latest collections, exclusive events, and luxury insights
            </motion.p>

            <motion.form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-luxury-white/10 border-luxury-white/20 text-luxury-white placeholder-luxury-white/60 focus:border-luxury-gold focus:ring-luxury-gold"
                required
              />
              <Button
                type="submit"
                className="bg-luxury-gold text-luxury-black hover:bg-luxury-gold-light transition-luxury font-montserrat font-medium px-8"
                disabled={isSubscribed}
              >
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.h3
              className="text-2xl font-playfair font-bold text-luxury-gold mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              LOUIS VUITTON
            </motion.h3>
            
            <div className="space-y-4 text-luxury-white/80 font-montserrat">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <p>Champs-Élysées</p>
                  <p>Paris, France</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-luxury-gold flex-shrink-0" />
                <p>+33 1 40 70 00 00</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-luxury-gold flex-shrink-0" />
                <p>contact@louisvuitton.com</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="font-montserrat font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="bg-luxury-white/10 hover:bg-luxury-gold hover:text-luxury-black p-2 rounded-full transition-luxury"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                {/* Desktop Headers */}
                <h4 className="hidden md:block font-montserrat font-semibold text-luxury-white mb-6">
                  {section.title}
                </h4>

                {/* Mobile Collapsible Headers */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="md:hidden w-full flex items-center justify-between font-montserrat font-semibold text-luxury-white py-4 border-b border-luxury-white/10"
                >
                  {section.title}
                  {openSections.includes(section.id) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                {/* Links */}
                <motion.div
                  className={`space-y-3 ${
                    openSections.includes(section.id) || window.innerWidth >= 768
                      ? 'block'
                      : 'hidden md:block'
                  }`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openSections.includes(section.id) || window.innerWidth >= 768 ? 'auto' : 0,
                    opacity: openSections.includes(section.id) || window.innerWidth >= 768 ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {section.links.map((link, linkIndex) => (
                    <motion.a
                      key={link}
                      href="#"
                      className="block text-luxury-white/70 hover:text-luxury-gold transition-luxury font-montserrat py-1"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      style={{ 
                        transitionDelay: `${linkIndex * 50}ms` 
                      }}
                    >
                      {link}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-luxury-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 text-luxury-white/60 font-montserrat text-sm">
              <p>&copy; 2024 Louis Vuitton. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-luxury-gold transition-luxury">
                  Privacy
                </a>
                <span>|</span>
                <a href="#" className="hover:text-luxury-gold transition-luxury">
                  Terms
                </a>
                <span>|</span>
                <a href="#" className="hover:text-luxury-gold transition-luxury">
                  Cookies
                </a>
              </div>
            </div>

            <motion.div
              className="flex items-center space-x-2 text-luxury-white/60 font-montserrat text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span>Crafted with</span>
              <motion.span
                className="text-luxury-gold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ♥
              </motion.span>
              <span>in Paris</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;