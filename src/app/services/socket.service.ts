import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {
    this.setupConnectionListeners();
  }

  // Configure socket connection
  configureSocket(config: SocketIoConfig) {
    this.socket.ioSocket.io.opts = { ...this.socket.ioSocket.io.opts, ...config.options };
    if (config.url) {
      this.socket.ioSocket.io.uri = config.url;
    }
    console.log('Socket configured with URL:', config.url);
  }

  private setupConnectionListeners(): void {
    this.socket.on('connect', () => console.log('Connected to socket server'));
    this.socket.on('disconnect', () => console.log('Disconnected from socket server'));
    this.socket.on('connect_error', (error: any) => console.error('Socket connection error:', error));
  }

  // Get current connection status
  isConnected(): boolean {
    return this.socket.ioSocket.connected;
  }

  // Listen to an event
  listen<T>(eventName: string): Observable<T> {
    return this.socket.fromEvent<T>(eventName);
  }

  // Emit an event
  emit(eventName: string, data?: any): void {
    this.socket.emit(eventName, data);
  }

  // Join a room
  joinRoom(roomId: string): void {
    this.socket.emit('join', roomId);
    console.log('Joined room:', roomId);
  }

  // Leave a room
  leaveRoom(roomId: string): void {
    this.socket.emit('leave', roomId);
    console.log('Left room:', roomId);
  }

  // Get connection status as observable
  getConnectionStatus(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.socket.on('connect', () => observer.next(true));
      this.socket.on('disconnect', () => observer.next(false));

      // Initial status
      observer.next(this.isConnected());

      // Cleanup
      return () => {
        this.socket.off('connect');
        this.socket.off('disconnect');
      };
    });
  }

  // Disconnect socket
  disconnect(): void {
    this.socket.disconnect();
    console.log('Socket disconnected');
  }

  // Connect socket
  connect(): void {
    this.socket.connect();
    console.log('Socket connected');
  }
}