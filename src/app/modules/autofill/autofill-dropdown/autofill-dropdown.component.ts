import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith, Subject} from "rxjs";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";

@Component({
  selector: 'app-autofill-dropdown',
  templateUrl: './autofill-dropdown.component.html',
  styleUrls: ['./autofill-dropdown.component.scss']
})
export class AutofillDropdownComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  formula = new FormControl();

  mathOps: string[] = ['+', '-', '*', '/'];

  mathConstants: string[] = ['e', 'PI', 'TRUE', 'FALSE', 'NULL'];

  boolOps: string[] = ['=', '!=', '<>', '<', '<=', '>', '>=', '&&', '||'];

  functions: string[] = ['NOT()', 'IF()', 'RANDOM()', 'MIN()', 'MAX()', 'ABS()', 'ROUND()', 'FLOOR()', 'CEILING()',
    'LOG()', 'LOG10()', 'SQRT()', 'SINR()', 'COSR()', 'TANR()', 'COTR()', 'SECR()', 'CSCR()',
    'ASINR()', 'ACOSR()', 'ATANR()', 'ACOTR()', 'ATAN2R()', 'SIN()', 'COS()', 'TAN()', 'COT()',
    'SEC()', 'CSC()', 'ASIN()', 'ACOS()', 'ATAN()', 'ACOT()', 'ATAN2()', 'SINH()', 'COSH()',
    'TANH()', 'COTH()', 'SECH()', 'CSCH()', 'ASINH()', 'ACOSH()', 'ATANH()', 'RAD()', 'DEG()', 'FACT()'
  ];

  options: string[] = [...this.mathOps, ...this.mathConstants, ...this.boolOps, ...this.functions];

  filteredOptions!: Observable<string[]>;
  enteredValue: string = '';


  ngOnInit() {
    this.filteredOptions = this.formula.valueChanges.pipe(
      startWith(''),
      map(value => {
        const inputParts = value.split(' ');
        const lastInputPart = inputParts[inputParts.length - 1];
        return this._filter(lastInputPart)
      }),
    );
  }

  private _filter(value: string): string[] {
    if (value.includes('(') && value.includes(')')) {
      value = value.substring(value.lastIndexOf('(') + 1, value.indexOf(')')).toLowerCase();
      return [...this.mathConstants, ...this.functions].filter(option => option.toLowerCase().startsWith(value))
    }
    if (value.includes(')')) {
      value = ''
      return this.options.filter(option => option.toLowerCase());
    }


    for (const str of [...this.mathOps, ...this.boolOps])
      if (str === value)
        return [...this.mathConstants, ...this.functions].filter(option => option.toLowerCase());

    const inputValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().startsWith(inputValue));
  }

  onKeyDown(event: KeyboardEvent): void {

    const inputEl = event.target as HTMLInputElement;

    const start = inputEl.selectionStart as number;
    const end = inputEl.selectionEnd as number;

    if (event.key === '(') {
      inputEl.value += `()`;
      inputEl.setSelectionRange(start + 1, end + 1);
      this.enteredValue = inputEl.value
      event.preventDefault();
    }

    this.autocomplete.openPanel();
  }

  displayFn(value: string) {

    if (!value)
      value = ''

    const input = document.getElementById('formulaInput') as HTMLInputElement;

    if (!input.value) {
      input.value = value;
      if (value.includes('()'))
        input.setSelectionRange(value.length - 1, value.length - 1);
      this.enteredValue = value;
      return value;
    }

    this.enteredValue = input.value;

    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;

    const pos = this.enteredValue.slice(0, selectionStart as number) + value;
    this.enteredValue = this.enteredValue.slice(0, selectionStart as number) + value + this.enteredValue.slice(selectionEnd as number);

/*    input.value = this.enteredValue;*/

    console.log(this.enteredValue)

    input.setSelectionRange(pos.length, pos.length)

    return this.enteredValue;
  };

  onInput(event: Event) {

    const inputEl = event.target as HTMLInputElement;
    if (!inputEl.value)
      inputEl.value = '';
  }
}

