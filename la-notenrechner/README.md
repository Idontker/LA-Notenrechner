# LaNotenrechner

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to add a package first, that implements end-to-end testing capabilities.

## Further help

In order to get more help on the Angular CLI, use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Deployment

Use the following command to build the app with a base direction. Change the URL, if you have a custom domain.

```
    ng build --base-href "https://idontker.github.io/LA-Notenrechner/"
```

The following will deploy the app to the server:

```
    npx angular-cli-ghpages --dir dist/la-notenrechner
```

You can also use
`npm run deploy`
to execute these comands with the given parameters. Make sure to execute from the /la-notenrechner folder.

