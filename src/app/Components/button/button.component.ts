import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input()
  button = 'hhhh';
  @Input()
  selecionado = false;

  @Output()
  click = new EventEmitter<void>();
  constructor() {}
  ngOnInit(): void {}
  onclick() {
    this.click.emit();
  }
}
