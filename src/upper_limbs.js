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

    p.update = function(roll,yaw,pitch,loc){
        this.arm_bones.update_loc(loc);
        this.arm_bones.update_wrist(roll,yaw,pitch);
    };

    p.update_wrist = function(roll,yaw,pitch){
        this.arm_bones.update_wrist(roll,yaw,pitch);
    };

    p.update_uparm = function(roll,yaw,pitch){
        this.arm_bones.update_uparm(roll,yaw,pitch);
    };

    p.update_loarm = function(roll,yaw,pitch){
        this.arm_bones.update_loarm(roll,yaw,pitch);
    };

    p.animation = function(dt){
        this.arm_bones.animation(dt);
        this.hand.animation(dt);
    };

    vj2.Upper_limbs = Upper_limbs;
}());
