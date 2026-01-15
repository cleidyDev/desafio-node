import type {FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import { db } from '../src/database/client.ts'
import { courses } from '../src/database/schema.ts'

export const getCourseRoute:FastifyPluginAsyncZod = async (server)=>{
    server.get('/course',async (request,reply)=>{
        const result = await db.select().from(courses)
        return reply.send({cursos:result})
    })
}