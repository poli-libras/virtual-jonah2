this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Upper_limbs(hand,arm_bones,direction){
        this.arm_bones = arm_bones;
        this.hand = hand;
        this.direction = direction;
    }

    Upper_limbs.prototype.set_shape = function(shape){
        this.hand.set_shape(shape);
    };

    Upper_limbs.prototype.update = function(yaw,pitch,roll,loc){
        this.arm_bones.update_loc(loc);
        this.arm_bones.update_wrist(yaw,pitch,roll);
    };


    Upper_limbs.prototype.update_wrist = function(yaw,pitch,roll){
        this.arm_bones.update_wrist(yaw,pitch,roll);
    };

    Upper_limbs.prototype.animation = function(){
        this.arm_bones.animation();
        this.hand.animation();
    };

    vj2.Upper_limbs = Upper_limbs;
}());
