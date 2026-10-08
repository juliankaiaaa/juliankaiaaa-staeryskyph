const photoFiles = import.meta.glob('../assets/services/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })

/* Matches a service key to assets/services/<key>_photo.<ext> */
const photoFor = (key) => {
  const path = Object.keys(photoFiles).find((p) => p.split('/').pop().startsWith(`${key}_photo.`))
  return path ? photoFiles[path] : null
}

export const SERVICES = [
  {
    number: '02',
    title: 'Korea Purchase Assistance',
    summary: 'We buy K-pop merchandise and other items from Korean websites and sellers, and keep you updated.',
    description:
      'We help you purchase K-pop merchandise and other items from Korean websites and sellers.\n\nSend us the item link or the shop you want, and we handle the purchase on your behalf. We keep you updated at each step so you always know where your order stands.',
    photo: photoFor('korea'),
  },
  {
    number: '03',
    title: 'Japan Site Purchase Assistance',
    summary: 'Get items from Japanese shopping websites, even when direct international purchasing is not available.',
    description:
      'Get items from Japanese shopping websites even when direct international purchasing is not available.\n\nMany Japanese shops do not ship to the Philippines directly. We place the order for you, confirm the details with you first, and arrange the forwarding once the item is ready.',
    photo: photoFor('japan'),
  },
  {
    number: '04',
    title: 'Thailand Purchase Assistance',
    summary: 'Purchase items from Thailand with help from checkout all the way to forwarding to your door.',
    description:
      'Purchase items from Thailand with assistance from checkout to forwarding.\n\nWe help you buy from Thai shops and marketplaces, handle the checkout, and make sure your item reaches you safely, from the first payment to the final delivery.',
    photo: photoFor('thailand'),
  },
  {
    number: '07',
    title: 'Weverse Purchase Assistance',
    summary: 'Get your favorite official K-pop merchandise from Weverse Shop with our purchase assistance.',
    description:
      'Get your favorite official K-pop merchandise from Weverse Shop with our purchase assistance.\n\nWe help you order official releases and merchandise from Weverse Shop, keep track of your order, and make the purchase process clearer if you are shopping from overseas.',
    photo: photoFor('weverse'),
  },
  {
    number: '06',
    title: 'Bunjang Korea Purchase Assistance',
    summary: 'We help you access listings from Bunjang Korea and purchase items from Korean sellers safely.',
    description:
      'We assist with purchases from Bunjang Korea so you can access listings from Korean sellers.\n\nBunjang has many sellers and listings that are hard to reach from abroad. We help you find the right item, confirm its condition with you, and complete the purchase.',
    photo: photoFor('bunjang'),
  },
  {
    number: '05',
    title: 'Mercari Japan Purchase Assistance',
    summary: 'Found something on Mercari Japan? Send us the listing and we will assist with the purchase.',
    description:
      'Looking for something on Mercari Japan? Send us the listing and we can assist with the purchase.\n\nWe review the listing with you, check the seller and the item details, and purchase it on your behalf, so you can shop from Mercari Japan with more confidence.',
    photo: photoFor('mercari'),
  },
  {
    number: '08',
    title: 'Address Rental / Forwarding',
    summary: 'Use our overseas address services in Korea or Thailand to receive and forward your purchases.',
    description:
      'Use our available overseas address services for receiving and forwarding your purchases.\n\nIf a shop will not deliver to the Philippines, we can receive your package at an address in Korea or Thailand and forward it to you. You send us the details, and we handle the rest.',
    photo: photoFor('address'),
  },
  {
    number: '01',
    title: 'Consolidation Services',
    summary: 'Combine your purchases into one shipment, so receiving your items is easier and more organized.',
    description:
      'Combine your purchases into one shipment to make receiving your items easier and more organized.\n\nWhen you order from several shops, we gather everything at one address, check each item, and send it together. This saves you from paying for many small parcels and tracking several deliveries.',
    photo: photoFor('consolidation'),
  },
]

/* Adds local photos to API rows, which store text only */
export function withPhotos(rows) {
  const photos = Object.fromEntries(SERVICES.map((s) => [s.number, s.photo]))
  return rows.map((row) => ({ ...row, photo: photos[row.number] ?? null }))
}
