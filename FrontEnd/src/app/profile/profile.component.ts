import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Customer }         from '../customer';
import { CustomerService }  from '../customer.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
  @Input() customer: Customer;

  isEditable:Boolean = false;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location) {
  }

  ngOnInit() {
    this.getDetails();

  }

  getDetails(){
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomerDetails(id)
      .subscribe(customer => this.customer = customer);
  }

  goBack() {
    this.location.back();
  }

 save() {
    this.customerService.updateCustomer(this.customer, this.customer.customerID)
      .subscribe(() => this.goBack());
  }
}
