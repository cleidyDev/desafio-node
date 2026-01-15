import type {FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'
import { asc, ilike } from 'drizzle-orm'

export const getCourseRoute:FastifyPluginAsyncZod = async (server)=>{
    server.get('/course',{
        schema:{
            tags:['Courses'],
            summary:"Pega todos os curso",
            description:"Esta e a rota pega todos os curso",
            querystring:z.object({
                search:z.string().optional(),
                orderBy:z.enum(['title']).optional().default('title'),
            }),
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
        const { search, orderBy} = request.query
        const result = await db
            .select()
            .from(courses)
            .orderBy(asc(courses[orderBy]))
            .where(
                search? ilike(courses.title,`%${search}%`) : undefined
            )
        return reply.send({cursos:result})
    })
}