import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gif } from 'src/app/models/gif.model';
import { GifManagerService } from 'src/app/services/gif-manager.service';

@Component({
  selector: 'app-gif-card',
  templateUrl: './gif-card.component.html',
  styleUrls: ['./gif-card.component.css']
})
export class GifCardComponent implements OnInit {

  @Input()  gifCard!: Gif;
  loadComplete: boolean = false ; 
  constructor(private gifManager: GifManagerService, private route: Router) { }

  ngOnInit(): void {
  }

  onLoadComplete(){
    this.loadComplete = true;
  }

  onLoadGifDetail(){
    this.route.navigate(['/gif-detail', this.gifCard.id]);
  }
  addToFavorites(){
    if(!this.gifCard.isFavorite){
      this.gifManager.addToFavorites(this.gifCard);
      this.gifCard.isFavorite = true;
    }
    else {
      this.gifManager.removeFromFavorites(this.gifCard);
      this.gifCard.isFavorite = false;
    }
  }
}
