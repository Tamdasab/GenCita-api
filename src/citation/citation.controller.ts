import { CategoryIsNotDefined, IdIsNotDefined, isEmpty, isNegative } from "../utiles";
import { Citation } from "./citation";
import { CitationService } from "./citation.service";

export class CitationController{
    constructor(private citationservice: CitationService){}

    async add(text: string, category: string): Promise<Citation>{
        if(isEmpty(text, category)){
            throw new Error("text and category is not defined");
        }

        const mynewCitation = this.citationservice.add(text, category);

        if(!mynewCitation){
            throw new Error("the new citation is not correctely created");
        }
        return mynewCitation;
    }

    async getById(id: number): Promise<Citation | null>{
        if(isNegative(id)){
            throw new Error("given id is negative");
        }

        const myId = this.citationservice.getById(id);

        if(!myId){
            throw new Error("the id is null");
        }
        return myId;
    }

    delete(id: number): void{
        if(IdIsNotDefined(id)){
            throw new Error("given id is empty");
        }
        this.citationservice.delete(id);
    }
//
    //async getByCategory(category: string): Promise<Citation[]>{
    //    if(CategoryIsNotDefined(category)){
    //        throw new Error("given category is empty");
    //    }
//
    //    const citations = this.citationservice.getByCategory(category);
//
    //    if( (await citations).length === 0){
    //        return [];
    //    }
//
    //    return citations;
    //}
}