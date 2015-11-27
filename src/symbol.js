this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Symbol(parent, model, location, orientation, shape)
    {
        this.parent = parent;
        this.model = model;
        this.location = location;
        this.orientation = orientation;
        this.shape = shape;
    }

    var p = Symbol.prototype;

    vj2.Symbol = Symbol;
}());
