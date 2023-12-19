import { Router } from "express";
import { CitationController } from "./citation.controller";

export class CitationRouter{
    router = Router();

    constructor(private citationcontroller: CitationController) {  
        this.configureRoutes();     
    }

    private configureRoutes(): void{
        this.router.get('/all-citations', (req, res, next) => {
            try{
                this.citationcontroller.getAllCitation()
                .then(result => {
                    res.status(200).json(result);
                })
            }catch(error: unknown){
                next(error);
            }
        })

        this.router.get('/category/:category', (req, res, next) => {
            try{
                const categoryparam = req.params.category;
                console.log("CategoryParam", categoryparam);

                this.citationcontroller.getByCategory(
                    categoryparam
                ).then(rep => {
                    console.log("response :", rep);
                    res.status(200).json(rep);
                })

            }catch(error: unknown){
                next(error);
            };
        })

        this.router.get('/all-categories', (req, res, next) => {
            try{
                this.citationcontroller.getCategory()
                .then(result => {
                    res.status(200).json(result);
                })
            }catch(error: unknown){
                next(error);
            }
        })

        this.router.post('/add-citation', (req, res, next) => {
                try {
                    const { text, category } = req.body;
                    const result = this.citationcontroller.add(text, category);
                    res.status(201).json(result);
                } catch (error: unknown) {
                    next(error);
                };
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