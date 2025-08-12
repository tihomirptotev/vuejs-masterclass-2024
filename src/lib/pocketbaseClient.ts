import pocketbase from 'pocketbase'

export const pb = new pocketbase(import.meta.env.VITE_POCKETBASE_URL)
