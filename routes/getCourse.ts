import type {FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import { db } from '../src/database/client.ts'
import { courses } from '../src/database/schema.ts'
import z from 'zod'

export const getCourseRoute:FastifyPluginAsyncZod = async (server)=>{
    server.get('/course',{
        schema:{
            tags:['Courses'],
            summary:"Pega todos os curso",
            description:"Esta e a rota pega todos os curso",
            response:{
                200:z.object({
                    cursos:z.array(z.object({
                        id:z.uuid(),
                        title:z.string(),
                        description:z.string(),
                    }))
                })
            }
        }
    },async (request,reply)=>{
        const result = await db.select().from(courses)
        return reply.send({cursos:result})
    })
}