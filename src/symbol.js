this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Symbol(location, orientation, shape)
    {
        this.location = location;
        this.orientation = orientation;
        this.shape = shape;
    }

    var p = Symbol.prototype;

    vj2.Symbol = Symbol;
}());
