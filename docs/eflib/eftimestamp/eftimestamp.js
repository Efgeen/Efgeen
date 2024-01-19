export const eftimestamp = (() => {

    return Object.freeze({
        _t: function() {
            return {};
        },
        now: function(ts) {
            return performance.now() / 1000.0;
        }
    });
})();
