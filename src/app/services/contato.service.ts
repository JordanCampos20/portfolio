import { Injectable } from '@angular/core';
import { apiPath, environment } from '../utils/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseViewModel } from '../interfaces/response';
import { Contato } from '../interfaces/contato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = (environment.production ? environment.baseProductionUrl : environment.baseDebugUrl) + apiPath.Contato;

  constructor(private http: HttpClient) {
  }

  // Método para enviar um contato
  postContato(contato: Contato): Observable<ResponseViewModel> {
    return this.http.post<ResponseViewModel>(`${this.apiUrl}`, contato);
  }
}
