import { Chapter } from "./chapter";

export interface Story{
    id:number;
    title:string;
    numChapters:number;
    description: string;
    triggerWarnings:string;
    userId:number;
    dateUploaded: Date;
    genreId:number;
    fileLocation: string;
    chapters?: Chapter[];
    length:number;

}