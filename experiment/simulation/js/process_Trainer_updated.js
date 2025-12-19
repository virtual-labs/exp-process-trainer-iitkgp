 
   /* This HTML page and script files are developed by
    Piyali Chattopadhyay
    Project Scientist-Technical,
    Virtual Labs IIT Kharagpur.*/ 



///////////oscilloscope and Function generator VARIABLES GLOBAL/////////////////////////////////////////////////////////////	
var canvas,ctx;
var flag;
var axes = {};
var vmaxs;  //in volt
var tmaxs; // in msec  0.001; //in sec
var voltperdiv,timeperdiv,peak,ss;	
var voltperdiv1,voltperdiv2,vmaxs1,vmaxs2;
var vp;
var posy1;
var posy2;
var phsl;
var frqfng;



//////////////////////////////////////OSCILLOSCOPE AND Function GENERATOR KNOBS//////////////////////////////////////////////

$(document).ready(function () {
//------------------------------knob of frequency(hz)----------------------//
    $("#fq-knob-fng").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min: 0.1,
        max: 5,
        step: 0.1,
		angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsqr();
				
            }
            if (flag == 2) {
				drawsqrout();                 
            }

          if(flag==3){
				
			}
			if(flag==4){
			   
			}
			}

    });
    //-----------------------knob of amplitude(volt)-------------------------------//
    $("#amp-knob-fng").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
       width: 100,
        height: 80,
        // cursor: pointer,
        min: 1,
        max: 10,
        step: 1,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsqr();
				
            }
            if (flag == 2) {
				drawsqrout();
                 
            }

          if(flag==3){
				
			}
			if(flag==4){
			   
			}
			}

    });
	
	
//-----------------------knob of amplitude1(vmax/div)-------------------------------//
    $("#amp-knob1").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        // cursor: pointer,
       min: 0.01,
        max: 5,
        step: 0.01,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsqr();
				
            }
            
          if(flag==3){
			dual();	
			}
			
			}
    });
    //-----------------------knob of amplitude2(vmax/div)-------------------------------//
    $("#amp-knob2").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        // cursor: pointer,
       min: 0.01,
        max: 5,
        step: 0.01,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            
            if (flag == 2) {
				drawsqrout();
                 
            }

          if(flag==3){
			dual();	
			}
			
			}

    });
	
	 $("#fq-knob").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min:100,
        max:500,
        step:100,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsqr();
				
            }
            if (flag == 2) {
				drawsqrout();
                 
            }

          if(flag==3){
				
			}
			if(flag==4){
			   
			}
			}
    });
	
	$("#positiony1").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min:-5,
        max:5,
        step:0.1,
        angleOffset: -125,
        angleArc: 250,
        
    });
	
	$("#positiony2").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min:-5,
        max:5,
        step:0.1,
        angleOffset: -125,
        angleArc: 250,
        
    });
	
	$("#positionx").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min:-360,
        max:360,
        step:90,
        angleOffset: -125,
        angleArc: 250,
        
    });
	
});	


///////////////////OSCILLOSCOPE SWITCH ON-OFF///////////////////////////////////
	
function mainswt() {
    var bttn = document.getElementById('onff').value;
	
	
    if (bttn == "Off") {

        document.getElementById("onff").value = "On";
		var canvas = document.getElementById('mycanvas');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		document.getElementById("sqr").disabled = true;
        document.getElementById("sqrout").disabled = true;
		
        document.getElementById("in").disabled = true;
        document.getElementById("out").disabled = true;
        document.getElementById("inout").disabled = true;
        	
        //document.getElementById("clear").disabled = false;
		document.getElementById('onff').classList.remove("btn-sucess");
        document.getElementById('onff').classList.add("btn-danger");
		
		document.getElementById('knob1').style['pointer-events'] = "none";
		document.getElementById('knob2').style['pointer-events'] = "none";
		document.getElementById('knob3').style['pointer-events'] = "none";
		document.getElementById('knob4').style['pointer-events'] = "none";
        		
        }
    else {
        document.getElementById("onff").value = "Off";
        document.getElementById("sqr").disabled = false;
        document.getElementById("sqrout").disabled = true; 
		
        document.getElementById("in").disabled = false;
        document.getElementById("out").disabled = false;
        document.getElementById("inout").disabled = false;
		
		//document.getElementById("clear").disabled = true;
		document.getElementById('onff').classList.remove("btn-danger");
		document.getElementById('onff').classList.add("btn-success");
		
		document.getElementById('knob1').style['pointer-events'] = "auto";
		
		if(document.getElementById('controllerchk').value == 4){ 
		document.getElementById('knob2').style['pointer-events'] = "auto";
		document.getElementById('knob3').style['pointer-events'] = "auto";
		}
		if(document.getElementById('controllerchk').value == 3){ 
		document.getElementById('knob2').style['pointer-events'] = "auto";
		document.getElementById('knob3').style['pointer-events'] = "none";
		}
		if(document.getElementById('controllerchk').value == 1 || document.getElementById('controllerchk').value == 2){ 
		document.getElementById('knob2').style['pointer-events'] = "none";
		document.getElementById('knob3').style['pointer-events'] = "none";
		}
		//document.getElementById('knob3').style['pointer-events'] = "auto";
		document.getElementById('knob4').style['pointer-events'] = "auto";
		
        drawAxis();
        drawGrid(ctx);

    }
}

////////////////////////////////////OSCILLOSCOPE GRID DRAW///////////////////////////////////////
function drawAxis() {

    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");

   voltperdiv1 = document.getElementById("amp-knob1").value;
   vmaxs1 = parseFloat(voltperdiv1)*4;//volt 
  voltperdiv2 = document.getElementById("amp-knob2").value;
  vmaxs2 = parseFloat(voltperdiv2)*4;//volt 

    axes.x0 = 0.5 + 0.0 * canvas.width;//260.5
    axes.y0 = 0.5 + 0.5 * canvas.height;//175.5
    // axes.scale = 50;
    axes.xscale = (canvas.width) / ( tmaxs); 	// x pix per s//260000
   
    axes.N = 101;
     if(flag==1){
          axes.yscale = (canvas.height) / (2 * vmaxs1);    // y pix per V //87.5
     }
     if(flag==2){
         axes.yscale = (canvas.height) / (2 * vmaxs2);    // y pix per V //87.5
     }
    if(flag==3){
         axes.yscale = (canvas.height) / (2 * vmaxs1);    // y pix per V //87.5
         axes.yscale = (canvas.height) / (2 * vmaxs2);    // y pix per V //87.5
     }
    axes.doNegativeX = true;
    ctx.lineWidth = 0.5;
    ctx.lineWidth = ticklinewidth;
    ctx.strokeStyle = tickcolor;

    drawHorizontalAxis();
    drawVerticalAxis();
    drawVerticalAxisTicks();
    drawHorizontalAxisTicks();
}

function drawGrid(ctx) {

    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    ctx.beginPath();//added afterwards
    for (var x = 0; x < w; x += 43.5) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }

    for (var y = 0; y < h; y += 44) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    ctx.strokeStyle = "Gainsboro";
    ctx.stroke();
}

var axismargin = 30,
        axisorigin = {x: 0, y: 0},
        axisright = 520,
        horzntickspcng = 9,
        vrtcltickspcng = 9,
        axiswidth = axisright, //520
        axisheight = axisorigin.y, //350
        numofvrtcltick = axisheight / vrtcltickspcng, //175
        numofhorzntick = axiswidth / horzntickspcng, //57.77777777777778
        tickwidth = 10,
        ticklinewidth = 0.5,
        tickcolor = 'black',
        axislinewidth = 1.0,
        axiscolor = 'lightgray';
//alert(numofvrtcltick);
//------------------------------------------------------Horizontal Axis----------------------------------------------------------------------------------//
function drawHorizontalAxis() {
//axes.y0=175.5,w=520
    var y0 = axes.y0, w = ctx.canvas.width;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(0, y0);
    ctx.lineTo(w, y0);  // X axis
    ctx.stroke();

}
//------------------------------------------------------Vertical Axis------------------------------------------------------------------------------------//          
function drawVerticalAxis() {
//axes.x0=260.5,h=350
    var x0 = axes.x0+218, h = ctx.canvas.height;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0, h);  // Y axis
    ctx.stroke();

}
//-------------------------------------------------------Vertical Ticks--------------------------------------------------------------------------------//         
function drawVerticalAxisTicks() {
    var deltaX;//5

    for (var i = 1; i < 43; ++i) {
        ctx.beginPath();

        if (i % 5 === 0)
            deltaX = tickwidth / 3;
        else
            deltaX = tickwidth / 3;

        ctx.moveTo(axisorigin.x + 218 - deltaX,
                axisorigin.y + 1 + i * vrtcltickspcng);

        ctx.lineTo(axisorigin.x + 218 + deltaX,
                axisorigin.y + 1 + i * vrtcltickspcng);
        ctx.stroke();

    }
}
//-------------------------------------------------------Horizontal Ticks----------------------------------------------------------------------------------//     
function drawHorizontalAxisTicks() {
    var deltaY;//5

    for (var i = 1; i < numofhorzntick; ++i) {
        ctx.beginPath();

        if (i % 5 === 0)
            deltaY = tickwidth / 3;
        else
            deltaY = tickwidth / 3;

        ctx.moveTo(axisorigin.x + i * horzntickspcng,
                axisorigin.y + 350 - 175 - deltaY);

        ctx.lineTo(axisorigin.x + i * horzntickspcng,
                axisorigin.y + 350 - 175 + deltaY);

        ctx.stroke();
    }

}

//////////////////////////OSCILLOSCOPE SIGNAL POSITIONNING FOR INPUT SQUARE WAVE APPLICABLE TO ALL CONTROLLERS///////////////////////////	
	
//----------------------------------------Channel 1------------------------------------------------------------//

function posiy1chnge() {
    posy1 = document.getElementById("positiony1").value;
    if (flag == 1) {
        drawsqr();
    }
   
}
function posiy2chnge() {
    posy2 = document.getElementById("positiony2").value;
   
 if (flag == 2) {
        drawsqrout();
    } 
}

