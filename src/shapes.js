this.vj2 = this.vj2||{};

(function () {
    "use strict";

    var Shapes = function (){
        this.load("../resources/shapes.json");
    };

    Shapes.prototype = Object.create(vj2.Limb_config.prototype);
    vj2.Shapes = Shapes;
}());
