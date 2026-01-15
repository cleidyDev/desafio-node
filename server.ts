import fastify from 'fastify'
import {validatorCompiler,serializerCompiler,type ZodTypeProvider, jsonSchemaTransform} from 'fastify-type-provider-zod'
import { fastifySwagger} from '@fastify/swagger'
import { eq } from 'drizzle-orm'
import { courses} from './src/database/schema.ts';
import { db } from './src/database/client.ts';
import { z } from 'zod'
import fastifySwaggerUi from '@fastify/swagger-ui';


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
}).withTypeProvider<ZodTypeProvider>();

server.register(fastifySwagger,{
    openapi:{
        info:{
            title:"Desafio Nodejs",
            version:"1.0.0",
        }
    },
    transform: jsonSchemaTransform,
})
server.register(fastifySwaggerUi,{
    routePrefix:'/docs'
})

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.get('/course',async (request,reply)=>{
    const result = await db.select().from(courses)
    return reply.send({cursos:result})
})

server.get('/course/:id',{
    schema:{
        params:z.object({
            id:z.uuid(),
        })
    }
}, async (request,reply) => {

    const courseId = request.params.id

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

server.post('/course/create',{
    schema:{
        body:z.object({
            title:z.string("O titulo precisa de ser um string").min(5,"O titulo precisa de ter mais de 5 caracteres"),
            description:z.string().min(20,"a descricao precisa de ter mais de 20 caracteres")
        })
    }
}, async (request,reply)=>{ 
    

    const courseTitle = request.body.title
    const courseDescription = request.body.description
 
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

server.delete('/course/delete/:id',{
    schema:{
        params:z.object({
            id:z.uuid(),
            title:z.string(),
            description:z.string()
        })
    }
} async (request,reply)=>{
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

server.put('/course/update/:id',async (request,reply)=>{
    type Params = {
        id:string
    }
    type Body = {
        title:string,
        description:string
    }

    const params = request.params as Params
    const courseId = params.id

    const body = request.body as Body
    const courseTitle = body.title
    const courseDescription  = body.description

    const result = await db.update(courses).set({
        title:courseTitle,
        description:courseDescription
    }).where(eq(courses.id,courseId))
    return reply.status(201).send({
        'message':"Curso actualizado com sucesso"
    })
})

server.listen({port:8000}).then(()=>{
    console.log('Server is running on http://localhost:8000')
})