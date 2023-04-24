//variables
const counterBox1=document.querySelector(".counterBox1"),
  counterBox2=document.querySelector(".big-counter"),
  daysEl=document.querySelector(".days h1"),
  hoursEl=document.querySelector(".hours h1"),
  minsEl=document.querySelector(".mins h1"),
  secsEl=document.querySelector(".secs h1"),
  reset=document.querySelector(".reset"),
  submit=document.querySelector(".submitBtn"),
  newCountBtn=document.querySelector(".new-counter button"),
  dateInput=document.querySelector("input[type='date']"),
  value=document.querySelector(".value"),
  newCounter=document.querySelector(".new-counter");
let CountingFor=document.querySelector("input[type='text']"),
  completedCounter=document.querySelector(".new-counter h1:nth-child(2)")
let date, diffTime, countingForText,CountDate,savedItems;
//functions 
    const currentDate=new Date().toISOString().split("T")[0]
    dateInput.setAttribute("min",currentDate)
//clear and add hide class
    let clearFun=(ele)=>{
      ele.classList.remove('hide')
    }
    let addFun=(ele)=>{
      ele.classList.add('hide')
    }
//minus difdate 
function falseDate(){
  addFun(counterBox1)     
  addFun(counterBox2)
  clearFun(newCounter)
  completedCounter.textContent=`${countingForText} finished on ${CountDate}`
  }
//proper difdate      
function trueDate(){ 
  addFun(newCounter)
  addFun(counterBox1)
  clearFun(counterBox2)
  setInterval(dateCalaculation,1000)
  value.textContent=countingForText 
}    
//check func before submit

    let CheckDate=()=>{
      dateCalaculation()//for calculation at first time
      diffTime<0?falseDate():trueDate()
    }

//calculate time
function dateCalaculation(){
 
      let toDay=Date.now()
      console.log(toDay);
      diffTime=date-toDay
      let secs=Math.floor((diffTime/1000) %60)
      let mins=Math.floor(diffTime /(60*1000)%60)
      let hours=Math.floor(diffTime/(60*60*1000)%24)
      let days=Math.floor(diffTime /(24*60*60*1000)) 
  //check
      days=days<10?`0${days}`:`${days}`
      hours=hours<10?`0${hours}`:`${hours}`
      hours=hours>=12?`0${hours-12}`:`${hours}`
      mins=mins<10?`0${mins}`:`${mins}`
      secs=secs<10?`0${secs}`:`${secs}`
  //update time on screen
      daysEl.textContent=days
      hoursEl.textContent=hours
      minsEl.textContent=mins
      secsEl.textContent=secs   
}

//reset func
   function resetFun(){
    addFun(counterBox2)
    addFun(newCounter)
    clearFun(counterBox1)
    countingForText=""
    CountDate=""
   window.localStorage.clear()
   }
//date in local storage
   function dateInLocalStorage(){
     if(localStorage.getItem("date")){
       savedItems= JSON.parse(localStorage.getItem("date"))
       CountDate= savedItems.date
       countingForText=savedItems.text
       date= new Date(CountDate).getTime()
       CheckDate()}
   } 
// events  

submit.addEventListener("click",(e)=>{
    countingForText=CountingFor.value
    CountDate=dateInput.value
    savedItems={
       date:`${CountDate}`,
       text:`${countingForText}`} 
    localStorage.setItem("date",JSON.stringify(savedItems) )
    //if inputs empty
    if (!countingForText){
      e.preventDefault()
      countingForText=""
      alert("please input what you are counting down for!")
    }
    else{
      //check and count down
      date= new Date(CountDate).getTime()
      CheckDate()
    }
     
  })
reset.addEventListener("click",resetFun)
newCountBtn.addEventListener('click',resetFun)
dateInLocalStorage()







