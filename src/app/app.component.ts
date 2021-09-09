import { Component, OnInit } from '@angular/core';
import { GifManagerService } from './services/gif-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'gif-app';

  constructor(private gifManager: GifManagerService){

  }
  ngOnInit()  {
      this.gifManager.getLocalData();
    }

}
