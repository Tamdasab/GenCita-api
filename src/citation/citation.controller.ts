import { CategoryIsNotDefined, IdIsNotDefined, isEmpty, isNegative } from "../utiles";
import { Citation } from "./citation";
import { CitationService } from "./citation.service";

export class CitationController{
    constructor(private citationservice: CitationService){}

    add(text: string, category: string): Citation{
        if(isEmpty(text, category)){
            throw new Error("text and category is not defined");
        }

        const newCitation = this.citationservice.add(text, category);

        if(!newCitation){
            throw new Error("the new citation is not correctely created");
        }
        return newCitation;
    }

    getById(id: number): Citation | null{
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

    getByCategory(category: string): Citation[]{
        if(CategoryIsNotDefined(category)){
            throw new Error("given category is empty");
        }

        const citations = this.citationservice.getByCategory(category);

        if(citations.length === 0){
            return [];
        }

        return citations;
    }
}