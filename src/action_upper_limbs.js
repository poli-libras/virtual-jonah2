function Action_upper_limbs(human_model){
    this.human_model = human_model;
}

Action_upper_limbs.prototype.create_arm_bones_from_model = function(up_arm_index,lo_arm_index,wrist_index,direction){
    var up_arm_left = this.human_model.bones[up_arm_index].rotation;
    var lo_arm_left = this.human_model.bones[lo_arm_index].rotation;
    var wrist_left = this.human_model.bones[wrist_index].rotation;
    return new Arm_bones(up_arm_left,lo_arm_left,wrist_left,direction);
};

Action_upper_limbs.prototype.create_upper_limbs = function(){
    var arm_bones_left = this.create_arm_bones_from_model(26,27,28,"LEFT");
    var arm_bones_right = this.create_arm_bones_from_model(52,53,54,"RIGHT"); 
    this.upper_limbs_left= new Upper_limbs("MAO_5",arm_bones_left,"LEFT");
    this.upper_limbs_right= new Upper_limbs("MAO_5",arm_bones_right,"RIGHT");
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


Action_upper_limbs.prototype.animation = function(){
    this.upper_limbs_right.animation();
    this.upper_limbs_left.animation();
};
