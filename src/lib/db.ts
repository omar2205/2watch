import { createClient } from '@supabase/supabase-js'
import { omdAPI_KEY, supaURL, supaKEY } from './config.ts'

const supabase = createClient(supaURL, supaKEY)

const getInfo = async (id) =>
  await fetch(`http://www.omdbapi.com/?apikey=${omdAPI_KEY}&i=${id}`).then(
    (res) => res.json()
  )

const getPoster = async (id) => {
  const { publicURL: poster, error } = await supabase.storage
    .from('watch')
    .getPublicUrl(`${id}.jpg`)
  return poster
}

export { omdAPI_KEY, supabase, getInfo, getPoster }
