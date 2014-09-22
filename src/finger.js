this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Finger(phalange1,phalange2,phalange3,direction){
        this.phalange1 = new vj2.Bone(phalange1);
        this.phalange2 = new vj2.Bone(phalange2);
        this.phalange3 = new vj2.Bone(phalange3);
        this.phalange_list = [this.phalange1,this.phalange2,this.phalange3];
        this.direction = direction;
        this.animation_bones = new vj2.Animation_bones(this.phalange_list,1.5);
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

        this.animation_bones.reset_time();
    };

    p.open = function(){
        this.phalange_list.forEach(function(phalange){
            phalange.set_rotation(0,0,0);
        });

        this.animation_bones.reset_time();
    };

    p.animation = function(dt){
        this.animation_bones.animation(dt);
    };

    p.interpolate = function(factor){
        this.phalange_list.forEach(function(phalange){
            phalange.interpolate(factor);
        });
    };

    vj2.Finger = Finger;
}());
