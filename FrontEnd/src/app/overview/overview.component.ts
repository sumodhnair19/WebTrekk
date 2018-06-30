import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  customers: Customer[];
  customer : any;
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers()
    .subscribe(customers => this.customers = customers);
  }


  add(e, form: NgForm) {
    e.preventDefault();
    if (!form.value) { return; }
    if(form.value  &&  form.value.first && form.value.last) {
      this.customer = {
        "customerID": ++this.customers.length,
        "name": {
            "first": form.value.first,
            "last": form.value.last
        },
        "birthday": form.value.birthday,
        "gender": form.value.gender,
        "lastContact": form.value.lastContact,
        "customerLifetimeValue": form.value.customerLifetimeValue
      }
      this.customerService.addCustomer( this.customer )
        .subscribe(()=>{
            location.reload();
        });
    } else {
      alert("please enter required fields");
    }
  }

  deleteCustomer(customer: Customer, index) {
    this.customerService.deleteCustomer(index).subscribe(()=>{
          location.reload();
    });
  }


}
