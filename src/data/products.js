// 1. Importamos las imágenes desde la carpeta assets
import imgWallet from '../assets/images/product_leather_wallet_1793558228894.jpg';
import imgBelt from '../assets/images/product_leather_belt_1793558230384.jpg';
import imgBag from '../assets/images/product_leather_bag_1793558230519.jpg';
import imgCardholder from '../assets/images/product_leather_cardholder_1793558231155.jpg';
import imgApron from '../assets/images/product_leather_apron_1793558232510.jpg';
import imgHero from '../assets/images/hero_leather_craft_1793558229126.jpg';
import imgGalleryStitch from '../assets/images/gallery_leather_stitch_detail_1793558232652.jpg';

export const PRODUCTS = [
  {
    id: 'billetera-clasica-caramel',
    name: 'Billetera Clásica Bifold',
    category: 'Billeteras & Tarjeteros',
    description: 'Billetera de cuero vacuno en tono caramelo con costura artesanal a dos agujas, múltiples ranuras para tarjetas y compartimento para billetes.',
    image: imgWallet, // <-- Usamos la variable
    badge: '100% Cuero Genuino',
    features: ['Ranuras reforzadas', 'Hilo encerado de alta resistencia', 'Bordes pulidos y bruñidos'],
    dimensions: '11.5 cm x 9.5 cm cerrado',
    material: 'Cuero curtido al vegetal'
  },
  {
    id: 'cinturon-robusto-hebilla-bronce',
    name: 'Cinturón Clásico con Hebilla de Bronce',
    category: 'Cinturones',
    description: 'Cinturón de cuero grueso de grano entero con pátina natural y hebilla maciza de bronce envejecido. Resistente al uso diario por años.',
    image: imgBelt, // <-- Usamos la variable
    badge: 'Grano Entero Seleccionado',
    features: ['Grosor premium 3.8 - 4.0 mm', 'Hebilla de latón/bronce macizo', 'Pátina que mejora con el tiempo'],
    dimensions: 'Ancho: 3.8 cm (Largo a medida)',
    material: 'Cuero de grano entero curtido'
  },
  {
    id: 'morral-bandolera-rustico',
    name: 'Morral Bandolera Rústico',
    category: 'Bolsos & Morrales',
    description: 'Bolso bandolera de diseño artesanal con correas ajustables, cierres de hebilla metálica tradicional y amplio compartimento con carácter.',
    image: imgBag, // <-- Usamos la variable
    badge: 'Pieza Exclusiva',
    features: ['Correa con almohadilla acolchada', 'Costuras reforzadas en puntos de tensión', 'Bolsillo frontal de acceso rápido'],
    dimensions: '28 cm ancho x 22 cm alto x 9 cm fuelle',
    material: 'Cuero curtido rústico chestnut'
  },
  {
    id: 'tarjetero-minimalista-cognac',
    name: 'Tarjetero Minimalista Piel Genuina',
    category: 'Billeteras & Tarjeteros',
    description: 'Diseño ultra delgado y ergonómico para quienes prefieren ligereza. Capacidad para 6 tarjetas y compartimento central para billetes doblados.',
    image: imgCardholder, // <-- Usamos la variable
    badge: 'Compacto & Práctico',
    features: ['Perfil ultra delgado', 'Costura a mano con hilo encerado', 'Cuero suave al tacto con memoria'],
    dimensions: '10 cm x 7.5 cm',
    material: 'Cuero vacuno curtido al vegetal'
  },
  {
    id: 'delantal-artesanal-taller',
    name: 'Delantal Artesanal de Cuero para Taller / Parrilla',
    category: 'Accesorios & Taller',
    description: 'Delantal de cuero vacuno robusto con arnés cruzado en la espalda para distribuir el peso, remaches de bronce y bolsillos utilitarios.',
    image: imgApron, // <-- Usamos la variable
    badge: 'Trabajo Pesado & Parrilla',
    features: ['Correas cruzadas regulables', 'Bolsillo portaherramientas y pecho', 'Remaches de alta durabilidad'],
    dimensions: '75 cm largo x 60 cm ancho (regulable)',
    material: 'Cuero grueso seleccionado con acabado graso'
  },
  {
    id: 'bolso-tote-viajero-artesano',
    name: 'Bolso Duffle Fin de Semana',
    category: 'Bolsos & Morrales',
    description: 'Espacioso bolso de mano y hombro para viajes cortos o escapadas. Asas reforzadas con remaches dobles y detalles de marroquinería fina.',
    image: imgHero, // <-- Usamos la variable
    badge: 'Gran Capacidad',
    features: ['Herrajes metálicos reforzados', 'Cierre principal de cremallera metálica', 'Asas dobles con funda protectora'],
    dimensions: '48 cm largo x 26 cm diámetro',
    material: 'Cuero vacuno plena flor con efecto pull-up'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'g-1',
    title: 'Costura a Dos Agujas',
    subtitle: 'Técnica tradicional de guarnicionería con hilo encerado',
    image: imgGalleryStitch // <-- Usamos la variable
  },
  {
    id: 'g-2',
    title: 'Colección en Banco de Trabajo',
    subtitle: 'Nuestra línea rústica sobre madera noble',
    image: imgHero // <-- Usamos la variable
  },
  {
    id: 'g-3',
    title: 'Billetera Bifold y Texturas',
    subtitle: 'Detalle de esquinas redondeadas y pátina cálida',
    image: imgWallet // <-- Usamos la variable
  },
  {
    id: 'g-4',
    title: 'Hebilla Maciza de Bronce',
    subtitle: 'Herrajes seleccionados para durar toda una vida',
    image: imgBelt // <-- Usamos la variable
  },
  {
    id: 'g-5',
    title: 'Morral con Fuelle Estructurado',
    subtitle: 'Cortes limpios y ensamblaje manual',
    image: imgBag // <-- Usamos la variable
  },
  {
    id: 'g-6',
    title: 'Tarjetero de Bolsillo',
    subtitle: 'Proporciones exactas pensadas para el uso cotidiano',
    image: imgCardholder // <-- Usamos la variable
  }
];

