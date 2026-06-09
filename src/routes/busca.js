import { buscarFilmesPorNome } from '../services/tmdb.js'

export default async function buscaRoute(app) {
  app.get('/busca', async (request, reply) => {
    const { q } = request.query

    if (!q) {
      reply.status(400)
      return { erro: 'Informe o parâmetro de busca. Ex: /busca?q=matrix' }
    }

    try {
      const filmes = await buscarFilmesPorNome(q)
      return filmes
    } catch (err) {
      reply.status(500)
      return { erro: 'Não foi possível realizar a busca. Tente novamente mais tarde.' }
    }
  })
}
