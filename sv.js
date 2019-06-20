/**
 * 1 - 50 过滤掉 7 的倍数 和 个位数为7的数字
 */
; (function (global) {
    // 1. 填充一个数组
    console.group('init');
    let array = new Array(50);
    console.log(array);
    console.groupEnd();

    console.group('forEach')
    array.forEach((v, i) => {
        console.log(1);
        v = i + 1;
        console.log(v, i);
    })
    console.log(array);
    console.groupEnd();

    // let i = 0, array_interval = [];
    // let interval = setInterval(function () {
    //     i < 50 ? array_interval.push(++i) : clearInterval(interval);
    // }, 0);
    // setTimeout(function () {
    //     console.log(array_interval);
    // }, 1000 * 10);

    // a. 递归算法， 函数里面调用函数本身，优势性能比较好,劣势 消耗内存空间

    // function index(array, length) {
    //     console.log(length);
    //     if (length > 0) {
    //         array[length - 1] = --length;
    //         index(array, length);
    //     }
    // }
    // let ab = [];
    // index(ab, 50);
    // console.log(ab);


    // let array_digui = new Array(50);
    // function digui(array, i) {
    //     if (i != array.length) {
    //         array[i] = i++;
    //         digui(array, i);
    //     }
    // }
    // digui(array_digui, 0);
    // console.log(array_digui);

    // var sb = [].fill(0, 0, 49);
    // console.log(sb);
    // sb = sb.map((v, i) => {
    //     return i;
    // });
    // console.log(sb);

    // console.log(typeof void 0)
    // console.log(typeof null)

    let ab = new Array(50).join(',').split(',').map((v, i) => i);
    ab = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }, { a: 6 }];
    console.log(ab);
    ab.sort(_ => Math.random() > 0.5 ? 1 : -1)
    console.log(ab);
})(this);