import { Observable } from 'rxjs/internal/Observable';

export interface ILoadingService {
  loadingState: Observable<boolean>;
  loadingOn(): boolean;
  loadingOff(): boolean;
}
