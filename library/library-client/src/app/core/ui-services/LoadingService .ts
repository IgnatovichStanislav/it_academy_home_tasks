import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { ILoadingService } from './contracts/ILoadingService';

@Injectable({
  providedIn: 'root',
})
export class LoadingService implements ILoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loadingState = this.loadingSubject.asObservable();

  loadingOn(): boolean {
    const loading = true;
    this.loadingSubject.next(loading);
    return loading;
  }

  loadingOff(): boolean {
    const loading = false;
    this.loadingSubject.next(loading);
    return loading;
  }
}
