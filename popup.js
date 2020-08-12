
document.addEventListener('DOMContentLoaded',function(){
  
    if(localStorage.checkmynotes===undefined){
        localStorage.setItem('checkmynotes',null)
  }
    try{

        let reminderHour,reminderMinute,reminderNotes,inputstatus,submitbtn

        reminderHour = document.getElementById('hours')
        reminderMinute = document.getElementById('minutes')
        reminderNotes = document.getElementById('extrainfo')
        inputstatus = document.getElementById('statusbar')
        submitbtn = document.getElementById('set_button')
    
        //check inputs
       reminderHour.addEventListener('keyup',(e)=>{
          
           if(e.target.value<0 || e.target.value>12){
               e.target.style.border = "1px solid red"
               inputstatus.style.color ="red"
               inputstatus.innerHTML ="Hours Must be between 0-12"
               submitbtn.disabled = true
           }else if(e.target.value>0 || e.target.value<12){
            e.target.style.border = "1px solid green"
            submitbtn.disabled = false
           }else if(e.target.length===0){
            inputstatus.innerHTML =""
            e.target.style.border = "1px solid green"
            submitbtn.disabled = false
    
           }
    
       })
       reminderMinute.addEventListener('keyup', (e) => {
    
           if (e.target.value < 0 || e.target.value > 59) {
               e.target.style.border = "1px solid red"
               inputstatus.style.color = "red"
               inputstatus.innerHTML = "Minutes Must be between 0-59"
               submitbtn.disabled = true
           } else if(e.target.value>0 || e.target.value<12){
            e.target.style.border = "1px solid green"
            submitbtn.disabled = false
           }else if(e.target.length===0){
            inputstatus.innerHTML =""
            e.target.style.border = "1px solid green"
            submitbtn.disabled = false
    
           }
       })
       submitbtn.addEventListener('click',()=>{
           //ensure atleast one input is not Available
           let hour_to_fire,minute_to_fire,tempHour
           if(reminderMinute.value>0 && reminderMinute.value<60 || reminderHour.value>0 && reminderHour.value<13){
               let date= new Date()

               let checkhout_input = typeof Number(reminderMinute.value)
               let checkmin_input = typeof Number(reminderHour.value)           
            
               if(checkhout_input==='number' && checkmin_input==='number' && reminderMinute.value>0 && reminderMinute.value<60 && reminderHour.value>0 && reminderHour.value<13){
        
                 //set minutes
                tempHour = new Date(date.setMinutes(Number(date.getMinutes())+Number(reminderMinute.value)))
                minute_to_fire=  tempHour.toLocaleTimeString()
                
                //set hour
               
                tempHour = new Date(date.setHours(Number(date.getHours())+Number(reminderHour.value)))
                let date2=new Date()
                
                tempHour.setMinutes(date2.getMinutes()+Number(reminderMinute.value))
               
                hour_to_fire=  tempHour.toLocaleTimeString()
               
               
               }else if(checkhout_input==='number' && checkmin_input==='number'+ reminderMinute.value>0 && reminderMinute.value<60 && reminderHour.value<1 || reminderHour.value>12 || reminderHour.value===''){
           
                tempHour = new Date(date.setMinutes(Number(date.getMinutes())+Number(reminderMinute.value)))
                minute_to_fire=  tempHour.toLocaleTimeString()
                hour_to_fire='N/A'
               
               }else if(checkhout_input==='number' && checkmin_input==='number'+ reminderMinute.value<1 || reminderMinute.value==='' || reminderMinute.value>59 && reminderHour.value>0 && reminderHour.value<13 ){
               
                tempHour = new Date(date.setHours(Number(date.getHours())+Number(reminderHour.value)))
                hour_to_fire=  tempHour.toLocaleTimeString()
                minute_to_fire='N/A'
    
               }else{
                   hour_to_fire='N/A'
                   minute_to_fire='N/A'
               }
               
    
            reminderHour.style.border = "1px solid green"
            reminderMinute.style.border = "1px solid green"
            if(localStorage.checkmynotes==='null' || localStorage.checkmynotes==='undefined' ){
                localStorage.checkmynotes = '{"reminders":[{"minute"'+':"'+reminderMinute.value+'",'+'"hours":'+'"'+reminderHour.value+'","desc":'+'"'+reminderNotes.value+'","min_to_fire":"'+minute_to_fire+'","hour_to_fire":"'+hour_to_fire+'"}]}'          
             
                submitbtn.disabled = true
                inputstatus.style.color = "green"
                inputstatus.innerHTML = "Gotcha ,Now Sit and Relax,I will Remind you"
                reminderMinute.value=''
                reminderHour.value =''
                setTimeout(()=>{
                    submitbtn.disabled = false
                    inputstatus.innerHTML = ""
                   },7000)
            }else{
                
                let current_values = JSON.parse(localStorage.checkmynotes).reminders
                let arr = new Array()
              
                current_values.forEach((value)=>{
                    arr.push(JSON.stringify(value))
                })
              
            
                arr.push('{"minute"'+':"'+reminderMinute.value+'",'+'"hours":'+'"'+reminderHour.value+'","desc":'+'"'+reminderNotes.value+'","min_to_fire":"'+minute_to_fire+'","hour_to_fire":"'+hour_to_fire+'"}')
               
               let new_values=''
               arr.forEach((item,index)=>{
                   if(index===arr.length-1){
                    new_values = new_values+item
                   }else{
                    new_values = new_values+item+','
                   }
               })
                       
               localStorage.checkmynotes= '{"reminders":['+ new_values+']}' 
           
               inputstatus.style.color = "green"
               inputstatus.innerHTML = "Gotcha ,Now Sit and Relax,I will Remind you"
               submitbtn.disabled = true
               reminderMinute.value=''
               reminderHour.value =''
               setTimeout(()=>{
                submitbtn.disabled = false
                inputstatus.innerHTML = ""
               },7000)
            }
           }else{
        
            inputstatus.style.color = "red"
            inputstatus.innerHTML = "Enter valid Minutes or Hours"
           }
         
      
       })
    }catch(e){

        document.write("Oops.Something is not Okay.Give it a Try Later")
    }
   
  
   })