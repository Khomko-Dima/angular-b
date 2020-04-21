import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/service/alert.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {slideInDown} from 'ng-animate';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass'],
  animations: [
    trigger('slideInDown',
      [
        transition(
          '* => *',
          useAnimation(slideInDown, {
            params: { timing: 0.5, delay: 0 }
          })
        )
      ]
    )
  ]
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  post: Post
  submitted = false

  uSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        description: new FormControl(post.description, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
      description: this.form.value.description
    }).subscribe(() => {
      this.submitted = false
      this.alert.success('Пост обновлен')
    })
  }
}
