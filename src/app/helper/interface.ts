export interface Dates{
    day: number;
    month: number;
    century: number;
    year: number;
}
export interface ActionKey{
   isActive: boolean;
   isPrevious: boolean;
   isNext: boolean;
}
export interface Months{
    days: number [];
    keys: ActionKey[];
}