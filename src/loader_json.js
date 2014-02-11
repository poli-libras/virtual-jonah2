function load_model_json(model_file){
    var loader = new THREE.JSONLoader();
    return loader.load(model_file,config_human);
}

function config_human(geometry){
    human = new THREE.SkinnedMesh(geometry, new THREE.MeshLambertMaterial());
    human.material.skinning = true;
    return human;
}
