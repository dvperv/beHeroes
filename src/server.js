const fastify = require('fastify')({
    logger: true
})

const mongoose = require('mongoose');
const { Schema } = mongoose;
const config = require('./config');
const atlas_uri = `mongodb+srv://${config.atlas.username}:${config.atlas.password}@cluster0.vx1qm.mongodb.net/${config.atlas.db}?retryWrites=true&w=majority`;

try {
    mongoose.connect(atlas_uri, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('dp: atlas connected');
}
catch (e) {
    console.log('dp: ERROR: CAN\'T CONNECT TO ATLAS: ' + e);
}

const heroModel = mongoose.model('hero', new Schema({ name: String }));
heroModel.create({name: 'test'});

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
