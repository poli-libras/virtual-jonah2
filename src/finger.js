this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Finger(phalange1,phalange2,phalange3,direction){
        this.phalange1 = new vj2.Animated_bone(phalange1, 1.5);
        this.phalange2 = new vj2.Animated_bone(phalange2, 1.5);
        this.phalange3 = new vj2.Animated_bone(phalange3, 1.5);
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

        this.phalange_list.forEach(function(phalange){
            phalange.reset_animation();
        });
    };

    p.open = function(){
        this.phalange_list.forEach(function(phalange){
            phalange.set_rotation(0,0,0);
            phalange.reset_animation();
        });
    };

    p.animation = function(dt){
        this.phalange_list.forEach(function(phalange){
            phalange.update(dt);
        });
    };

    vj2.Finger = Finger;
}());
