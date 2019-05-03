import {Movies} from '../model/movies'


export class MoviesList{
    results: Movies[];
    count:number;


    constructor(obj?:any){
        this.count = obj&& obj.count || null;
        this.results = obj && obj.results.map(elem => { return new Movies(elem); }) || [];
    }
}