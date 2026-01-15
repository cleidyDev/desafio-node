import fastify from 'fastify';
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { createCourseRoute } from './src/routes/createCourse.ts';
import { getCourseRoute } from './src/routes/getCourse.ts';
import { getCourseByIdRoute } from './src/routes/getCourseById.ts';
import { updateCourseRoute } from './src/routes/updateCourse.ts';
import { deleteCourseRoute } from './src/routes/deleteCourse.ts';


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

if(process.env.NODE_ENV === "development"){
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
}

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(createCourseRoute)
server.register(getCourseRoute)
server.register(getCourseByIdRoute)
server.register(updateCourseRoute)
server.register(deleteCourseRoute)

server.listen({port:8000}).then(()=>{
    console.log('Server is running on http://localhost:8000')
})