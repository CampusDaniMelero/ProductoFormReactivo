import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {
  private url = 'http://localhost:8082/producto';

  productoCambio = new Subject<Producto[]>();

  constructor(private http:HttpClient) { }

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url).pipe(map(data => data.sort((a, b) => a.product_id - b.product_id)));
  }


  listarPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  eliminar(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`);
  }

  alta(producto: Producto): Observable<Object> {
    return this.http.post(this.url, producto);
  }

  modificar(producto: Producto): Observable<Object> {
    return this.http.put(this.url, producto);
  }


}

