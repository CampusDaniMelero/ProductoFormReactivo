import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductoServiceService } from '../producto-service.service';
import { Producto } from '../producto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AltaProductosComponent } from './alta-productos/alta-productos.component';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [RouterOutlet,AltaProductosComponent, FormsModule,CommonModule, RouterLink],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit{
by: any;
  
    constructor(private service:ProductoServiceService) { }

    productoss: Producto[] = [];
  
    ngOnInit(): void {
      this.service.productoCambio.subscribe((data) => {this.productoss = data}
    )
    this.service.listar().subscribe(datos => {this.productoss = datos;
      console.log("Producto agregado");
    })

    }

    eliminar(producto: Producto): void {
      this.service.eliminar(producto.product_id).subscribe(() => {
        this.service.listar().subscribe(data => {
          this.service.productoCambio.next(data);
        });
      });
    }

    alta(): void {
      this.service.productoCambio.next(this.productoss);
    }





}
