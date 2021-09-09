import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GifManagerService } from 'src/app/services/gif-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  query: string = '';

  constructor(private gifManager: GifManagerService , private route: Router) { }

  ngOnInit(): void {
  }


  onSearch(){

    this.gifManager.getSearchedGifFromApi(this.query);
    this.route.navigate(['/search' , this.query]);
    

  }
}
