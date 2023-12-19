import express, { Router,  } from "express";
import { CitationService } from "../citation/citation.service";
import { CitationController } from "../citation/citation.controller";
import { CitationRouter } from "../citation/citation.router";

export class ExpressRouter{
    router = Router();

    private citationcontroller!: CitationController;
    private citationrouter!: CitationRouter;

    constructor(private citationservice: CitationService){
        this.configureControllers();
        this.configureRouter();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.citationcontroller = new CitationController(this.citationservice);

    }

    private configureRouter(): void {
        this.router.use(express.json());
        this.citationrouter = new CitationRouter(this.citationcontroller);
    }

    private configureRoutes() {
        this.router.use('/citation', this.citationrouter.router);
    }
}