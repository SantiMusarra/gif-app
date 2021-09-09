import { Image } from "./image.model";

export class Gif{

  id: string;
  url: string;
  username: string;
  source: string;
  update_datetime: string
  title: string;
  image : Image;
  isFavorite: boolean;
 
  constructor(id: string , url: string , username: string , source: string , update_datetime: string , 
    title: string , isFavorite: boolean , image : Image ){


    this.id = id;
    this.url = url;
    this.username = username;
    this.source = source;
    this.update_datetime = update_datetime;
    this.title = title;
    this.isFavorite = isFavorite;
    this.image = image;
    
  }

}