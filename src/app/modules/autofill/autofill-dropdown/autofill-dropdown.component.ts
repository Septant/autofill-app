import {Component, inject, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {AutofillService} from "../autofill.service";

@Component({
  selector: 'app-autofill-dropdown',
  templateUrl: './autofill-dropdown.component.html',
  styleUrls: ['./autofill-dropdown.component.scss'],
  providers: [AutofillService]
})
export class AutofillDropdownComponent implements OnInit {


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
  text = '';  // добавить @Input() в случае необходимости извлечения ввода

  constructor(private autofillService: AutofillService) {

  }

  ngOnInit() {

    //  считывание ввода, поиск подходящих опций
    this.filteredOptions = this.formula.valueChanges.pipe(
      startWith(''),
      map(value => {

        const inputEl = document.getElementById('formulaInput') as HTMLInputElement;

        const cursor = inputEl.selectionStart as number;

        const valueToFilter = this.autofillService.inputCut(value, cursor, this.options);   //  обрезание шелухи - символов, не входящих во ввод текущей опции

        return this._filter(valueToFilter);
      }),
    );
  }

  // выбор множества значений подходящих к фильтру
  private _filter(value: string): string[] {

    //  фильтр при курсоре в скобках
    if (value.includes('(') && value.includes(')')) {
      value = value.substring(value.lastIndexOf('(') + 1, value.indexOf(')')).toLowerCase();
      return [...this.mathConstants, ...this.functions].filter(option => option.toLowerCase().includes(value));
    }

    // фильтр для пустой строки идущей после закрывающей скобки
    if (value.includes(')')) {
      value = '';
      return this.options.filter(option => option.toLowerCase());
    }

    // фильтр для операндов
    for (const str of [...this.mathOps, ...this.boolOps])
      if (str === value) {
        return [...this.mathConstants, ...this.functions].filter(option => option.toLowerCase());
      }

    const inputValue = value.toLowerCase();

    // остальное
    return this.options.filter(option => option.toLowerCase().includes(inputValue));

  }


  onKeyDown(event: KeyboardEvent): void {

    const inputEl = event.target as HTMLInputElement;

    const position = inputEl.selectionStart as number;

    this.autofillService.addBrackets(event, inputEl, position);  // парные скобки ()

  }

  // вставка выбранной опции в имеющуюся строку
  displayFn = (value: any): string => {

    const input = document.getElementById('formulaInput') as HTMLInputElement;

    //  zero-case
    if (!value)
      value = '';

    if (!input.value) {
      input.value = value;
      if (value.includes('()'))
        input.setSelectionRange(value.length - 1, value.length - 1);
      return input.value;
    }


    const start = input.selectionStart as number;

    const beforeValue = input.value.slice(0, start);
    const afterValue = input.value.slice(start)

    const spaceIdx = beforeValue.lastIndexOf(' ');
    let bracketIdx = beforeValue.lastIndexOf('(');

    //  вставка по пробелу
    if (spaceIdx > bracketIdx) {

      value = ' ' + value;
      this.autofillService.insertValue(input, spaceIdx, beforeValue, value, afterValue);
    }

    //  вставка по открывающей скобке
    else if (bracketIdx > spaceIdx) {
      bracketIdx += 1;
      this.autofillService.insertValue(input, bracketIdx, beforeValue, value, afterValue);
    }

    // остальные вставки
    else {
      input.value = value;
      if (value.includes('()'))
        input.setSelectionRange(input.value.length - 1, input.value.length - 1);
      else
        input.setSelectionRange(input.value.length, input.value.length);
    }

    // обновление вывода
    this.text = input.value;

    return input.value;
  };

  // запись строки при стандартном вводе
  onInput(event: Event) {
    const inputEl = event.target as HTMLInputElement;
    if (!inputEl.value)
      inputEl.value = '';
    this.text = inputEl.value;
  }

}




