export default async function rootRoute(app) {
  app.get('/', async () => {
    return { mensagem: 'API de Filmes está funcionando!' }
  })
}
