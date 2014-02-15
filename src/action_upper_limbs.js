function Action_upper_limbs(human_model){
    this.human_model = human_model;
}

Action_upper_limbs.prototype.create_upper_limbss = function(){
    var up_arm_left = this.human_model.bones[26];
    var lo_arm_left = this.human_model.bones[27];
    var up_arm_right = this.human_model.bones[52];
    var lo_arm_right = this.human_model.bones[53];
};
