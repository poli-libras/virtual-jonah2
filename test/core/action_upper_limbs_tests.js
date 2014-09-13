module("action upper limbs");
asyncTest("should update upper_limbs",function(){
    expect(7);
    load_model_json("../resources/model/human.js",check_upper_limbs);
    function check_upper_limbs(human_model){
	ok(human_model);
	var action_upper_limbs = new vj2.Action_upper_limbs(human_model);
	action_upper_limbs.create_upper_limbs();
	action_upper_limbs.update_left(0,0,0,"ORELHA");
	equal(human_model.bones[26].rotation.x,0);
	equal(human_model.bones[26].rotation.y,0);
	equal(human_model.bones[26].rotation.z,0);
	equal(human_model.bones[27].rotation.x,0);
	equal(human_model.bones[27].rotation.y,0);
	equal(human_model.bones[27].rotation.z,0);
	start();
    }
});
