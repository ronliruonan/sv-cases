; (function (global, factory, plug) {
    const
        _app = document.getElementById('app'),
        _config = {
            scale_value: 1,
            scale_max: 6,
            scale_min: 1,
            ori_touches: [],
            ori_distance: 0
        },
        proper = {};

    const
        _alert = document.querySelector('#alert'),
        _error = document.querySelector('#error'),
        _log = document.querySelector('#log'),
        _log4 = document.querySelector('#log4');

    Object.defineProperty(proper, "ori_touches", {
        enumerable: true,
        // get: function () { 
        // },
        set: function (newValue) {
            _config.ori_touches = newValue;
            _config.ori_distance = calcPointDistance(_config.ori_touches[0], _config.ori_touches[1]);
            // document.querySelector('#log5').textContent = Date.now() + '  defineProperty  ' + _config.ori_distance;
        }
    });


    // 1. 起始触点
    _app.addEventListener('touchstart', e => {
        requestAnimationFrame(_ => {
            // const _viewbox = document.getElementById('viewbox');
            // if (!_viewbox) return _error.textContent = '预览盒子不存在';
            if (e.touches.length < 2) return;

            proper.ori_touches = e.touches;
        })
    }, false);
    // 2. 触点移动，这是一个连续性动作
    _app.addEventListener('touchmove', e => {
        requestAnimationFrame(_ => {
            const _viewbox = document.getElementById('viewbox');
            if (!_viewbox) return _error.textContent = '预览盒子不存在';

            const _view = document.getElementById('view');
            if (!_view) return _error.textContent = '预览框不存在';

            if (e.touches.length < 2) return _error.textContent = '触点个数不足2个';

            let
                curTouches = e.touches,
                curDistance = calcPointDistance(curTouches[0], curTouches[1]);

            // _alert.textContent = Date.now() + '  -->  ' + curDistance;
            // _error.textContent = Date.now() + ' --->  ' + _config.ori_distance;

            let
                scaleBigger = _config.scale_value + 0.24,
                scaleSmaller = _config.scale_value - 0.24;

            // _alert.textContent = Date.now() + ' --->  ' + scaleBigger;
            // _error.textContent = Date.now() + ' --->  ' + scaleSmaller;

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

            // _alert.textContent = Date.now() + ' --->  ' + _view_width;
            // _error.textContent = Date.now() + ' --->  ' + _view_height;

            // 为什么要计算原始比例？？？
            const topRatio = (_viewbox_scrollTop + (_viewbox_offsetHeight / 2)) / _view_height;
            const leftRatio = (_viewbox_scrollLeft + (_viewbox_offsetWidth / 2)) / _view_width;

            // _alert.textContent = Date.now() + ' --->  ' + topRatio;
            // _error.textContent = Date.now() + ' --->  ' + leftRatio;

            // _log.textContent = Date.now() + '   --->  ' + (curDistance - _config.ori_distance);

            if (curDistance - _config.ori_distance > 8) {
                // _log4.textContent = Date.now() + '   --->   放大ing';
                if (_config.scale_value > _config.scale_max) return _log4.textContent = '已经放不大了';
                // to do 
                _view.style.transition = 'none';
                _view.style.transformOrigin = 'top left';
                _view.style.transform = `scale(${scaleBigger})`;

                // 根据原始比例，计算新Top
                let {
                    scrollHeight: _view_height,
                    scrollWidth: _view_width,
                    offsetHeight: _viewbox_height,
                    offsetWidth: _viewbox_width
                } = _viewbox;

                _viewbox.scrollTop = _view_height * topRatio - (_viewbox_height / 2);
                _viewbox.scrollLeft = _view_width * leftRatio - (_viewbox_width / 2);

                proper.ori_touches = curTouches;
                _config.scale_value = scaleBigger;
            } else if (curDistance - _config.ori_distance < -8) {
                // _log4.textContent = Date.now() + '   --->   缩小ing';
                if (_config.scale_value < _config.scale_min) return _log4.textContent = '已经缩小了';

                // to do
                scaleSmaller = scaleSmaller < _config.scale_min ? _config.scale_min : scaleSmaller;
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

                proper.ori_touches = curTouches;
                _config.scale_value = scaleSmaller;
            }
        });
        e.preventDefault();
    }, false);


    function calcPointDistance(p1, p2) {
        const x = p2.pageX - p1.pageX,
            y = p2.pageY - p2.pageY;
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
})(this, function () { }, 'TouchScale');