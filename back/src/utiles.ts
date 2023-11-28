export function isEmpty(text:string, category:string): boolean{
    return !text || !category;
};

export function isNegative(id: number): boolean{
    return id < 0;
};

export function IdIsNotDefined(id: number): boolean{
    return !id;
};

export function CategoryIsNotDefined(category: string): boolean{
    return !category;
};

