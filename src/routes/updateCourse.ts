import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { eq } from "drizzle-orm";
import z from "zod";


export const updateCourseRoute:FastifyPluginAsyncZod = async (server)=>{
    server.put('/course/update/:id',{
        schema:{
            tags:['Courses'],
            summary:"Pega o curso pelo id",
            description:"Esta e a rota pega o curso pelo id",
            params:z.object({
                id:z.uuid()
            }),
            body:z.object({
                title:z.string().min(5),
                description:z.string().min(10)
            }),
            response:{
                201:z.object({
                    message:z.string().describe("Curso actualizado com sucesso")
                }),
            },
        }
    },async (request,reply)=>{
    
        const courseId = request.params.id
    
        const courseTitle = request.body.title
        const courseDescription  = request.body.description
    
        const result = await db.update(courses).set({
            title:courseTitle,
            description:courseDescription
        }).where(eq(courses.id,courseId))
        return reply.status(201).send({
            'message':"Curso actualizado com sucesso"
        })
    })
}