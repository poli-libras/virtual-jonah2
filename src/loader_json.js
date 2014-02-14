function load_model_json(model_file,callback){
    var loader = new THREE.JSONLoader();
    loader.load(model_file,config_human);
    
    function config_human(geometry){
	var human = new THREE.SkinnedMesh(geometry, new THREE.MeshLambertMaterial());
	human.material.skinning = true;
	callback(human);
    }

}

