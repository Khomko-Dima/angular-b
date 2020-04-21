import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {lightSpeedIn, lightSpeedOut, slideInDown} from 'ng-animate';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.sass'],
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
    ),
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

export class AdminLayoutComponent implements OnInit {

  active = false
  page = document.querySelector('body')

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
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

