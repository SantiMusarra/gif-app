import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Gif } from 'src/app/models/gif.model';
import { GifManagerService } from 'src/app/services/gif-manager.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  gifSearchedList: Gif[] = [];

  query:string = '';

  @HostListener("window:scroll", [])
  onScroll(): void {
      if ((window.innerHeight + window.scrollY) >= document.body.clientHeight) {
              this.onBottomReach();
          }
      };

  constructor(private gifManager: GifManagerService , private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(
      (params: Params) => {
        this.query = params['query'];
        this.gifManager.getSearchedGifFromApi(params['query']);
      });
    this.gifSearchedList = this.gifManager.gifSearchQueryList;
  }

  onBottomReach(){

    this.gifManager.getSearchedGifFromApi(this.query);
  }
}
