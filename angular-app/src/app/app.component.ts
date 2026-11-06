import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PingService } from './services/ping.service';

/**
 * This is placeholder scaffolding, not the interview exercise. It exists
 * only so you can confirm, before the live session, that Angular, the dev
 * server proxy, and the mock server are all correctly wired together on
 * your machine. The real application is swapped in live.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  status: 'idle' | 'checking' | 'ok' | 'error' = 'idle';
  detail = '';

  constructor(private pingService: PingService) {}

  runCheck(): void {
    this.status = 'checking';
    this.pingService.ping().subscribe({
      next: (res) => {
        this.status = 'ok';
        this.detail = `Server responded at ${res.time}`;
      },
      error: () => {
        this.status = 'error';
        this.detail = 'Could not reach the mock server. Is `npm run dev` still running?';
      },
    });
  }
}
