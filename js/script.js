document.addEventListener("DOMContentLoaded", function(event) { 
  console.log(localStorage)
  var rule = document.getElementsByClassName("rule")[0];
  var cancel = document.getElementsByClassName("cancel")[0];
  var box = document.getElementsByClassName("clickedrule")[0];
  var rock = document.getElementsByClassName("rock")[0];
  var paper = document.getElementsByClassName("paper")[0];
  var sissor = document.getElementsByClassName("sissor")[0];
  var choose = document.getElementsByClassName("choose")[0];
  var choosed = document.getElementsByClassName("choosed")[0];
  var resultContainer = document.getElementsByClassName("resultContainer")[0];
  var youritem = document.getElementsByClassName("youritem")[0];
  var resultText = document.getElementsByClassName("result")[0];
  var playAgain = document.getElementsByClassName("playAgain")[0];
  var houseItem = document.getElementsByClassName("houseitem")[0];
  
  var cloneRock = rock.cloneNode(true);
  var rockHtml = cloneRock.outerHTML;
  
  var clonePaper = paper.cloneNode(true);
  var paperHtml = clonePaper.outerHTML;
  
  var cloneSissor = sissor.cloneNode(true);
  var sissorHtml = cloneSissor.outerHTML;
  
  var scroeno = document.getElementsByClassName("scoreNo")[0];
  
  scroeno.innerHTML = localStorage.getItem('scroce');
  
   
  var setScroeStorage = (result)=>{
    var i = localStorage.getItem('scroce');
    result ? i++ : i--;
    
    localStorage.setItem('scroce',i);
    
    scroeno.innerHTML = localStorage.getItem('scroce');
    
  }
  
  var refreshItem = (item1,item2)=>{
    
    if(item1 == "paper"){
      console.log("1p");
      youritem.innerHTML = paperHtml;
    }else if(item1 == "sissor"){
     console.log("1s");
     youritem.innerHTML = sissorHtml;
    }else if(item1 == "rock"){
      console.log("1r");
      youritem.innerHTML = rockHtml;
    }
    
    if(item2 == "sissor"){
      houseItem.innerHTML = sissorHtml;
    }else if(item2 == "rock"){
      houseItem.innerHTML = rockHtml;
    }else if(item2 == "paper"){
      houseItem.innerHTML = paperHtml
    }
    
  };
  
  var gameRule = (item1,item2)=>{
    
  if(item1 == "rock"){
       if(item2 == "rock"){
         return -1;
       }else if(item2 == "paper"){
          winEffect("paper");
          refreshItem("rock","paper");
          return 0;
       }else if(item2 == "sissor"){
         winEffect("rock");
         refreshItem("rock","sissor");
         return 1;
       }
     }
     
     else if(item1 == "paper"){
       if(item2 == "rock"){
         winEffect("paper");
         refreshItem("paper","rock");
         return 1;
       }else if(item2 == "paper"){
         return -1;
       }else if(item2 == "sissor"){
         winEffect("sissor");
         refreshItem("paper","sissor");
         return 0;
       }
     }
     
     else if(item1 == "sissor"){
       if(item2 == "rock"){
         winEffect("rock");
         refreshItem("sissor","rock");
         return 0;
       }else if(item2 == "paper"){
         winEffect("sissor");
         refreshItem("sissor","paper");
         return 1;
       }else if(item2 == "sissor"){
        return -1;
       }
     }
};
  
  var randomitem = ()=>{
    
    var randomno = Math.floor(Math.random() * 3);
    
    if(randomno == "0"){
      var item = "sissor";
      return item;
    }else if(randomno == "1"){
      var item = "rock";
      return item;
    }else if(randomno == '2'){
      var item = "paper";
      return item;
    }
  }
  
  var toShowItemInHtml = (item)=>{
    
   if(item == "sissor"){
     return sissorHtml;
   }else if(item == "rock"){
     return rockHtml;
   }else if(item == "paper"){
     return paperHtml;
   }
   
  };
  
  var winEffect = (item)=>{
    if(item == "rock"){
      
      cloneRock.classList.remove("defaultRock");
      cloneRock.classList.add("winRock");
      return rockHtml = cloneRock.outerHTML;
      
    }else if(item == "paper"){
      
      clonePaper.classList.remove("defaultPaper");
      clonePaper.classList.add("winPaper");
      return paperHtml = clonePaper.outerHTML;
      
    }else if(item == "sissor"){
      
     cloneSissor.classList.remove("defaultSissor");
     cloneSissor.classList.add("winSissor");
     return sissorHtml= cloneSissor.outerHTML;
     
    }
    
  }
  
  var play = ()=>{  
    cloneSissor.classList.add("defaultSissor");
    cloneSissor.classList.remove("winSissor");
    sissorHtml = cloneSissor.outerHTML;
    
    cloneRock.classList.add("defaultRock");
    cloneRock.classList.remove("winRock");
    rockHtml = cloneRock.outerHTML;
    
    clonePaper.classList.add("defaultPaper");
    clonePaper.classList.remove("winPaper");
    paperHtml = clonePaper.outerHTML;
    
    
    choose.style.display="none";
    choosed.style.visibility= "visible";
    return;
  };
  
  var resultShow = (result)=>{
    
    resultContainer.style.display = "block";
    if(result == '1'){
      resultText.innerHTML = "YOU WIN";
      setScroeStorage(1);
    }else if(result == '0'){
      resultText.innerHTML = "YOU LOSE";
      setScroeStorage(0);
    }else if(result == '-1'){
      resultText.innerHTML = "RESULT DRAW";
    }
    return;
  };
  
  rule.addEventListener("click",()=>{
    box.style.display="block";
  });
  
  cancel.addEventListener("click",()=>{
    box.style.display="none";
  })
  
  rock.addEventListener("click",()=>{
 
    play();
   document.getElementsByClassName("youritem")[0].innerHTML = rockHtml;
   setTimeout(function(){ 
    var houseItemsNo = randomitem();
    var houseitem = toShowItemInHtml(houseItemsNo);
    houseItem.innerHTML = houseitem;
    
    setTimeout(function() {
      var result = gameRule("rock",houseItemsNo);
      resultShow(result);
    }, 1000);
    
  }, 1000);
  
  })

  sissor.addEventListener("click",()=>{
    play();
   document.getElementsByClassName("youritem")[0].innerHTML= sissorHtml;
   
   setTimeout(function(){ 
    var houseItemsNo = randomitem();
    var houseitem = toShowItemInHtml(houseItemsNo);
    houseItem.innerHTML = houseitem;
    setTimeout(function() {
      var result = gameRule("sissor",houseItemsNo);
      resultShow(result);
    }, 1000);
  }, 1000);
  
  })
  
  paper.addEventListener("click",()=>{
    
    play();
    
    document.getElementsByClassName("youritem")[0].innerHTML = paperHtml ;
    
    setTimeout(function(){ 
    var houseItemsNo = randomitem();
    var houseitem = toShowItemInHtml(houseItemsNo);
    houseItem.innerHTML = houseitem;
   
    setTimeout(function() {
      
      var result = gameRule("paper",houseItemsNo);
      resultShow(result);
    }, 1000);
      
    }, 1000);
  
  })
  
  playAgain.addEventListener("click",()=>{
    choose.style.display="block";
    choosed.style.visibility= "hidden";
    resultContainer.style.display = "none";
    houseItem.innerHTML = `<div class="defaultitem"></div>`;

  })
  
});