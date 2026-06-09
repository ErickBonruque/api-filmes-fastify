export default async function logHook(request) {
  const horario = new Date().toLocaleString('pt-BR')
  console.log(`[${horario}] ${request.method} ${request.url}`)
}
