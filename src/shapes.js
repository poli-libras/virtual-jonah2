this.vj2 = this.vj2||{};

(function () {
    "use strict";

    var Shapes = function (){
        vj2.Limb_config.call(this, "../resources/shapes.json");
    };

    Shapes.prototype = Object.create(vj2.Limb_config.prototype);
    Shapes.prototype.constructor = Shapes;
    vj2.Shapes = Shapes;
}());
