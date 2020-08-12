//check current time and alert when time is up
setInterval(()=>{
    if(localStorage.checkmynotes!=='undefined' || localStorage.checkmynotes!=='null'){
    try{
    let allEvents = JSON.parse(localStorage.checkmynotes).reminders
    let date = new Date()
     let addressees = ['Wizard','Rook','Creator','Master']
      allEvents.forEach(event => {
    
        console.log(event)
        let randomer = (Math.floor(Math.random()*3)+0)
          if(event.hour_to_fire!=='N/A' && event.min_to_fire!=='N/A'){ //hour and minutes were provided
           
            if(date.toLocaleTimeString()===event.hour_to_fire){
              

                alert("Hey "+ addressees[randomer] +", Time to get done with your Task. '"+event.desc+"'")
          
               
            }
          }else if(event.hour_to_fire!=='N/A' && event.min_to_fire==='N/A'){ // only hours provided
            if(date.toLocaleTimeString()===event.hour_to_fire){
                alert("Hey "+ addressees[randomer] +", Time to get done with your Task. '"+event.desc+"'")
              
               
            }
          }else if(event.hour_to_fire==='N/A' && event.min_to_fire!=='N/A'){//only minutes provided
            if(date.toLocaleTimeString()===event.min_to_fire){           
                alert("Hey "+ addressees[randomer] +", Time to get done with your Task. '"+event.desc+"'")
           
             
            }
          }
      });

    

    
    }catch(e){
       console.log('Error')
       document.write("Oops.Something is not Okay.Give it a Try Later")
    }
   
}
},1)
