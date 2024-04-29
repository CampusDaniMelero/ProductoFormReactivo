import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoServiceService } from '../../producto-service.service';
import { Producto } from '../../producto';

@Component({
  selector: 'app-alta-productos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alta-productos.component.html',
  styleUrls: ['./alta-productos.component.css']
})
export class AltaProductosComponent {
  form: FormGroup;
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicio: ProductoServiceService
  ) {
    this.form = new FormGroup({
      'product_id': new FormControl(0),
      'product_name': new FormControl(''),
      'supplier_id': new FormControl(0),
      'category_id': new FormControl(0),
      'quantity_per_unit': new FormControl(''),
      'unit_price': new FormControl(0),
      'units_in_stock': new FormControl(0),
      'units_on_order': new FormControl(0),
      'reorder_level': new FormControl(0),
      'discount': new FormControl(0)
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      console.log(this.id);
      this.edicion = data['id'] != null;
      this.formaFormulario();
     
    });
  }

  formaFormulario() {
    if (this.edicion) {
      this.servicio.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'product_id': new FormControl(data.product_id),
          'product_name': new FormControl(data.product_name),
          'supplier_id': new FormControl(data.supplier_id),
          'category_id': new FormControl(data.category_id),
          'quantity_per_unit': new FormControl(data.quantity_per_unit),
          'unit_price': new FormControl(data.unit_price),
          'units_in_stock': new FormControl(data.units_in_stock),
          'units_on_order': new FormControl(data.units_on_order),
          'reorder_level': new FormControl(data.reorder_level),
          'discountinued': new FormControl(data.discountinued)
        });
      });
    }
  }

  operar() {
    let productito: Producto = {
      product_id: this.form.value['product_id'],
      product_name: this.form.value['product_name'],
      supplier_id: this.form.value['supplier_id'],
      category_id: this.form.value['category_id'],
      quantity_per_unit: this.form.value['quantity_per_unit'],
      unit_price: this.form.value['unit_price'],
      units_in_stock: this.form.value['units_in_stock'],
      units_on_order: this.form.value['units_on_order'],
      reorder_level: this.form.value['reorder_level'],
      discountinued: this.form.value['discount']
    };

    if (this.edicion) {
      this.servicio.modificar(productito).subscribe(() => {
        this.servicio.listar().subscribe(data => {
          this.servicio.productoCambio.next(data);
        });
      });
    } else {
      this.servicio.alta(productito).subscribe(() => {
        this.servicio.listar().subscribe(data => {
          this.servicio.productoCambio.next(data);
        });
      });
    }

    this.router.navigate(['']);
  }
}
