import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
})
export class ConfirmComponent implements OnInit {
  confirmHTML = '';
  afterClosed = new EventEmitter();
  maxZIndex = 0;
  constructor() {}

  ngOnInit(): void {
    this.maxZIndex = this.getMaxZIndex();
    setTimeout(() => {
      this.maxZIndex = this.getMaxZIndex();
    }, 2000);
  }

  cancelClick(): void {
    this.afterClosed.emit(false);
  }

  okClick(): void {
    this.afterClosed.emit(true);
  }

  getMaxZIndex(): number {
    const elements = document.getElementsByTagName('*');
    let maxZIndex = 0;

    for (let i = 0; i < elements.length; i++) {
      const zIndex = window.getComputedStyle(elements[i]).zIndex;
      if (zIndex !== 'auto') {
        maxZIndex = Math.max(maxZIndex, parseInt(zIndex, 10));
      }
    }
    return maxZIndex;
  }
}
