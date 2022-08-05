import { InjectionToken } from '@angular/core';
import { AnalyticsSettings, InitOptions } from '@segment/analytics-next';

/** Analytics Next Setting Injection Token */
export const ANALYTICS_SETTINGS: InjectionToken<AnalyticsSettings> =
  new InjectionToken<AnalyticsSettings>('ngx-analytics-next.config');

/** Analytics Next Setting Injection Token */
export const INIT_OPTIONS: InjectionToken<InitOptions> =
  new InjectionToken<InitOptions>('ngx-analytics-next.config');

export const DEFAULT_ANALYTICS_SETTINGS: AnalyticsSettings = { writeKey: '' };
export const DEFAULT_INIT_OPTIONS: InitOptions = {};
