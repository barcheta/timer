import { Component, OnInit, ViewChild, OnDestroy, ElementRef  } from '@angular/core';
import {  Subscription, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy{
  timerId
  _start = new Date(0, 0, 0, 0, 0, 0, 0);
  hourse
  minutes
  seconds
  clicks = 0
  subscription: Subscription

  @ViewChild('timer') timer: ElementRef<any>
  constructor() { }

  ngOnInit() {}


  start() {


    if (this.subscription) {
      this.unsubscribe()
      this.timerId = clearTimeout(this.timerId);
    }

    let observ$ = new Observable(observer => {
      this.timerId = setInterval(() => {
        this._start.setSeconds(this._start.getSeconds() + 1);

        this.hourse = this._start.getHours();
        if (this.hourse < 10) this.hourse = '0' + this.hourse;

        this.minutes = this._start.getMinutes();
        if (this.minutes < 10) this.minutes = '0' + this.minutes;

        this.seconds = this._start.getSeconds();
        if (this.seconds < 10) this.seconds = '0' + this.seconds;

        observer.next(`${this.hourse}:${this.minutes}:${this.seconds}`)
      }, 1000)
    })


    this.subscription = observ$.subscribe(res => { 
      this.timer.nativeElement.innerHTML = res
    })

  }

  stop() {
    //this.timerId = clearTimeout(this.timerId);
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
    this.clear() 
  }

  reset() {
    this.clear() 
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
    this.start()
  }

  clear() {
    this.timer.nativeElement.innerHTML = '00:00:00'
    clearTimeout(this.timerId);
    this.timerId = undefined;
    this._start = new Date(0, 0, 0, 0, 0, 0, 0);
  }

  wait() {
    this.clicks++;
    if (this.clicks == 1) {
      setTimeout(this.delayF.bind(this), 300);
    }
  }


  delayF() {
        if(this.clicks == 2) {
          if(this.subscription) {
            this.timerId = clearTimeout(this.timerId);
            this.subscription.unsubscribe()
          }
        } 
        this.clicks = 0;
  }

  unsubscribe() { 
    this.subscription.unsubscribe()
  }

  ngOnDestroy(): void {
    if(this.subscription)
    this.unsubscribe()

  }

}
