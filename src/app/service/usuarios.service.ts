import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiUrl: any = `${environment.apiUrl}/api/miembros`

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getUsuariosById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/edit/${id}`);
  }
  saveUsuario(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }
  editUsuario(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/edit/${id}`);
  }
  updateUsuarios(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${data.ID_Miembro}`, data);
  }
}
