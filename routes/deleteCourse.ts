import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { courses } from "../src/database/schema.ts";
import { db } from "../src/database/client.ts";
import { eq } from "drizzle-orm";

export const deleteCourseRoute:FastifyPluginAsyncZod = async (server)=>{
    server.delete('/course/delete/:id',{
        schema:{
            params:z.object({
                id:z.uuid(),
                title:z.string(),
                description:z.string()
            })
        }
    }, async (request,reply)=>{
    
        const courseId = request.params.id
        const result = await db.delete(courses).where(eq(courses.id,courseId));
        return reply.status(201).send({
            'message':"Curso deletado com sucesso"
        })
    
    })
}