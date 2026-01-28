import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4 group">
              <img 
                src="/W&N Logo.png" 
                alt="W&N Insurance Logo" 
                className="w-24 h-24 object-contain group-hover:scale-110 transition-transform drop-shadow-lg"
              />
              
            </div>
            <p className="text-sm max-w-md">
              {t('footerDescription')}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t('products')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=health" className="hover:text-white transition">{t('healthInsurance')}</Link></li>
              <li><Link to="/products?category=life" className="hover:text-white transition">{t('lifeInsurance')}</Link></li>
              <li><Link to="/products?category=auto" className="hover:text-white transition">{t('autoInsurance')}</Link></li>
              <li><Link to="/products?category=property" className="hover:text-white transition">{t('homeInsurance')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t('company')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition">{t('aboutUs')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">{t('contact')}</Link></li>
              <li><Link to="/products" className="hover:text-white transition">{t('allProducts')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} W&N Insurance. {t('allRightsReserved')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">{t('privacyPolicy')}</a>
            <a href="#" className="hover:text-white transition">{t('termsOfService')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
