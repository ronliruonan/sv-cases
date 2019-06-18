
var _sv = (function (global, factory, plug) {
    return global[plug] = factory.call(global);
})(this, function () {
    return function (num, fixed = 2) {
        if (typeof num !== 'number') return num;

        let
            // strNum = Math.abs(num.toFixed(fixed)) + '',
            strNum = num.toFixed(fixed) + '',
            [strNo, strDecimal] = strNum.split('.');

        if (strNum.includes('e')) return num;
        return `${num < 0 ? '-' : ''}${formatInt(strNo.replace('-', ''))}.${strDecimal || '00'}`;
    };

    /**
     * 整数格式化
     * @param {Int} no 
     */
    function formatInt(no) {
        if ((no = no + '').length < 4) return no;

        const array = no.split(''), int_count = array.length / 3;
        for (let i = 1; i < int_count; i++) {
            const index = array.length - i * 3;
            array[index] = ',' + array[index]
        }
        return array.join('');
    }
}, 'AmountFormat');