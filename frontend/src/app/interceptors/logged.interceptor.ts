import { HttpInterceptorFn } from "@angular/common/http";
import { StateService } from "../services/state.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const state = inject(StateService);
  const token = state.getToken();
  console.log("authInterceptor", token);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
};
