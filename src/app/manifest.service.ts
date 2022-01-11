import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { RoverPhoto, PhotoManifest } from './rover';
@Injectable({
  providedIn: 'root'
})
export class ManifestService {
  private API_KEY = '1E6KtvUvZvJUHPhxdMtoEA9cO94JCTjb57aUwBtR';
  constructor(private http: HttpClient) { }
  getDescription(name: string) : Observable<PhotoManifest>{
    const manifestUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${name}/?api_key=${this.API_KEY}`
    return this.http.get<PhotoManifest>(manifestUrl)
  }
  getPhotos(name: string, sol: number, camera: string): Observable<{photos: RoverPhoto[]}>{
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?sol=${sol}&camera=${camera}&page=1&api_key=${this.API_KEY}`
    return this.http.get<{photos: RoverPhoto[]}>(url)
  }
}
