
var _sv = (function (global, factory, plug) {
    return global[plug] = factory.call(global, plug);
})(this, function (plug) {
    return function (num, fixed = 2) {
        if (typeof num !== 'number') return num;

        let
            // strNum = Math.abs(num.toFixed(fixed)) + '',
            strNum = num.toFixed(fixed) + '',
            [strNo, strDecimal] = strNum.split('.');

        if (strNum.includes('e')) return num;

        const sv = `${num < 0 ? '-' : ''}${formatInt(strNo.replace('-', ''))}.${strDecimal || '00'}`;
        return sv;
    };

    function formatInt(no) {
        // return formatInt_v1(no);
        return formatInt_v2(no);
    }
    /**
     * 整数格式化
     * @param {Int} no 
     */
    function formatInt_v1(no) {
        if ((no = no + '').length < 4) return no;

        const array = no.split(''), int_count = array.length / 3;
        for (let i = 1; i < int_count; i++) {
            const index = array.length - i * 3;
            array[index] = ',' + array[index]
        }
        return array.join('');
    }

    /**
     * 整数格式化
     * @param {Int} no 
     */
    function formatInt_v2(no) {
        if ((no = no + '').length < 4) return no;

        let result = '';
        for (let index = no.length - 1; index >= 0; index--) {
            if (result.length % 3 === 0 && index !== 0) result = ',' + result;
            result = no.charAt(index) + result;
        }

        return result;
    }
}, 'AmountFormat');