import express  from 'express';
import { ExpressRouter } from './express.router';
import bodyParser from 'body-parser';

export class ExpressServer{
    private express = express();

    constructor(
        private expressrouter: ExpressRouter,
        private port: string,
        ){
            this.configureBodyParser();
            this.configureRoutes();
        };

    private configureBodyParser() {
        this.express.use(bodyParser.json());
    }

    private configureRoutes() {
        this.express.use('/api', this.expressrouter.router);
    }

    boostrap(): void{
        this.express.listen(this.port, ()=>{
            console.log(`> Listning on port ${this.port}`);
        })
    }
}