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
var open = [];
var moves = 0;
/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

function show(){
    shuffle(cards).forEach(function (card) {
        $('.deck').append(card);
    });

}
show();
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
    this.className = 'card open show';
}
function check() {
    if (open.length == 2){
        moves++;
        checkMatch();
    }
    updateMoves();
    checkWin();
    checkStars();
}
function checkMatch() {
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
function updateMoves() {
    $('span.moves').text(String(moves));
}
function checkWin() {
    if($('.card.match').length == 2){
        if(confirm('again?')){
            restart();
        } else {
            alert('bye.');
        }
    }
}
//重新开始游戏
function restart() {
    $('.deck li').remove();
    moves = 0;
    $('span.moves').text(String(moves));
    show();
}

$('.deck').on('click','li',function () {
    showCard.call(this);//反转卡片
    open.push(this);//添加进数组
    check();
});
$('div.restart').on('click',restart);
