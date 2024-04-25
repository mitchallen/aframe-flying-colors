
const pointData = [
    { x: 1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 1, z: 1 },
    { x: -1, y: -1, z: -1 },
    { x: 1, y: -1, z: -1 },
    { x: -1, y: 1, z: -1 },
    { x: -1, y: -1, z: 1 },
    { x: -1, y: 1, z: 1 },
    { x: 1, y: -1, z: 1 },
    { x: 1, y: 1, z: -1 },
    { x: 0, y: 0, z: -1 },
    { x: 0, y: -1, z: 0 },
    { x: -1, y: 0, z: 0 }
];

document.addEventListener('DOMContentLoaded', function() {
    const entity = document.getElementById('cubeJson');
    entity.setAttribute('multi-sphere', {points: JSON.stringify(pointData)});
});


AFRAME.registerComponent('multi-sphere', {
    schema: {
        points: {
            default: [],
            parse: function(value) {
                // Parse the incoming string into an array of objects
                console.log(value)
                return JSON.parse(value);
            }
        }
    },

    // schema: {
    //     points: {type: 'string', default: '[]'}
    // },

    init: function() {
        // This function is called once when the component is initialized
        var data = this.data;
        // const data = JSON.parse(this.data.jsonData);
        var el = this.el; // Reference to the entity that this component is attached to

        // Create a sphere for each point
        data.points.forEach(function(point) {
            var sphereEl = document.createElement('a-sphere');
            // sphereEl.setAttribute('radius', '0.3');
            // sphereEl.setAttribute('color', 'red');
            sphereEl.setAttribute('mixin', 'marker ball'); 
            sphereEl.setAttribute('position', point.x + ' ' + point.y + ' ' + point.z);
            el.appendChild(sphereEl);
        });
    }
});


AFRAME.registerComponent('log-position', {
    schema: {
        interval: { type: 'number', default: 100 }  // Log interval in milliseconds
    },

    init: function () {
        this.interval = setInterval(() => {
            const position = this.el.object3D.position;
            // console.log(`Position: ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`);
        }, this.data.interval);
    },

    remove: function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
});

// Assuming you're using a script tag to include A-Frame in your HTML
// You might want to adjust the scaling factor based on your specific needs

AFRAME.registerComponent('position-to-color', {
    schema: {
      scale: {type: 'number', default: 1.0} // Scale factor to adjust position values to color range
    },
  
    init: function() {
        // ...
    },

    tick: function() {
        // console.log("tick")  
        this.updateColor(this.el.object3D.position);
    },
  
    updateColor: function(position) {

    	function mapValue(value) {
        	// Apply the direct linear transformation
        	let newValue = ((value + 1.0) / 2.0) * 255;
    
        	// Clamp the result to ensure it stays within 
			// the 0 to 255 range and round it
        	return Math.round(Math.max(0, Math.min(255, newValue)));
    	}

    	const r = mapValue(position.x);
    	const g = mapValue(position.y);
   	 	const b = mapValue(position.z);
  
      	// Update entity's material color
      	this.el.setAttribute('material', 'color', `rgb(${r}, ${g}, ${b})`);
    }
});
  