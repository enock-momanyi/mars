import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ManifestService } from '../manifest.service';
import { PhotoManifest, Photos, RoverPhoto } from '../rover';

@Component({
  selector: 'mr-rover-manifest',
  templateUrl: './rover-manifest.component.html',
  // styleUrls: ['./rover-manifest.component.css']
})
export class RoverManifestComponent implements OnInit, OnDestroy {
  sub !: Subscription;
  aircraft!: PhotoManifest;
  errorM = false;
  finalManifest = false;

  photo !: Photos;
  
  constructor(private route: ActivatedRoute,private router: Router, private roverService: ManifestService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }
  

  ngOnInit(): void {
    
    // this.route.queryParams.subscribe(params => {
    //   this.name = String(params['roverName']);
    // })
    let name = String(this.route.snapshot.paramMap.get('roverName'));
    this.sub = this.roverService.getDescription(name).subscribe({
      next: rover => {this.aircraft = rover;},
      error: err => {this.errorM=true; console.log(err);}
    })
  }
  ngOnDestroy(): void{
    this.sub.unsubscribe()
  }
  loadSolEarth(data: Photos){
    this.photo = data;
    this.finalManifest = true;
  }
  onSelect(name: string, sol: number,cam:string){
    this.router.navigate(['/rover',name, sol,cam])
  }
}
