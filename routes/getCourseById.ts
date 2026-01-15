import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { eq} from "drizzle-orm";
import { courses } from "../src/database/schema.ts";
import { db } from "../src/database/client.ts";

export const getCourseByIdRoute:FastifyPluginAsyncZod = async (server)=>{
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
}