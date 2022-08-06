# ngx-analytics-next

An Angular module wrapper for Segment's official `analytics-next` JS library.

It is inspired by [@opendecide/ngx-segment-analytic](https://github.com/opendecide/ngx-segment-analytics)

## Installation

To install this library, run:

```bash
$ yarn add ngx-analytics-next
```

## Using Segment

Add the `AnalyticsNextModule` to your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the Analytics Next module
import { AnalyticsNextModule } from 'ngx-analytics-next';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Analytics Next Importation
    AnalyticsNextModule.forRoot({ writeKey: 'YOUR_WRITE_APIKEY' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

You can use the `AnalyticsNextService` in any constructor as a injected service :

```typescript
import { Component, OnInit } from '@angular/core';
import { AnalyticsNextService } from 'ngx-analytics-next';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(private analyticsService: AnalyticsNextService) {
  }

  public ngOnInit() {
    this.analyticsService.track('load an hero')
        .then(() => console.log("Event sended"));
  }

}
```

## API

This API is compatible with `analytics.js` but returns `Promises` instead of taking `callbacks` in parameters.

```typescript
load(apiKey: string, options: any);
get plugins: {[pluginName :string]: SegmentPlugin};
identify(userId?: string, traits?: any, options?: any): Promise<SegmentService>;
track(event: string, properties?: any, options?: any): Promise<SegmentService>;
page(category?: string, name?: string, properties?: any, options?: any): Promise<SegmentService>;
group(groupId: string, traits?: any): Promise<SegmentService>;
alias(userId: string, previousId?: string, options?: any): Promise<SegmentService>;
ready(): Promise<SegmentService>;
user(): any;
id(): any;
traits(): any;
reset(): void;
debug(enabled?: boolean): void;
on(method: string, callback: (event?: string, properties?: any, options?: any) => any): void;
trackLink(elements: HTMLElement | HTMLElement[], event: string | Function, properties?: Object | Function): void;
trackForm(forms: HTMLElement | HTMLElement[], event: string | Function, properties?: Object | Function): void;
timeout(timeout: number): void;
addSourceMiddleware(middleware: ({integrations, payload, next}) => void): void;
```

## Development

To lint all `*.ts` files:

```bash
$ eslint .
```

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ yarn build
```

To publish on npmjs registry :
```bash
$ npm publish dist
```

## TODO

- [ ] A proper documentation
- [ ] A proper unit tests

## License

MIT ©2019 [Cartona](https://www.cartona.com)
