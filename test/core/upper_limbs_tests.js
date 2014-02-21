var up_arm,lo_arm,wrist;

module("module upper_limbs",{
setup: function() {
    up_arm = new THREE.Euler(0,0,0,"XYZ");
    lo_arm = new THREE.Euler(0,0,0,"XYZ");
    wrist =  new THREE.Euler(0,0,0,"XYZ");
    direction = "LEFT";
}});

test("should_update_wrist", function(){
    var arm_bones = new Arm_bones(up_arm,lo_arm,wrist,direction);
    arm_bones.update_wrist(90,90,90);
    deepEqual(arm_bones.wrist_next.toArray(),[90,90,90,"XYZ"]); 
});

test("should_update_location", function(){
    var arm_bones = new Arm_bones(up_arm,lo_arm,wrist,direction);
    arm_bones.update_loc("ORELHA");
    deepEqual(arm_bones.up_arm_next.toArray(),[-1.33,0,0,"XYZ"]); 
    deepEqual(arm_bones.lo_arm_next.toArray(),[0,-2,0,"XYZ"]); 
});
