import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-baner',
  templateUrl: './baner.component.html',
  styleUrls: ['./baner.component.css'],
})
export class BanerComponent implements OnInit {
  @Input()
  ImagemUrl = '';
  @Input()
  Text = '';
  constructor() {}

  ngOnInit(): void {}
}
