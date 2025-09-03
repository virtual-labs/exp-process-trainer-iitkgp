/* This  script file is edited by
    Piyali Chattopadhyay
    Project Scientist-Technical,
    Virtual Labs IIT Kharagpur.*/



jsPlumb.ready(function () {

    var instance,
        discs = [],

        addDisc = function (evt) {
            var info = createDisc();
            var e = prepare(info.id);
            instance.draggable(info.id);
            discs.push(info.id);
            evt.stopPropagation();
            evt.preventDefault();
        },

        reset = function (e) {
            for (var i = 0; i < discs.length; i++) {
                var d = document.getElementById(discs[i]);
                if (d) d.parentNode.removeChild(d);
            }
            discs = [];
            e.stopPropagation();
            e.preventDefault();
        },

        initAnimation = function (elId) {
            var el = document.getElementById(elId);

            instance.on(el, 'click', function (e, ui) {
                if (el.className.indexOf("jsPlumb_dragged") > -1) {
                    jsPlumb.removeClass(elId, "jsPlumb_dragged");
                    return;
                }
                var o = instance.getOffset(el, true),
                    o2 = instance.getOffset(el),
                    s = jsPlumb.getSize(el),
                    pxy = [e.pageX || e.clientX, e.pageY || e.clientY],
                    c = [pxy[0] - (o.left + (s[0] / 2)), pxy[1] - (o.top + (s[1] / 2))],
                    oo = [c[0] / s[0], c[1] / s[1]],
                    DIST = 350,
                    l = o2.left + (oo[0] * DIST),
                    t = o2.top + (oo[1] * DIST);

                var id = el.getAttribute("id");
                instance.animate(el, {left: l, top: t}, { duration: 350, easing: 'easeOutBack' });
            });
        },

    // notice there are no dragOptions specified here, which is different from the
    // draggableConnectors2 demo.  all connections on this page are therefore
    // implicitly in the default scope.
	// for all live red connection//
        endpoint = {
            anchors: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 6, stroke: "#C50806" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 100,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare = function (elId) {
            initAnimation(elId);            			
			
            return instance.addEndpoint(elId, endpoint);
					},
					///black wire
	endpoint_ground = {
            anchor: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 8, stroke: "black" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 10,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare_ground = function (elId) {
            initAnimation(elId);            			
			
            return instance.addEndpoint(elId, endpoint_ground);
					},
					
			endpoint_blue = {
            anchor: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 8, stroke: "#55DEF6" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 10,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare_blue = function (elId) {
            initAnimation(elId);            			
			
            return instance.addEndpoint(elId, endpoint_blue);
					},

					

    // this is overridden by the YUI demo.
        createDisc = function () {
            var d = document.createElement("div");
            d.className = "bigdot";
            document.getElementById("animation-demo").appendChild(d);
            var id = '' + ((new Date().getTime()));
            d.setAttribute("id", id);
            var w = screen.width - 162, h = screen.height - 162;
            var x = (0.2 * w) + Math.floor(Math.random() * (0.5 * w));
            var y = (0.2 * h) + Math.floor(Math.random() * (0.6 * h));
            d.style.top = y + 'px';
            d.style.left = x + 'px';
            return {d: d, id: id};
        };

    // get a jsPlumb instance, setting some appropriate defaults and a Container.
    instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'wait', zIndex: 20 },
        Endpoint: [ "Image", { url: "./images/littledot.png" } ],
        Connector: [ "Bezier", { curviness:40 } ],
        Container: "canvas"
    });
	
	


    // suspend drawing and initialise.
    instance.batch(function () {
        var e1 = prepare("bd1"),            
            e2 = prepare_ground("bd2"),
			e3 = prepare("bd3"),
            e4 = prepare("bd4"),
			e5 = prepare("bd5"),
			e6 = prepare("bd6"),
			e7 = prepare("bd7"),            
            e8 = prepare("bd8"),
			e9 = prepare("bd9"),
            e10 = prepare("bd10"),
			e11= prepare("bd11"),
			e12 = prepare_ground("bd12"),
            e13 = prepare("bd13"),
			//e14= prepare_ground("bd14"),
			
			
			
			e42 = prepare("bd42"),
			e43 = prepare_ground("bd43"),
			e44 = prepare("bd44"),
			e45 = prepare("bd45"),
			e46 = prepare_ground("bd46");
			
			
             instance.connect({ source: e2, target: e12 });
			 instance.connect({ source: e1, target: e13 });
			// instance.connect({ source: e2, target: e14 });
			e1.canvas.style.pointerEvents = "none";///disable first
			 e1.setEnabled(false);///stop the reconnection
			 //e2.canvas.style.pointerEvents = "none";///disable first
			 //e2.setEnabled(false);///stop the reconnection
			 //e12.canvas.style.pointerEvents = "none";///disable first
			 //e12.setEnabled(false);///stop the reconnection
			 e13.canvas.style.pointerEvents = "none";///disable first
			 e13.setEnabled(false);///stop the reconnection
						
			 ///NEW ADDITION TO DISPLAY CONNECTION POINT NUMBERS DURING DELEETE
		
		var name1, name2;
			 //delete clicked connection
      instance.bind("click", function (conn, originalEvent) {
		  
		    if((conn.sourceId!='bd2' && conn.targetId!='bd12') && (conn.sourceId!='bd1' && conn.targetId!='bd13')){
				
				///NEW ADDED FOR LOOP TO DISPLAY ENDPOINT NAMES DURING DELETE CONNECTION
		 for(var cpoint =1; cpoint<=46; cpoint++){
			 if(conn.sourceId=='bd'+cpoint){
				 name1 = document.getElementById(conn.sourceId).getAttribute("name");
			 }
			 if(conn.targetId=='bd'+cpoint){ 
		  name2= document.getElementById(conn.targetId).getAttribute("name");
		 }
		 } 
           if ( confirm('Delete connection from'+' ' + name1 +' '+ 'to' + ' '+ name2 + '?')) {////for clicking on a connection
               instance.deleteConnection(conn);			  
			         }
		  }
		  
		 /* else if( (conn.sourceId=='bd2' && conn.targetId=='bd12') && (conn.sourceId=='bd1' && conn.targetId=='bd13')){
			 alert('Default sensor connection can not be deleted');
		 } */
		  
		 
       }); 
		
  

   


    });
	
	
      document.getElementById("check").addEventListener("click", function () {
        var correct_connections_42_44 = [
            {
                "source": "bd42",
                "target": "bd44"
            },

            {
                "source": "bd44",
                "target": "bd42"
            }
        ];
		
		var correct_connections_3_44 = [
            {
                "source": "bd3",
                "target": "bd44"
            },

            {
                "source": "bd44",
                "target": "bd3"
            }
        ];

        var correct_connections_8_44 = [
            {
                "source": "bd8",
                "target": "bd44"
            },

            {
                "source": "bd44",
                "target": "bd8"
            }
        ];        

        var correct_connections_45_5 = [
            {
                "source": "bd45",
                "target": "bd5"
            },
    
            {
                "source": "bd5",
                "target": "bd45"
            }
        ];

        var correct_connections_46_43 = [
            {
                "source": "bd46",
                "target": "bd43"
            },

            {
                "source": "bd43",
                "target": "bd46"
            }
        ];

        var correct_connections_46_11 = [
            {
                "source": "bd46",
                "target": "bd11"
            },

            {
                "source": "bd11",
                "target": "bd46"
            }
        ];
        
		var correct_connections_2_12 = [
            {
                "source": "bd2",
                "target": "bd12"
            },

            {
                "source": "bd12",
                "target": "bd2"
            }
        ];
		var correct_connections_1_13 = [
            {
                "source": "bd1",
                "target": "bd13"
            },

            {
                "source": "bd13",
                "target": "bd1"
            }
        ];
		var correct_connections_4_5 = [
            {
                "source": "bd4",
                "target": "bd5"
            },

            {
                "source": "bd5",
                "target": "bd4"
            }
        ];
		
				
		       //a connection outside this will invalidate the circuit
        var allowed_connections = [
            {
                "source": "bd42",
                "target": "bd44"
            },
    
            {
                "source": "bd44",
                "target": "bd42"
            },
			
			{
                "source": "bd3",
                "target": "bd44"
            },
    
            {
                "source": "bd44",
                "target": "bd3"
            },
            
            {
                "source": "bd8",
                "target": "bd44"
            },

            {
                "source": "bd44",
                "target": "bd8"
            },

            {
                "source": "bd45",
                "target": "bd5"
            },
    
            {
                "source": "bd5",
                "target": "bd45"
            },
			
			{
                "source": "bd46",
                "target": "bd43"
            },

            {
                "source": "bd43",
                "target": "bd46"
            },
			
            {
                "source": "bd46",
                "target": "bd11"
            },

            {
                "source": "bd11",
                "target": "bd46"
            },
			
			{
                "source": "bd2",
                "target": "bd12"
            },

            {
                "source": "bd12",
                "target": "bd2"
            },
			{
                "source": "bd1",
                "target": "bd13"
            },

            {
                "source": "bd13",
                "target": "bd1"
            },
			
			{
                "source": "bd4",
                "target": "bd5"
            },

            {
                "source": "bd5",
                "target": "bd4"
            },
						 
        ];

        var actual_connections = instance.getAllConnections();

				var is_connected_42_44 = false;
				var is_connected_3_44 = false;
				var is_connected_8_44 = false;
				var is_connected_45_5 = false;
				var is_connected_46_43 = false;
				var is_connected_46_11 = false;
				var is_connected_2_12 = false;
				var is_connected_1_13 = false;
				var is_connected_4_5 = false;/// p control closed loop
				
				
        var unallowed_connection_present = false;
        var count =0; // counts number of connection


        actual_connections.forEach(function (connection) {
            count++;
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_42_44){
                is_connected_42_44 = correct_connections_42_44.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                  });
            }

            if(!unallowed_connection_present){
                unallowed_connection_present = !(allowed_connections.find(function (conn) {
                    return (conn.source === this_connection.source && conn.target === this_connection.target);
                }));
            }
            // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false

        });

        //checking for 3_7 connection
        actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_8_44){
                is_connected_8_44 = correct_connections_8_44.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_45_5){
                is_connected_45_5 = correct_connections_45_5.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_46_43){
                is_connected_46_43 = correct_connections_46_43.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_46_11){
                is_connected_46_11 = correct_connections_46_11.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_2_12){
                is_connected_2_12 = correct_connections_2_12.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_1_13){
                is_connected_1_13 = correct_connections_1_13.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
	actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_4_5){
                is_connected_4_5 = correct_connections_4_5.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_3_44){
                is_connected_3_44 = correct_connections_3_44.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
			
			///output signal	
		///openloop-Control
        if (is_connected_42_44 && is_connected_8_44 && is_connected_45_5 && is_connected_46_43 && is_connected_46_11 && is_connected_2_12 && is_connected_1_13 && !is_connected_3_44 && !is_connected_4_5  && !unallowed_connection_present && document.getElementById('mon').src.match("./images/off.png") ) {
			            
			document.getElementById('controllerchk').value = 1;
			document.getElementById('crtable').disabled = false;
			document.getElementById('sserr').disabled = false;
			   document.getElementById('distance').disabled = false;
			   document.getElementById('tpl').disabled = false;
			   document.getElementById('tfl').disabled = false;
			   
			   document.getElementById('knob2').style['pointer-events'] = "none";
			   document.getElementById('knob3').style['pointer-events'] = "none";
			alert('Right Connection\n Openloop Control');
			
           }
		   ///P Control
	else if (is_connected_42_44 && is_connected_8_44 && is_connected_45_5 && is_connected_46_43 && is_connected_46_11 && is_connected_2_12 && is_connected_1_13 && is_connected_4_5 && !is_connected_3_44  && !unallowed_connection_present && document.getElementById('mon').src.match("./images/off.png")  ) {
		       
			   document.getElementById('controllerchk').value = 2;
			   document.getElementById('crtable').disabled = false;
			   document.getElementById('sserr').disabled = false;
			   document.getElementById('distance').disabled = false;
			   document.getElementById('tpl').disabled = false;
			   document.getElementById('tfl').disabled = false;
			   
			   document.getElementById('knob2').style['pointer-events'] = "none";
			   document.getElementById('knob3').style['pointer-events'] = "none";
			   alert('Right Connection\nP-Control');
                
            }  
			
			///on-off Control
			else if (is_connected_42_44 && is_connected_8_44 && is_connected_45_5 && is_connected_46_43 && is_connected_46_11 && is_connected_2_12 && is_connected_1_13 && is_connected_4_5 && !is_connected_3_44  && !unallowed_connection_present && document.getElementById('mon').src.match("./images/on.png")) {
		       
			   document.getElementById('controllerchk').value = 3;
			   document.getElementById('crtable').disabled = false;
			   document.getElementById('sserr').disabled = true;
			   document.getElementById('distance').disabled = false;
			   document.getElementById('tpl').disabled = false;
			   document.getElementById('tfl').disabled = false;
			   document.getElementById('knob2').style['pointer-events'] = "auto";
			   document.getElementById('knob3').style['pointer-events'] = "none";
			   alert('Right Connection\nOn-Off Control \n Set maximum heater power to 1');
                
            }
			
			else if (is_connected_42_44 && is_connected_3_44 && is_connected_45_5 && is_connected_46_43 && is_connected_46_11 && is_connected_2_12 && is_connected_1_13 && is_connected_4_5 && !is_connected_8_44 && !unallowed_connection_present && document.getElementById('mon').src.match("./images/on.png")) {
		       
			   document.getElementById('controllerchk').value = 4;
			   
			   document.getElementById('crtable').disabled = false;
			   document.getElementById('sserr').disabled = true;
			   document.getElementById('distance').disabled = false;
			   document.getElementById('tpl').disabled = false;
			   document.getElementById('tfl').disabled = false;
			   
			   document.getElementById('knob2').style['pointer-events'] = "auto";
			   document.getElementById('knob3').style['pointer-events'] = "auto";
			   
			   alert('Right Connection\nOnOff-Control \n set maximum heater power to 1');
                
            }
			else{
				alert("Wrong Connection\n Go through the procedure again");
			}
			
		///deviation signal	
			
		

    });
});


	
	
	
	
	
	
	
	
	
	
	
	
	
	







