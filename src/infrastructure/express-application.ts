import { ExpressServer } from "./express-serveur";
import * as dotenv from 'dotenv';
import { ExpressRouter } from "./express.router";
import { CitationService } from "../citation/citation.service";
import { CitationJSONService } from "../citation/citation.json-service";

export class ExpressAplication{
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
        this.configureServerPort();
        this.configureServices();
        this.configureExpressRouter();
        this.configureExpressServer();
    }

    private configureEnv(): void{
        dotenv.config({
            path: '.env'
        })
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
        this.server = new ExpressServer(this.expressrouter, this.port);
    }

    
    private getPort(): string{
        const port = process.env.PORT;
        if (!port){
            throw new Error('No port was found in env');
        }
        return port;
    }
}