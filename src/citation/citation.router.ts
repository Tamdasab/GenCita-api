import { Router } from "express";
import { CitationController } from "./citation.controller";

export class CitationRouter{
    router = Router();

    constructor(private citationcontroller: CitationController) {  
        this.configureRoutes();     
    }

    private configureRoutes(): void{
        this.router.get('/:id', (req, res, next) => {
            try{
                const result = this.citationcontroller.getById(
                    parseInt(req.params.id)
                )
                res.status(200).json(result);
            }catch(error: unknown){
                next(error);
            };
            
        })

        this.router.get('/:category', (req, res, next) => {
            try{
                const result = this.citationcontroller.getByCategory(
                    req.params.category
                )
                res.status(200).json(result);
            }catch(error: unknown){
                next(error);
            };
        })

        this.router.post('/add-citation', (req, res, next) => {
            try{
                const result = this.citationcontroller.add(
                    req.body.text, req.body.category
                    )
                res.status(201).json(result);
            }catch(error: unknown){
                next(error);
            }
        })

        this.router.delete('/:id', (req, res, next) => {
            try{
                this.citationcontroller.delete(
                    parseInt(req.params.id)
                )
                res.status(204).send();
            }catch(error: unknown){
                next(error);
            }
        })
    }
}