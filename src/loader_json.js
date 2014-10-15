function load_model_json(model_file,callback){
    var loader = new THREE.JSONLoader();
    loader.load(model_file,config_human);

    function config_human(geometry){
        var human = new THREE.SkinnedMesh(geometry, new THREE.MeshLambertMaterial());
        human.material.skinning = true;
        callback(human);
    }

}

/*
 *
 * Baseado no JSONLoader da biblioteca THREEJS
 * (https://github.com/mrdoob/three.js/blob/1769fbfc6c994b51a54c15a5c096855fd3cb8a1a/src/loaders/JSONLoader.js)
 *
 */
function load_json(url,callback){
	var xhr = new XMLHttpRequest();
    var length = 0;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 0) {
                if (xhr.responseText) {
                    var json = JSON.parse(xhr.responseText);
                    callback(json);
                } else {
                    console.error('load_pose_json: "' + url + '" seems to be unreachable or the file is empty.');
                }
            } else {
                console.error('load_pose_json: Couldn\'t load "' + url + '" (' + xhr.status + ')' );
            }
        }
    };
    xhr.open('GET', url, true );
    xhr.withCredentials = false;
    xhr.send(null);
}
