import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationInterceptorSerice implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let reqModified: HttpRequest<any>;
    const token = localStorage.getItem('jwt');
    if(token) {
      reqModified = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      })
    } else {
      reqModified = req;
    }

    return next.handle(reqModified)
  }
}
