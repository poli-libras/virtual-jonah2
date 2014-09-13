this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Finger(phalange1,phalange2,phalange3,direction){
        this.phalange1 = new vj2.Bone(phalange1);
        this.phalange2 = new vj2.Bone(phalange2);
        this.phalange3 = new vj2.Bone(phalange3);
        this.phalange_list = [this.phalange1,this.phalange2,this.phalange3];
        this.direction = direction;
    }

    var p = Finger.prototype;

    p.close = function(angle,rotation){
        var rotation_value = rotation;
        var y = angle;
        if (this.direction == "RIGHT"){
            y *= -1;
            rotation_value *= -1;
        }
        this.phalange1.set_rotation(0,y,rotation_value);
        this.phalange2.set_rotation(0,0,rotation_value);
        this.phalange3.set_rotation(0,0,rotation_value);
    };

    p.open = function(){
        this.phalange_list.forEach(function(phalange){
            phalange.set_rotation(0,0,0);
        });
    };

    p.animation = function(time){
        this.phalange_list.forEach(function(phalange){
            phalange.animation(time);
        });
    };

    vj2.Finger = Finger;
}());
