import { NgModuleResolver } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

mainClock = new clock;

}//endofclass

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

class balltrackMin{
    state:number [] = [];
    max:number;
    lastNumber:number = 0;
    usedBalls:number [] = [];
    return:boolean = false;


    constructor(max:number){
      this.max = max;

    }

    insert(n:any){
        this.state.push(n);
        this.return = false;


    };

    clearQueue(){
      let valPop = this.state.pop()!;
        this.lastNumber = valPop;

        //CLEAR STATE
        this.return = true;
        this.usedBalls = this.state;
        this.state = [];
    }

    clearHour(){
        //CLEAR STATE
        this.return = true;
        this.usedBalls = this.state;
        this.state = [];
    }

    }





//////////////////////////////////////////////////////////////////////////////////////////////////////

class clock{
balltrackMin = new balltrackMin(5);
balltrack5Min = new balltrackMin(12);
balltrackHour = new balltrackMin(11);

warning:string='';
balls:number[]=[];
const:number[]=[];
resolved:boolean=false;
counter:number=0;
t:any;
y:any;

  loadBalls(value:any){
  if(value < 27 || value > 127){
    this.warning = "Please enter a value between 27-127";
    return;
  }
  else{
    let num = value;
    for(let i = 1; i <= num; i++){
      this.balls.push(i);
      this.const.push(i);

    }

    this.tick();
      // for(let i =0;i<1100;i++){
      //   this.tick();
      //   this.counter++;
      // }
      this.t = performance.now()
       while(this.resolved == false){
         if(JSON.stringify(this.balls) === JSON.stringify(this.const)){
           this.resolved = true;
           console.log('Number of rotations:');
           console.log(this.counter);
           this.y = performance.now()
           console.log('Number of Seconds:');
           console.log((this.y-this.t)/1000);
           console.log('Number of Miliseconds:');
           console.log(this.y-this.t);
         }
         else{
           this.tick();
           this.counter++
         }
       }

   }
}

  tick(){
//STOP

if(this.balltrackMin.state.length < this.balltrackMin.max && this.balltrack5Min.state.length != 12 && this.balltrackHour.state.length != 11){
  this.balltrackMin.insert(this.balls.shift());
}
else{
  this.balltrackMin.clearQueue();
  for(let i = this.balltrackMin.usedBalls.length-1; i >= 0; i--){
              this.balls.push(this.balltrackMin.usedBalls[i]);
  }

//5min logic
if(this.balltrack5Min.state.length < this.balltrack5Min.max && this.balltrackHour.state.length != 11){
  this.balltrack5Min.insert(this.balltrackMin.lastNumber);
}
else{
  this.balltrack5Min.clearQueue();
  for(let i = this.balltrack5Min.usedBalls.length-1; i >= 0; i--){
              this.balls.push(this.balltrack5Min.usedBalls[i]);
  }

  //Hour Logic
  if(this.balltrackHour.state.length < this.balltrackHour.max){
    this.balltrackHour.insert(this.balltrack5Min.lastNumber);
  }
  else{
    this.balltrackHour.clearHour();
    for(let i = this.balltrackHour.usedBalls.length-1; i >= 0; i--){
                this.balls.push(this.balltrackHour.usedBalls[i]);
    }

}

}


//min
// if(this.balltrackMin.state.length < this.balltrackMin.max && this.balls.length != 0){
//   this.balltrackMin.insert(this.balls.shift()); //fills minute queue
// }
// else if(this.balltrackMin.state.length == this.balltrackMin.max ){
//   this.balltrackMin.clearQueue();
//   this.balltrackMin.return = true;
//     for(let i = this.balltrackMin.usedBalls.length-1; i >= 0; i--){
//          this.balls.push(this.balltrackMin.usedBalls[i]);
//        }
// }

// //5Mins
// if(this.balltrackMin.return == true){

//  if(this.balltrack5Min.state.length == this.balltrack5Min.max){
//   this.balltrack5Min.clearQueue();
//   this.balltrack5Min.return = true;

//          for(let i = this.balltrack5Min.usedBalls.length-1; i >= 0; i--){
//            this.balls.push(this.balltrack5Min.usedBalls[i]);
//          }

// }
// else if(this.balltrack5Min.state.length < this.balltrack5Min.max){
//   this.balltrack5Min.insert(this.balltrackMin.lastNumber);
// }
// }

// //HOUR QUEUE LOGIC
// if(this.balltrack5Min.return == true && this.balltrackMin.return == true){

//   if(this.balltrackHour.state.length == this.balltrackHour.max){
//     this.balltrackHour.clearHour();

//            for(let i = this.balltrackHour.usedBalls.length-1; i >= 0; i--){
//              this.balls.push(this.balltrackHour.usedBalls[i]);
//            }
//   }


//   else if(this.balltrackHour.state.length < this.balltrackHour.max){
//        this.balltrackHour.insert(this.balltrack5Min.lastNumber);
//   }

//   }

//  console.log('tik');
//  console.log(this.balls);
//             console.log(this.balltrackMin.state);
//             console.log(this.balltrack5Min.state);
//             console.log(this.balltrackHour.state);

  }//end of tick

} //end of clock object
}
