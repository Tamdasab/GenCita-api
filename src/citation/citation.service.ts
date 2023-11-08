import { Citation } from "./citation";

export interface CitationService{
    add(text: string, category:string): Citation;
    getById(id: number): Citation | null;
    delete(id: number): void;
    getByCategory(category: string): Citation[];
}