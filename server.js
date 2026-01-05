const fastfy = require('fastify')

const server = fastfy()

const courses = {
    id:1
    ,name:'NodeJS'
    ,duration:'3 months'
}

server.get('/',()=>{
    return {curso:courses}
})

server.listen({port:8000}).then(()=>{
    console.log('Server is running on http://localhost:8000')
})