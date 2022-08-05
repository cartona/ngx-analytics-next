import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsBrowserSettings, InitOptions } from '@segment/analytics-next';
import { AnalyticsNextService } from './ngx-analytics-next.service';
import { ANALYTICS_SETTINGS, INIT_OPTIONS } from './ngx-analytics-next.config';

/**
 * Segment Module
 */
@NgModule({
  imports: [CommonModule],
})
export class AnalyticsNextModule {
  /**
   * Segment Module Initialisation
   *
   * @param settings Segment Configuration
   * @param options Segment Configuration
   * @returns Segment Module
   */
  public static forRoot(
    settings: AnalyticsBrowserSettings,
    options?: InitOptions
  ): ModuleWithProviders<AnalyticsNextModule> {
    return {
      ngModule: AnalyticsNextModule,
      providers: [
        { provide: ANALYTICS_SETTINGS, useValue: settings },
        { provide: INIT_OPTIONS, useValue: options },
        AnalyticsNextService,
      ],
    };
  }

  /**
   * Segment Module Constructor
   *
   * @param parentModule Must be null
   */
  constructor(@Optional() @SkipSelf() parentModule: AnalyticsNextModule) {
    if (parentModule) {
      throw new Error(
        'AnalyticsNextModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
