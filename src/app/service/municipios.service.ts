import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
  apiUrl: any = `${environment.apiUrl}/api/`

  constructor(private http: HttpClient) { }

  getMunipios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}municipios`);
  }
  getMunicipiosByIdEstadoId(estadoId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}municipios/estado/${estadoId}`);
  }
}
