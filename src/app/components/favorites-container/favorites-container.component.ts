import { Component, OnInit } from '@angular/core';
import { Gif } from 'src/app/models/gif.model';
import { GifManagerService } from 'src/app/services/gif-manager.service';

@Component({
  selector: 'app-favorites-container',
  templateUrl: './favorites-container.component.html',
  styleUrls: ['./favorites-container.component.css']
})
export class FavoritesContainerComponent implements OnInit {

  favoriteGifList: Gif[] = [];  //Local reference of the service favoriteList list

  constructor(private gifManager: GifManagerService) { 
    

    for (let gif of gifManager.favoriteGifsMap.values()) {
      this.favoriteGifList.push(gif);                //37 35 40
  }
  }

  ngOnInit(): void {
    
  }

}
