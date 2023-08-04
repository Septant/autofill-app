# AutofillApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Строка с автозаполнением для формул. За основу взят [angular material Autocomplete](https://v13.material.angular.io/components/autocomplete/overview). 

Принцип работы: по нажатию на строку ввода открывается список доступных опций. Компонент реагирует на ввод и предлагает варианты вставки на основе полученной строки. Если выбирается функция funcname(), курсор ввода переводится внутри скобок (), в остальных случаях в точку следующую за элементов. Переменные и операнды необходимо разделять пробелом для корректной работы и лучшей читаемости введённого выражения.