function posix2chnge() {
    phsl = document.getElementById("positionx").value;
    if (flag == 1) {
        drawsqr();
    }
    if (flag == 2) {
           drawsqrout();
    }
 
}

function ampfng() {
    vp = document.getElementById("amp-knob-fng").value;
    if (flag == 1) {
        drawsqr();
    }
    if (flag == 2) {
          drawsqrout();
    }
if(flag==3){
        dual();
    }
    /*if(flag==4){
       grndrc();
    }*/
    
}

function freqfng() {
    frqfng = document.getElementById("fq-knob-fng").value;
    if (flag == 1) {
        drawsqr();
    }
    if (flag == 2) {
          drawsqrout();
    }

   if(flag==3){
        dual();
    }
    /*if(flag==4){
       grndrc();
    }*/
}

function amp1pdiv()
{
     voltperdiv = document.getElementById("amp-knob1").value;
     vmaxs = parseFloat(voltperdiv)*4;//volt 

    if (flag == 1) {
        drawsqr();
    }
     if (flag == 2) {
        drawsqrout();
    }

   if(flag==3){
        dual();
    }
    
}
function amp2pdiv()
{
     voltperdiv = document.getElementById("amp-knob2").value;
     vmaxs = parseFloat(voltperdiv)*4;//volt 

    if (flag == 1) {
        drawsqr();
    }
     if (flag == 2) {
        drawsqrout();
    }

   if(flag==3){
        dual();
    }
    
}
//------------------------------------------------timeperdiv(ms/div)--------------------------------------------------------//
function timepdiv() {
    timeperdiv = document.getElementById("fq-knob").value ;
	tmaxs =parseFloat(timeperdiv)*10*Math.pow(10,-3); //1sec
   if (flag == 1) {
        drawsqr();
    }
    if (flag == 2) {
        drawsqrout();
    }
if(flag==3){
        dual();
    }
    
}

///////////////////////////////////////////SQUARE WAVE GENERATE///////////////////////////////////////////////////////////////////////////////
//----------------------------------------code for drawing square wave--------------------------------------------------//
function drawsqr() {
    canvas = document.getElementById("mycanvas");
	//document.getElementById('fq-knob-fng').value = "15400";
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
		 document.getElementById("sqrout").disabled = false;
		 //document.getElementById('sqr').disabled="true";
		 //document.getElementById('tr1').style.display="none";
		 //document.getElementById('tr2').style.display="block";
		document.getElementById("in").disabled = false;
        document.getElementById("out").disabled = false;
        document.getElementById("inout").disabled = false;
    drawGrid(ctx);
    drawAxis();
	
	if(document.getElementById('controllerchk').value == 1 || document.getElementById('controllerchk').value == 2 || document.getElementById('controllerchk').value == 3){
    sqrwv();
	}
	else if(((document.getElementById('controllerchk').value==3 || document.getElementById('controllerchk').value==4) && document.getElementById('P').value !=100) || ((document.getElementById('controllerchk').value==3 || document.getElementById('controllerchk').value==4) &&document.getElementById('I').value !=1)){	
	alert("Keep Proportionl band at 100% \n do proper connection for on-off control")		
	}
	
	else if(document.getElementById('controllerchk').value == 4 && document.getElementById('P').value ==100 && document.getElementById('I').value ==1 && document.getElementById('overlap').value ==0){
    //heater_ip();
	ON_OFF_Sensor();
	dataOPPoints=[];
	dataIPPoints=[];
	}
	else if(document.getElementById('controllerchk').value == 4 && document.getElementById('P').value ==100 && document.getElementById('I').value ==1 && document.getElementById('overlap').value !=0){
    //heater_ip();
	ON_OFF_overlap();
	dataOPPoints=[];
	dataIPPoints=[];
	}
	
	
}

function sqrwv() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
	posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        y[i] = (vp/2) * Math.sign( Math.sin(2 * 3.1415 * frqfng * x[i] + phsl * 3.1415 / 180));
		
		
		//console.log('i/p ='+y[i]);
    }
	
	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#0059b3";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}


///////////////////////////////////////////SQUARE OUTPUT WAVE GENERATE///////////////////////////////////////////////////////////////////////////////
//----------------------------------------code for drawing square output wave--------------------------------------------------//
function drawsqrout() {
    canvas = document.getElementById("mycanvas");
	if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
		 ;
		 //document.getElementById('sqr').disabled="true";
		 //document.getElementById('tr1').style.display="none";
		 //document.getElementById('tr2').style.display="block";
		document.getElementById("in").disabled = false;
        document.getElementById("out").disabled = false;
        document.getElementById("inout").disabled = false;
    drawGrid(ctx);
    drawAxis();
	
	///now check which control is applied and how much is the kp value acc to that output will be shown///
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value ==100 ){
	openLoop();
	dataOPPoints=[];
	}
	
	else if(document.getElementById('controllerchk').value==2 && (document.getElementById('P').value ==100 || document.getElementById('P').value ==200 || document.getElementById('P').value ==50)){
	P_Control();
	dataOPPoints=[];
	}
	
	else if((document.getElementById('controllerchk').value==3 || document.getElementById('controllerchk').value==4) && document.getElementById('P').value ==100 && document.getElementById('I').value ==1 ){
	//onff_Control();
	ON_OFF_Control();
	dataOPPoints=[];
	dataIPPoints=[];
	}
	else if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value !=100 ){	
	alert("Keep Proportionl band at 100% for openloop control")		
	}
	else if(document.getElementById('controllerchk').value==2 && (document.getElementById('P').value !=100 || document.getElementById('P').value !=200 || document.getElementById('P').value !=50 )){	
	alert("Keep Proportionl band at 100% ,200% or 50 % ")		
	}
	
	else if(document.getElementById('controllerchk').value==3 && (document.getElementById('P').value !=100|| document.getElementById('I').value !=1)){	
	alert("Keep Proportionl band at 100% \n do proper connection for on-off control")		
	}
	else if(document.getElementById('controllerchk').value==4 && (document.getElementById('P').value !=100|| document.getElementById('I').value !=1)){	
	alert("Keep Proportionl band at 100% \n do proper connection for on-off control")		
	}	
	
	
}

var dataOPPoints=[],dataIPPoints=[];


 
 function openLoop(){
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
	
//---------------------------------------------------------output wave for 40 degree openning,100%PB, 279 mm,set value 40 degree centigrate,input sine wave 2v-------------------------------------------------------------------------------//
	var dataOPPoints=[];
    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,tperiod,cyclehlfs,count=50; 
	var measured;
	
	//var setvalue = 40;///in degree centigrate
	//var converted_volt = (setvalue/10);///need to verify again
/////for 100% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points	
	
	//var dc_k = parseFloat(0.25);// lab test data. 	 
	var pvalue =  document.getElementById('P').value;
	var kp = parseFloat(100/pvalue);
	var k = parseFloat(0.52);///avg dc gain from lab test
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	/// for PB = 100%///

if(document.getElementById('P').value==100){	
	///Angle=40
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 40){//279mm	
	var tau = 0.760;   ///lab test data,time constant or transfer lag	
	var td = 0.260;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 40){//140mm	
	var tau = 0.710;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 40){//28mm	
	var tau = 0.510;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=60
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 60){//279mm	
	var tau = 0.610;   ///lab test data,time constant or transfer lag	
	var td = 0.220;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 60){//140mm	
	var tau = 0.640;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 60){//28mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}

	
	///Angle=20
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 20){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 20){//140mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.130;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 20){//28mm	
	var tau = 0.580;   ///lab test data,time constant or transfer lag	
	var td = 0.050;    ///delay time,from lab test or transport lag
	}
	
	///Angle=50
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 50){//279mm	
	var tau = 0.440;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 50){//140mm	
	var tau = 0.630;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 50){//28mm	
	var tau = 0.720;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}
	
	///Angle=70
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 70){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 70){//140mm	
	var tau = 0.520;   ///lab test data,time constant or transfer lag	
	var td = 0.100;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 70){//28mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
	
	///Angle=80
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 80){//279mm	
	var tau = 0.710;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 80){//140mm	
	var tau = 0.640;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 80){//28mm	
	var tau = 0.400;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=90
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 90){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 90){//140mm	
	var tau = 0.500;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 90){//28mm	
	var tau = 0.740;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
	
	///Angle=30
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 30){//279mm	
	var tau = 0.680;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 30){//140mm	
	var tau = 0.460;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 30){//28mm	
	var tau = 0.230;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
}

if(document.getElementById('P').value==200){	
	///Angle=40
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 40){//279mm	
	var tau = 0.530;   ///lab test data,time constant or transfer lag	
	var td = 0.080;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 40){//140mm	
	var tau = 0.630;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 40){//28mm	
	var tau = 0.690;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}
	
	///Angle=60
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 60){//279mm	
	var tau = 0.720;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 60){//140mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 60){//28mm	
	var tau = 0.500;   ///lab test data,time constant or transfer lag	
	var td = 0.080;    ///delay time,from lab test or transport lag
	}
	
	///Angle=20
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 20){//279mm	
	var tau = 0.860;   ///lab test data,time constant or transfer lag	
	var td = 0.360;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 20){//140mm	
	var tau = 0.820;   ///lab test data,time constant or transfer lag	
	var td = 0.220;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 20){//28mm	
	var tau = 0.820;   ///lab test data,time constant or transfer lag	
	var td = 0.220;    ///delay time,from lab test or transport lag
	}
	
	///Angle=50
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 50){//279mm	
	var tau = 0.740;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 50){//140mm	
	var tau = 0.610;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 50){//28mm	
	var tau = 0.620;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}
	
	///Angle=70
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 70){//279mm	
	var tau = 0.700;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 70){//140mm	
	var tau = 0.480;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 70){//28mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}
	
	///Angle=80
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 80){//279mm	
	var tau = 0.500;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 80){//140mm	
	var tau = 0.540;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 80){//28mm	
	var tau = 0.480;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}
	
	///Angle=90
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 90){//279mm	
	var tau = 0.570;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 90){//140mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 90){//28mm	
	var tau = 0.380;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=30
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 30){//279mm	
	var tau = 0.860;   ///lab test data,time constant or transfer lag	
	var td = 0.300;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 30){//140mm	
	var tau = 0.660;   ///lab test data,time constant or transfer lag	
	var td = 0.220;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 30){//28mm	
	var tau = 0.670;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}
}	

