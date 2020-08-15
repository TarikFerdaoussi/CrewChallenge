import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, distinctUntilChanged, debounceTime} from 'rxjs/operators';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'autocomplete-filter',
  templateUrl: './auto-complete-filter.component.html',
  styleUrls: ['./auto-complete-filter.component.scss'],
})
export class AutoCompleteFilterComponent  {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredOptions: Observable<string[]>;
  items: string[] = [];
  @Input() options: string[];
  @Output() itemsSelected: EventEmitter<string[]> = new EventEmitter<string[]>();
  @ViewChild('itemInput') itemInput: ElementRef;

  constructor() {
    this.filteredOptions = this.itemCtrl.valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        map((option: string | null) => option ? this._filter(option) : this.options.slice()));
  }

  add(event): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.items.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.itemCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.items.indexOf(fruit);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
    this.itemsSelected.emit(this.items);

  }

  selected(event): void {
    this.items.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
    this.itemsSelected.emit(this.items);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
 
}