import fastify from 'fastify';
import crypto from 'crypto'; 

const server = fastify({
    logger:{
        transport:{
            target:'pino-pretty',
            options:{
                translateTime:'HH:MM:ss Z',
                ignore:'pid,hostname',
            },
        },
    },
});

const courses = [{
    id:'1',
    name:'NodeJS',
    duration:'3 months'
}]

server.get('/courses',(request,reply)=>{
    return reply.send({curso:courses})
})
server.get('/courses/:id',(request,reply)=>{
     const coursesId = request.params.id
     const course = courses.find(course => course.id === coursesId)
     if(!course){
        return reply.status(404).send()
     }
     return reply.send({course})
}) 
server.post('/courses',(request,reply)=>{
    const coursesId = crypto.randomUUID()
    const coursesName = request.body.name
    const coursesDuration = request.body.duration
    if(!coursesName || !coursesDuration){
        return reply.status(400).send({
            message:"Nome e duracao sao obrigatorios"
        })
    } 
    courses.push({id:coursesId,name:coursesName,duration:coursesDuration})
    return reply.send({message:"Curso criado com sucesso"})
}) 

server.listen({port:8000}).then(()=>{
    console.log('Server is running on http://localhost:8000')
})