if(document.getElementById('P').value==50){	
	///Angle=40 - here no tp tf could be detected, kept values as 100%
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 40){//279mm	
	var tau = 0.760;   ///lab test data,time constant or transfer lag	
	var td = 0.260;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 40){//140mm	
	var tau = 0.710;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 40){//28mm	
	var tau = 0.510;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=60
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 60){//279mm	
	var tau = 0.690;   ///lab test data,time constant or transfer lag	
	var td = 0.320;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 60){//140mm	
	var tau = 0.470;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 60){//28mm	
	var tau = 0.500;   ///lab test data,time constant or transfer lag	
	var td = 0.100;    ///delay time,from lab test or transport lag
	}
	
	///Angle=20 - here no tp tf could be detected,kept value as 100%
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 20){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 20){//140mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.130;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 20){//28mm	
	var tau = 0.580;   ///lab test data,time constant or transfer lag	
	var td = 0.050;    ///delay time,from lab test or transport lag
	}
	
	///Angle=50
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 50){//279mm	
	var tau = 0.580;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 50){//140mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 50){//28mm	
	var tau = 0.430;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}
	
	///Angle=70
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 70){//279mm	
	var tau = 0.620;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 70){//140mm	
	var tau = 0.520;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 70){//28mm	
	var tau = 0.480;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}
	
	///Angle=80
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 80){//279mm	
	var tau = 0.690;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 80){//140mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 80){//28mm	
	var tau = 0.440;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=90
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 90){//279mm	
	var tau = 0.620;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 90){//140mm	
	var tau = 0.340;   ///lab test data,time constant or transfer lag	
	var td = 0.100;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 90){//28mm	
	var tau = 0.520;   ///lab test data,time constant or transfer lag	
	var td = 0.080;    ///delay time,from lab test or transport lag
	}
	
	///Angle=30 - here no tp tf could be detected,kept value as 100%
	///Angle=30
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 30){//279mm	
	var tau = 0.680;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 30){//140mm	
	var tau = 0.460;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 30){//28mm	
	var tau = 0.230;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
}	
	//for (var t = 0; t < math.add(50,td); t++) {
		
		for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.add(math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)),td); t++) {
		
		var stepVolt = math.multiply(vp,kp);		
		var delay = math.subtract(t,td);	
		var epow = math.divide(math.subtract(t,td),tau);	 
		var out = math.multiply(stepVolt,math.subtract(1,math.pow(math.e,-epow)));
		var out2 = math.add(math.atan(math.divide(math.multiply(-td,2,math.pi,frqfng),2)),math.multiply(-90,math.divide(math.pi,180)),-math.atan(math.divide(math.multiply(td,2,math.pi,frqfng),2)),-math.atan(math.multiply(2,math.pi,frqfng,tau)));
	
		x[t] = (tstart) + t * dt;
		y[t] = (out)/2;
	  
	  measured = out;
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	
	} 
	
	//for (var t = 50; t < (axes.N); t++) {
		for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.add(math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)),td); t++) {
		
		var stepVolt = math.multiply(vp,kp);		
		var delay = math.subtract(t,td);	
		var epow = math.divide(math.subtract(t,td),tau);	 
		var out = math.multiply(stepVolt,math.subtract(1,math.pow(math.e,-epow)));	
		
		x[t] = (tstart) + t * dt;
		y[t] = (-out)/2;
	  
	  //measured = outputVolt_change;
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	
	} 
	} 
	
	var sserr = math.multiply(math.divide(math.abs(math.subtract(vp,measured)),vp),100);
	document.getElementById('sserr').value = sserr;
	document.getElementById('tpl').value = math.multiply(td,1000);
	document.getElementById('tfl').value = math.multiply(tau,1000);
	if(document.getElementById('dischk').value==1){
	document.getElementById('distance').value = 28;			
	}
	else if(document.getElementById('dischk').value==2){
	document.getElementById('distance').value = 140;			
	}
	else if(document.getElementById('dischk').value==3){
	document.getElementById('distance').value = 279;			
	}
	point_move();
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Enlarged view of output signal (V vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time (sec)"
		
      },
    axisY: [
	      {/////output Y axis
            title: "Amplitude (V)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy2) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
	
 }
 
 
 
 
 

///////////////////////////////////////////P CONTROLLERS//////////////////////////////////////////////////////////
function P_Control() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//
	var dataOPPoints=[];
    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,tperiod,cyclehlfs,count=50; 
	var measured;

	


	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points
	
	var pvalue =  document.getElementById('P').value;
	var kp = parseFloat(100/pvalue);
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	
	////////////////////////////////40 degree throttle////////////////////////
	///Kp=100/100 =1
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 40){//279mm	
	var T1 = 0.480;   ///lab test data,time constant or transfer lag	
	var T2 = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 40){//140mm	
	var T1 = 0.370;   ///lab test data,time constant or transfer lag	
	var T2 = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 40){//28mm	
	var T1 = 0.260;   ///lab test data,time constant or transfer lag	
	var T2 = 0.120;    ///delay time,from lab test or transport lag
	}
	
	
	///Kp=100/200 =0.5
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 40){//279mm	
	var T1 = 0.530;   ///lab test data,time constant or transfer lag	
	var T2 = 0.260;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 40){//140mm	
	var T1 = 0.450;   ///lab test data,time constant or transfer lag	
	var T2 = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 40){//28mm	
	var T1 = 0.300;   ///lab test data,time constant or transfer lag	
	var T2 = 0.100;    ///delay time,from lab test or transport lag
	}
	
	
	
	///Kp=100/50 =2
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 40){//279mm	
	var T1 = 0.420;   ///lab test data,time constant or transfer lag	
	var T2 = 0.280;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 40){//140mm	
	var T1 = 0.340;   ///lab test data,time constant or transfer lag	
	var T2 = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 40){//28mm	
	var T1 = 0.240;   ///lab test data,time constant or transfer lag	
	var T2 = 0.80;    ///delay time,from lab test or transport lag
	}
	
	////////////////////////////////20 degree throttle////////////////////////
	///Kp=100/100 =1
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 20){//279mm	
	var T1 = 0.520;   ///lab test data,time constant or transfer lag	
	var T2 = 0.340;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 20){//140mm	
	var T1 = 0.390;   ///lab test data,time constant or transfer lag	
	var T2 = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 20){//28mm	
	var T1 = 0.270;   ///lab test data,time constant or transfer lag	
	var T2 = 0.120;    ///delay time,from lab test or transport lag
	}
	
	
	///Kp=100/200 =0.5
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 20){//279mm	
	var T1 = 0.600;   ///lab test data,time constant or transfer lag	
	var T2 = 0.280;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 20){//140mm	
	var T1 = 0.480;   ///lab test data,time constant or transfer lag	
	var T2 = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 20){//28mm	
	var T1 = 0.320;   ///lab test data,time constant or transfer lag	
	var T2 = 0.100;    ///delay time,from lab test or transport lag
	}
	
	
	
	///Kp=100/50 =2
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 20){//279mm	
	var T1 = 0.490;   ///lab test data,time constant or transfer lag	
	var T2 = 0.300;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 20){//140mm	
	var T1 = 0.360;   ///lab test data,time constant or transfer lag	
	var T2 = 0.220;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 20){//28mm	
	var T1 = 0.240;   ///lab test data,time constant or transfer lag	
	var T2 = 0.100;    ///delay time,from lab test or transport lag
	}
	
	
	////////////////////////////////60 degree throttle////////////////////////
	///Kp=100/100 =1
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 60){//279mm	
	var T1 = 0.420;   ///lab test data,time constant or transfer lag	
	var T2 = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 60){//140mm	
	var T1 = 0.340;   ///lab test data,time constant or transfer lag	
	var T2 = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 60){//28mm	
	var T1 = 0.280;   ///lab test data,time constant or transfer lag	
	var T2 = 0.80;    ///delay time,from lab test or transport lag
	}
	
	
	///Kp=100/200 =0.5
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 60){//279mm	
	var T1 = 0.500;   ///lab test data,time constant or transfer lag	
	var T2 = 0.260;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 60){//140mm	
	var T1 = 0.380;   ///lab test data,time constant or transfer lag	
	var T2 = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 60){//28mm	
	var T1 = 0.280;   ///lab test data,time constant or transfer lag	
	var T2 = 0.80;    ///delay time,from lab test or transport lag
	}
	
	
	
	///Kp=100/50 =2
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 60){//279mm	
	var T1 = 0.380;   ///lab test data,time constant or transfer lag	
	var T2 = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 60){//140mm	
	var T1 = 0.360;   ///lab test data,time constant or transfer lag	
	var T2 = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 60){//28mm	
	var T1 = 0.260;   ///lab test data,time constant or transfer lag	
	var T2 = 0.80;    ///delay time,from lab test or transport lag
	}
	
	
	////////////////////////////////80 degree throttle////////////////////////
	///Kp=100/100 =1
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 80){//279mm	
	var T1 = 0.460;   ///lab test data,time constant or transfer lag	
	var T2 = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 80){//140mm	
	var T1 = 0.370;   ///lab test data,time constant or transfer lag	
	var T2 = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 80){//28mm	
	var T1 = 0.290;   ///lab test data,time constant or transfer lag	
	var T2 = 0.120;    ///delay time,from lab test or transport lag
	}
	
	
	///Kp=100/200 =0.5
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 80){//279mm	
	var T1 = 0.450;   ///lab test data,time constant or transfer lag	
	var T2 = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 80){//140mm	
	var T1 = 0.450;   ///lab test data,time constant or transfer lag	
	var T2 = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 200 && document.getElementById('anglvalue').value == 80){//28mm	
	var T1 = 0.340;   ///lab test data,time constant or transfer lag	
	var T2 = 0.120;    ///delay time,from lab test or transport lag
	}
	
	
	
	///Kp=100/50 =2
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 80){//279mm	
	var T1 = 0.380;   ///lab test data,time constant or transfer lag	
	var T2 = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 80){//140mm	
	var T1 = 0.350;   ///lab test data,time constant or transfer lag	
	var T2 = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 50 && document.getElementById('anglvalue').value == 80){//28mm	
	var T1 = 0.180;   ///lab test data,time constant or transfer lag	
	var T2 = 0.80;    ///delay time,from lab test or transport lag
	}
	
	var k = 1;	
	var k2 = math.divide(1,math.add(1,kp));
	var midchange = math.add(50,T2);
	
	
    // create function 
   // for (var t =0; t < math.add(50,T2); t++) {
		
		for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.add(math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)),T2); t++) {
		
	var stepVolt = parseFloat(vp*kp);	
	
	var wn = Math.sqrt((parseFloat(1+parseFloat(kp*k)))/(parseFloat(T1*T2)));
	//alert(wn);
	var zeta = parseFloat((0.5*((T1+T2)/(parseFloat(T1*T2))))*(parseFloat(1/wn)));
	//alert(zeta);
	
	 var k_scnd = parseFloat(parseFloat((parseFloat(kp*k))/parseFloat(parseFloat(kp*k)+1))*stepVolt);
	/*var out = parseFloat(k_scnd*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	 */
	 var s0 = math.divide(math.add(1,math.multiply(k,kp)),math.multiply(T1,T2));
	 var s1 = math.divide(math.add(T1,T2),math.multiply(T1,T2));
	 var s2 = 1;
	 var roots = math.polynomialRoot(s0,s1,s2);
	var alpha = roots[0];
	var beta = roots[1];
	
	var LHS = math.multiply(k_scnd,math.pow(wn,2));
	var coeff1 =  math.divide(LHS,math.multiply(math.subtract(0,alpha),math.subtract(0,beta))); 
	var coeff2 =  math.divide(LHS,math.multiply(alpha,math.subtract(alpha,beta)));
	var coeff3 =  math.divide(LHS,math.multiply(beta,math.subtract(beta,alpha))); 
	 
	var part1 = coeff1;
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(beta,t)));	

	 var out = (math.add(part1,part2,part3)).re; 	 
	
	//var outputVolt = math.add(vp,y);/// input 2v in oscilloscope 

		x[t] = (tstart) + t * dt;
	 y[t] = out/2;
	  
	  //measured = out;
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	
	} 
	
	//for (var t= 50; t< axes.N; t++) {
		for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.add(math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)),T2); t++) {
		
	
	/* var stepVolt = parseFloat(vp*kp);
	var wn = Math.sqrt((parseFloat(1+parseFloat(kp*k)))/(parseFloat(T1*T2)));
	//alert(wn);
	var zeta = parseFloat((0.5*((T1+T2)/(parseFloat(T1*T2))))*(parseFloat(1/wn)));
	//alert(zeta);
	
	var k_scnd = parseFloat(parseFloat((parseFloat(kp*k))/parseFloat(parseFloat(kp*k)+1))*stepVolt);
	var out = parseFloat(k_scnd*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	 */
	 var stepVolt = parseFloat(vp*kp);	
	
	var wn = Math.sqrt((parseFloat(1+parseFloat(kp*k)))/(parseFloat(T1*T2)));
	//alert(wn);
	var zeta = parseFloat((0.5*((T1+T2)/(parseFloat(T1*T2))))*(parseFloat(1/wn)));
	//alert(zeta);
	
	 var k_scnd = parseFloat(parseFloat((parseFloat(kp*k))/parseFloat(parseFloat(kp*k)+1))*stepVolt);
	/*var out = parseFloat(k_scnd*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	 */
	 var s0 = math.divide(math.add(1,math.multiply(k,kp)),math.multiply(T1,T2));
	 var s1 = math.divide(math.add(T1,T2),math.multiply(T1,T2));
	 var s2 = 1;
	 var roots = math.polynomialRoot(s0,s1,s2);
	var alpha = roots[0];
	var beta = roots[1];
	
	var LHS = math.multiply(k_scnd,math.pow(wn,2));
	var coeff1 =  math.divide(LHS,math.multiply(math.subtract(0,alpha),math.subtract(0,beta))); 
	var coeff2 =  math.divide(LHS,math.multiply(alpha,math.subtract(alpha,beta)));
	var coeff3 =  math.divide(LHS,math.multiply(beta,math.subtract(beta,alpha))); 
	 
	var part1 = coeff1;
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(beta,t)));	

	 var out = (math.add(part1,part2,part3)).re;
	
	//var outputVolt = math.add(vp,y);/// input 2v in oscilloscope 

	x[t] = (tstart) + t * dt ;
	 y[t] = (-out)/2;
	 
	
	//console.log(y[t]);	
	dataOPPoints.push({x:(t), y:(y[t])});
	} 
	}
	//var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = math.multiply(k2,100);
	document.getElementById('tpl').value = math.multiply(T2,1000);
	document.getElementById('tfl').value = math.multiply(T1,1000);
	if(document.getElementById('dischk').value==1){
	document.getElementById('distance').value = 28;			
	}
	else if(document.getElementById('dischk').value==2){
	document.getElementById('distance').value = 140;			
	}
	else if(document.getElementById('dischk').value==3){
	document.getElementById('distance').value = 279;			
	}
	point_move();
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Enlarged view of output signal (V vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time (sec)"
		
      },
    axisY: [
	      {/////output Y axis
            title: "Amplitude (V)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy2) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}



///////Dual function////////////////

function dualgen(){	
vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
	posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//
	var dataOPPoints=[];
    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        y[i] = (vp/2) * Math.sign( Math.sin(2 * 3.1415 * frqfng * x[i] + phsl * 3.1415 / 180));
    }
	
	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#0059b3";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();	


///now check which control is applied and how much are the kp ki kd values,acc to that output will be shown///
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==100 ){
	openLoop();
	document.getElementById("plotbucket").style.display="none";
	dataOPPoints=[];
	}
	else if(document.getElementById('controllerchk').value==2 && (document.getElementById('P').value ==100 || document.getElementById('P').value ==200 || document.getElementById('P').value ==50)){
	P_Control();
	document.getElementById("plotbucket").style.display="none";
	dataOPPoints=[];	
	}
	else if(document.getElementById('controllerchk').value==3 && document.getElementById('P').value ==100){
	//onff_Control();
	//ON_OFF_Control();
	document.getElementById("plotbucket").style.display="none";
	dataOPPoints=[];	
	}
	
}

