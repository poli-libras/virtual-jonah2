function Upper_limbs(shape,arm_bones,direction){
    this.shape = shape;
    this.arm_bones = arm_bones;
    this.direction = direction;
}

Upper_limbs.prototype.update = function(yaw,pitch,roll,loc){
    this.arm_bones.update_pose(yaw,pitch,roll,loc);
};


Upper_limbs.prototype.animation = function(){
    this.arm_bones.animation();
};

function Arm_bones(up_arm,lo_arm,wrist,direction){
    this.up_arm = up_arm;
    this.up_arm_next = this.clone_bones(this.up_arm);
    this.up_arm_prev = this.clone_bones(this.up_arm);
    this.lo_arm = lo_arm;
    this.lo_arm_next = this.clone_bones(this.lo_arm);
    this.lo_arm_prev = this.clone_bones(this.lo_arm);
    this.wrist = wrist;
    this.wrist_next = this.clone_bones(this.wrist);
    this.wrist_prev = this.clone_bones(this.wrist);
    this.direction = direction;
    this.json_arm_left_pose={
        ESPACO_NEUTRO:{up:{x:-1.333,y:-1.333,z:-1.333},lo:{x:0,y:-0.1333,z:0},wrist:{x:0,y:0,z:1.33}},ORELHA:{up:{x:-1.33,y:0,z:0},lo:{x:0,y:-2,z:0},wrist:{x:0,y:0,z:0} }};
    this.json_arm_right_pose={
        ESPACO_NEUTRO:{up:{x:1.333,y:1.333,z:-1.333},lo:{x:0,y:0.1333,z:0},wrist:{x:0,y:0,z:-1.33}},ORELHA:{up:{x:-1.33,y:0,z:0},lo:{x:0,y:2,z:0},wrist:{x:0,y:0,z:0} } };
    this.animation_time = 400;
    this.animation_time_now = this.animation_time;
}

Arm_bones.prototype.animation = function(){
    var time = this.animation_time_now/this.animation_time;
    this.animation_bones(this.lo_arm,this.lo_arm_next,this.lo_arm_prev,time);
    this.animation_bones(this.wrist,this.wrist_next,this.wrist_prev,time);
    this.animation_bones(this.up_arm,this.up_arm_next,this.up_arm_prev,time);
    if(time === 0){
        this.animation_time_now = this.animation_time;
        this.animation_end();
    }else
        this.animation_time_now -=1;
    
};

Arm_bones.prototype.animation_bones = function(bones_now,bones_next,bones_prev,time){
    THREE.Quaternion.slerp(bones_next._quaternion,bones_prev._quaternion,bones_now._quaternion,time);
};

Arm_bones.prototype.clone_bones = function(bones){
    var bones_clone = new THREE.Euler(0,0,0,"XYZ");
    var quaternion_bone = new THREE.Quaternion().setFromEuler(bones);
    bones_clone.copy(bones);
    bones_clone._quaternion = quaternion_bone;
    bones_clone._quaternion._euler = bones_clone;
    return bones_clone;
};

Arm_bones.prototype.animation_end = function(){
    this.wrist_prev = this.clone_bones(this.wrist_next);
    this.lo_arm_prev = this.clone_bones(this.lo_arm_next);
    this.up_arm_prev = this.clone_bones(this.up_arm_next);
};

Arm_bones.prototype.animation_reset_time = function(){
    this.animation_time_now = this.animation_time;
};

Arm_bones.prototype.update_pose = function(yaw,pitch,roll,loc){
    this.update_loc(loc);
    this.update_wrist(yaw,pitch,roll);
    this.animation_reset_time();
};

Arm_bones.prototype.update_wrist = function(yaw,pitch,roll){
 
    this.wrist_next.x += yaw;
    this.wrist_next.y += pitch;
    if(this.direction == "RIGHT")
        this.wrist_next.z -= roll;
    else
        if(this.direction == "LEFT")
            this.wrist_next.z += roll;
};

Arm_bones.prototype.update_loc = function(loc){
    var arm;
    if(this.direction == "RIGHT"){
        arm = this.json_arm_right_pose[loc];
    }else
        if(this.direction == "LEFT")
            arm = this.json_arm_left_pose[loc];
    this.update_arm(arm.up,arm.lo,arm.wrist);
};

Arm_bones.prototype.update_arm = function(up_arm_rot,lo_arm_rot,wrist){
    this.up_arm_next.x = up_arm_rot.x;
    this.lo_arm_next.x = lo_arm_rot.x;
    this.wrist_next.x = wrist.x;
    
    this.up_arm_next.y = up_arm_rot.y;
    this.lo_arm_next.y = lo_arm_rot.y;
    this.wrist_next.y = wrist.y;

    this.up_arm_next.z = up_arm_rot.z;
    this.lo_arm_next.z = lo_arm_rot.z;
    this.wrist_next.z = wrist.z;
};
