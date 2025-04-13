import {
  Component,
  ContentChild,
  Inject,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { LoadingService } from '../../../core/ui-services/LoadingService ';
import { ILoadingService } from '../../../core/ui-services/contracts/ILoadingService';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-indicator',
  imports: [MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss',
})
export class LoadingIndicatorComponent implements OnInit {
  loading: Observable<boolean>;
  router: Router;
  loadingService: ILoadingService;

  @Input() detectRouteTransitions = false;

  @ContentChild('loading') customLoadingIndicator: TemplateRef<any> | null =
    null;

  constructor(
    router: Router,
    @Inject(LoadingService) loadingService: ILoadingService
  ) {
    this.router = router;
    this.loadingService = loadingService;
    this.loading = this.loadingService.loadingState;
  }

  ngOnInit(): void {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }
}
