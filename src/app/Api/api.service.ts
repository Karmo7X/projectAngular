import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `https://reqres.in/api`;
  private cache: { [page: number]: any } = {}; // In-memory cache
  private currentPageSubject = new BehaviorSubject<number>(1);

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    // Check if data for the requested page is already in the cache
    if (this.cache[page]) {
      return of(this.cache[page]); // Return cached data
    }

    return this.http.get<any>(`${this.apiUrl}/users`, {
      params: { page: page.toString() }
    }).pipe(
      tap(data => {
        this.cache[page] = data; // Cache the data
        this.currentPageSubject.next(page); // Update the current page
      }),
      catchError(error => {
        console.error('Error fetching users:', error);
        return of(null);
      })
    );
  }

  getCurrentPage(): Observable<number> {
    return this.currentPageSubject.asObservable();
  }

  setCurrentPage(page: number): void {
    this.currentPageSubject.next(page);
  }
  getOneUser(id: number): Observable<any> {
    // Fetch a single user's data from the API
    return this.http.get<any>(`${this.apiUrl}/users/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return of(null);
      })
    );
  }
}
