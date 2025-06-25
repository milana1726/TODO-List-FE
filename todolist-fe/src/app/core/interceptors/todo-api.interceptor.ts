import { HttpInterceptorFn } from '@angular/common/http';

import { BASE_URL } from '../../shared/models/constants/api-url';

export const todoApiInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    req.clone({
      url: `${BASE_URL}${req.url}`,
      setHeaders: {
        'Content-Type': 'application/json',
      },
    })
  );
};
