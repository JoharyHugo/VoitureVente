// TokenService.ts
import { EventEmitter } from 'events';

class TokenService {
  private static instance: TokenService;
  private expirationTimer: NodeJS.Timeout | null = null;
  private eventEmitter: EventEmitter;

  private constructor() {
    this.eventEmitter = new EventEmitter();
  }

  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  public setToken(token: string, expirationTime: number): void {
    localStorage.setItem('monToken', token);
    localStorage.setItem('expirationTime', expirationTime.toString());

    // Clear existing timer
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }

    // Set a new timer for token expiration
    this.expirationTimer = setTimeout(() => {
      this.clearToken();
      this.eventEmitter.emit('tokenExpired');
    }, expirationTime - new Date().getTime());
  }

  public clearToken(): void {
    localStorage.removeItem('monToken');
    localStorage.removeItem('expirationTime');

    // Clear existing timer
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }
  }

  public onTokenExpired(callback: () => void): void {
    this.eventEmitter.on('tokenExpired', callback);
  }
}

export default TokenService;
