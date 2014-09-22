this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Action_upper_limbs(human_model){
        this.human_model = human_model;
    }

    var p = Action_upper_limbs.prototype;

    p.create_upper_limbs = function(){
        var arm_bones_left = this.create_arm_bones(26,27,28,"LEFT");
        var arm_bones_right = this.create_arm_bones(52,53,54,"RIGHT"); 
        var hand_left = this.create_hand_left();
        var hand_right = this.create_hand_right();
        this.upper_limbs_left= new vj2.Upper_limbs(hand_left,arm_bones_left,"LEFT");
        this.upper_limbs_right= new vj2.Upper_limbs(hand_right,arm_bones_right,"RIGHT");
    };

    p.update_left = function(yaw,pitch,roll,loc){
        this.upper_limbs_left.update(yaw,pitch,roll,loc);
    };

    p.update_right = function(yaw,pitch,roll,loc){
        this.upper_limbs_right.update(yaw,pitch,roll,loc);
    };

    p.update_both = function(yaw,pitch,roll,loc){
        this.upper_limbs_right.update(yaw,pitch,roll,loc);
        this.upper_limbs_left.update(yaw,pitch,roll,loc);
    };

    p.update_wrist = function(yaw,pitch,roll){
        this.upper_limbs_right.update_wrist(yaw,pitch,roll);
        this.upper_limbs_left.update_wrist(yaw,pitch,roll);
    };

    p.set_shape = function(shape){
        this.upper_limbs_right.set_shape(shape);
        this.upper_limbs_left.set_shape(shape);
    };

    p.animation = function(dt){
        this.upper_limbs_right.animation(dt);
        this.upper_limbs_left.animation(dt);
    };

    p.create_arm_bones = function(up_arm_index,lo_arm_index,wrist_index,direction){
        var up_arm_left = this.human_model.skeleton.bones[up_arm_index].quaternion;
        var lo_arm_left = this.human_model.skeleton.bones[lo_arm_index].quaternion;
        var wrist_left = this.human_model.skeleton.bones[wrist_index].quaternion;
        return new vj2.Arm_bones(up_arm_left,lo_arm_left,wrist_left,direction);
    };

    p.create_hand_left = function(){
        var thumb = this.create_finger(48,49,50,"LEFT");
        var index = this.create_finger(31,32,33,"LEFT");
        var middle = this.create_finger(35,36,37,"LEFT");
        var ring = this.create_finger(40,41,42,"LEFT");
        var pinky = this.create_finger(44,45,46,"LEFT");
        return new vj2.Hand(thumb,index,middle,ring,pinky,"LEFT");
    };

    p.create_hand_right = function(){
        var thumb = this.create_finger(74,75,76,"RIGHT");
        var index = this.create_finger(57,58,59,"RIGHT");
        var middle = this.create_finger(61,62,63,"RIGHT");
        var ring = this.create_finger(66,67,68,"RIGHT");
        var pinky = this.create_finger(70,71,72,"RIGHT");
        return new vj2.Hand(thumb,index,middle,ring,pinky,"RIGHT");
    };

    p.create_finger = function(index_phalange1,index_phalange2,index_phalange3,direction){
        var bone1 = this.human_model.skeleton.bones[index_phalange1].quaternion;
        var bone2 = this.human_model.skeleton.bones[index_phalange2].quaternion;
        var bone3 = this.human_model.skeleton.bones[index_phalange3].quaternion;
        return new vj2.Finger(bone1,bone2,bone3,direction);
    };

    vj2.Action_upper_limbs = Action_upper_limbs;
}());
