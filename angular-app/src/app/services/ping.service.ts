import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PingResponse {
  ok: boolean;
  time: string;
}

@Injectable({ providedIn: 'root' })
export class PingService {
  constructor(private http: HttpClient) {}

  ping(): Observable<PingResponse> {
    return this.http.get<PingResponse>('/api/v1/ping');
  }
}
