import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  
  private deBouncer: Subject<string> = new Subject<string>();
  private deBouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialSearchTxt: string = '';

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.deBouncerSuscription = this.deBouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.deBouncerSuscription?.unsubscribe()
  }

  onSearchType(text: string): void{
    this.deBouncer.next(text);
  }
}