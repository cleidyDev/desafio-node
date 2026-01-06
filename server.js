const fastfy = require('fastify')

const server = fastfy()
const crypto = require('crypto')

const courses = [{
    id:'1',
    name:'NodeJS',
    duration:'3 months'
}]

server.get('/courses',()=>{
    return {curso:courses}
})
server.get('/courses/:id',(request,reply)=>{
     const coursesId = request.params.id
     const course = courses.find(course => course.id === coursesId)
     if(!course){
        return reply.status(404).send()
     }
     return {course}
}) 
server.post('/courses',()=>{
    courses.push({id:crypto.randomUUID(),name:"Curso de Nest",durantion:"4 dias"})
    return {message:"Curso criado com sucesso"}
}) 

server.listen({port:8000}).then(()=>{
    console.log('Server is running on http://localhost:8000')
})