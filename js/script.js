// Creating the main scene
var scene = new THREE.Scene();

        // Creating a render and setting the size
        var renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff,1.0);
        document.body.appendChild(renderer.domElement);

        // Creating a camera with basic position
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(-30,40,30);
        camera.lookAt(scene.position);

        // Creating the cube edges
        var material = new THREE.MeshBasicMaterial({color:  Math.random() * 0xffffff});
        var geometry = new THREE.Geometry();

        var createLine= (x1, y1, z1, x2, y2, z2) => {
            geometry.vertices.push(
                new THREE.Vector3( x1, y1, z1 ),
                new THREE.Vector3( x2, y2, z2 ),
            );
        };
        createLine(0,0,0,0,5,0);
        createLine(5,5,0,5,0,0);
        createLine(5,0,5,5,5,5);
        createLine(0,5,5,0,0,5);
        createLine(0,0,0,5,0,0);
        createLine(5,0,5,0,0,5);
        createLine(0,5,5,0,5,0);
        createLine(5,5,0,5,5,5);

        var cube = new THREE.Line( geometry, material);

        // Creating spheres placed on cube's vertexes
        var targetList= [];
        var targets=[];
        for(let i=1; i<=8; i++) {
            targets["name"+i]="sphere"+i
        }

        for(var key in targets) {
            var sphereGeometry=new THREE.SphereGeometry (0.6,32,32);
            var sphereMaterial=new THREE.MeshBasicMaterial({color:  Math.random() * 0xffffff});
            var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            targetList.push(sphere);
            sphere.name=targets[key];
            cube.add(sphere);
        }
        var changeSpherePosition = (name,a,b,c) => {
            cube.getObjectByName(name).position.set(a,b,c);
        };
        changeSpherePosition("sphere1",0,0,0);
        changeSpherePosition("sphere2",5,0,0);
        changeSpherePosition("sphere3",0,5,0);
        changeSpherePosition("sphere4",0,0,5);
        changeSpherePosition("sphere5",5,5,0);
        changeSpherePosition("sphere6",0,5,5);
        changeSpherePosition("sphere7",5,0,5);
        changeSpherePosition("sphere8",5,5,5);

        // Changing cube's position an adding it into the scene
        cube.position.set(-10,10,10);
        scene.add( cube );

        // Creating controls, adding events
        orbitControl = new THREE.OrbitControls( camera, renderer.domElement );
        var controls = new THREE.DragControls( targetList, camera, renderer.domElement );

        controls.addEventListener( 'dragstart', function ( event ) {
           cube.material.color=event.object.material.color;
        } );
        controls.addEventListener( 'dragend', function ( event ) {
            console.log('Color changed to: r: '+event.object.material.color.r+', g: '+event.object.material.color.g+', b: '+event.object.material.color.b)
        });

        // Adding basic animation
        var animate = function () {
            requestAnimationFrame( animate );
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            // cube.rotation.z += 0.002;

            renderer.render( scene, camera );
        };

        animate();