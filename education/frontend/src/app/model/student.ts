import { Subject } from "./subject";

export interface Student{
subjects: any;
    _id?: string;  
    name: string; 
    mark: number; 
    class: string;  
    subject: Subject[];


}