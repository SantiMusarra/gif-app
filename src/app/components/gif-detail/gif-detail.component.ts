import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Gif } from 'src/app/models/gif.model';
import { Image } from 'src/app/models/image.model';
import { GifManagerService } from 'src/app/services/gif-manager.service';
@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.css']
})
export class GifDetailComponent implements OnInit {

   gifToDisplay!: Gif ;
  
  
  requestDone: boolean = false;
  

  constructor(private route: ActivatedRoute, private gifManager: GifManagerService) {
    
  }


  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
       
        this.gifManager.getGifByIdFromApi(params['id']).subscribe( (response) =>{
          
          this.gifToDisplay = this.gifManager.fetchResponseById(response);
          
          this.requestDone = true;
        });
        console.log("GIF ID From giF Detail  " + params['id']);
        
      }
    )
  }
  
  
  addToFavorites(){
    if(!this.gifToDisplay.isFavorite){
      this.gifManager.addToFavorites(this.gifToDisplay);
      this.gifToDisplay.isFavorite = true;
    }
    else {
      this.gifManager.removeFromFavorites(this.gifToDisplay);
      this.gifToDisplay.isFavorite = false;
    } 
  }
}
