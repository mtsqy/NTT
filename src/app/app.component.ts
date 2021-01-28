import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NTT Question'

  @ViewChild('searchBox') inputBox: ElementRef | undefined;
  cachedInput: string = ''
  recursionInput: string = ''
  orderInput: string = ''
  cachedNumber: number = NaN
  recursionResult: number = NaN
  inputArr: any[] = []
  orderResult: string = ''
  constructor() {}
  
  // I'm sorry I didn't catch up which one to be expected answer from question number 1, so I just created two different methods

  calcCachedNumber(n: number) {
    if (n < 1) return
    if (!this.cachedNumber) this.cachedNumber = n
    return this.cachedNumber = n*this.cachedNumber   
  }
  
  calcRecursionMultiply(n: number, maxIteration: number): number {
    if(n == maxIteration) return n
    return n*this.calcRecursionMultiply(n+1, maxIteration)
  }
  
  onKeydown(fxType: string) {
    switch (fxType) {
      case 'cachedNumber':
        this.calcCachedNumber(parseInt(this.cachedInput.replace(/\D/g, "")))
        break
      case 'recursionMultiply':
        this.recursionResult = this.calcRecursionMultiply(1, parseInt(this.recursionInput.replace(/\D/g, "")))
        break
      case 'sortOrder':
        this.inputArr.push(this.orderInput.split(','))
        this.orderResult = this.mode(this.inputArr.flat())
    }
  }

  mode(arr: any[]) {
    if (arr.length == 0) null
    let modeMap: any = {}
    let maxEl = arr[0]
    let maxCount = 1
    for (let i = 0; i < arr.length; i++) {
      let el = arr[i]
      if (modeMap[el] == null) modeMap[el] = 1
      else modeMap[el]++
      if (modeMap[el] > maxCount) {
        maxEl = el
        maxCount = modeMap[el]
      }
    }
    return maxEl
  }

  ngOnInit() { 
  }
}
