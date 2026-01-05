const fastfy = require('fastify')

const server = fastfy()


server.get('/',()=>{
    return {hello: 'world'}
})

server.listen({port:8000}).then(()=>{
    console.log('Server is running on http://localhost:8000')
})