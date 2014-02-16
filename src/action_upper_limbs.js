function Action_upper_limbs(human_model){
    this.human_model = human_model;
}

Action_upper_limbs.prototype.create_upper_limbs = function(){
    var up_arm_left = this.human_model.bones[26];
    var lo_arm_left = this.human_model.bones[27];
    var wrist_left = this.human_model.bones[28];
    var arm_bones_left = new Arm_bones(up_arm_left,lo_arm_left,wrist_left);
    var up_arm_right = this.human_model.bones[52];
    var lo_arm_right = this.human_model.bones[53];
    var wrist_right = this.human_model.bones[54];
    var arm_bones_right = new Arm_bones(up_arm_right,lo_arm_right,wrist_right);
    this.upper_limbs_left = new Upper_limbs("MAO_5",arm_bones_left);
    this.upper_limbs_right = new Upper_limbs("MAO_5",arm_bones_right);
};

Action_upper_limbs.prototype.update_left = function(yaw,pitch,roll,loc){
    this.upper_limbs_left.update(yaw,pitch,roll,loc);
};

Action_upper_limbs.prototype.update_right = function(yaw,pitch,roll,loc){
    this.upper_limbs_left.update(yaw,pitch,roll,loc);
};
