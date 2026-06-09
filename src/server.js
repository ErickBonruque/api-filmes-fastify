import 'dotenv/config'
import Fastify from 'fastify'
import logHook from './hooks/logHook.js'
import rootRoute from './routes/root.js'
import filmesRoute from './routes/filmes.js'
import buscaRoute from './routes/busca.js'

const app = Fastify()

app.addHook('onRequest', logHook)

app.register(rootRoute)
app.register(filmesRoute)
app.register(buscaRoute)

const PORT = process.env.PORT || 3000

app.listen({ port: PORT }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
