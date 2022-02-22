import { Component, OnInit, HostListener } from '@angular/core';
import GLSlideshow from 'GLSlideshow';
import GLTransitions from '../assets/json/gl-transitions.json';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('* <=> *', [
        animate(2000)
      ])
    ]),
    trigger('rotate', [
      state('noRotation', style({
        transform: 'rotateY(0deg)'
      })),
      state('halfRotation', style({
        transform: 'rotateY(180deg)'
      })),
      state('fullRotation', style({
        transform: 'rotateY(360deg)'
      })),
      transition('* <=> *', [
        animate(5000)
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  isOpen = true;
  rotationState = 'noRotation';

  readonly images:Array<string> = [
    '/assets/img/desert.png',
    '/assets/img/fuji.png',
    '/assets/img/beach.png',
    '/assets/img/aurora.png'
  ];

  title = 'slider';

  ngOnInit(): void {
    this.setupCanvas();
  }

  toggle() {
    this.rotationState = 'halfRotation';
  }

  onDone() {
    // console.log('ssssss')
    // this.isOpen = !this.isOpen;
  }

  onRotationDone() {
    console.log('dasadda');
    if(this.rotationState === 'noRotation')
    {
      this.rotationState = 'halfRotation';
    }
    else if (this.rotationState === 'halfRotation')
    {
      this.rotationState = 'noRotation';
    }
    else if (this.rotationState === 'fullRotation')
    {
      this.rotationState = 'halfRotation';
    }
  }

  setupCanvas() {
    let canvasObject = document.getElementById( 'myCanvas' )! as HTMLCanvasElement;
    const shader = GLTransitions.find(obj => {
      return obj.name === 'cube'
    })!.glsl;
    const uniforms = {      "persp": 0.7,
    "unzoom": 0.3,
    "reflection": 0.4,
    "floating": 3};

    GLSlideshow.addShader('cube', shader, uniforms);

    const slideshow = new GLSlideshow(
      this.images,
      {
        canvas: canvasObject,
        width: 1024,
        height: 576,
        duration: 1000,
        interval: 5000,
        effect: 'cube'
      }
    );
  }
}
