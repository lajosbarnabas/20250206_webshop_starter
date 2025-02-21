import { EmbeddedViewRef, Injectable, ViewContainerRef } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  public confirm(
    confirmHTML: string,
    viewContainerRef: ViewContainerRef | null = null
  ): Observable<boolean> {
    if (viewContainerRef != null) {
      const componentRef = viewContainerRef.createComponent(ConfirmComponent);
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);

      componentRef.instance.confirmHTML = confirmHTML;
      return componentRef.instance.afterClosed.pipe(
        map((result) => {
          componentRef.destroy();
          if (result === null) {
            return false;
          }
          return result;
        })
      );
    }
    return of(false);
  }
}
