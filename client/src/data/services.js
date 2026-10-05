import brownHeart from '../assets/images/decorations/brown_heart.png'
import brownStar from '../assets/images/decorations/brown_star.png'
import brownEnvelope from '../assets/images/decorations/brown_envelope.png'
import brownAsterisk from '../assets/images/decorations/brown_asterisk.png'
import pinkFolder from '../assets/images/decorations/pink_folder.png'
import pinkOctagram from '../assets/images/decorations/pink_octagram.png'
import pinkStar from '../assets/images/decorations/pink_star.png'
import pinkHeart from '../assets/images/decorations/pink_heart.png'

/*
  One list for the Home carousel and the Services page.
  summary is the short text for cards, description is the full text.
  tone sets the card color, and art is always the opposite color so it
  stays visible on the panel.
*/
export const SERVICES = [
  {
    number: '01',
    title: 'Consolidation Services',
    summary: 'Combine your orders into one shipment',
    description:
      'Combine your purchases into one shipment to make receiving your items easier and more organized.',
    tone: 'pink',
    art: pinkFolder,
  },
  {
    number: '02',
    title: 'Korea Purchase Assistance',
    summary: 'We buy items from Korea for you',
    description:
      'We help you purchase K-pop merchandise and other items from Korean websites and sellers.',
    tone: 'brown',
    art: brownHeart,
  },
  {
    number: '03',
    title: 'Japan Site Purchase Assistance',
    summary: 'We buy from Japanese shopping sites',
    description:
      'Get items from Japanese shopping websites even when direct international purchasing is not available.',
    tone: 'pink',
    art: pinkOctagram,
  },
  {
    number: '04',
    title: 'Thailand Purchase Assistance',
    summary: 'We buy items from Thailand for you',
    description:
      'Purchase items from Thailand with assistance from checkout to forwarding.',
    tone: 'brown',
    art: brownStar,
  },
  {
    number: '05',
    title: 'Mercari Japan Purchase Assistance',
    summary: 'Mercari Japan purchase assistance',
    description:
      'Looking for something on Mercari Japan? Send us the listing and we can assist with the purchase.',
    tone: 'pink',
    art: pinkStar,
  },
  {
    number: '06',
    title: 'Bunjang Korea Purchase Assistance',
    summary: 'Bunjang Korea purchase assistance',
    description:
      'We assist with purchases from Bunjang Korea so you can access listings from Korean sellers.',
    tone: 'brown',
    art: brownAsterisk,
  },
  {
    number: '07',
    title: 'Weverse Purchase Assistance',
    summary: 'Weverse shop purchase assistance',
    description:
      'Get your favorite official K-pop merchandise from Weverse Shop with our purchase assistance.',
    tone: 'pink',
    art: pinkHeart,
  },
  {
    number: '08',
    title: 'Address Rental / Forwarding',
    summary: 'Korea and Thailand address rental and forwarding',
    description:
      'Use our available overseas address services for receiving and forwarding your purchases.',
    tone: 'brown',
    art: brownEnvelope,
  },
]