function dualon_ff(){
	
//onff_Control();	
//ON_OFF_Control();	
//heater_ip();
if(document.getElementById('overlap').value ==0){
ON_OFF_Sensor();	
}
if(document.getElementById('overlap').value !=0){
ON_OFF_overlap();	
}
}

function dual(){
	
if(document.getElementById('controllerchk').value == 1 || document.getElementById('controllerchk').value == 2 || document.getElementById('controllerchk').value == 3){
	
dualgen();	
	
}	
else if(document.getElementById('controllerchk').value == 4){
	
dualon_ff();	
document.getElementById("plotbucket").style.display="none";
dataOPPoints=[];
dataIPPoints=[];	
}	
}


//////////////////////////////////////////show on-off controller output when connected to c point///////////////////////////////////////////
/* function heater_ip(){
	
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//
	var dataOPPoints=[],dataIPPoints=[];
    var x = new Array(), y = new Array(),G =new Array;  // x,y plotting variables
    var dt, tstart, tstop,tperiod,cyclehlfs,count=50; 
	var measured;

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points
	
	var pvalue =  document.getElementById('P').value;
	var kp = parseFloat(100/pvalue);
	
	////////////////////////////////40 degree throttle////////////////////////
	///Kp=100/100 =1
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 40){//279mm	
	var T1 = 0.480;   ///lab test data,time constant or transfer lag	
	var T2 = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 40){//140mm	
	var T1 = 0.370;   ///lab test data,time constant or transfer lag	
	var T2 = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 40){//28mm	
	var T1 = 0.260;   ///lab test data,time constant or transfer lag	
	var T2 = 0.120;    ///delay time,from lab test or transport lag
	}
	
	
	
	////////////////////////////////20 degree throttle////////////////////////
	///Kp=100/100 =1
	else if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 20){//279mm	
	var T1 = 0.520;   ///lab test data,time constant or transfer lag	
	var T2 = 0.340;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 20){//140mm	
	var T1 = 0.390;   ///lab test data,time constant or transfer lag	
	var T2 = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 20){//28mm	
	var T1 = 0.270;   ///lab test data,time constant or transfer lag	
	var T2 = 0.120;    ///delay time,from lab test or transport lag
	}
	
	////////////////////////////////60 degree throttle////////////////////////
	///Kp=100/100 =1
	else if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 60){//279mm	
	var T1 = 0.420;   ///lab test data,time constant or transfer lag	
	var T2 = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 60){//140mm	
	var T1 = 0.340;   ///lab test data,time constant or transfer lag	
	var T2 = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 60){//28mm	
	var T1 = 0.280;   ///lab test data,time constant or transfer lag	
	var T2 = 0.80;    ///delay time,from lab test or transport lag
	}
	
	
	////////////////////////////////80 degree throttle////////////////////////
	///Kp=100/100 =1
	else if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 80){//279mm	
	var T1 = 0.460;   ///lab test data,time constant or transfer lag	
	var T2 = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 80){//140mm	
	var T1 = 0.370;   ///lab test data,time constant or transfer lag	
	var T2 = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 80){//28mm	
	var T1 = 0.290;   ///lab test data,time constant or transfer lag	
	var T2 = 0.120;    ///delay time,from lab test or transport lag
	}
	
	
	var k = 1;	
	var k2 = math.divide(1,math.add(1,kp));
	var midchange = math.add(50,T2);
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	
    // create function 
    //for (var t =0; t <  math.add(50,T2); t++) {
		
		for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.add(math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)),T2); t++) {
		

	var stepVolt = parseFloat(vp*kp);	
	
	var wn = Math.sqrt((parseFloat(1+parseFloat(kp*k)))/(parseFloat(T1*T2)));
	//alert(wn);
	var zeta = parseFloat((0.5*((T1+T2)/(parseFloat(T1*T2))))*(parseFloat(1/wn)));
	//alert(zeta);
	
	//var k_scnd = parseFloat(parseFloat((parseFloat(kp*k))/parseFloat(parseFloat(kp*k)+1))*stepVolt);
	var out = parseFloat(stepVolt*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	console.log(out);
	 var s0 = math.divide(math.add(1,math.multiply(k,kp)),math.multiply(T1,T2));
	 var s1 = math.divide(math.add(T1,T2),math.multiply(T1,T2));
	 var s2 = 1;
	 var roots = math.polynomialRoot(s0,s1,s2);
	var alpha = roots[0];
	var beta = roots[1];
	
	var LHS = math.multiply(stepVolt,math.pow(wn,2));
	var coeff1 =  math.divide(LHS,math.multiply(math.subtract(0,alpha),math.subtract(0,beta))); 
	var coeff2 =  math.divide(LHS,math.multiply(alpha,math.subtract(alpha,beta)));
	var coeff3 =  math.divide(LHS,math.multiply(beta,math.subtract(beta,alpha))); 
	 
	var part1 = coeff1;
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(beta,t)));	

	 var out = (math.add(part1,part2,part3)).re;
	
	
	//var outputVolt = math.add(vp,y);/// input 2v in oscilloscope 

		x[t] = tstart + t * dt;
		y[t] = (out/2);///2)* Math.sin(2 * 3.1415 * frqfng * x[t] + phsl * 3.1415 / 180);
		G[t] = 0;
	  //measured = out;
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	dataIPPoints.push({x:(t), y:(G[t])});
	} 
	
	//for (var t= 50; t< axes.N; t++) {
	for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.add(math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)),T2); t++) {
		
	
	var stepVolt = parseFloat(vp*kp);
	var wn = Math.sqrt((parseFloat(1+parseFloat(kp*k)))/(parseFloat(T1*T2)));
	//alert(wn);
	var zeta = parseFloat((0.5*((T1+T2)/(parseFloat(T1*T2))))*(parseFloat(1/wn)));
	//alert(zeta);
	
	//var k_scnd = parseFloat(parseFloat((parseFloat(kp*k))/parseFloat(parseFloat(kp*k)+1))*stepVolt);
	var out = parseFloat(stepVolt*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	
	 var s0 = math.divide(math.add(1,math.multiply(k,kp)),math.multiply(T1,T2));
	 var s1 = math.divide(math.add(T1,T2),math.multiply(T1,T2));
	 var s2 = 1;
	 var roots = math.polynomialRoot(s0,s1,s2);
	var alpha = roots[0];
	var beta = roots[1];
	
	var LHS = math.multiply(stepVolt,math.pow(wn,2));
	var coeff1 =  math.divide(LHS,math.multiply(math.subtract(0,alpha),math.subtract(0,beta))); 
	var coeff2 =  math.divide(LHS,math.multiply(alpha,math.subtract(alpha,beta)));
	var coeff3 =  math.divide(LHS,math.multiply(beta,math.subtract(beta,alpha))); 
	 
	var part1 = coeff1;
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(beta,t)));	

	 var out = (math.add(part1,part2,part3)).re;
	//var outputVolt = math.add(vp,y);/// input 2v in oscilloscope 

	x[t] = tstart + t * dt ;
	 y[t] = (-out)/2;
	 G[t] = out;
	
	//console.log(y[t]);	
	dataOPPoints.push({x:(t), y:(y[t])});
	dataIPPoints.push({x:(t), y:(G[t])});
	} 
	}
	//var sserr = math.subtract(vp,measured);
	//document.getElementById('sserr').value = math.multiply(k2,100);
	//document.getElementById('tpl').value = math.multiply(T2,1000);
	//document.getElementById('tfl').value = math.multiply(T1,1000);
	if(document.getElementById('dischk').value==1){
	document.getElementById('distance').value = 28;			
	}
	else if(document.getElementById('dischk').value==2){
	document.getElementById('distance').value = 140;			
	}
	else if(document.getElementById('dischk').value==3){
	document.getElementById('distance').value = 279;			
	}*/
	
	/* ///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Enlarged view of output signal(black) and controller output(blue) (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
		
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,///increased zoom
			maximum:5,
        },
		{/////input y axis invisible
			gridThickness: 0,
    tickLength: 0,
    lineThickness: 0,
    labelFormatter: function(){
      return " ";}
	  
		}
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
	   {        
        type: "spline",
		color:"blue",
        dataPoints:dataIPPoints
	
       },
       
      ]	
	});

	chart.render();	
	
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "blue";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - G[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
	
	
}
///////////////////////////////////////////show on-off controlled output ///////////////////////////////////////////

function onff_Control(){
	
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//
	var dataOPPoints=[];
    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,tperiod,cyclehlfs,count=50; 
	var measured;

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points
	
	var pvalue =  document.getElementById('P').value;
	var kp = parseFloat(100/pvalue);
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	
	////////////////////////////////40 degree throttle////////////////////////
	///Kp=100/100 =1
	if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 40){//279mm	
	var T1 = 0.480;   ///lab test data,time constant or transfer lag	
	var T2 = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 40){//140mm	
	var T1 = 0.370;   ///lab test data,time constant or transfer lag	
	var T2 = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 40){//28mm	
	var T1 = 0.260;   ///lab test data,time constant or transfer lag	
	var T2 = 0.120;    ///delay time,from lab test or transport lag
	}
	
	
	
	////////////////////////////////20 degree throttle////////////////////////
	///Kp=100/100 =1
	else if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 20){//279mm	
	var T1 = 0.520;   ///lab test data,time constant or transfer lag	
	var T2 = 0.340;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 20){//140mm	
	var T1 = 0.390;   ///lab test data,time constant or transfer lag	
	var T2 = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 20){//28mm	
	var T1 = 0.270;   ///lab test data,time constant or transfer lag	
	var T2 = 0.120;    ///delay time,from lab test or transport lag
	}
	
	////////////////////////////////60 degree throttle////////////////////////
	///Kp=100/100 =1
	else if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 60){//279mm	
	var T1 = 0.420;   ///lab test data,time constant or transfer lag	
	var T2 = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 60){//140mm	
	var T1 = 0.340;   ///lab test data,time constant or transfer lag	
	var T2 = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 60){//28mm	
	var T1 = 0.280;   ///lab test data,time constant or transfer lag	
	var T2 = 0.80;    ///delay time,from lab test or transport lag
	}
	
	
	////////////////////////////////80 degree throttle////////////////////////
	///Kp=100/100 =1
	else if(document.getElementById('dischk').value == 3 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 80){//279mm	
	var T1 = 0.460;   ///lab test data,time constant or transfer lag	
	var T2 = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 80){//140mm	
	var T1 = 0.370;   ///lab test data,time constant or transfer lag	
	var T2 = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('P').value == 100 && document.getElementById('anglvalue').value == 80){//28mm	
	var T1 = 0.290;   ///lab test data,time constant or transfer lag	
	var T2 = 0.120;    ///delay time,from lab test or transport lag
	}
	
	
	var k = 1;	
	var k2 = math.divide(1,math.add(1,kp));
	var midchange = math.add(50,T2);
	
	
    // create function 
    //for (var t =0; t <  math.add(50,T2); t++) {
	for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.add(math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)),T2); t++) {
			
		
	///here kp is always =1,since PB =100% always hence from lab test data adding the increased amplitudes of o/p signal for three successive distances	
	///It is seen that in case of on-off control o/p upperbound seems to be increased than the set value,a dis advantages of on-off controller
	
	if(document.getElementById('dischk').value == 2 || document.getElementById('dischk').value == 3 ){
	var stepVolt = math.add(vp,0.56);	
	}
	
	else if(document.getElementById('dischk').value == 1){
	var stepVolt = math.add(vp,1.20);	
	}
	
	var wn = Math.sqrt((parseFloat(1+parseFloat(kp*k)))/(parseFloat(T1*T2)));
	//alert(wn);
	var zeta = parseFloat((0.5*((T1+T2)/(parseFloat(T1*T2))))*(parseFloat(1/wn)));
	//alert(zeta);
	
	//var k_scnd = parseFloat(parseFloat((parseFloat(kp*k))/parseFloat(parseFloat(kp*k)+1))*stepVolt);
	var out = parseFloat(stepVolt*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	console.log(out);
	
	var s0 = math.divide(math.add(1,math.multiply(k,kp)),math.multiply(T1,T2));
	 var s1 = math.divide(math.add(T1,T2),math.multiply(T1,T2));
	 var s2 = 1;
	 var roots = math.polynomialRoot(s0,s1,s2);
	var alpha = roots[0];
	var beta = roots[1];
	
	var LHS = math.multiply(stepVolt,math.pow(wn,2));
	var coeff1 =  math.divide(LHS,math.multiply(math.subtract(0,alpha),math.subtract(0,beta))); 
	var coeff2 =  math.divide(LHS,math.multiply(alpha,math.subtract(alpha,beta)));
	var coeff3 =  math.divide(LHS,math.multiply(beta,math.subtract(beta,alpha))); 
	 
	var part1 = coeff1;
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(beta,t)));	

	 var out = (math.add(part1,part2,part3)).re;
	
	//var outputVolt = math.add(vp,y);/// input 2v in oscilloscope 

		x[t] = (tstart+T2) + t * dt;
		y[t] = (out/2);///2)* Math.sin(2 * 3.1415 * frqfng * x[t] + phsl * 3.1415 / 180);
		
	  //measured = out;
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	
	} 
	
	//for (var t= 50; t< axes.N; t++) {
		
	for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.add(math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)),T2); t++) {
	
	
	var stepVolt = parseFloat(vp*kp);
	var wn = Math.sqrt((parseFloat(1+parseFloat(kp*k)))/(parseFloat(T1*T2)));
	//alert(wn);
	var zeta = parseFloat((0.5*((T1+T2)/(parseFloat(T1*T2))))*(parseFloat(1/wn)));
	//alert(zeta);
	
	//var k_scnd = parseFloat(parseFloat((parseFloat(kp*k))/parseFloat(parseFloat(kp*k)+1))*stepVolt);
	/* var out = parseFloat(stepVolt*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	
	 
	 var s0 = math.divide(math.add(1,math.multiply(k,kp)),math.multiply(T1,T2));
	 var s1 = math.divide(math.add(T1,T2),math.multiply(T1,T2));
	 var s2 = 1;
	 var roots = math.polynomialRoot(s0,s1,s2);
	var alpha = roots[0];
	var beta = roots[1];
	
	var LHS = math.multiply(stepVolt,math.pow(wn,2));
	var coeff1 =  math.divide(LHS,math.multiply(math.subtract(0,alpha),math.subtract(0,beta))); 
	var coeff2 =  math.divide(LHS,math.multiply(alpha,math.subtract(alpha,beta)));
	var coeff3 =  math.divide(LHS,math.multiply(beta,math.subtract(beta,alpha))); 
	 
	var part1 = coeff1;
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(beta,t)));	

	 var out = (math.add(part1,part2,part3)).re;
	
	//var outputVolt = math.add(vp,y);/// input 2v in oscilloscope 

	x[t] = (tstart+T2) + t * dt ;
	 y[t] = (-out)/2;
	 
	
	//console.log(y[t]);	
	dataOPPoints.push({x:(t), y:(y[t])});
	
	}
	}	
	//var sserr = math.subtract(vp,measured);
	//document.getElementById('sserr').value = math.multiply(k2,100);
	//document.getElementById('tpl').value = math.multiply(T2,1000);
	//document.getElementById('tfl').value = math.multiply(T1,1000);
	if(document.getElementById('dischk').value==1){
	document.getElementById('distance').value = 28;			
	}
	else if(document.getElementById('dischk').value==2){
	document.getElementById('distance').value = 140;			
	}
	else if(document.getElementById('dischk').value==3){
	document.getElementById('distance').value = 279;			
	}*/
	
	///for test plot enlaged view
	/*document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Enlarged view of output signal (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
		
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,///increased zoom
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
	   
      ]	
	});

	chart.render();	
	
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy2) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
	
	
} */

