function showNumberWithAnimation(i,j,randnumber){
    var numberCell=$("#number-cell-"+i+"-"+j);

    numberCell.css("background-color",getNumberBackgroundColor(randnumber));
    numberCell.css("color",getNumberColor(randnumber));
    numberCell.text(randnumber);

    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j),

    },50)
}

function updateScore(score){
    $("#score").text(score);
}