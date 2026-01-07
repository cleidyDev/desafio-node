import {defineConfig} from 'drizzle-kit';

if(!process.env.DATABASE_URL){
    throw new Error("URL DO BANCO E OBRIGATORIA")
}
export default defineConfig({
    dialect:'mysql',
    dbCredentials:{
        url:process.env.DATABASE_URL,
       },
       out:'.drizzle',
       schema:'./src/database/schema.ts',
})