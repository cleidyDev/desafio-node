import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { courses } from "../src/database/schema.ts";
import { db } from "../src/database/client.ts";

export const createCourseRoute:FastifyPluginAsyncZod = async (server)=>{
    server.post('/course/create',{
        schema:{
            tags:['Courses'],
            summary:"Cria um novo curso",
            body:z.object({
                title:z.string("O titulo precisa de ser um string").min(5,"O titulo precisa de ter mais de 5 caracteres"),
                description:z.string().min(20,"a descricao precisa de ter mais de 20 caracteres")
            }),
            response:{
                201:z.object({
                    courseId:z.uuid()
                })
            }
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
        return reply.status(201).send()
    })
}