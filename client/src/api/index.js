// The only file the components import from.
//
// VITE_USE_MOCK_API=false  -> the Express API at VITE_API_BASE_URL
// anything else, including unset -> the browser-only stand-in (demo mode)

import * as mockApi from './mockApi.js'
import * as httpApi from './httpApi.js'

export const USING_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'

const implementation = USING_MOCK_API ? mockApi : httpApi

export const { listServices, createRequest } = implementation
