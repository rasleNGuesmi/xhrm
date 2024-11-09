import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.scss'],
})
export class CircleProgressComponent implements OnInit {
  @Input() subtitle: string;
  @Input() outerStrokeColor: string;
  @Input() backgroundColor: string;
  @Input() percent: number;
  @Input() radius: number;
  @Input() size: string = '28px';
  @Input() backgroundPadding: number = -10;

  constructor() {}

  ngOnInit(): void {}
}
