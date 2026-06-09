import { listarFilmesPopulares, buscarFilmePorId } from '../services/tmdb.js'

export default async function filmesRoute(app) {
  app.get('/filmes', async (request, reply) => {
    try {
      const filmes = await listarFilmesPopulares()
      return filmes
    } catch (err) {
      reply.status(500)
      return { erro: 'Não foi possível buscar os filmes. Tente novamente mais tarde.' }
    }
  })

  app.get('/filmes/:id', async (request, reply) => {
    try {
      const filme = await buscarFilmePorId(request.params.id)
      return filme
    } catch (err) {
      reply.status(500)
      return { erro: 'Não foi possível buscar o filme. Verifique o ID informado.' }
    }
  })
}
