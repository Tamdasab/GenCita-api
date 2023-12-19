import express  from 'express';
import cors, { CorsOptions } from 'cors';
import { ExpressRouter } from './express.router';
import bodyParser from 'body-parser';

export class ExpressServer{
    private express = express();

    constructor(
        private allowedMainOrigin: string,
        private expressrouter: ExpressRouter,
        private port: string,
        ){
            this.configureServer();
        };

    boostrap(): void{
        this.express.listen(this.port, ()=>{
            console.log(`> Listning on port ${this.port}`);
        })
    }

    private configureServer(): void{
        this.configureBodyParser();
        this.configureCorsPolicy();
        this.configureRoutes();
    }

    private configureCorsPolicy(): void{
        const corsOptions: cors.CorsOptions = {
            origin: (origin, callback) => {
                const isOriginAllowed =
                    !origin || this.allowedMainOrigin === origin;
                
                if (isOriginAllowed) {
                    callback(null, true);
                } else{
                    callback(new Error('CORS: Request origin is not allowed'));
                }
            },
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
            optionsSuccessStatus: 204,
        }

        this.express.use(cors(corsOptions));
    }

    private configureBodyParser() {
        this.express.use(bodyParser.json());
    }

    private configureRoutes() {
        this.express.use('/api', this.expressrouter.router);
    }

}