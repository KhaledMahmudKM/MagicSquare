function initAll(){
  clickCount=0;
  objMagic={clickCount:0, unitsize:50,padding:5 };
  
}
function createBtnClicked() {
  //alert("Hi");
    var N = document.getElementById("NValue").value;
    createSquare(N);
}

function createSquare(N) {
    N=parseInt(N);
    objMagic.N=N;
    objMagic.targetSum=parseInt((N*N+1)*N/2);
  
    objMagic.totalCells=N*N;

    
    //Find the main container 
    var magiccont=document.getElementById("idMagicContainer");

//Remove the content of all the internal contanters; resize them
    var cdiv=document.getElementById("idDiagonal135");
    cdiv.innerHTML="";
    
    cdiv.style.width=String(1*objMagic.unitsize+2*objMagic.padding)+"px";
    cdiv.style.height=cdiv.style.width;  
    
    cdiv=document.getElementById("idColSumContainer");
    cdiv.innerHTML="";
    cdiv.style.width=String(N*objMagic.unitsize+2*objMagic.padding)+"px";
    cdiv.style.height=String(1*objMagic.unitsize+2*objMagic.padding)+"px";

    var cdiv=document.getElementById("idDiagonal45");
    cdiv.innerHTML="";
    cdiv.style.width=String(1*objMagic.unitsize+2*objMagic.padding)+"px";
    cdiv.style.height=cdiv.style.width; 

    cdiv=document.getElementById("idRowSumContainer");
    cdiv.innerHTML="";
    cdiv.style.width=String(1*objMagic.unitsize+2*objMagic.padding)+"px";
    cdiv.style.height=String(N*objMagic.unitsize+2*objMagic.padding)+"px"; 

    cdiv=document.getElementById("idSqContainer");
    cdiv.innerHTML="";
    cdiv.style.width=String(N*objMagic.unitsize+2*objMagic.padding)+"px";
    cdiv.style.height=cdiv.style.width;

    cdiv=document.getElementById("idRowSumContainerRight");
    cdiv.innerHTML="";
    cdiv.style.width=String(1*objMagic.unitsize+2*objMagic.padding)+"px";
    cdiv.style.height=String(N*objMagic.unitsize+2*objMagic.padding)+"px";    

    cdiv=document.getElementById("idDoneDisplay");
    cdiv.innerHTML="";
    
    //x=x*(objMagic.unitsize);
    //alert(x);
    //x=x+6*objMagic.padding;
    //alert(x);
    cdiv.style.width=String((N+2)*objMagic.unitsize+6*objMagic.padding)+"px";
    cdiv.style.height=String(1*objMagic.unitsize+2*objMagic.padding)+"px";

//Create all cells
  var i=1;
    //sqArray=[];
    sqArrayValue=[];
    sqArrayNode=[];
    //document.getElementById("idSqContainer").innerHTML="";
    for (i=0; i<objMagic.totalCells;i++){
      const ele = document.createElement("BUTTON");
      ele.innerText=String(i+1);
      ele.className="clNumberBox";
      //alert(i);
      ele.value=i; //Need this value for indexing the buttons
      ele.addEventListener("click", btnClicked);
      document.getElementById("idSqContainer").appendChild(ele);
      //var cellObj={node:ele, value:i};
      //sqArray.push(cellObj);
      sqArrayValue.push(i+1);
      sqArrayNode.push(ele);
    }
//Create Row sum cells
    rowSumArray=[];
    document.getElementById("idRowSumContainer").innerHTML="";
    for(i=1;i<=N;i++){
      var ele = document.createElement("BUTTON");
      ele.className="clNumberBox";
      document.getElementById("idRowSumContainer").appendChild(ele);
      var cellObj={node:ele, value:0};
      rowSumArray.push(cellObj);
    }
//Create Column sum cells
    colSumArray=[];
    document.getElementById("idColSumContainer").innerHTML="";
    for(i=1;i<=N;i++){
      var ele = document.createElement("BUTTON");
      ele.className="clNumberBox";
      document.getElementById("idColSumContainer").appendChild(ele);
      var cellObj={node:ele, value:0};
      colSumArray.push(cellObj);
    }
//Create 45 degree diagonal
    document.getElementById("idDiagonal45").innerHTML="";
    var ele = document.createElement("BUTTON");
    ele.className="clNumberBox";
    document.getElementById("idDiagonal45").appendChild(ele);
    diagonalObj45={node:ele, value:0};

//Create 135 degree diagonal  
    document.getElementById("idDiagonal135").innerHTML="";
    var ele = document.createElement("BUTTON");
    ele.className="clNumberBox";
    document.getElementById("idDiagonal135").appendChild(ele);
    diagonalObj135={node:ele, value:0};

    calculateSums(N);
}

