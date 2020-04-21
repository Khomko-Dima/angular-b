import { Component, OnInit } from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {Observable} from 'rxjs';
import {Post} from '../shared/interfaces';
import {transition, trigger, useAnimation} from '@angular/animations';
import {slideInLeft} from 'ng-animate';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
  animations: [
    trigger('slideInLeft',
      [transition('* => *', useAnimation(slideInLeft, {
        params: { timing: 0.5, delay: 0 }
      }))])
  ]
})
export class HomePageComponent implements OnInit {

  posts$: Observable<Post[]>
  slideInLeft: any
  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.posts$ = this.postsService.getAll()
  }

}
