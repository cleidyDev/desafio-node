const fastfy = require('fastify')

const server = fastfy()
const crypto = require('crypto')

const courses = [{
    id:'1',
    name:'NodeJS',
    duration:'3 months'
}]

server.get('/',()=>{
    return {curso:courses}
})

server.post('/courses',()=>{
    courses.push({id:crypto.randomUUID(),name:"Curso de Nest",durantion:"4 dias"})
    return {message:"Curso criado com sucesso"}
}) 

server.listen({port:8000}).then(()=>{
    console.log('Server is running on http://localhost:8000')
})