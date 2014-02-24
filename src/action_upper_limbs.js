function Action_upper_limbs(human_model){
    this.human_model = human_model;
}

Action_upper_limbs.prototype.create_arm_bones = function(up_arm_index,lo_arm_index,wrist_index,direction){
    var up_arm_left = this.human_model.bones[up_arm_index].rotation;
    var lo_arm_left = this.human_model.bones[lo_arm_index].rotation;
    var wrist_left = this.human_model.bones[wrist_index].rotation;
    return new Arm_bones(up_arm_left,lo_arm_left,wrist_left,direction);
};

Action_upper_limbs.prototype.create_finger = function(phalange1,phalange2,phalange3){
    var bone1 = this.human_model.bones[phalange1].rotation;
    var bone2 = this.human_model.bones[phalange2].rotation;
    var bone3 = this.human_model.bones[phalange3].rotation;
    return new Finger(bone1,bone2,bone3);
};

Action_upper_limbs.prototype.create_hand_left = function(){
    var thumb = this.create_finger(48,49,50);
    var index = this.create_finger(31,32,33);
    var middle = this.create_finger(35,36,37);
    var ring = this.create_finger(40,41,42);
    var pinky = this.create_finger(44,45,46);
    return new Hand(thumb,index,middle,ring,pinky,"LEFT");
};

Action_upper_limbs.prototype.create_hand_right = function(){
    var thumb = this.create_finger(74,75,76);
    var index = this.create_finger(57,58,59);
    var middle = this.create_finger(61,62,63);
    var ring = this.create_finger(66,67,68);
    var pinky = this.create_finger(70,71,72);
    return new Hand(thumb,index,middle,ring,pinky,"RIGHT");
};

Action_upper_limbs.prototype.create_upper_limbs = function(){
    var arm_bones_left = this.create_arm_bones(26,27,28,"LEFT");
    var arm_bones_right = this.create_arm_bones(52,53,54,"RIGHT"); 
    var hand_left = this.create_hand_left();
    var hand_right = this.create_hand_right();
    this.upper_limbs_left= new Upper_limbs(hand_left,arm_bones_left,"LEFT");
    this.upper_limbs_right= new Upper_limbs(hand_right,arm_bones_right,"RIGHT");
};

Action_upper_limbs.prototype.update_left = function(yaw,pitch,roll,loc){
    this.upper_limbs_left.update(yaw,pitch,roll,loc);
};

Action_upper_limbs.prototype.update_right = function(yaw,pitch,roll,loc){
    this.upper_limbs_right.update(yaw,pitch,roll,loc);
};

Action_upper_limbs.prototype.update_both = function(yaw,pitch,roll,loc){
    this.upper_limbs_right.update(yaw,pitch,roll,loc);
    this.upper_limbs_left.update(yaw,pitch,roll,loc);
};

Action_upper_limbs.prototype.set_shape = function(shape){
    this.upper_limbs_right.set_shape(shape);
    this.upper_limbs_left.set_shape(shape);
};

Action_upper_limbs.prototype.animation = function(){
    this.upper_limbs_right.animation();
    this.upper_limbs_left.animation();
};