export const TESTIMONIALS = [
  {
    name: 'Rodrigo Valenzuela',
    location: 'Concepción, Chile',
    text: 'Compré la billetera bifold hace varios meses y el cuero se pone cada día más lindo con la pátina. Se nota el trabajo artesanal en cada costura. 100% recomendado.',
    productConsulted: 'Billetera Bifold'
  },
  {
    name: 'Carolina Morales',
    location: 'Santiago, Chile',
    text: 'Le regalé a mi esposo el cinturón de cuero grueso con hebilla de bronce. Es de una solidez impresionante, nada que ver con los que venden en tiendas comerciales. La atención por WhatsApp fue muy rápida y amable.',
    productConsulted: 'Cinturón Clásico'
  },
  {
    name: 'Gonzalo Sepúlveda',
    location: 'Temuco, Chile',
    text: 'Excelente confección del morral bandolera. Los remaches y el grosor del cuero son de primer nivel. El envío llegó a regiones sin ningún problema.',
    productConsulted: 'Morral Bandolera Rústico'
  }
];

export const WHATSAPP_NUMBER = '56927047529';
export const WHATSAPP_DISPLAY = '+56 9 2704 7529';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=100054494468211';

export function getProductWhatsAppUrl(productName) {
  const message = `Hola Montanares Todo Cuero, me gustaría consultar por la disponibilidad de: ${productName}. ¿Me podrían dar más detalles sobre disponibilidad y envíos?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppUrl(customText) {
  const message = customText && customText.trim() 
    ? customText.trim() 
    : 'Hola Montanares Todo Cuero, me gustaría consultar por sus productos de cuero, catálogo y despachos. ¡Muchas gracias!';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}