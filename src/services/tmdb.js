const BASE_URL = process.env.TMDB_BASE_URL
const LANGUAGE = process.env.TMDB_LANGUAGE || 'pt-BR'
const TOKEN = process.env.TMDB_READ_ACCESS_TOKEN

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
}

export async function listarFilmesPopulares() {
  const res = await fetch(`${BASE_URL}/movie/popular?language=${LANGUAGE}`, { headers })
  if (!res.ok) throw new Error(`Erro TMDB: ${res.status}`)
  const data = await res.json()
  return data.results
}

export async function buscarFilmePorId(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?language=${LANGUAGE}`, { headers })
  if (!res.ok) throw new Error(`Erro TMDB: ${res.status}`)
  return res.json()
}

export async function buscarFilmesPorNome(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=${LANGUAGE}`,
    { headers }
  )
  if (!res.ok) throw new Error(`Erro TMDB: ${res.status}`)
  const data = await res.json()
  return data.results
}
