export class Genre{
    name:string;
    _id:number;


    constructor(obj?:any){
        this.name = obj && obj.name || ""
        this._id = obj && obj._id || null;
    }
}