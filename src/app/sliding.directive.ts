import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSliding]'
})
export class SlidingDirective {
  constructor(private el:ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }

  // mousewheel = onElement ; window:mousewheel on whole window
  @HostListener('window:mousewheel') onScroll(e:any) {
    console.log('dasdsad');
    this.el.nativeElement.style.transform = 'rotate3d(0, 1, 0, 80deg)';
  }
}
