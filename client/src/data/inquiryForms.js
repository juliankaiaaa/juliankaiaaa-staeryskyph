// One entry per service. Each field becomes an input in InquiryForm, and its
// answer is stored in the inquiry's details column under the field's name.

export const SERVICE_FORMS = {
  consolidation: {
    label: 'Consolidation Services',
    intro: 'Tell us how many orders you have and what they contain.',
    fields: [
      { name: 'orderCount', label: 'How many orders?', type: 'number', min: 1, max: 99, required: true },
      { name: 'packages', label: 'Anything we should know about the packages?', type: 'textarea', max: 500 },
    ],
  },
  korea: {
    label: 'Korea Purchase Assistance',
    intro: 'Paste the item or shop link and what you would like to spend.',
    fields: [
      { name: 'itemLink', label: 'Item or shop link', type: 'url', required: true, placeholder: 'https://...' },
      { name: 'budget', label: 'Budget (PHP)', type: 'text', max: 40 },
    ],
  },
  japan: {
    label: 'Japan Site Purchase Assistance',
    intro: 'Let us know which Japanese shop you want to order from.',
    fields: [
      { name: 'shopName', label: 'Shop name', type: 'text', max: 120, required: true },
      { name: 'itemLink', label: 'Item link', type: 'url', placeholder: 'https://...' },
    ],
  },
  thailand: {
    label: 'Thailand Purchase Assistance',
    intro: 'Tell us what you need from Thailand and how you want it delivered.',
    fields: [
      { name: 'itemLink', label: 'Item or shop link', type: 'url', placeholder: 'https://...' },
      {
        name: 'delivery',
        label: 'How should we deliver it?',
        type: 'select',
        required: true,
        options: ['Forward to the Philippines', 'Hold for pickup'],
      },
    ],
  },
  mercari: {
    label: 'Mercari Japan Purchase Assistance',
    intro: 'Send the Mercari listing you want us to buy.',
    fields: [
      { name: 'listingLink', label: 'Mercari listing link', type: 'url', required: true, placeholder: 'https://jp.mercari.com/...' },
      { name: 'offerPrice', label: 'Your offer price (JPY), if any', type: 'text', max: 40 },
    ],
  },
  bunjang: {
    label: 'Bunjang Korea Purchase Assistance',
    intro: 'Send the Bunjang listing and your budget.',
    fields: [
      { name: 'listingLink', label: 'Bunjang listing link', type: 'url', required: true, placeholder: 'https://m.bunjang.co.kr/...' },
      { name: 'budget', label: 'Budget (PHP)', type: 'text', max: 40 },
    ],
  },
  weverse: {
    label: 'Weverse Purchase Assistance',
    intro: 'Tell us the official merchandise you are looking for.',
    fields: [
      { name: 'productName', label: 'Product name', type: 'text', max: 160, required: true },
      {
        name: 'productType',
        label: 'Type of item',
        type: 'select',
        options: ['Album', 'Lightstick', 'Photocard or photobook', 'Apparel', 'Other'],
      },
    ],
  },
  address: {
    label: 'Address Rental / Forwarding',
    intro: 'Tell us which address you need and for how long.',
    fields: [
      { name: 'country', label: 'Address country', type: 'select', required: true, options: ['Korea', 'Thailand'] },
      {
        name: 'duration',
        label: 'How long do you need it?',
        type: 'select',
        required: true,
        options: ['1 month', '3 months', '6 months'],
      },
    ],
  },
}

// The service cards number themselves 01 to 08. This maps each card to its form.
export const SLUG_BY_NUMBER = {
  '01': 'consolidation',
  '02': 'korea',
  '03': 'japan',
  '04': 'thailand',
  '05': 'mercari',
  '06': 'bunjang',
  '07': 'weverse',
  '08': 'address',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Returns an object of field errors. An empty object means the form is valid.
export function validateInquiry(slug, values) {
  const errors = {}
  const form = SERVICE_FORMS[slug]

  if (!values.name?.trim()) errors.name = 'Please tell us your name.'
  if (!EMAIL_PATTERN.test(values.email?.trim() ?? '')) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.message?.trim()) errors.message = 'Please tell us a little about your request.'
  if ((values.message ?? '').length > 2000) errors.message = 'Please keep this under 2000 characters.'

  if (form) {
    for (const field of form.fields) {
      const value = (values[field.name] ?? '').toString().trim()

      if (field.required && !value) {
        errors[field.name] = `${field.label.replace(/\?$/, '')} is required.`
      } else if (field.type === 'url' && value && !/^https?:\/\//i.test(value)) {
        errors[field.name] = 'Links should start with https://'
      } else if (field.type === 'number' && value) {
        const number = Number(value)
        if (!Number.isInteger(number) || number < field.min || number > field.max) {
          errors[field.name] = `Please enter a number from ${field.min} to ${field.max}.`
        }
      } else if (field.max && value.length > field.max) {
        errors[field.name] = `Please keep this under ${field.max} characters.`
      }
    }
  }

  return errors
}
