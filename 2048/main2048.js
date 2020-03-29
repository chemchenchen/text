var board=[];
var score=0;
var hasconfilicated=[];
$(document).ready(function(){
    newgame();
});                                     /*文档加载完成后将执行函数newgame */

function newgame(){
    init();
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell=$("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));    /*第二个参数如果是函数，不需要用引号，且不用带单位？ 若在html页面声明过两个不同的js文件，则这两个文件的函数可以互相调用 */
        }}
    
    for(var i=0;i<4;i++){
        board[i]=[];
        hasconfilicated[i]=[];
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasconfilicated[i][j]=false;
        }
    }
    score=0;

    updateBoardView();
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell=$("#number-cell-"+i+"-"+j);

            if(board[i][j]==0){
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");
                theNumberCell.css("top",getPosTop(i,j)+50);
                theNumberCell.css("left",getPosLeft(i,j)+50);
            }
            else{
                theNumberCell.css("width","100px");
                theNumberCell.css("height","100px");
                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));
                theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasconfilicated[i][j]=false;
        }
    }
}

function generateOneNumber(){
    if(nospace(board))
    return false;

    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4)); 
    var times=0;
    while(times<50){                                        //while循环必须带有条件，只要条件为ture则一直循环
        if(board[randx][randy]==0)
        break;                                          //如果没有break，循环会一直下去，从而后面的代码无法继续

        randx=parseInt(Math.floor(Math.random()*4));
        randy=parseInt(Math.floor(Math.random()*4)); 
        times++;
    }
    if(times==50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]==0)
                randx=i;
                randy=j;
            }
        }
    }

    var randnumber=(Math.random()<0.5)?2:4;

    board[randx][randy]=randnumber;

    // updateBoardView()
    showNumberWithAnimation(randx,randy,randnumber);
    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37:
            if(canMoveLeft(board)){
                moveLeft();
                setTimeout("generateOneNumber()",210) ;
                setTimeout("isGameOver()",300) ;
            }
            break;
        case 38:
            if(canMoveUp(board)){
                moveUp();
                setTimeout("generateOneNumber()",210) ;
                setTimeout("isGameOver()",300) ;
            }
            break;
        case 39:
            if(canMoveRight(board)){
                moveRight();
                setTimeout("generateOneNumber()",210) ;
                setTimeout("isGameOver()",300) ;
            }
            break;
        case 40:
            if(canMoveDown(board)){
                moveDown();
                setTimeout("generateOneNumber()",210) ;
                setTimeout("isGameOver()",300) ;
            }
            break;
        default:
            break;
    }
})

function isGameOver(){
    if(nospace(board) && noMove(board))
        gameOver();
}

function gameOver(){
    alert("GameOver!");
}

function moveLeft(){
    for(var i=0;i<4;i++){

        for(var j=1;j<4;j++){
            
            if(board[i][j]!=0){
                
                
                for(var k=0;k<j;k++){
                    if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && hasconfilicated[i][k] ==false ){
                        showAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        hasconfilicated[i][k]=true;
                        score+=board[i][k];
                        updateScore(score);
                        continue;
                    }
                    else if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        showAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                }
            }
        }
    } 
    setTimeout("updateBoardView()",200);
}

function moveRight(){
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        showAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) && hasconfilicated[i][k]==false){
                        showAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        hasconfilicated[i][k]=true;
                        score+=board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
}

function moveUp(){
    for(var i=1;i<4;i++){

        for(var j=0;j<4;j++){

            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0 && noBlockVertical(k,i,j,board)){
                        showAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0
                        continue;
                }
                    else if(board[k][j]==board[i][j] && noBlockVertical(k,i,j,board) && hasconfilicated[k][j]==false){
                        showAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        hasconfilicated[k][j]=true;
                        score+=board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
}

function moveDown(){
    for(var i=2;i>=0;i--){

        for(var j=0;j<4;j++){

            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0 && noBlockVertical(i,k,j,board)){
                        showAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                }
                    else if(board[k][j]==board[i][j] && noBlockVertical(i,k,j,board) && hasconfilicated[k][j]==false){
                        showAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        hasconfilicated[k][j]=true;
                        score+=board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
}