//////Function for ON-OFF control testing update////////////////////////////////////
function ON_OFF_Control(){
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
	
//---------------------------------------------------------output wave for 40 degree openning,100%PB, 279 mm,set value 40 degree centigrate,input sine wave 2v-------------------------------------------------------------------------------//
	var dataOPPoints=[];
    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,tperiod,cyclehlfs,count=50; 
	var measured;
	
	//var setvalue = 40;///in degree centigrate
	//var converted_volt = (setvalue/10);///need to verify again
/////for 100% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points	
	
	//var dc_k = parseFloat(0.25);// lab test data. 	 
	/* var pvalue =  document.getElementById('P').value;
	var kp = parseFloat(100/pvalue);
	var k = parseFloat(0.52);///avg dc gain from lab test */
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	/// for PB = 100%///

if(document.getElementById('P').value==100){	
	///Angle=40
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 40){//279mm	
	var tau = 0.760;   ///lab test data,time constant or transfer lag	
	var td = 0.260;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 40){//140mm	
	var tau = 0.710;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 40){//28mm	
	var tau = 0.510;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=60
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 60){//279mm	
	var tau = 0.610;   ///lab test data,time constant or transfer lag	
	var td = 0.220;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 60){//140mm	
	var tau = 0.640;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 60){//28mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}

	
	///Angle=20
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 20){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 20){//140mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.130;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 20){//28mm	
	var tau = 0.580;   ///lab test data,time constant or transfer lag	
	var td = 0.050;    ///delay time,from lab test or transport lag
	}
	
	///Angle=50
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 50){//279mm	
	var tau = 0.440;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 50){//140mm	
	var tau = 0.630;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 50){//28mm	
	var tau = 0.720;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}
	
	///Angle=70
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 70){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 70){//140mm	
	var tau = 0.520;   ///lab test data,time constant or transfer lag	
	var td = 0.100;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 70){//28mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
	
	///Angle=80
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 80){//279mm	
	var tau = 0.710;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 80){//140mm	
	var tau = 0.640;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 80){//28mm	
	var tau = 0.400;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=90
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 90){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 90){//140mm	
	var tau = 0.500;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 90){//28mm	
	var tau = 0.740;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
	
	///Angle=30
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 30){//279mm	
	var tau = 0.680;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 30){//140mm	
	var tau = 0.460;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 30){//28mm	
	var tau = 0.230;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
}

