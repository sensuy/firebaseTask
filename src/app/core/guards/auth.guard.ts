import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot, UrlTree, Router,
  CanActivateChild, CanLoad, UrlSegment, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.chechAuthState(state.url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const url = segments.map(segment => `/${segment}`).join('');
    return this.chechAuthState(url).pipe(take(1));
  }

  private chechAuthState(redirect: string): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      tap(is => {
        if (!is) {
          this.router.navigate(['/login'], {
            queryParams: { redirect }
          });
        }
      })
    );
  }

}
