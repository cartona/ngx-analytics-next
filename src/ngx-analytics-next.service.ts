import { Inject, Injectable } from '@angular/core';
import {
  AnalyticsBrowser,
  AnalyticsSettings,
  InitOptions,
} from '@segment/analytics-next';
import {
  ANALYTICS_SETTINGS,
  DEFAULT_ANALYTICS_SETTINGS,
  DEFAULT_INIT_OPTIONS,
  INIT_OPTIONS,
} from './ngx-analytics-next.config';

export interface SegmentPlugin {
  // Video Plugins
  new (player: any, accessToken: string): any;

  // Others plugins
  new (): any;
}

export type SegmentMiddleware = ({ integrations, payload, next }) => void;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsNextService {
  private readonly settings: AnalyticsSettings;
  private readonly options: InitOptions;
  private analytics: any;

  /**
   * @param userSettings Browser window
   * @param initOptions Segment configuration
   */
  constructor(
    @Inject(ANALYTICS_SETTINGS) userSettings: AnalyticsSettings,
    @Inject(INIT_OPTIONS) initOptions?: InitOptions
  ) {
    this.settings = { ...DEFAULT_ANALYTICS_SETTINGS, ...userSettings };
    this.options = { ...DEFAULT_INIT_OPTIONS, ...initOptions };

    if (
      typeof this.settings.writeKey === 'undefined' ||
      this.settings.writeKey === ''
    ) {
      console.error(
        'The API Key cannot be an empty string if Segment must be loaded on initialization.'
      );
      return;
    }

    this.load(this.settings, this.options);
  }

  /**
   * Load Segment configuration.
   *
   * @param settings Write API Key
   * @param options Optional parameters
   */
  public load(settings: AnalyticsSettings, options?: InitOptions) {
    this.analytics = AnalyticsBrowser.load(settings, options);
  }

  /**
   * The identify method is how you associate your users and their actions to a recognizable userId and traits.
   *
   * @param userId The database ID for the user.
   * @param traits A dictionary of traits you know about the user, like their email or name
   * @param options A dictionary of options.
   *
   * @returns
   */
  public identify(
    userId?: string,
    traits?: any,
    options?: any
  ): Promise<AnalyticsNextService> {
    return new Promise((resolve) => {
      this.analytics.identify(userId, traits, options, () => resolve(this));
    });
  }

  /**
   * The track method lets you record any actions your users perform.
   *
   * @param event The name of the event you’re tracking.
   * @param properties A dictionary of properties for the event.
   * @param options A dictionary of options.
   *
   * @returns
   */
  public track(
    event: string,
    properties?: any,
    options?: any
  ): Promise<AnalyticsNextService> {
    return new Promise((resolve) => {
      this.analytics.track(event, properties, options, () => resolve(this));
    });
  }

  /**
   * The page method lets you record page views on your website, along with optional extra information about the page being viewed.
   *
   * @param name The name of the page.
   * @param properties A dictionary of properties of the page.
   * @param options A dictionary of options.
   *
   * @returns
   */
  public page(
    name?: string,
    properties?: any,
    options?: any
  ): Promise<AnalyticsNextService>;

  /**
   * The page method lets you record page views on your website, along with optional extra information about the page being viewed.
   *
   * @param category The category of the page.
   * @param name The name of the page.
   * @param properties A dictionary of properties of the page.
   * @param options A dictionary of options.
   *
   * @returns
   */
  public page(
    category: string,
    name: string,
    properties?: any,
    options?: any
  ): Promise<AnalyticsNextService>;

  /**
   * The page method lets you record page views on your website, along with optional extra information about the page being viewed.
   *
   * @param category The category of the page.
   * @param name The name of the page.
   * @param properties A dictionary of properties of the page.
   * @param options A dictionary of options.
   *
   * @returns
   */
  public page(
    category?: string,
    name?: string,
    properties?: any,
    options?: any
  ): Promise<AnalyticsNextService> {
    return new Promise((resolve) => {
      this.analytics.page(category, name, properties, options, () =>
        resolve(this)
      );
    });
  }

  /**
   * The group method associates an identified user with a company, organization, project, workspace, team, tribe, platoon,
   * assemblage, cluster, troop, gang, party, society or any other name you came up with for the same concept.
   *
   * @param groupId The Group ID to associate with the current user.
   * @param traits A dictionary of traits for the group.
   *
   * @returns
   */
  public group(groupId: string, traits?: any): Promise<AnalyticsNextService> {
    return new Promise((resolve) => {
      this.analytics.group(groupId, traits, () => resolve(this));
    });
  }

  /**
   * The alias method combines two previously unassociated user identities.
   *
   * @param userId The new user ID you want to associate with the user.
   * @param previousId The previous ID that the user was recognized by. This defaults to the currently identified user’s ID.
   * @param options A dictionary of options.
   *
   * @returns
   */
  public alias(
    userId: string,
    previousId?: string,
    options?: any
  ): Promise<AnalyticsNextService> {
    return new Promise((resolve) => {
      this.analytics.alias(userId, previousId, options, () => resolve(this));
    });
  }

  /**
   * The ready method allows you execute a promise that will be called as soon as all of your enabled destinations have loaded
   * and analytics.js has completed initialization.
   *
   * @returns
   */
  public ready(): Promise<AnalyticsNextService> {
    return new Promise((resolve) => {
      this.analytics.ready(() => resolve(this));
    });
  }

  /**
   * Return informations about the currently identified user
   *
   * @returns Informations about the currently identified user
   */
  public user(): any {
    return this.analytics.user();
  }

  /**
   * Return identifier about the currently identified user
   *
   * @returns Identifier about the currently identified user
   */
  // public id(): string | null {
  //   // return this.analytics.id();
  // }

  /**
   * Override the default Anonymous ID
   *
   * @param anonymousId New anonymous ID
   */
  public setAnonymousId(anonymousId: string): void {
    this.analytics.setAnonymousId(anonymousId);
  }

  /**
   * Return traits about the currently identified user
   *
   * @returns Traits about the currently identified user
   */
  public traits(): any {
    return this.analytics.user().traits();
  }

  /**
   * Reset the id, including anonymousId, and clear traits for the currently identified user and group.
   */
  public reset(): void {
    this.analytics.reset();
  }

  /**
   * Turn on/off debug mode, logging helpful messages to the console.
   *
   * @param enabled Enable or not the debug mode
   */
  public debug(enabled?: boolean): void {
    this.analytics.debug(enabled);
  }

  /**
   * Set listeners for these events and run your own custom code.
   *
   * @param method Name of the method to listen for
   * @param callback A function to execute after each the emitted method
   */
  public on(
    method: string,
    callback: (event?: string, properties?: any, options?: any) => any
  ): void {
    this.analytics.on(method, callback);
  }

  /**
   * Attaches the `track` call as a handler to a link
   *
   * @param elements DOM element or an array of DOM elements to be bound with track method.
   * @param event The name of the event, passed to the `track` method or a function that returns a string to be used
   *              as the name of the track event.
   * @param properties A dictionary of properties to pass with the `track` method.
   */
  public trackLink(
    elements: HTMLElement | HTMLElement[],
    event: string | Function,
    properties?: any | Function
  ): void {
    this.analytics.trackLink(elements, event, properties);
  }

  /**
   * Binds a `track` call to a form submission.
   *
   * @param forms The form element to track or an array of form
   * @param event The name of the event, passed to the `track` method.
   * @param properties A dictionary of properties to pass with the `track` method.
   */
  public trackForm(
    forms: HTMLElement | HTMLElement[],
    event: string | Function,
    properties?: any | Function
  ): void {
    this.analytics.trackForm(forms, event, properties);
  }

  /**
   * Set the length (in milliseconds) of the callbacks and helper functions
   *
   * @param timeout Number of milliseconds
   */
  public timeout(timeout: number): void {
    this.analytics.timeout(timeout);
  }

  /**
   * Add a source middleware called on events
   *
   * @param middleware Custom function
   */
  public addSourceMiddleware(middleware: SegmentMiddleware): void {
    this.analytics.addSourceMiddleware(middleware);
  }

  /**
   * Add a destination middleware called on events
   *
   * @param integration Integration name
   * @param middlewares Custom functions
   */
  public addDestinationMiddleware(
    integration: string,
    middlewares: SegmentMiddleware[]
  ): void {
    this.analytics.addDestinationMiddleware(integration, middlewares);
  }

  public get plugins(): { [pluginName: string]: SegmentPlugin } {
    return this.analytics.plugins;
  }
}
