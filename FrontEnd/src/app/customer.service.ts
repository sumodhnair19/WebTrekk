import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Customer } from './customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// @Injectable()
@Injectable({ providedIn: 'root' })

export class CustomerService {

  private customerUrl = 'api/listCustomers';  // URL to web api
  private customerServerUrl = 'http://localhost:7007/listCustomers'


    constructor(
  private http: HttpClient){
  }


  /** GET heroes from the server */
  getCustomers (): Observable<Customer[]> {
    return this.http.get<any>(this.customerServerUrl)
      .pipe(
        map(customersObj => customersObj.data.data),
        tap(heroes => this.log(`${JSON.stringify(heroes)} fetched customers`)),
        catchError(this.handleError('getHeroes', []))
      );
  }


  /** GET hero by id. Will 404 if id not found */
  getCustomerDetails(id: any): Observable<Customer> {

    const url = `${this.customerServerUrl}/details/${id}`;
    return this.http.get<any>(url).pipe(
      map(customersObj => customersObj.data.data),
      tap(customer => this.log(`fetched customer ${customer} hero id=${id}`)),
      catchError(this.handleError<Customer>(`getHero id=${id}`))
    );
  }



  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addCustomer (customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.customerServerUrl}/add`, customer, httpOptions).pipe(
      tap((customer: Customer) => this.log(`added hero w/ id=${customer.customerID}`)),
      catchError(this.handleError<Customer>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteCustomer (customer: Customer | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.customerID;
    const url = `${this.customerServerUrl}/delete/${id}`;

    return this.http.post<Customer>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

  /** PUT: update the hero on the server */
  updateCustomer (customer: Customer, id : any): Observable<any> {
    return this.http.post(`${this.customerServerUrl}/update/${id}`, customer, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${customer.customerID}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(`error found : ${JSON.stringify(error)  }  :  result : ${result}   `); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`messages recieved : ${message}`);
  }
}
