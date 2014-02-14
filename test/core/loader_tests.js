asyncTest("should_load_a_model",function(){
    expect(1);
    load_model_json("../resources/model/human.js",check_model);
    function check_model(human){
	equal(human.id,1,"model loaded");
	start();
    }
});
