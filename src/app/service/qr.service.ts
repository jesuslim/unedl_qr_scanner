import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  apiUrl: any = `${environment.apiUrl}/api/codigo`

  constructor(private http: HttpClient) { }

  getQrCode(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

}
