this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Orientations(path){
        load_json(path, (function(self) {
            return function(obj) {
                self.orientations = obj;
            };
        }(this)));
    }

    var p = Orientations.prototype;

    p.getOrientation = function(id) {
        return this.orientations[id];
    };

    vj2.Orientations = Orientations;
}());
