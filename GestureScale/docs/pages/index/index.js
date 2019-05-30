; (function (v, b) {
    const _app = document.getElementById('app');
    _app.scale_value = 1;
    _app.scale_max = 6;
    _app.scale_min = 1;
    // 1. 起始触点
    let startTouches = [];
    _app.addEventListener('touchstart', e => {
        console.log('touchstart: ', e.touches.length);

        const _viewbox = document.getElementById('viewbox');
        if (!_viewbox) return console.error('预览盒子不存在');

        // if (e.touches.length < 2) return;

        startTouches = e.touches;
    }, false);
    // 2. 触点移动，这是一个连续性动作
    _app.addEventListener('touchmove', e => {
        const _viewbox = document.getElementById('viewbox');
        if (!_viewbox) return console.error('预览盒子不存在');

        const _view = document.getElementById('view');
        if (!_view) return console.error('预览框不存在');

        if (e.touches.length < 2) return;
        // alert(e.touches.length);

        let curTouches = e.touches,
            // 触点间距
            curDistance = calcPointDistance(curTouches[0], curTouches[1]),
            startDistance = calcPointDistance(startTouches[0], startTouches[1]);

        const scaleBigger = _app.scale_value + 0.24, scaleSmaller = _app.scale_value - 0.24;

        let {
            scrollTop: _viewbox_scrollTop,
            scrollLeft: _viewbox_scrollLeft,

            offsetWidth: _viewbox_offsetWidth,
            offsetHeight: _viewbox_offsetHeight,

            // view的width，因为具体图片内容不确定，
            // 故使用父元素的scrollWidth来间接获取view的width;
            // 同理： view的height
            scrollWidth: _view_width,
            scrollHeight: _view_height,
        } = _viewbox;

        // 为什么要计算原始比例？？？
        const topRatio = (_viewbox_scrollTop + (_viewbox_offsetHeight / 2)) / _view_height;
        const leftRatio = (_viewbox_scrollLeft + (_viewbox_offsetWidth / 2)) / _view_width;

        if (curDistance - startDistance > 8) {
            if (_app.scale_value > _app.scale_max) return alert('已经放不大了');
            // to do 
            requestAnimationFrame(_ => {
                _view.style.transition = 'none';
                _view.style.transformOrigin = 'top left';
                _view.style.transform = `scale(${scaleBigger})`;

                // 根据原始比例，计算新Top
                let { scrollHeight: _view_height,
                    scrollWidth: _view_width,
                    offsetHeight: _viewbox_height,
                    offsetWidth: _viewbox_width } = _viewbox;

                _viewbox.scrollTop = _view_height * topRatio - (_viewbox_height / 2);
                _viewbox.scrollLeft = _view_width * leftRatio - (_viewbox_width / 2);

                startTouches = curTouches;
                _app.scale_value = scaleBigger;
            });

        } else if (curDistance - startDistance < -8) {
            if (_app.scale_value < _app.scale_min) return;
            // to do
            scaleSmaller = scaleSmaller < _app.scale_min ? _app.scale_min : scaleSmaller;
            requestAnimationFrame(_ => {
                _view.style.transition = 'none';
                _view.style.transformOrigin = 'top left';
                _view.style.transform = `scale(${scaleSmaller})`;

                // 根据原始比例，计算新top
                let {
                    scrollHeight: _view_height,
                    scrollWidth: _view_width,
                    offsetHeight: _viewbox_height,
                    offsetWidth: _viewbox_width
                } = _viewbox;

                _viewbox.scrollTop = _view_height * topRatio - (_viewbox_height / 2);
                _viewbox.scrollLeft = _view_width * leftRatio - (_viewbox_width / 2);

                startTouches = curTouches;
                _app.scale_value = scaleSmaller;
            });
        }

        e.preventDefault();
    }, false);


    function calcPointDistance(p1, p2) {
        const x = p2.pageX - p1.pageX,
            y = p2.pageY - p2.pageY;
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
})(1);