/* if(document.getElementById('P').value==200){	
	///Angle=40
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 40){//279mm	
	var tau = 0.530;   ///lab test data,time constant or transfer lag	
	var td = 0.080;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 40){//140mm	
	var tau = 0.630;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 40){//28mm	
	var tau = 0.690;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}
	
	///Angle=60
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 60){//279mm	
	var tau = 0.720;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 60){//140mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 60){//28mm	
	var tau = 0.500;   ///lab test data,time constant or transfer lag	
	var td = 0.080;    ///delay time,from lab test or transport lag
	}
	
	///Angle=20
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 20){//279mm	
	var tau = 0.860;   ///lab test data,time constant or transfer lag	
	var td = 0.360;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 20){//140mm	
	var tau = 0.820;   ///lab test data,time constant or transfer lag	
	var td = 0.220;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 20){//28mm	
	var tau = 0.820;   ///lab test data,time constant or transfer lag	
	var td = 0.220;    ///delay time,from lab test or transport lag
	}
	
	///Angle=50
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 50){//279mm	
	var tau = 0.740;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 50){//140mm	
	var tau = 0.610;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 50){//28mm	
	var tau = 0.620;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}
	
	///Angle=70
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 70){//279mm	
	var tau = 0.700;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 70){//140mm	
	var tau = 0.480;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 70){//28mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}
	
	///Angle=80
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 80){//279mm	
	var tau = 0.500;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 80){//140mm	
	var tau = 0.540;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 80){//28mm	
	var tau = 0.480;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}
	
	///Angle=90
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 90){//279mm	
	var tau = 0.570;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 90){//140mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 90){//28mm	
	var tau = 0.380;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=30
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 30){//279mm	
	var tau = 0.860;   ///lab test data,time constant or transfer lag	
	var td = 0.300;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 30){//140mm	
	var tau = 0.660;   ///lab test data,time constant or transfer lag	
	var td = 0.220;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 30){//28mm	
	var tau = 0.670;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}
}	

if(document.getElementById('P').value==50){	
	///Angle=40 - here no tp tf could be detected, kept values as 100%
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 40){//279mm	
	var tau = 0.760;   ///lab test data,time constant or transfer lag	
	var td = 0.260;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 40){//140mm	
	var tau = 0.710;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 40){//28mm	
	var tau = 0.510;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=60
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 60){//279mm	
	var tau = 0.690;   ///lab test data,time constant or transfer lag	
	var td = 0.320;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 60){//140mm	
	var tau = 0.470;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 60){//28mm	
	var tau = 0.500;   ///lab test data,time constant or transfer lag	
	var td = 0.100;    ///delay time,from lab test or transport lag
	}
	
	///Angle=20 - here no tp tf could be detected,kept value as 100%
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 20){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 20){//140mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.130;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 20){//28mm	
	var tau = 0.580;   ///lab test data,time constant or transfer lag	
	var td = 0.050;    ///delay time,from lab test or transport lag
	}
	
	///Angle=50
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 50){//279mm	
	var tau = 0.580;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 50){//140mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 50){//28mm	
	var tau = 0.430;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}
	
	///Angle=70
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 70){//279mm	
	var tau = 0.620;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 70){//140mm	
	var tau = 0.520;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 70){//28mm	
	var tau = 0.480;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}
	
	///Angle=80
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 80){//279mm	
	var tau = 0.690;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 80){//140mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 80){//28mm	
	var tau = 0.440;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=90
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 90){//279mm	
	var tau = 0.620;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 90){//140mm	
	var tau = 0.340;   ///lab test data,time constant or transfer lag	
	var td = 0.100;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 90){//28mm	
	var tau = 0.520;   ///lab test data,time constant or transfer lag	
	var td = 0.080;    ///delay time,from lab test or transport lag
	}
	
	///Angle=30 - here no tp tf could be detected,kept value as 100%
	///Angle=30
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 30){//279mm	
	var tau = 0.680;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 30){//140mm	
	var tau = 0.460;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 30){//28mm	
	var tau = 0.230;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
} */	
	//for (var t = 0; t < math.add(50,td); t++) {
		
		for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.add(math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)),td); t++) {
		
		var stepVolt = math.add(vp,math.random(-0.5,0.5));//math.multiply(vp,kp);		
		var delay = math.subtract(t,td);	
		var epow = math.divide(math.subtract(t,td),tau);	 
		var out = math.multiply(stepVolt,math.subtract(1,math.pow(math.e,-epow)));	 
	

		x[t] = (tstart) + t * dt;
		y[t] = (out)/2;
	  
	  measured = out;
	  if(out<vp){
			//G[t] = vp;
			document.getElementById('pointer2').style.left = math.subtract(75.4,out) + '%';
		}
		if(out>vp){
			//G[t] = 0;
			document.getElementById('pointer2').style.left = math.add(75.4,out) + '%';
		}
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	
	} 
	
	//for (var t = 50; t < (axes.N); t++) {
		for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.add(math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)),td); t++) {
		
		var stepVolt = math.add(vp,math.random(-0.5,0.5));//math.multiply(vp,kp);		
		var delay = math.subtract(t,td);	
		var epow = math.divide(math.subtract(t,td),tau);	 
		var out = math.multiply(stepVolt,math.subtract(1,math.pow(math.e,-epow)));	
		
		x[t] = (tstart) + t * dt;
		y[t] = (-out)/2;
	  
	  //measured = outputVolt_change;
	  document.getElementById('pointer2').style.left = math.subtract(75.4,out) + '%';
	dataOPPoints.push({x:(t), y:(y[t])});
	
	} 
	} 
	if(document.getElementById('controllerchk').value ==3){
	var sserr = math.multiply(math.divide(math.abs(math.subtract(vp,measured)),vp),100);
	document.getElementById('sserr').value = sserr;
	document.getElementById('tpl').value = math.multiply(td,1000);
	document.getElementById('tfl').value = math.multiply(tau,1000);
	}
	if(document.getElementById('dischk').value==1){
	document.getElementById('distance').value = 28;			
	}
	else if(document.getElementById('dischk').value==2){
	document.getElementById('distance').value = 140;			
	}
	else if(document.getElementById('dischk').value==3){
	document.getElementById('distance').value = 279;			
	}
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Enlarged view of output signal (V vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time (sec)"
		
      },
    axisY: [
	      {/////output Y axis
            title: "Amplitue (V)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy2) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
	
 }
 
 /////On-OFF sensor output///////
 function ON_OFF_Sensor(){
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
	posy1 = document.getElementById("positiony1").value;
    posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
	
//---------------------------------------------------------output wave for 40 degree openning,100%PB, 279 mm,set value 40 degree centigrate,input sine wave 2v-------------------------------------------------------------------------------//
	var dataOPPoints=[],dataIPPoints=[];
    var x = new Array(), y = new Array(), G = [];  // x,y plotting variables
    var dt, tstart, tstop,tperiod,cyclehlfs,count=50; 
	var measured;
	
	//var setvalue = 40;///in degree centigrate
	//var converted_volt = (setvalue/10);///need to verify again
/////for 100% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points	
	
	//var dc_k = parseFloat(0.25);// lab test data. 	 
	/* var pvalue =  document.getElementById('P').value;
	var kp = parseFloat(100/pvalue);
	var k = parseFloat(0.52);///avg dc gain from lab test */
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	/// for PB = 100%///

if(document.getElementById('P').value==100){	
	///Angle=40
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 40){//279mm	
	var tau = 0.760;   ///lab test data,time constant or transfer lag	
	var td = 0.260;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 40){//140mm	
	var tau = 0.710;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 40){//28mm	
	var tau = 0.510;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=60
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 60){//279mm	
	var tau = 0.610;   ///lab test data,time constant or transfer lag	
	var td = 0.220;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 60){//140mm	
	var tau = 0.640;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 60){//28mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}

	
	///Angle=20
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 20){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 20){//140mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.130;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 20){//28mm	
	var tau = 0.580;   ///lab test data,time constant or transfer lag	
	var td = 0.050;    ///delay time,from lab test or transport lag
	}
	
	///Angle=50
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 50){//279mm	
	var tau = 0.440;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 50){//140mm	
	var tau = 0.630;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 50){//28mm	
	var tau = 0.720;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}
	
	///Angle=70
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 70){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 70){//140mm	
	var tau = 0.520;   ///lab test data,time constant or transfer lag	
	var td = 0.100;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 70){//28mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
	
	///Angle=80
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 80){//279mm	
	var tau = 0.710;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 80){//140mm	
	var tau = 0.640;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 80){//28mm	
	var tau = 0.400;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=90
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 90){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 90){//140mm	
	var tau = 0.500;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 90){//28mm	
	var tau = 0.740;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
	
	///Angle=30
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 30){//279mm	
	var tau = 0.680;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 30){//140mm	
	var tau = 0.460;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 30){//28mm	
	var tau = 0.230;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
}


	//for (var t = 0; t < math.add(50,td); t++) {
		
		for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.add(math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)),td); t++) {
		
		var stepVolt = math.add(vp,math.random(-0.5,0.5));//math.multiply(vp,kp);		
		var delay = math.subtract(t,td);	
		var epow = math.divide(math.subtract(t,td),tau);	 
		var out = math.multiply(stepVolt,math.subtract(1,math.pow(math.e,-epow)));	 
	

		x[t] = (tstart) + t * dt;
		y[t] = (out)/2;
		
		if(out<vp){
			G[t] = math.number(document.getElementById('amp-knob-fng').value);
			document.getElementById('pointer2').style.left = math.subtract(75.4,out) + '%';
		}
		if(out>vp){
			G[t] = 0;
			document.getElementById('pointer2').style.left = math.add(75.4,out) + '%';
		}
	  
	  measured = out;
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	dataIPPoints.push({x:(t), y:(G[t])});
	} 
	
	//for (var t = 50; t < (axes.N); t++) {
		for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.add(math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)),td); t++) {
		
		var stepVolt = math.add(vp,math.random(-0.5,0.5));//math.multiply(vp,kp);		
		var delay = math.subtract(t,td);	
		var epow = math.divide(math.subtract(t,td),tau);	 
		var out = math.multiply(stepVolt,math.subtract(1,math.pow(math.e,-epow)));	
		
		x[t] = (tstart) + t * dt;
		y[t] = (-out)/2;
	  
	  //measured = outputVolt_change;
	  
	  /* if(-out<-vp){
			G[t] = -vp;
		}
		if(-out>-vp){
			G[t] = 0;
		} */
		G[t] = math.number(document.getElementById('amp-knob-fng').value);
	 document.getElementById('pointer2').style.left = math.subtract(75.4,out) + '%';
	 
	dataOPPoints.push({x:(t), y:(y[t])});
	dataIPPoints.push({x:(t), y:(G[t])});
	}

	} 
	
	/* var sserr = math.multiply(math.divide(math.abs(math.subtract(vp,measured)),vp),100);
	document.getElementById('sserr').value = sserr;
	document.getElementById('tpl').value = math.multiply(td,1000);
	document.getElementById('tfl').value = math.multiply(tau,1000); */
	if(document.getElementById('dischk').value==1){
	document.getElementById('distance').value = 28;			
	}
	else if(document.getElementById('dischk').value==2){
	document.getElementById('distance').value = 140;			
	}
	else if(document.getElementById('dischk').value==3){
	document.getElementById('distance').value = 279;			
	}
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Enlarged view of output signal and controller output (V vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time (sec)"
		
      },
   axisY: [
	      {/////output Y axis
            title: "Amplitude (V)",
			//interval: 0.2,///increased zoom
			//maximum:5,
        },
		{/////input y axis invisible
			gridThickness: 0,
    tickLength: 0,
    lineThickness: 0,
    labelFormatter: function(){
      return " ";}
	  
		}
		
		],
	data: [
      {
		showInLegend: true, 
        legendText: "Output response",
        type: "spline",
		color:"black",
        dataPoints:dataOPPoints
	
       },
	   {
		showInLegend: true, 
        legendText: "Controller output",
        type: "line",
		color:"blue",
        dataPoints:dataIPPoints
	
       },
       
      ]	
	});

	chart.render();	
	
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "blue";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - G[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
	
 }
 
 /////overlap condition/////
 function ON_OFF_overlap(){
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
	posy1 = document.getElementById("positiony1").value;
    posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
	
//---------------------------------------------------------output wave for 40 degree openning,100%PB, 279 mm,set value 40 degree centigrate,input sine wave 2v-------------------------------------------------------------------------------//
	var dataOPPoints=[],dataIPPoints=[];
    var x = new Array(), y = new Array(), G = [];  // x,y plotting variables
    var dt, tstart, tstop,tperiod,cyclehlfs,count=50; 
	var measured;
	
	//var setvalue = 40;///in degree centigrate
	//var converted_volt = (setvalue/10);///need to verify again
/////for 100% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points	
	
	//var dc_k = parseFloat(0.25);// lab test data. 	 
	/* var pvalue =  document.getElementById('P').value;
	var kp = parseFloat(100/pvalue);
	var k = parseFloat(0.52);///avg dc gain from lab test */
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	/// for PB = 100%///

if(document.getElementById('P').value==100){	
	///Angle=40
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 40){//279mm	
	var tau = 0.760;   ///lab test data,time constant or transfer lag	
	var td = 0.260;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 40){//140mm	
	var tau = 0.710;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 40){//28mm	
	var tau = 0.510;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=60
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 60){//279mm	
	var tau = 0.610;   ///lab test data,time constant or transfer lag	
	var td = 0.220;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 60){//140mm	
	var tau = 0.640;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 60){//28mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}

	
	///Angle=20
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 20){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 20){//140mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.130;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 20){//28mm	
	var tau = 0.580;   ///lab test data,time constant or transfer lag	
	var td = 0.050;    ///delay time,from lab test or transport lag
	}
	
	///Angle=50
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 50){//279mm	
	var tau = 0.440;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 50){//140mm	
	var tau = 0.630;   ///lab test data,time constant or transfer lag	
	var td = 0.180;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 50){//28mm	
	var tau = 0.720;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}
	
	///Angle=70
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 70){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 70){//140mm	
	var tau = 0.520;   ///lab test data,time constant or transfer lag	
	var td = 0.100;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 70){//28mm	
	var tau = 0.560;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
	
	///Angle=80
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 80){//279mm	
	var tau = 0.710;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 80){//140mm	
	var tau = 0.640;   ///lab test data,time constant or transfer lag	
	var td = 0.140;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 80){//28mm	
	var tau = 0.400;   ///lab test data,time constant or transfer lag	
	var td = 0.060;    ///delay time,from lab test or transport lag
	}
	
	///Angle=90
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 90){//279mm	
	var tau = 0.600;   ///lab test data,time constant or transfer lag	
	var td = 0.200;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 90){//140mm	
	var tau = 0.500;   ///lab test data,time constant or transfer lag	
	var td = 0.160;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 90){//28mm	
	var tau = 0.740;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
	
	///Angle=30
	if(document.getElementById('dischk').value == 3 && document.getElementById('anglvalue').value == 30){//279mm	
	var tau = 0.680;   ///lab test data,time constant or transfer lag	
	var td = 0.240;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 2 && document.getElementById('anglvalue').value == 30){//140mm	
	var tau = 0.460;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}

	else if(document.getElementById('dischk').value == 1 && document.getElementById('anglvalue').value == 30){//28mm	
	var tau = 0.230;   ///lab test data,time constant or transfer lag	
	var td = 0.120;    ///delay time,from lab test or transport lag
	}
}

