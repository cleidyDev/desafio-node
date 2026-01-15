import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { courses } from "../database/schema.ts";
import { db } from "../database/client.ts";
import { eq } from "drizzle-orm";

export const deleteCourseRoute:FastifyPluginAsyncZod = async (server)=>{
    server.delete('/course/delete/:id',{
        schema:{
            tags:['Courses'],
            summary:"Cria um deleta curso",
            description:"Esta e a rota deleta um curso",
            params:z.object({
                id:z.uuid(),
                title:z.string(),
                description:z.string()
            }),
            response:{
                201:z.object({
                    message:z.string().describe("Curso actualizado com sucesso")
                }),
            },
        }
    }, async (request,reply)=>{
    
        const courseId = request.params.id
        const result = await db.delete(courses).where(eq(courses.id,courseId));
        return reply.status(201).send({
            'message':"Curso deletado com sucesso"
        })
    
    })
}