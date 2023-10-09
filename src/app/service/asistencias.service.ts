import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
  apiUrl: any = `${environment.apiUrl}/api/asistencias`

  constructor(private http: HttpClient) { }

  getAsistencias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  createAsistencias(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }
}
