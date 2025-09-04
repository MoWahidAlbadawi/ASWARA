export interface ApiResponseGetMetalPrice {
    status : boolean,
    currency : "USD",
    unit: string,
    metals: {
        gold : number , 
        silver : number,
     }
}