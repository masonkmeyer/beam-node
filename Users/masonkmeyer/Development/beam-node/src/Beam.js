var og = require('./OpenGraphProtocolParser');
var Beam = (function () {
    function Beam() {
        var result = new og.OpenGraphProtocolParser().parse('');
    }
    return Beam;
})();
exports.Beam = Beam;
