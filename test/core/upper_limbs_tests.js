var up_arm,lo_arm,wrist;

module("module upper_limbs",{
setup: function() {
    up_arm = {rotation:{x:0,y:0,z:0}};
    lo_arm = {rotation:{x:0,y:0,z:0}};
    wrist = {rotation:{x:0,y:0,z:0}};
    direction = "LEFT";
}});

test("should_update_wrist", function(){
    var arm_bones = new Arm_bones(up_arm,lo_arm,wrist,direction);
    arm_bones.update_wrist(90,90,90);
    deepEqual(wrist.rotation,{x:90,y:90,z:90}); 
});

test("should_update_location", function(){
    var arm_bones = new Arm_bones(up_arm,lo_arm,wrist,direction);
    arm_bones.update_loc("ORELHA");
    deepEqual(up_arm.rotation,{x:-1.33,y:0,z:0}); 
    deepEqual(lo_arm.rotation,{x:0,y:-2,z:0}); 
});
