import { Citation } from "./citation";
import { CitationService } from "./citation.service";

export class CitationJSONService implements CitationService{


   async add(text: string, category: string): Promise<Citation> {
        try{
            const newCitation = await Citation.create({
                text: text,
                category: category,
            });

            return newCitation.toJSON() as Citation;
        }catch(error){
            throw error;
        }
    }

    async getAllCitation(): Promise<Citation[]> {
        try{
            const citations = await Citation.findAll();
            console.log("my citations found:", citations);

            const arrayCitations = citations.map(c => c.toJSON() as Citation);
            return arrayCitations;
        }catch (error){
            throw error;
        }
        
    };
    
    async delete(id: number): Promise<void> {
        try{
            await Citation.destroy({
                where: {
                    id: id,
                },
            });
        }catch(error){
            throw error;
        }
        
    }
    async getByCategory(category: string): Promise<Citation[]> {
        try{
        const citations = await Citation.findAll({
            where: {
                category: category,
            },
        });
        console.log("the citation by category is:", citations)
        return citations.map(c => 
            c.toJSON() as Citation
        );
        }catch(error){
            console.error('error in category method service', error);
            throw error;
        }
    }


}