import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  public rotateCarouselFn:Function|null = null;
  public selectedIndex:number = 0;
  
  ngOnInit(): void {
    this.carouselSetup();
  }

  carouselSetup():void {
    let carousel:HTMLElement = document.querySelector('.carousel')!;
    let cells:NodeListOf<HTMLInputElement> = carousel!.querySelectorAll('.carousel__cell');
    let cellCount:number;
    let selectedIndex = this.selectedIndex;
    let cellWidth = carousel!.offsetWidth;
    let cellHeight = carousel!.offsetHeight;
    let isHorizontal = true;
    let rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
    let radius:any
    let theta:any;
    
    function rotateCarousel() {
      let angle = theta * selectedIndex * -1;
      carousel!.style.transform = 'translateZ(' + -radius + 'px) ' + 
        rotateFn + '(' + angle + 'deg)';
    }

    this.rotateCarouselFn = rotateCarousel;
    
    let prevButton = document.querySelector('.previous-button');
    prevButton!.addEventListener( 'click', function() {
      selectedIndex--;
      rotateCarousel();
    });
    
    let nextButton = document.querySelector('.next-button');
    nextButton!.addEventListener( 'click', function() {
      selectedIndex++;
      rotateCarousel();
    });
    
    let cellsRange:HTMLInputElement = document.querySelector('.cells-range')!;
    cellsRange!.addEventListener( 'change', changeCarousel );
    cellsRange!.addEventListener( 'input', changeCarousel );
    
    function changeCarousel() {
      cellCount = Number(cellsRange!.value);
      theta = 360 / cellCount;
      let cellSize = isHorizontal ? cellWidth : cellHeight;
      radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
      for ( let i=0; i < cells.length; i++ ) {
        let cell = cells[i];
        if ( i < cellCount ) {
          // visible cell
          cell.style.opacity = String(1);
          let cellAngle = theta * i;
          cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
        } else {
          // hidden cell
          cell.style.opacity = String(0);
          cell.style.transform = 'none';
        }
      }
    
      rotateCarousel();
    }
    
    let orientationRadios = document.querySelectorAll('input[name="orientation"]');
    ( function() {
      for ( let i=0; i < orientationRadios.length; i++ ) {
        let radio = orientationRadios[i];
        radio.addEventListener( 'change', onOrientationChange );
      }
    })();
    
    function onOrientationChange() {
      let checkedRadio:HTMLInputElement = document.querySelector('input[name="orientation"]:checked')!;
      isHorizontal = checkedRadio.value == 'horizontal';
      rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
      changeCarousel();
    }
    
    // set initials
    onOrientationChange();    
  }

  handleScroll(event:any) {
    this.selectedIndex = event.deltaY > 0 ? this.selectedIndex + 1 : this.selectedIndex -1;
  }
}
