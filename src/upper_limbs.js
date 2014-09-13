this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Upper_limbs(hand,arm_bones,direction){
        this.arm_bones = arm_bones;
        this.hand = hand;
        this.direction = direction;
    }

    var p = Upper_limbs.prototype;

    p.set_shape = function(shape){
        this.hand.set_shape(shape);
    };

    p.update = function(yaw,pitch,roll,loc){
        this.arm_bones.update_loc(loc);
        this.arm_bones.update_wrist(yaw,pitch,roll);
    };


    p.update_wrist = function(yaw,pitch,roll){
        this.arm_bones.update_wrist(yaw,pitch,roll);
    };

    p.animation = function(dt){
        this.arm_bones.animation(dt);
        this.hand.animation(dt);
    };

    vj2.Upper_limbs = Upper_limbs;
}());
