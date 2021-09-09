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
    this.favoriteGifList = gifManager.favoriteGifs;
  }

  ngOnInit(): void {
    
  }

}
