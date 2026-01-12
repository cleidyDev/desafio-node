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

server.get('/courses',async (request,reply)=>{
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
server.listen({port:8000}).then(()=>{
    console.log('Server is running on http://localhost:8000')
})