import brownHeart from '../assets/images/decorations/brown_heart.png'
import brownStar from '../assets/images/decorations/brown_star.png'
import brownEnvelope from '../assets/images/decorations/brown_envelope.png'
import brownAsterisk from '../assets/images/decorations/brown_asterisk.png'
import brownOctagram from '../assets/images/decorations/brown_octagram.png'

/*
  One list for the Home carousel and the Services page.
  summary is the short text for cards, description is the full text.

  photo is the real service photo. Leave it null to show the placeholder.
  To add a photo, import it at the top and set photo to that import.
  art is the placeholder sticker, and sticker is the small corner sticker.
*/
export const SERVICES = [
  {
    number: '01',
    title: 'Consolidation Services',
    summary: 'Combine your orders into one shipment',
    description:
      'Combine your purchases into one shipment to make receiving your items easier and more organized.',
    photo: null,
    art: brownEnvelope,
    sticker: brownStar,
  },
  {
    number: '02',
    title: 'Korea Purchase Assistance',
    summary: 'We buy items from Korea for you',
    description:
      'We help you purchase K-pop merchandise and other items from Korean websites and sellers.',
    photo: null,
    art: brownHeart,
    sticker: brownHeart,
  },
  {
    number: '03',
    title: 'Japan Site Purchase Assistance',
    summary: 'We buy from Japanese shopping sites',
    description:
      'Get items from Japanese shopping websites even when direct international purchasing is not available.',
    photo: null,
    art: brownOctagram,
    sticker: brownOctagram,
  },
  {
    number: '04',
    title: 'Thailand Purchase Assistance',
    summary: 'We buy items from Thailand for you',
    description:
      'Purchase items from Thailand with assistance from checkout to forwarding.',
    photo: null,
    art: brownStar,
    sticker: brownAsterisk,
  },
  {
    number: '05',
    title: 'Mercari Japan Purchase Assistance',
    summary: 'Mercari Japan purchase assistance',
    description:
      'Looking for something on Mercari Japan? Send us the listing and we can assist with the purchase.',
    photo: null,
    art: brownAsterisk,
    sticker: brownStar,
  },
  {
    number: '06',
    title: 'Bunjang Korea Purchase Assistance',
    summary: 'Bunjang Korea purchase assistance',
    description:
      'We assist with purchases from Bunjang Korea so you can access listings from Korean sellers.',
    photo: null,
    art: brownHeart,
    sticker: brownHeart,
  },
  {
    number: '07',
    title: 'Weverse Purchase Assistance',
    summary: 'Weverse shop purchase assistance',
    description:
      'Get your favorite official K-pop merchandise from Weverse Shop with our purchase assistance.',
    photo: null,
    art: brownStar,
    sticker: brownOctagram,
  },
  {
    number: '08',
    title: 'Address Rental / Forwarding',
    summary: 'Korea and Thailand address rental and forwarding',
    description:
      'Use our available overseas address services for receiving and forwarding your purchases.',
    photo: null,
    art: brownEnvelope,
    sticker: brownAsterisk,
  },
]
