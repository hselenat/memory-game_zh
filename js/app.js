/*
 * 创建一个包含所有卡片的数组
 */
var cards = [
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>'
];
let open = [];//定义变量为open的空数组，存放状态为 open显示的卡片
let moves = 0;
let stars = 3;

function show(){
    shuffle(cards).forEach(function (card) {     //使用shuffle(cards)对数组中每个元素进行洗牌
        $('.deck').append(card);                 //将遍历的每个元素添加到html的deck类中
    });

}
show();//显示出来

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

function showCard() {
    this.className = 'card open show'; //显示卡片的符号 showCard()
}

$('.deck').on('click', 'li', function () {//点击deck类中的每个li执行以下操作
    showCard.call(this);                  //显示所点击的this卡片
    open.push(this);                      //添加进数组
    check();
});
$('div.restart').on('click', restart);


function check() {           //检查卡片
    updateMoves();
    checkWin();
    checkStars();
}

function checkMatch() {     //检查对比卡片
    if (open[0].firstChild.className == open[1].firstChild.className) {
        open.forEach(function (card) {
            card.className = 'card match';
        })
        open.length = 0;
    }  else {
        setTimeout(function () {
            open.forEach(function (card) {
                card.className = 'card';
            })
            open.length = 0;
        },500);
    }
}
//更新星级
function updateStars() {
    if (moves <= 16) {
        $('.stars .fa').addClass("fa-star");
        stars = 3;
    } else if (moves >= 17 && moves <= 25) {
        $('.stars li:last-child .fa').removeClass("fa-star");
        $('.stars li:last-child .fa').addClass("fa-star-o");
        stars = 2;
    } else {
        $('.stars li:nth-child(2) .fa').removeClass("fa-star");
        $('.stars li:nth-child(2) .fa').addClass("fa-star-o");
        stars = 1;
    }
    $('.win-container .stars-number').text(stars);
}

//更新步数
function updateMoves() {
    if (open.length == 2) {
        moves++;
        checkMatch();
    }
    $('span.moves').text(String(moves));
}
function checkWin() {
    if($('.card.match').length == 4){
        if(confirm('again?')){
            restart();
        } else {
            alert('bye.');
        }
    }
}
//重新开始游戏
function restart() {
    //清空所有卡片
    $('.deck li').remove();
    //初始化星级
    stars = 3;
    $('.stars i').removeClass("fa-star-o");
    $('.stars i').addClass("fa-star");
    updateStars();
    //初始化步数
    moves = 0;
    $('span.moves').text(String(moves));
    //重新打乱并加载卡片
    show();
    
}

