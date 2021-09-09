import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Gif } from 'src/app/models/gif.model';
import { Image } from 'src/app/models/image.model';
import { GifManagerService } from 'src/app/services/gif-manager.service';

@Component({
  selector: 'app-gifs-container',
  templateUrl: './gifs-container.component.html',
  styleUrls: ['./gifs-container.component.css']
})
export class GifsContainerComponent implements OnInit {

  @HostListener("window:scroll", [])
  onScroll(): void {
      if ((window.innerHeight + window.scrollY) >= document.body.clientHeight) {
              this.onBottomReach();
          }
      };
  gifListToDisplay: Gif[] = [];

  constructor(private gifManager : GifManagerService) { 
   
  }

  ngOnInit(): void {
    //Caricare gif da giphy tramite service
    
    this.gifListToDisplay = this.gifManager.gifList;
  }

  
  onBottomReach(){

    this.gifManager.getTrendingGifFromApi();
    console.log("Requesting another batch")
  }
  

} 
