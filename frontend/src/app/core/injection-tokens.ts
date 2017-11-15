import { InjectionToken } from '@angular/core';

export const LANGUAGES: InjectionToken<string[]> = new InjectionToken<string[]>(
  'available languages'
);
