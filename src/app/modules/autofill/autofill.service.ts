import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutofillService {


  constructor() {
  }

  addBrackets(event: KeyboardEvent, input: HTMLInputElement, position: number) {

    if (event.key === '(') {
      input.value = input.value.slice(0, position) + '()' + input.value.slice(position);
      input.setSelectionRange(position + 1, position + 1);
      event.preventDefault();
    }

  }

  inputCut(input: string, cursor: number, options: string[]): string {

    let optionTarget: string = input.slice(0, cursor);

    const spaceIdx = optionTarget.lastIndexOf(' ');
    const bracketIdx = optionTarget.lastIndexOf('(');

    if (spaceIdx > bracketIdx) {
      optionTarget = optionTarget.slice(spaceIdx).trim();
    } else {
      optionTarget = optionTarget.slice(bracketIdx + 1).trim();
    }

    if (!options.filter(option => option.toLowerCase().includes(optionTarget))) {
      optionTarget = '';
    }

    return optionTarget
  }
}