//var overlap;
	if(document.getElementById('overlap').value==1){
		var overlap1 = 0.6;//math.multiply(vp,0.1);
		var overlap2 = 1.9;
	}
	if(document.getElementById('overlap').value==2){
		var overlap1 = 0.6;//math.multiply(vp,0.1);
		var overlap2 = 2;
	}
	if(document.getElementById('overlap').value==3){
		var overlap1 = 0.6;//math.multiply(vp,0.1);
		var overlap2 = 2.2;
	}
	if(document.getElementById('overlap').value==4){
		var overlap1 = 0.6;//math.multiply(vp,0.1);
		var overlap2 = 1.0;
	}

	//for (var t = 0; t < math.add(50,td); t++) {
		
		for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.add(math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)),td); t++) {
		
		var stepVolt = math.add(vp,math.random(-0.5,0.5));//math.multiply(vp,kp);		
		var delay = math.subtract(t,td);	
		var epow = math.divide(math.subtract(t,td),tau);	 
		var out = math.multiply(stepVolt,math.subtract(1,math.pow(math.e,-epow)));

		var conout = math.divide(math.floor(math.multiply(out,10)),10);
	console.log(conout);

		x[t] = (tstart) + t * dt;
		y[t] = (out)/2;
		
		if( conout>=overlap1 && conout<overlap2 ){
			G[t] = math.number(document.getElementById('amp-knob-fng').value);
			document.getElementById('pointer2').style.left = math.subtract(75.4,out) + '%';
		}
		if(conout >overlap2){
			G[t] = 0;
			document.getElementById('pointer2').style.left = math.add(75.4,out) + '%';
		}
	  
	  measured = out;
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	dataIPPoints.push({x:(t), y:(G[t])});
	} 
	
	//for (var t = 50; t < (axes.N); t++) {
		for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.add(math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)),td); t++) {
		
		var stepVolt = math.add(vp,math.random(-0.5,0.5));//math.multiply(vp,kp);		
		var delay = math.subtract(t,td);	
		var epow = math.divide(math.subtract(t,td),tau);	 
		var out = math.multiply(stepVolt,math.subtract(1,math.pow(math.e,-epow)));	
		
		x[t] = (tstart) + t * dt;
		y[t] = (-out)/2;
	  
	  //measured = outputVolt_change;
	  
	  /* if(-out<-vp){
			G[t] = -vp;
		}
		if(-out>-vp){
			G[t] = 0;
		} */
		G[t] = math.number(document.getElementById('amp-knob-fng').value);
	 document.getElementById('pointer2').style.left = math.subtract(75.4,out) + '%';
	 
	dataOPPoints.push({x:(t), y:(y[t])});
	dataIPPoints.push({x:(t), y:(G[t])});
	}

	} 
	
	/* var sserr = math.multiply(math.divide(math.abs(math.subtract(vp,measured)),vp),100);
	document.getElementById('sserr').value = sserr;
	document.getElementById('tpl').value = math.multiply(td,1000);
	document.getElementById('tfl').value = math.multiply(tau,1000); */
	if(document.getElementById('dischk').value==1){
	document.getElementById('distance').value = 28;			
	}
	else if(document.getElementById('dischk').value==2){
	document.getElementById('distance').value = 140;			
	}
	else if(document.getElementById('dischk').value==3){
	document.getElementById('distance').value = 279;			
	}
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Enlarged view of output signal and controller output (V vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time (sec)"
		
      },
   axisY: [
	      {/////output Y axis
            title: "Amplitude (V)",
			//interval: 0.2,///increased zoom
			//maximum:5,
        },
		{/////input y axis invisible
			gridThickness: 0,
    tickLength: 0,
    lineThickness: 0,
    labelFormatter: function(){
      return " ";}
	  
		}
		
		],
	data: [
      {
		showInLegend: true, 
        legendText: "Output response",
        type: "spline",
		color:"black",
        dataPoints:dataOPPoints
	
       },
	   {
		showInLegend: true, 
        legendText: "Controller output",
        type: "line",
		color:"blue",
        dataPoints:dataIPPoints
	
       },
       
      ]	
	});

	chart.render();	
	
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "blue";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - G[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
	
 }
	

 
 
 function point_move(){
	 
	var point = document.getElementById('pointer').style.left;	
	var setvalue = document.getElementById('setvalue').value;
	var temp = parseFloat((40/5.5)*setvalue);///lab test data knob value=5.5 approx == 40 degree C approx 
	var virtualposition = math.add(70.2,math.multiply(temp,0.13));
	var olposi = math.add(virtualposition,5);
	document.getElementById('pointer').style.left = virtualposition +"%"; 
	
	
	setTimeout(function() {
			
			if(document.getElementById("controllerchk").value==1 && setvalue!=0){
        document.getElementById('pointer2').style.left = olposi +"%";
			}
         	
		else if(document.getElementById("controllerchk").value==2 && setvalue!=0){
        document.getElementById('pointer2').style.left = virtualposition +"%";
			}
		else if(document.getElementById("controllerchk").value==3 && setvalue!=0){
        document.getElementById('pointer2').style.left = virtualposition +"%";
			}
			
		else if((document.getElementById("controllerchk").value==4 || document.getElementById("controllerchk").value==3 || document.getElementById("controllerchk").value==2 || document.getElementById("controllerchk").value==1)  && setvalue==0){
        document.getElementById('pointer2').style.left = 70.2 +"%";
			}	
			
           }, 20000);

 } 
 
 function planton(){
	 
	 if(document.getElementById('pon').src.match("./images/off.png")){
	
	document.getElementById('pon').src = "./images/on.png";	
 }

else if(document.getElementById('pon').src.match("./images/on.png")){
	
	document.getElementById('pon').src = "./images/off.png"; 
	 
 }

 }

