import brownHeart from '../assets/images/decorations/brown_heart.png'
import brownStar from '../assets/images/decorations/brown_star.png'
import brownEnvelope from '../assets/images/decorations/brown_envelope.png'
import brownAsterisk from '../assets/images/decorations/brown_asterisk.png'
import brownOctagram from '../assets/images/decorations/brown_octagram.png'

/*
  One list for the Home carousel and the Services page.
  summary is the short text for cards, description is the full text.
  Every card uses the same pink panel, so art is always brown.
*/
export const SERVICES = [
  {
    number: '01',
    title: 'Consolidation Services',
    summary: 'Combine your orders into one shipment',
    description:
      'Combine your purchases into one shipment to make receiving your items easier and more organized.',
    art: brownEnvelope,
  },
  {
    number: '02',
    title: 'Korea Purchase Assistance',
    summary: 'We buy items from Korea for you',
    description:
      'We help you purchase K-pop merchandise and other items from Korean websites and sellers.',
    art: brownHeart,
  },
  {
    number: '03',
    title: 'Japan Site Purchase Assistance',
    summary: 'We buy from Japanese shopping sites',
    description:
      'Get items from Japanese shopping websites even when direct international purchasing is not available.',
    art: brownOctagram,
  },
  {
    number: '04',
    title: 'Thailand Purchase Assistance',
    summary: 'We buy items from Thailand for you',
    description:
      'Purchase items from Thailand with assistance from checkout to forwarding.',
    art: brownStar,
  },
  {
    number: '05',
    title: 'Mercari Japan Purchase Assistance',
    summary: 'Mercari Japan purchase assistance',
    description:
      'Looking for something on Mercari Japan? Send us the listing and we can assist with the purchase.',
    art: brownAsterisk,
  },
  {
    number: '06',
    title: 'Bunjang Korea Purchase Assistance',
    summary: 'Bunjang Korea purchase assistance',
    description:
      'We assist with purchases from Bunjang Korea so you can access listings from Korean sellers.',
    art: brownHeart,
  },
  {
    number: '07',
    title: 'Weverse Purchase Assistance',
    summary: 'Weverse shop purchase assistance',
    description:
      'Get your favorite official K-pop merchandise from Weverse Shop with our purchase assistance.',
    art: brownStar,
  },
  {
    number: '08',
    title: 'Address Rental / Forwarding',
    summary: 'Korea and Thailand address rental and forwarding',
    description:
      'Use our available overseas address services for receiving and forwarding your purchases.',
    art: brownEnvelope,
  },
]
