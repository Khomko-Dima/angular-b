import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../../service/alert.service';
import {Subscription} from 'rxjs';
import {transition, trigger, useAnimation} from '@angular/animations';
import {zoomInLeft} from 'ng-animate';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
  animations: [
    trigger('zoomInLeft',
      [
        transition(
          'void => *',
          useAnimation(zoomInLeft, {
            params: { timing: 0.5, delay: 0 }
          })
        )
      ]
    )
  ]
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000

  public text: string
  public type = 'success'

  aSub: Subscription

  constructor(private alertService: AlertService) { }

  ngOnInit(){
    this.aSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type

      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
