import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IData {
  useId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayData: IData[] = []

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData(): void {
    const dataConfig$ = this.http.get('https://jsonplaceholder.typicode.com/posts');
    dataConfig$.subscribe((data: any) => {
        this.displayData = data;
      }
    );
  }
}
