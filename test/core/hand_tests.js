var up_arm,lo_arm,wrist;

module("module hand",{
setup: function() {
    up_arm = {rot:{x:0,y:0,z:0}};
    lo_arm = {rot:{x:0,y:0,z:0}};
    wrist = {rot:{x:0,y:0,z:0}};
}});

test("should_update_wrist", function(){
    var arm_bones = new Arm_bones(up_arm,lo_arm,wrist);
    arm_bones.update_wrist(90,90,90);
    deepEqual(wrist.rot,{x:90,y:90,z:90}); 
});

test("should_update_location", function(){
    var arm_bones = new Arm_bones(up_arm,lo_arm,wrist);
    arm_bones.update_loc("ORELHA");
    deepEqual(up_arm.rot,{x:1,y:0,z:0}); 
    deepEqual(lo_arm.rot,{x:0,y:1,z:0}); 
});
