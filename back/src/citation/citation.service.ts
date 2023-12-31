import { Citation } from "./citation";

export interface CitationService{
    add(text: string, category:string): Promise<Citation>;
    getAllCitation(): Promise<Citation[]>;
    delete(id: number): void;
    getByCategory(category: string): Promise<Citation[]>;
}