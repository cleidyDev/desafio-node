import fastify from 'fastify'
import { eq } from 'drizzle-orm'
import { courses} from './src/database/schema.ts';
import { db } from './src/database/client.ts';


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

server.get('/course',async (request,reply)=>{
    const result = await db.select().from(courses)
    result
    return reply.send({cursos:result})
})

server.get('/course/:id', async (request,reply) => {
    type Params = {
        id:string,
        title:string,
        description:string
    }

    const params = request.params as Params
    const courseId = params.id

    const result = await db.select()
        .from(courses)
        .where(eq(courses.id,courseId))

    if(result.length > 0){
        return {course:result[0]}
    }

    return reply.status(404).send({
        'message':"Curso nao encontrado"
    })
})

server.post('/course/create', async (request,reply)=>{
    type Body = {
        title:string,
        description:string
    }
    

    const body = request.body as Body
    const courseTitle = body.title
    const courseDescription = body.description

    if(!courseTitle && !courseDescription){
        return reply.status(400).send({
            'message':"nao e possivel criar um curso"
        })
    }

    const result = await db
    .insert(courses)
    .values({
        title:courseTitle,
        description:courseDescription
    })
    return reply.status(201).send({
        'message':result
    })
})

server.delete('/course/delete/:id', async (request,reply)=>{
    type Params = {
        id:string,
        title:string,
        description:string
    }

    const paramms = request.params as Params
    const courseId = paramms.id

    const result = await db.delete(courses).where(eq(courses.id,courseId));

    return reply.status(201).send({
        'message':"Curso deletado com sucesso"
    })

})
server.listen({port:8000}).then(()=>{
    console.log('Server is running on http://localhost:8000')
})