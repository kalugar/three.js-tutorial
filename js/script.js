// Creating the main scene
window.addEventListener('load', init);
function init() {
    var scene = new THREE.Scene();

        // Creating a render and setting the size
        var renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff,1.0);
        document.body.appendChild(renderer.domElement);

        // Creating a camera with basic position
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(-30,30,40);
        camera.lookAt(scene.position);

        // Creating the vertex' coordinates
        let cubeVertex = [
            [0,0,0], [0,0,5],[5,0,5],[5,0,0],
            [0,5,0], [0,5,5],[5,5,5],[5,5,0]
        ];
        let cubeEdges = [
            [cubeVertex[0],cubeVertex[1]],
            [cubeVertex[1],cubeVertex[2]],
            [cubeVertex[2],cubeVertex[3]],
            [cubeVertex[3],cubeVertex[0]],
            [cubeVertex[4],cubeVertex[5]],
            [cubeVertex[5],cubeVertex[6]],
            [cubeVertex[6],cubeVertex[7]],
            [cubeVertex[7],cubeVertex[4]],
            [cubeVertex[4],cubeVertex[0]],
            [cubeVertex[5],cubeVertex[1]],
            [cubeVertex[6],cubeVertex[2]],
            [cubeVertex[7],cubeVertex[3]],
        ];

        let edge=edgeGeometry=[];
        let sphere=[];
        let targetList=[];
        var controls = new function() {
            //Creating initial rotation
            this.rotationSpeed = 0.005;
            this.numberOfObjects = scene.children.length;

            //Creating cubes' edges
            this.addCube = function() {

                var cubeCreation=()=> {
                    for (let i = 0; i < cubeEdges.length; i++) {
                        edgeGeometry[i] = new THREE.Geometry();
                        edgeGeometry[i].vertices.push(new THREE.Vector3(cubeEdges[i][0][0], cubeEdges[i][0][1], cubeEdges[i][0][2]));
                        edgeGeometry[i].vertices.push(new THREE.Vector3(cubeEdges[i][1][0], cubeEdges[i][1][1], cubeEdges[i][1][2]));
                        let edgesMaterial = new THREE.LineBasicMaterial({color: 0x000000});
                        edge[i] = new THREE.Line(edgeGeometry[i], edgesMaterial);
                    }
                    return edge;
                }
                // Creating spheres placed on cube's vertexes
                var sphereCreation=()=>{
                    for(let i=0; i<cubeVertex.length; i++) {
                        var sphereGeometry=new THREE.SphereGeometry (0.6,32,32);
                        var sphereMaterial=new THREE.MeshBasicMaterial({color:  Math.random() * 0xffffff});
                        sphere[i] = new THREE.Mesh(sphereGeometry, sphereMaterial);
                        sphere[i].position.set(cubeEdges[i][0][0], cubeEdges[i][0][1], cubeEdges[i][0][2])
                    }
                    return sphere;
                };

                // Assembling the final object
                (function Assembly() {
                        let finalCube=new THREE.Group();
                        for (let i = 0; i < cubeCreation().length; i++)
                            finalCube.add( cubeCreation()[i]);

                        for (let i=0; i < sphereCreation().length; i++)
                            finalCube.add( sphereCreation()[i]);
                        finalCube.position.set(Math.random()*20, Math.random()*20,Math.random()*20);
                        scene.add(finalCube)
                })()
                this.numberOfObjects = scene.children.length;
            };

            //Creating remove object function
            this.removeCube = function() {
                let allChildren = scene.children;
                if (allChildren.length>0) {
                    var lastObject = allChildren[allChildren.length-1];
                }
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            };
            this.outputObjects = function() {
                console.log(scene.children);
            }
        }
        //Adding GUI elements
        var gui = new dat.GUI();
        gui.add(controls, 'addCube');
        gui.add(controls, 'removeCube');
        gui.add(controls, 'rotationSpeed',0,0.05);
        gui.add(controls, 'outputObjects');
        gui.add(controls, 'numberOfObjects').listen();
        renderer.render( scene, camera );

       // Adding basic animation
        let animate = function () {
            scene.traverse(function(e) {
                if (e instanceof THREE.Group) {
                    e.rotation.x += controls.rotationSpeed;
                    e.rotation.y += controls.rotationSpeed;
                    e.rotation.z += controls.rotationSpeed/2;
                }
            })
            requestAnimationFrame(animate);
            renderer.render(scene, camera)
        };
        animate();

        // var domEvents = new THREEx.DomEvents(camera, renderer.domElement);

        // Window Resize Event
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.updateProjectionMatrix();
        };
}