function motoron(){
	 
	 if((document.getElementById('mon').src.match("./images/off.png"))){
	
	document.getElementById('mon').src = "./images/on.png"; 
	 
 }
 
 else if((document.getElementById('mon').src.match("./images/on.png"))){
	
	document.getElementById('mon').src = "./images/off.png"; 
	 
 }
 }

function rron(){
	 
	 if(document.getElementById('rr').src.match("./images/off.png")){
	
	document.getElementById('rr').src = "./images/on.png";  
	
 }

else if(document.getElementById('rr').src.match("./images/on.png")){
	
	document.getElementById('rr').src = "./images/off.png";  
	 
 }

 }

 
 function box_on(){
	 
	 if(document.getElementById('sidesw').src.match("./images/side_off.png")){
	
	document.getElementById('sidesw').src = "./images/side_on.png";
	document.getElementById('sideled').src = "./images/ledon.png";	
	document.getElementById("onff").disabled = false;
	
 }

else if(document.getElementById('sidesw').src.match("./images/side_on.png")){
	
	document.getElementById('sidesw').src = "./images/side_off.png";
	document.getElementById('sideled').src = "./images/ledoff.png";
	document.getElementById("onff").disabled = true; 
 }
 }
 

 function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
   
}

function drop(ev) {
	
	
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");  
  ev.target.appendChild(document.getElementById(data));
  
  if(data == "sensor1" && ev.target.id == "div2"){
	  document.getElementById('bd12').style.left = "-80%";
	  document.getElementById('dischk').value = 2 ; 
  }
  
  else if(data == "sensor1" && ev.target.id == "div3"){
	  
	  document.getElementById('bd12').style.left = "-210%";
	document.getElementById('dischk').value = 1 ;
  }  
  
  else if(data == "sensor1" && ev.target.id == "div1"){
	  
	  document.getElementById('bd12').style.left = "49.3%";
	document.getElementById('dischk').value = 3 ;
  } 
  
  /*else if(data == "sensor2" && ev.target.id == "div1"){
	  
	  document.getElementById('bd12').style.left = "49.3%";
	  document.getElementById('dischk').value = 3 ;
  }
  
  else if(data == "sensor2" && ev.target.id == "div3"){
	  
	  document.getElementById('bd12').style.left = "-210%";	
	document.getElementById('dischk').value = 1 ;	  
  }  
  else if(data == "sensor3" && ev.target.id == "div1"){
	  
	  document.getElementById('bd12').style.left = "49.3%";
	  document.getElementById('dischk').value = 3 ;
  }
  
  else if(data == "sensor3" && ev.target.id == "div2"){
	  
	document.getElementById('bd12').style.left = "-80%"; 
document.getElementById('dischk').value = 2 ;	
  } */ 
  
}


var anglec = 0;
function rotateChanda(){
	document.getElementById('minus').style['pointer-events']="auto";
	anglec+=11;
	var deg = anglec-(160);
	
	var throttle= document.getElementById('opener');
	var rect = document.getElementById('rect');
	throttle.style.transform="rotate("+deg+"deg)";
	document.getElementById('anglvalue').stepUp(1);	
	//rect.style.transform="rotate("+deg+"deg)";
	if(document.getElementById('anglvalue').value == 90){
		document.getElementById('plus').style['pointer-events']="none";
	}
}
function rotateChandarev(){
	document.getElementById('plus').style['pointer-events']="auto";
	anglec-=11;
	var deg = math.subtract(anglec,160);
	
	var throttle= document.getElementById('opener');
	var rect = document.getElementById('rect');
	throttle.style.transform="rotate("+deg+"deg)";
document.getElementById('anglvalue').stepDown(1);	
	//rect.style.transform="rotate("+deg+"deg)";
	if(document.getElementById('anglvalue').value == 20){
		document.getElementById('minus').style['pointer-events']="none";
	}
}


///////////////////////////////////////////////////////////////////////////////Table Creation//////////////////////////////////////////////////////////////////////////////////////
 
 var tabrowindex = 0;
var arr = [];
var table;

//------------------------------------------------- Table Creation -----------------------------------------------//
function createTable() {


    arr[0] = tabrowindex+1 ;
    arr[1] = document.getElementById("anglvalue").value;
    arr[2] = document.getElementById("distance").value;
	arr[3] = document.getElementById("tpl").value;
	arr[4] = document.getElementById("tfl").value;
   
	
	table = document.getElementById("myTable");
        
    var row = table.insertRow(++tabrowindex);
   
    if (table.rows.length <= 4) {
        
         // Row increment
        for (var q = 0; q < 5; q++) {

            var cell = row.insertCell(q);
            cell.innerHTML = arr[q];

    }

    }

}    


function Refresh(){
	
	var Dtable= document.getElementById('myTable');
	var Trow = Dtable.rows.length;
	for (var i= Trow-1;i>0;i--){

	Dtable.deleteRow(i);
	}
	//Dtable.style.display="none";
	tabrowindex=0;
	dataOPPoints=[];
	document.getElementById('plotbucket').style.display="none"; 
	document.getElementById('sserr').value =0;	 
	document.getElementById('distance').value =0;
	document.getElementById('tpl').value =0;
	document.getElementById('tfl').value =0;
 }













 
 
 