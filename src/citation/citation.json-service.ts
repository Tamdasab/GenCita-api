import { Citation } from "./citation";
import { CitationService } from "./citation.service";

export class CitationJSONService implements CitationService{


   async add(text: string, category: string): Promise<Citation> {
        const newCitation = await Citation.create({
            text,
            category,
        });

        return newCitation.toJSON() as Citation;
        
    }

    async getById(id: number): Promise<Citation | null> {
        const citation = await Citation.findByPk(id);

        return citation ? citation.toJSON() as Citation : null;
        
    }
    
    async delete(id: number): Promise<void> {
        await Citation.destroy({
            where: {
                id,
            },
        });
        
    }
    //async getByCategory(category: string): Promise<Citation[]> {
    //    const citations = await Citation.findAll({
    //        where: {
    //            category,
    //        },
    //    });
//
    //    return citations.map(c => {
    //        c.toJSON() as Citation;
    //    });
    //    
    //}


}