function calculateSums(N){
  var i;
  var correctCount=0;
  //var targetSum=parseInt(objMagic.targetSum);
  //Row sum
  for (i=0;i<N; i++){
    sum=0;
    for(j=0;j<N;j++){
      sum=sum+sqArrayValue[i*N+j];
    }
    rowSumArray[i].value=sum;
    rowSumArray[i].node.innerHTML=String(sum);
    if(sum==objMagic.targetSum){
      rowSumArray[i].node.className="clNumberBox clSqDone";
      correctCount++;
    }
    else{
      rowSumArray[i].node.className="clNumberBox clSqNotDone";
    }
  }  
  //Column sum
  for (i=0;i<N; i++){
    sum=0;
    for(j=0;j<N;j++){
      sum+=sqArrayValue[i+j*N];
    }
    colSumArray[i].value=sum;
    colSumArray[i].node.innerHTML=String(sum);
    if(sum==objMagic.targetSum){
      colSumArray[i].node.className="clNumberBox clSqDone";
      correctCount++;
    }
    else{
      colSumArray[i].node.className="clNumberBox clSqNotDone";
    }
  }
  //Diagonal sums
  sum1=0;
  sum2=0;
  for(i=0;i<N;i++){
    sum1+=sqArrayValue[i*N+i];
    sum2+=sqArrayValue[(N-1-i)*N+i];
  }
  diagonalObj45.node.innerHTML=String(sum2);
  diagonalObj45.value=sum2;

  if(sum2==objMagic.targetSum){
    diagonalObj45.node.className="clNumberBox clSqDone";
    correctCount++;
  }
  else{
    diagonalObj45.node.className="clNumberBox clSqNotDone";
  }
  diagonalObj135.node.innerHTML=String(sum1);
  diagonalObj135.value=sum1;
  if(sum1==objMagic.targetSum){
    diagonalObj135.node.className="clNumberBox clSqDone";
    correctCount++;
  }
  else{
    diagonalObj135.node.className="clNumberBox clSqNotDone";
  }

  if(correctCount==(2*N+2)){
    //Done
    document.getElementById("idDoneDisplay").innerHTML="Done!";
  }

}

function btnClicked(){

  //sqArray[inx].node.className="clNumberBox clSqSelected";
  this.className="clNumberBox clSqSelected";
  if(clickCount==0){
    btn1Index=this.value;
    clickCount=1;
  }
  else if(clickCount==1){
    btn2Index=this.value;
    clickCount=2;
    //Swap values

    temp=sqArrayValue[btn1Index];
    sqArrayValue[btn1Index]=sqArrayValue[btn2Index];
    sqArrayValue[btn2Index]=temp;


    sqArrayNode[btn1Index].innerHTML=String(sqArrayValue[btn1Index]);
    sqArrayNode[btn1Index].className="clNumberBox";

    sqArrayNode[btn2Index].innerHTML=String(sqArrayValue[btn2Index]);
    sqArrayNode[btn2Index].className="clNumberBox";

    calculateSums(objMagic.N);

    clickCount=0;
  }
}

function updateNumbers(){
  
  var N=objMagic.N;
  var totalCells=objMagic.totalCells;
  var inx;
  for(inx=0;inx<totalCells;inx++){
    sqArrayNode[inx].innerHTML=String(sqArrayValue[inx]);
  }
  calculateSums(N);
}

function diagonalValue(){
  N=objMagic.N;
  var maxSum=2*(N-1); //Total number of diagonals
  var str="";
  var pair;
  var i, j, c, inx;
  var start;
  c=1;
  for (i=0; i<=maxSum; i++){
    if(i>=N-1){start=N-1;}
    else{start=i;}
    pair="";
    for(j=start;j>=i-start;j--){
      
      pair="("+j+","+(i-j)+")";
      str=str+pair;
      inx=j*N+(i-j);
      //console.log(pair);
      sqArrayValue[inx]=c;
      updateNumbers();
      //sqArray[inx].node.innerHTML=String(c);
      c++;
    }
    str=str+"<br>";
  }
  calculateSums(N);
}

function solveMagic(){
  var N=objMagic.N;
  var totalCells=objMagic.totalCells;
  var inx, v, r0, c0, r, c;
  
  //reset sqArray
  for (inx=0;inx<totalCells;inx++){
    sqArrayValue[inx]=0;
  }

  //Solve
  r0=1; //Start row
  c0=parseInt(N/2)-1; //start column
  //v=1; //start value
  for (v=1;v<=totalCells;v++){
    //Calculate next cell
    r=r0-1;
    if (r<0){r=N-1;} //Roll over
    c=c0+1;
    if(c===N) {c=0;} //Roll over
    inx=(r*N+c); //Next index
    //Check if the cell is  already occupied
    if(sqArrayValue[inx]!=0){
      r=r0+1;
      if(r===N){r=0;}
      c=c0;
      inx=(r*N+c); //Next index
    }
    sqArrayValue[inx]=v;
    //console.log(inx,v);
    c0=c;
    r0=r;
  }
  updateNumbers();

}