import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();

  get<T>(key: string, fallback: Observable<T>): Observable<T> {
    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    } else {
      return fallback.pipe(tap(value => this.cache.set(key, value)));
    }
  }

  clear() {
    this.cache.clear();
  }
}
