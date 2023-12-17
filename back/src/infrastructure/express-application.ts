import { ExpressServer } from "./express-serveur";
import * as dotenv from 'dotenv';
import { ExpressRouter } from "./express.router";
import { CitationService } from "../citation/citation.service";
import { CitationJSONService } from "../citation/citation.json-service";
import db from "../config/database.config";

export class ExpressAplication{
    private allowedMainOrigin!: string;
    private server!: ExpressServer;
    private expressrouter!: ExpressRouter;
    private citationservice!: CitationService;
    private port!: string;

    constructor(){
        this.configureAplication();
    }


    bootstrap(): void{
        this.server.boostrap();
    }

    
    private configureAplication() {
        this.configureEnv();
        this.configureVariable();
        this.configureServices();
        this.configureExpressRouter();
        this.configureExpressServer();
        this.configDb();
    }



    private configureEnv(): void{
        dotenv.config({
            path: '.env'
        })
    }

    private configureVariable(): void {
        this.configureAllowedMainOrigin();
        this.configureServerPort();
    }

    private configureAllowedMainOrigin(): void {
        this.allowedMainOrigin = this.getAllowedMainOrigin();
    }

    private getAllowedMainOrigin(): string {
        const allowedMainOrigin = process.env.ALLOWED_MAIN_ORIGIN;
        if (!allowedMainOrigin) {
            throw new Error('No allowed main origin was found in env file.')
        };

        return allowedMainOrigin;
    }

    private configureServerPort(): void {
        this.port = this.getPort();
    }

    private configureServices(): void {
        this.citationservice = new CitationJSONService();
    }

    private configureExpressRouter(): void {
        this.expressrouter = new ExpressRouter(this.citationservice);
    }

    private configureExpressServer(): void {
        this.server = new ExpressServer(
                this.allowedMainOrigin,
                this.expressrouter, 
                this.port);
    }

    private configDb() {
        db.sync().then(() => {
            console.log('connect to db');
        });
    }

    
    private getPort(): string{
        const port = process.env.PORT;
        if (!port){
            throw new Error('No port was found in env');
        }
        return port;
    }
}