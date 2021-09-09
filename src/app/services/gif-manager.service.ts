import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif } from '../models/gif.model';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class GifManagerService {

  gifTrendingList: Gif[] = [];
  gifSearchQueryList: Gif[] = [];
  favoriteGifsMap = new Map();

  
  _query:string = '';

  api_key: string = 'uk0tYLnNtR0SlfEOF4lTEiPgWKWonlYZ';
  limit: number = 20;
  offsetTrending: number = 0;
  offsetSearch: number = 0;
  

  constructor(private http: HttpClient) { 
     
  }

  //Api calls

  getSearchedGifFromApi(query: string){

    if(this._query != query) this.gifSearchQueryList.length = 0;
    this._query = query;

    let searchEndpointUrl: string = 'https://api.giphy.com/v1/gifs/search';
    let urlForRequest: string = searchEndpointUrl+'?api_key='+this.api_key+'&q='+query+'&limit='+this.limit.toString()+'&offset='+this.offsetSearch.toString();
    this.http.get<any>(urlForRequest).subscribe( (response ) => {
           
      this.loadGifFromResponse(response , true);
    });

    this.offsetSearch += this.limit + 1;
  }

  getTrendingGifFromApi(){
    

    let trendingEndpointUrl: string = 'https://api.giphy.com/v1/gifs/trending';
    let urlForRequest: string = trendingEndpointUrl+'?api_key='+this.api_key+'&limit='+this.limit.toString()+'&offset='+this.offsetTrending; 
    this.http.get<any>(urlForRequest).subscribe( (response ) => {
      
      this.loadGifFromResponse(response , false);
    });
    
    this.offsetTrending += this.limit + 1;
    
  }


  getGifByIdFromApi(gifId: string) {

    let gifByIdEndpointUrl: string = 'https://api.giphy.com/v1/gifs/'+gifId;
    let urlForRequest: string = gifByIdEndpointUrl+'?api_key='+this.api_key;

    return this.http.get<any>(urlForRequest);
  }

  castResponseToGif(response: any ) : Gif{

   
    let date: Date;
    let dateString: string;

    date = new Date(response.data.import_datetime);
    dateString = date.toLocaleDateString("en-EN", { year: 'numeric', month: 'long', day: 'numeric' });

    let newGif = new Gif(
      response.data.id,
      response.data.url,
      response.data.username,
      response.data.source,
      dateString,
      response.data.title,
      false,
      new Image(response.data.images.fixed_height.webp , response.data.images.downsized.url)
      
    )
    newGif.isFavorite = this.isFavorite(newGif);
    return newGif;
  }



  loadGifFromResponse(response: any , isForSearch: boolean){
    let newGif : Gif;
    let date: Date;
    let dateString: string;

    response.data.forEach( (element: any) => {

      date = new Date(element.import_datetime);
      dateString = date.toLocaleDateString("en-EN", { year: 'numeric', month: 'long', day: 'numeric' });

      newGif = new Gif(
          element.id,
          element.url,
          element.username,
          element.source,
          dateString,
          element.title,
          false,
          new Image(element.images.fixed_height.webp , element.images.downsized.url)
          
        )
        newGif.isFavorite = this.isFavorite(newGif);
        if(isForSearch){
          this.gifSearchQueryList.push(newGif);
        }else  this.gifTrendingList.push(newGif);
    });
  }

  //Methods to store the favorites  in the browser-local storage
  setLocalData(gif: Gif){
  
    localStorage.setItem( gif.id, JSON.stringify(gif)) //saving gif object
    
  }

  loadLocalData(){
     
    let item: any;
    let keys = Object.keys(localStorage)

    for(let i = 0 ; i < keys.length ; i++){

      let key: string = keys[i];
      item = localStorage.getItem(key);
      let gif: Gif = JSON.parse(item);
      gif.isFavorite = true;
      
      
      this.favoriteGifsMap.set(key,gif);

    }

  }

  removeFromLocalData(gifToRemoveId : string){

    localStorage.removeItem(gifToRemoveId);
   
  }

  clearData(){
    localStorage.clear();
  }

  //Favorite Operations

  isFavorite(gif: Gif) :boolean{

    return this.favoriteGifsMap.has(gif.id);
  }

  addToFavorites(gifToAdd: Gif){

    this.favoriteGifsMap.set(gifToAdd.id, gifToAdd);
    this.setLocalData(gifToAdd);
  }

  removeFromFavorites(gifToRemove: Gif){

    this.removeFromLocalData(gifToRemove.id);
    this.favoriteGifsMap.delete(gifToRemove.id);
  }

}
