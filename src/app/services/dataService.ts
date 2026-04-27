import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/info.json';

  constructor(private http: HttpClient) { }

	// https://nipunipremadasa923.medium.com/a-beginners-guide-to-fetching-json-data-using-angular-1574b48592a1
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }
}