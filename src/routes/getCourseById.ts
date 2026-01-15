import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { eq} from "drizzle-orm";
import { courses } from "../database/schema.ts";
import { db } from "../database/client.ts";

export const getCourseByIdRoute:FastifyPluginAsyncZod = async (server)=>{
    server.get('/course/:id',{
        schema:{
            tags:['Courses'],
            summary:"Pega o curso pelo id",
            description:"Esta e a rota pega o curso pelo id",
            params:z.object({
                id:z.uuid(),
            }),
            response:{
                200:z.object({
                    curso:z.object({
                        id:z.uuid(),
                        title:z.string(),
                        description:z.string(),
                       })
                }),
                404:z.null().describe("Curso nao encontrado"),
            },
        },
    }, async (request,reply) => {
    
        const courseId = request.params.id
    
        const result = await db.select()
            .from(courses)
            .where(eq(courses.id,courseId))
    
        if(result.length > 0){
            return {curso:result[0]}
        }
    
        return reply.status(404).send()
    })
}