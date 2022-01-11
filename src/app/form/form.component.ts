import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { PhotoManifest, Photos } from '../rover';


@Component({
  selector: 'mr-form',
  templateUrl: './form.component.html',
  // styleUrls: ['./form.component.css']
})
export class FormComponent implements OnChanges {
  @Input()
  rover!: PhotoManifest;
  @Output()
  afterSubmit: EventEmitter<Photos> = new EventEmitter();
  solVal !: number;
  maxdate!:string;
  mindate!:string;
  roverName!: string;
  arrdate!: string[];
  mfdate: string;
  
  formSelect: {[unit:string]: string[]} = {
    'Perseverance':[
    'EDL_RUCAM','EDL_RDCAM','EDL_DDCAM','EDL_PUCAM1','EDL_PUCAM2','NAVCAM_LEFT','NAVCAM_RIGHT',
    'MCZ_RIGHT','MCZ_LEFT','FRONT_HAZCAM_LEFT_A','FRONT_HAZCAM_RIGHT_A','REAR_HAZCAM_LEFT',
    'REAR_HAZCAM_RIGHT','SKYCAM','SHERLOC_WATSON'
  ],
    'Curiosity':[
      'FHAZ','RHAZ','MAST','CHEMCAM','MAHLI','MARDI','NAVCAM'
    ],
    'Opportunity':[
      'FHAZ','RHAZ','NAVCAM','PANCAM','MINITES'
    ],
    'Spirit':[
      'FHAZ','RHAZ','NAVCAM','PANCAM','MINITES'
    ]
  }



  constructor() { 
    
  }
  addDays(date:Date, days:number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  getSol(date:Date, landing_date:Date){
    return (date.getTime() - landing_date.getTime())/(1000*60*60*24)
  }
  transformDate(date:string){
    const arrdate = date.match(/(\d{4})-(\d{2})-(\d{2})/);
    const mfdate = arrdate[2] +"/"+arrdate[3] +"/" + arrdate[1];
    return new Date(mfdate);
  }
  ngOnChanges(changes: SimpleChanges): void {
     
    this.rover = changes['rover']['currentValue'];
    this.solVal = this.rover.photo_manifest.max_sol;
    this.maxdate = this.rover.photo_manifest.max_date;
    this.mindate = this.rover.photo_manifest.landing_date;
    this.roverName = this.rover.photo_manifest.name;
     this.arrdate = this.maxdate.match(/(\d{4})-(\d{2})-(\d{2})/);
     this.mfdate = this.arrdate[2] +"/"+this.arrdate[3] +"/" + this.arrdate[1];
     console.log(this.maxdate)
     console.log(this.addDays(new Date(this.mfdate),1000))
  }
  submit(data:any){
    console.log('Sumtitted!', data)
    const controls = data.controls;
    let photos !: Photos;
    if(controls.radSol.value==='sol' && controls.sol.status === 'VALID')
    {
      const arr = this.rover.photo_manifest.photos.filter(function(x){
        return x.sol === controls.sol.value;
      });
      if(arr.length){
        photos = arr[0];
      }
    }
    else if(controls.radSol.value==='earth' && controls.earthdate.status === 'VALID')
    {
      const sol = this.getSol(this.transformDate(controls.earthdate.value), this.transformDate(this.mindate));
      console.log(sol);
      const arr = this.rover.photo_manifest.photos.filter(function(x){
        return x.earth_date === controls.earthdate.value;
      });
      if(arr.length){
        photos = arr[0];
      }
    }
    // if(controls.checkCam.value && controls.camera.status === 'VALID')
    // {
    //   if(queryString.length){
    //     queryString+='&'
    //   }
    //   queryString += `camera=${controls.camera.value}`;
    // }
    console.log(photos);
    this.afterSubmit.emit(photos);
  }
}
