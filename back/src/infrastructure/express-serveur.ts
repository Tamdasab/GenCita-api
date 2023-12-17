import express  from 'express';
import cors, { CorsOptions } from 'cors';
import { ExpressRouter } from './express.router';
import bodyParser from 'body-parser';
import { error } from 'console';

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
        this.configureRoutes();
        this.configureCorsPolicy();
    }

    private configureCorsPolicy(): void{
        const corsOptions: CorsOptions = {
            origin: (origin, callback) => {
                const isOriginAllowed =
                    !origin || this.allowedMainOrigin === origin;
                
                if (isOriginAllowed) {
                    callback(null, true);
                } else{
                    callback(new Error('CORS: Request origin is not allowed'));
                }
            }
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