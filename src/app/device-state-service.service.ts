import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeviceStateServiceService {
  // Store the state for each device
  private deviceStates: { [deviceId: string]: { LastAppState: string, LastTVstate: string, isAppStateTimePassed: boolean, NoResponse: boolean, counterAppState: number } } = {};

  // Observable to track changes
  private deviceStatesSubject = new BehaviorSubject<{ [deviceId: string]: any }>({});
  deviceStates$ = this.deviceStatesSubject.asObservable();

  // Update the state for a specific device
  updateDeviceState(deviceId: string, LastAppState: string, LastTVstate: string, isAppStateTimePassed: boolean, NoResponse: boolean, counterAppState: number): void {
    this.deviceStates[deviceId] = { LastAppState, LastTVstate, isAppStateTimePassed, NoResponse, counterAppState };
    this.deviceStatesSubject.next(this.deviceStates);
  }

  // Get the current state for a specific device
  getDeviceState(deviceId: string): { LastAppState: string, LastTVstate: string, isAppStateTimePassed: boolean, NoResponse: boolean, counterAppState: number } {
    return this.deviceStates[deviceId] || { LastAppState: 'background', LastTVstate: 'background', isAppStateTimePassed: false, NoResponse: false, counterAppState: 0 };
  }

  // Reset the state for a specific device
  resetDeviceState(deviceId: string): void {
    delete this.deviceStates[deviceId];
    this.deviceStatesSubject.next(this.deviceStates);
  }
}
