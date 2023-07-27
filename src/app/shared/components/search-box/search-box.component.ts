import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {
  @ViewChild('txtSearch') 
  public tagInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  @Output()
  public onText: EventEmitter<string> = new EventEmitter<string>();

  emitTxt(): void{
    this.onText.emit(this.tagInput.nativeElement.value)
  }
}