import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif } from '../models/gif.model';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class GifManagerService {

  gifList: Gif[] = [];
  gifSearchQueryList: Gif[] = [];
  favoriteGifs: Gif[] = [];

  favoriteGifsIndex: number = 1;
  

  api_key: string = 'uk0tYLnNtR0SlfEOF4lTEiPgWKWonlYZ';
  limit: number = 20;
  offsetTrending: number = 0;
  offsetSearch: number = 0;
  

  constructor(private http: HttpClient) { 
    
    this.getTrendingGifFromApi();
  }

  //Api calls

  getSearchedGifFromApi(query: string){

    

    let searchEndpointUrl: string = 'https://api.giphy.com/v1/gifs/search';
    let urlForRequest: string = searchEndpointUrl+'?api_key='+this.api_key+'&q='+query+'&limit='+this.limit.toString()+'&offset='+this.offsetSearch.toString();
    this.http.get<any>(urlForRequest).subscribe( (response ) => {
           
      this.fetchResponse(response , true);
    });

    this.offsetSearch += this.limit + 1;
  }

  getTrendingGifFromApi(){
    

    let trendingEndpointUrl: string = 'https://api.giphy.com/v1/gifs/trending';
    let urlForRequest: string = trendingEndpointUrl+'?api_key='+this.api_key+'&limit='+this.limit.toString()+'&offset='+this.offsetTrending; 
    this.http.get<any>(urlForRequest).subscribe( (response ) => {
      
      this.fetchResponse(response , false);
    });
    
    this.offsetTrending += this.limit + 1;
    console.log(this.offsetTrending);
  }


  getGifByIdFromApi(gifId: string) {

    let api_key: string = 'uk0tYLnNtR0SlfEOF4lTEiPgWKWonlYZ';
    let gifByIdEndpointUrl: string = 'https://api.giphy.com/v1/gifs/'+gifId;
    let urlForRequest: string = gifByIdEndpointUrl+'?api_key='+api_key;

    return this.http.get<any>(urlForRequest);
  }

  fetchResponseById(response: any ) : Gif{

   
    let date: Date;
    let dateString: string;

    date = new Date(response.data.import_datetime);
    dateString = date.toLocaleDateString("en-EN", { year: 'numeric', month: 'long', day: 'numeric' });

    return new Gif(
      response.data.id,
      response.data.url,
      response.data.username,
      response.data.source,
      dateString,
      response.data.title,
      false,
      new Image(response.data.images.fixed_height.webp , response.data.images.downsized.url)
      
    )
    
    
  }



  fetchResponse(response: any , isForSearch: boolean){
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
        if(isForSearch){
          this.gifSearchQueryList.push(newGif);
        }else  this.gifList.push(newGif);
    });
  }

  //Methods to store the favorites  in the browser-local storage
  setLocalData(gif: Gif){

    this.favoriteGifsIndex = this.favoriteGifs.length;
    console.log(this.favoriteGifsIndex);
    localStorage.setItem( 'favorites'+this.favoriteGifsIndex.toString(), JSON.stringify(gif)) //saving gif object
    localStorage.setItem('favoritesIndex', JSON.stringify(this.favoriteGifsIndex)); //Saving counter
  }

  getLocalData(){
    let index: any = localStorage.getItem('favoritesIndex') ;
    this.favoriteGifsIndex = JSON.parse(index);
    
    let item: any;
    
    for (let i = 1; i < this.favoriteGifsIndex; i++) {
     
      item = localStorage.getItem('favorites'+i.toString());
      let gif: Gif = JSON.parse(item);
      
      gif.isFavorite = true;
      this.favoriteGifs.push(gif);
    }
  }

  removeFromLocalData(gifToRemove : Gif){

    let item: any;
    for (let i = 1; i < this.favoriteGifsIndex; i++) {
     
      item = localStorage.getItem('favorites'+i.toString());
      let gif: Gif = JSON.parse(item);
      
      if(gif.id === gifToRemove.id){
        localStorage.removeItem('favorites'+i.toString());
        break;
      } 

    }
    
    this.favoriteGifsIndex--;
    localStorage.setItem('favoritesIndex', JSON.stringify(this.favoriteGifsIndex));
  }

  clearData(){
    localStorage.clear();
  }


  addToFavorites(gifToAdd: Gif){

    this.favoriteGifs.push(gifToAdd);
    this.setLocalData(gifToAdd);
  }

  removeFromFavorites(gifToRemove: Gif){

    let indexToDelete: number = 0 ;
    for (let i = 0; i < this.favoriteGifs.length; i++) {
        
      if(gifToRemove.id === this.favoriteGifs[i].id){
        indexToDelete = i;
        break;
      } 
    }
    this.favoriteGifs.splice(indexToDelete,1);
    this.removeFromLocalData(gifToRemove);
  }

}
