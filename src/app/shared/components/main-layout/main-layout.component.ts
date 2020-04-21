import { Component, OnInit } from '@angular/core';
import {transition, trigger, useAnimation} from '@angular/animations';
import {lightSpeedIn, lightSpeedOut} from 'ng-animate';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass'],
  animations: [
    trigger('lightSpeedIn',
      [
        transition(
          'void => *',
          useAnimation(lightSpeedIn, {
            params: { timing: 0.5, delay: 0 }
          })
        ),
        transition(
          '* => void',
          useAnimation(lightSpeedOut, {
            params: { timing: 0.5, delay: 0 }
          })
        )
      ]
    )
  ]
})
export class MainLayoutComponent implements OnInit {

  active = false
  page = document.querySelector('body')

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    if (!this.active) {
      this.active = true
      this.page.classList.add('is-menu-visible')
    } else {
      this.active = false
      this.page.classList.remove('is-menu-visible')
    }
  }
}
