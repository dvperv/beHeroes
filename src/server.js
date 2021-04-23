const fastify = require('fastify')({
    logger: true
})

fastify.register(require('fastify-cors'), {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
})

fastify.get('/', async (request, reply) => {
    return { id: 10, name: 'world' }
})

const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
