import { Citation } from "./citation";
import { CitationService } from "./citation.service";

export class CitationJSONService implements CitationService{
    add(text: string, category: string): Citation {
        throw new Error("");
    }
    getById(id: number): Citation | null {
        throw new Error("");
    }
    delete(id: number): void {
        throw new Error("");
    }
    getByCategory(category: string): Citation[] {
        throw new Error("");
    }
    
}