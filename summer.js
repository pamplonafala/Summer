/**
 *  Summer is a mathematics game that you win by getting 
 *  the right numbers to sum using both lines and columns rules
**/






/**|CONFIGURATION|**/
var val = {
    min: 1,  //minimum value for each number
    max: 9,  //maximum value for each number
    lv: 5,   //number of lines/columns
    skin: 'color',
};














/**|MATRIX|**/
var Matrix = function(config) {
    this.sizeElem = config.elementSize;
    this.sizeMax = config.elements*this.sizeElem;

    this.elements = config.elements;
    this.elementSize = config.elementSize;
};
Matrix.prototype.align = function(align) {
    switch (align) {
        case CENTER:
            this.x = -this.sizeMax/2;
            this.y = -this.sizeMax/2;
        break;
        case CORNER:
            this.x = 1;
            this.y = 0;
        break;
        default:
            this.x = width/2 - this.sizeMax/2;
            this.y = height/2 - this.sizeMax/2;
        break;
    }
};
Matrix.prototype.draw = function(grid) {
    this.align();
};
var matrix = new Matrix({
    elements: val.lv,
    elementSize: 50,
});

/**|SKINS|**/
var frames = 0;
var colors = {
    backgroundColor: color(250),
    sumText: color(100),
    sumFill: color(170),
    sumStroke: color(80),
    sumSelected: color(100),
    elementText: color(100),
    elementFill: color(230),
    elementStroke: color(100),
    elementSelected: color(100),
};
var skin = {
    colors: function(){colors = {
        backgroundColor: color(250),
        sumText: color(100),
        sumFill: color(170),
        sumStroke: color(80),
        sumSelected: color(100),
        elementText: color(100),
        elementFill: color(230),
        elementStroke: color(100),
        elementSelected: color(100),
    };}(),
    elementS: function(x, y) {},
    elementTextS: function(txt, x, y) {},
    elementSelectS: function(x, y) {},
    elementHideS: function(x, y) {},
    elementAnswerS: function(x, y) {},
    sumS: function(x, y) {},
    sumFinalTextS: function(txt, x, y) {},
    sumCurrentTextS: function(txt, x, y) {},
    sumSelectS: function(x, y) {},
    specialS: function() {},
    winS: function() {},
    animateS: function() {},
};

var skinDefault = {
    colors: function(){colors = {
        backgroundColor: color(250),
        sumText: color(100),
        sumFill: color(170),
        sumStroke: color(80),
        sumSelected: color(100),
        elementText: color(100),
        elementFill: color(230),
        elementStroke: color(100),
        elementSelected: color(100),
    };}(),
    elementS: function(x, y) {
        fill(colors.elementFill);
        stroke(colors.elementStroke);
        ellipse(x, y, matrix.elementSize/5*4, matrix.elementSize/5*4);
    },
    elementTextS: function(txt, x, y) {
        fill(colors.elementText);
        noStroke();
        text(txt, x, y);
    },
    elementSelectS: function(x, y) {
        noFill();
        stroke(colors.elementStroke);
        ellipse(x, y, matrix.elementSize/3*2, matrix.elementSize/3*2);
    },
    elementHideS: function(x, y) {
        noStroke();
        fill(colors.elementStroke);
        ellipse(x, y, matrix.elementSize/4*3, matrix.elementSize/4*3);
        fill(colors.elementFill);
        text(0, x, y);
    },
    elementAnswerS: function(x, y) {
        noFill();
        stroke(0, 0, 0, 50);
        ellipse(x, y, matrix.elementSize/2, matrix.elementSize/2);
    },
    sumS: function(x, y) {
        fill(colors.sumFill);
        stroke(colors.sumStroke);
        ellipse(x, y, matrix.elementSize/10*9, matrix.elementSize/10*9);
    },
    sumFinalTextS: function(txt, x, y) {
        fill(colors.sumText);
        noStroke();
        text(txt, x, y);
    },
    sumCurrentTextS: function(txt, x, y) {
        fill(colors.elementFill);
        stroke(colors.sumStroke);
        ellipse(x, y, matrix.elementSize/2, matrix.elementSize/2);
        fill(colors.sumText);
        noStroke();
        text(txt, x, y);
    },
    sumSelectS: function(x, y) {
        noFill();
        stroke(colors.sumStroke);
        ellipse(x, y, matrix.elementSize/4*3, matrix.elementSize/4*3);
    },
    specialS: function() {
        fill(colors.elementFill);
        stroke(colors.sumStroke);
        rect(matrix.x-matrix.elementSize-10, 
             matrix.y-matrix.elementSize-10, 
             (matrix.elements+2)*matrix.elementSize+20, 
             (matrix.elements+2)*matrix.elementSize+20,
             60
        );
    },
    winS: function() {
        colors.backgroundColor = color(150, 250, 150);
    },
    animateS: function() {},
};
var skinMinimal = {
    colors: function(){colors = {
        backgroundColor: color(250),
        sumText: color(100),
        sumFill: color(170),
        sumStroke: color(80),
        sumSelected: color(100),
        elementText: color(100),
        elementFill: color(230),
        elementStroke: color(100),
        elementSelected: color(100),
    };}(),
    elementS: function(x, y) {},
    elementTextS: function(txt, x, y) {
        fill(colors.elementText);
        noStroke();
        text(txt, x, y);
    },
    elementSelectS: function(x, y) {
        noFill();
        stroke(0, 0, 0, 50);
        ellipse(x, y, matrix.elementSize/4*3, matrix.elementSize/4*3);
    },
    elementHideS: function(x, y) {
        noFill();
        stroke(0, 0, 0, 100);
        var d = matrix.elementSize/2;
        line(x-d + d/2, y-d + d/2, x + d/2, y + d/2);
        line(x + d/2, y-d + d/2, x-d + d/2, y + d/2);
    },
    elementAnswerS: function(x, y) {
        noFill();
        stroke(0, 0, 0, 50);
        ellipse(x, y, matrix.elementSize/2, matrix.elementSize/2);
    },
    sumS: function(x, y) {
        noFill();
        noStroke();
        ellipse(x, y, matrix.elementSize/10*9, matrix.elementSize/10*9);
    },
    sumFinalTextS: function(txt, x, y) {
        fill(colors.sumText);
        noStroke();
        text(txt, x, y);
    },
    sumCurrentTextS: function(txt, x, y) {
        fill(colors.sumText);
        noStroke();
        text(txt, x, y);
    },
    sumSelectS: function(x, y) {
        noFill();
        stroke(0, 0, 0, 100);
        ellipse(x, y, matrix.elementSize/4*3, matrix.elementSize/4*3);
    },
    specialS: function() {
        fill(0, 0, 0, 5);
        noStroke();
        for (var i = 0; i < matrix.elements; i++) {
            rect(matrix.x-matrix.elementSize, matrix.y + i*matrix.elementSize, 
            (matrix.elements+2)*matrix.elementSize, matrix.elementSize, 20);
            
            rect(matrix.x+i*matrix.elementSize, matrix.y - matrix.elementSize, 
            matrix.elementSize, (matrix.elements+2)*matrix.elementSize, 20);
        }
        rect(matrix.x-matrix.elementSize, 
             matrix.y-matrix.elementSize, 
             (matrix.elements+2)*matrix.elementSize, 
             (matrix.elements+2)*matrix.elementSize,
             40
        );
        stroke(0, 0, 0, 15);
        rect(matrix.x-matrix.elementSize-2, 
             matrix.y-matrix.elementSize-2, 
             (matrix.elements+2)*matrix.elementSize+2*2, 
             (matrix.elements+2)*matrix.elementSize+2*2,
             40
        );
    },
    winS: function() {
        colors.backgroundColor = color(150, 250, 150);
    },
    animateS: function() {},
};
var skinColorful = {
    bool: true,
    randRGB: function(brightness, opacity) {
            var r, g, b;
            var brg = brightness;
            var int = 255-brg;
            do {
                r = floor(random(0, 2));
                g = floor(random(0, 2));
                b = floor(random(0, 2));
            } while((r !== 0 && g !== 0 && b !== 0) || 
                    (r !== 1 && g !== 1 && b !== 1) );
            
            return color(brg+r*int, brg+g*int, brg+b*int, opacity);
        },
    
    colors: function(){colors = {
        backgroundColor: color(250),
        sumText: color(0),
        sumFill: color(50),
        sumStroke: color(30),
        sumSelected: color(100),
        elementText: color(0, 0, 0, 200),
        elementFill: color(230),
        elementStroke: color(100),
        elementSelected: color(100),
    };}(),
    elementS: function(x, y) {
        fill(colors.sumFill);
        stroke(colors.sumStroke);
        strokeWeight(2);
        rect(x-(matrix.elementSize-10)/2, 
             y-(matrix.elementSize-10)/2, 
             matrix.elementSize-10, 
             matrix.elementSize-10, 
             10
        );
        strokeWeight(1);
        
        fill(colors.elementFill);
        stroke(colors.elementStroke);
        rect(x-(matrix.elementSize-8)/2, 
             y-(matrix.elementSize-8)/2, 
             matrix.elementSize-8, 
             matrix.elementSize-8, 
             10
        );
    },
    elementTextS: function(txt, x, y) {
        textSize(20);
        fill(colors.elementText);
        noStroke();
        text(txt, x, y);
        textSize(12);
    },
    elementSelectS: function(x, y) {
        noFill();
        stroke(colors.elementSelected);
        strokeWeight(4);
        rect(x-(matrix.elementSize-9)/2, y-(matrix.elementSize-9)/2, 
             matrix.elementSize-9, matrix.elementSize-9, 10);
        strokeWeight(1);
    },
    elementHideS: function(x, y) {
        fill(0, 0, 0, 70);
        noStroke();
        rect(x-(matrix.elementSize-8)/2, 
             y-(matrix.elementSize-8)/2, 
             matrix.elementSize-8, 
             matrix.elementSize-8, 
             10
        );
    },
    elementAnswerS: function(x, y) {
        noFill();
        stroke(0, 0, 0, 50);
        ellipse(x, y, matrix.elementSize/2, matrix.elementSize/2);
    },
    sumS: function(x, y) {
        fill(colors.sumFill);
        stroke(colors.sumStroke);
        strokeWeight(3);
        ellipse(x, y, matrix.elementSize/10*9, matrix.elementSize/10*9);
        strokeWeight(1);
    },
    sumFinalTextS: function(txt, x, y) {
        textSize(20);
        fill(colors.sumText);
        noStroke();
        text(txt, x, y);
        textSize(12);
    },
    sumCurrentTextS: function(txt, x, y) {
        textSize(20);
        fill(colors.sumText);
        noStroke();
        text(txt, x, y);
        textSize(12);
        
        fill(255, 255, 255, 100);
        ellipse(x, y, matrix.elementSize-3, matrix.elementSize-3);
    },
    sumSelectS: function(x, y) {
        noFill();
        stroke(colors.elementSelected);
        strokeWeight(5);
        ellipse(x, y, matrix.elementSize-5, matrix.elementSize-5);
        strokeWeight(1);
    },
    specialS: function() {
        noFill();
        strokeWeight(5);
        stroke(20, 10, 0);
        var d = 10;
        rect(matrix.x-matrix.elementSize-d, 
             matrix.y-matrix.elementSize-d, 
             (matrix.elements+2)*matrix.elementSize+d*2, 
             (matrix.elements+2)*matrix.elementSize+d*2, 
             20
        );
        strokeWeight(1);
        
        fill(255);
        noStroke();
        var d = 7;
        rect(matrix.x-matrix.elementSize-d, 
             matrix.y-matrix.elementSize-d, 
             (matrix.elements+2)*matrix.elementSize+d*2, 
             (matrix.elements+2)*matrix.elementSize+d*2, 
             15
        );
        
        fill(20, 10, 0);
        noStroke();
        var d = 4;
        rect(matrix.x-matrix.elementSize-d, 
             matrix.y-matrix.elementSize-d, 
             (matrix.elements+2)*matrix.elementSize+d*2, 
             (matrix.elements+2)*matrix.elementSize+d*2, 
             15
        );
    },
    winS: function() {
        colors.backgroundColor = color(150, 250, 150);
        if (frames%2 === 0) {
            colors.elementFill = this.randRGB(200, 150);
            colors.elementStroke = color(red(colors.elementFill),
                                    green(colors.elementFill),
                                    blue(colors.elementFill),250);
            colors.elementSelected = this.randRGB(200, 250);
            colors.sumFill = this.randRGB(150, 100);
            colors.sumStroke = color(red(colors.sumFill),
                                    green(colors.sumFill),
                                    blue(colors.sumFill),250);
            if (this.bool) {
                colors.elementSelected = color(40, 200, 70, 150);
                colors.sumFill = color(50+(10*(floor(random(0, 2)))), 
                                       50+(10*(floor(random(11, 21)))), 
                                       50+(10*(floor(random(5, 11)))), 200);
                //colors.sumFill = color(255, 255, 255, 200);
            }
        }
        frames++;
    },
    animateS: function() {
        if (frames%80 === 0) {
            colors.elementFill = this.randRGB(200, 150);
            colors.elementStroke = color(red(colors.elementFill),
                                    green(colors.elementFill),
                                    blue(colors.elementFill),250);
            colors.elementSelected = this.randRGB(100, 250);
            colors.sumFill = this.randRGB(150, 100);
            colors.sumStroke = color(red(colors.sumFill),
                                    green(colors.sumFill),
                                    blue(colors.sumFill),250);
        }
        frames++;
    },
};
var skins = function(s) {
    switch(s) {
        case 'min':
        case 'minimal':
        case 'minimalist':
            skin = skinMinimal;
        break;
        
        case 'color':
        case 'colorful':
        case 'colorfull':
            skin = skinColorful;
        break;
        
        default: skin = skinDefault;
    }
    if (!val.win) {
        skin.animateS();
    }
};

/**|VALUES|**/
var equal = function(array) {
    var filt = array.filter(function(elem, pos, arr) {
        return arr.indexOf(elem) === pos;
    });
    return filt.length === 1 || filt.length === array.length; 
};
var createEnabled = function() {
    var v = [];
    for (var i = 0; i < matrix.elements; i++) {
        v.push([]);
        for (var j = 0; j < matrix.elements; j++) {
            v[i][j] = true;
        }
    }
    val.enabled = v;
}(); //fills val.enabled[]
var createAnswer = function() {
    var v = [];
    var x = [], y = [];
    
    //create must-be-disabled elements
    for (var n = 0; n < matrix.elements; n++) {
        x.push(floor(random(0, matrix.elements/10)*10));
        y.push(floor(random(0, matrix.elements/10)*10));
    }
    
    //creates answer pattern
    for (var i = 0; i < matrix.elements+1; i++) {
        v.push([]);
        for (var j = 0; j < matrix.elements; j++) {
            v[i].push(true);
            for (var n = 0; n < x.length; n++) {
                if (i === x[n] && j === y[n]) {
                    v[i][j] = false;
                }
            }
        }
    }
    
    //increases chance to disable column items 
    for (var i = 0; i < matrix.elements; i++) {
        if (equal(v[i])) {
            if (v[i][0] !== false) {
                for (var n = 0; n < 3; n++) {
                    v[i][floor(random(0, matrix.elements/10)*10)] = false;
                }
            } else {
                for (var n = 0; n < 2; n++) {
                    v[i][floor(random(0, matrix.elements/10)*10)] = true;
                }
            }
        }
    }
    
    //increase the chance to disable fully-enabled lines 
    for (var i = 0; i < matrix.elements; i++) {
        var check = [];
        for (var j = 0; j < matrix.elements; j++) {
            check.push(v[j][i]);
            if (equal(check)) {
                if (v[j][0] !== false) {
                    for (var n = 0; n < 2; n++) {
                        v[j][floor(random(0, matrix.elements/10)*10)] = false;
                    }
                } else {
                    v[j][floor(random(0, matrix.elements/10)*10)] = true;
                }
            }
        }
    }
    
    val.answer = v;
}(); //fills val.answer[]
var createValues = function(min, max) {
    min = min/10;
    max = max/10;
    var temp;
    var v = [];
    var fSH = [], fSV = [];
    
    //distribute random numbers trough matrix
    for (var i = 0; i < matrix.elements; i++) {
        v.push([]);
        for (var j = 0; j < matrix.elements; j++) {
            for (var t = 0; t < floor(random()*100); t++) {
                temp = floor(random(min*10, max*10));
            }
            v[i].push(temp);
        }
    }
    
    //detects horizontal and vertical sums of elements
    for (var i = 0; i < matrix.elements; i++) {
        fSV.push(0);fSH.push(0);
        for (var j = 0; j < matrix.elements; j++) {
            if (val.answer[i][j]) {
                fSV[i]+=v[i][j];
            }
            if (val.answer[j][i]) {
                fSH[i]+=v[j][i];
            }
        }
    }

    val.data = v;
    val.finalSumV = fSV;
    val.finalSumH = fSH;
}(val.min, val.max); //fills val.data[]
var updateSum = function() {
    var cSH = [], cSV = [];
    
    for (var i = 0; i < matrix.elements; i++) {
        cSV.push(0);cSH.push(0);
        for (var j = 0; j < matrix.elements; j++) {
            if (val.enabled[i][j]) {
                cSV[i]+=val.data[i][j];
            }
            if (val.enabled[j][i]) {
                cSH[i]+=val.data[j][i];
            }
        }
    }
    val.currentSumV = cSV;
    val.currentSumH = cSH;
}; //updates the current sum values

/**|ELEMENTS|**/
var sumRing = function() {
    var horizontal = function() {
        for (var j = 0; j < 2; j++) {
            for (var i = 0; i < matrix.elements; i++) {
                if ((mouseX > i*matrix.elementSize + 
                                matrix.x) && 
                    (mouseX < i*matrix.elementSize + 
                                matrix.x+matrix.elementSize) && 
                    (mouseY > -1*matrix.elementSize + 
                                j*matrix.elementSize*(matrix.elements+1) + 
                                matrix.y) && 
                    (mouseY < -1*matrix.elementSize + 
                                j*matrix.elementSize*(matrix.elements+1) + 
                                matrix.y+matrix.elementSize) ){
                                    
                    skin.sumS(i*matrix.elementSize + 
                                (matrix.x +matrix.elementSize/2), 
                           -1*matrix.elementSize + j*matrix.elementSize*
                                (matrix.elements+1)+(matrix.y +matrix.elementSize/2)
                    );
                    
                    skin.sumCurrentTextS(val.currentSumV[i],
                            i*matrix.elementSize + 
                                (matrix.x +matrix.elementSize/2), 
                           -1*matrix.elementSize + j*matrix.elementSize*
                                (matrix.elements+1)+(matrix.y +matrix.elementSize/2)
                    );
                } else {
                    skin.sumS(i*matrix.elementSize + 
                                (matrix.x +matrix.elementSize/2), 
                           -1*matrix.elementSize + j*matrix.elementSize*
                                (matrix.elements+1)+(matrix.y +matrix.elementSize/2)
                    );
                    
                    skin.sumFinalTextS(val.finalSumV[i],
                            i*matrix.elementSize + 
                                (matrix.x +matrix.elementSize/2), 
                           -1*matrix.elementSize + j*matrix.elementSize*
                                (matrix.elements+1)+(matrix.y +matrix.elementSize/2)
                    );
                }
            }
        }
    }();
    var vertical = function() {
        for (var j = 0; j < 2; j++) {
            for (var i = 0; i < matrix.elements; i++) {
                if ((mouseX > -1*matrix.elementSize + 
                                j*matrix.elementSize*(matrix.elements+1) + 
                                matrix.y) && 
                    (mouseX < -1*matrix.elementSize + 
                                j*matrix.elementSize*(matrix.elements+1) + 
                                matrix.y+matrix.elementSize) &&
                    (mouseY > i*matrix.elementSize + 
                                matrix.x) && 
                    (mouseY < i*matrix.elementSize + 
                                matrix.x+matrix.elementSize) ){
                                    
                    skin.sumS(-1*matrix.elementSize + j*matrix.elementSize*
                                (matrix.elements+1)+(matrix.x +matrix.elementSize/2), 
                            i*matrix.elementSize + 
                                (matrix.y +matrix.elementSize/2)
                    );
                        
                    skin.sumCurrentTextS(val.currentSumH[i],
                           -1*matrix.elementSize + j*matrix.elementSize*
                                (matrix.elements+1)+(matrix.x +matrix.elementSize/2),
                            i*matrix.elementSize + 
                                (matrix.y +matrix.elementSize/2)
                    );
                    
                } else {
                    skin.sumS(-1*matrix.elementSize + j*matrix.elementSize*
                                (matrix.elements+1)+(matrix.x +matrix.elementSize/2), 
                            i*matrix.elementSize + 
                                (matrix.y +matrix.elementSize/2)
                    );
                        
                    skin.sumFinalTextS(val.finalSumH[i],
                           -1*matrix.elementSize + j*matrix.elementSize*
                                (matrix.elements+1)+(matrix.x +matrix.elementSize/2),
                            i*matrix.elementSize + 
                                (matrix.y +matrix.elementSize/2)
                    );
                }
            }
        }
    }();
};
var elements = function() {
    //draw numbers
    for (var i = 0; i < matrix.elements; i++) {
        for (var j = 0; j < matrix.elements; j++) {
            skin.elementS(i*matrix.elementSize+matrix.x+matrix.elementSize/2, 
                          j*matrix.elementSize+matrix.y+matrix.elementSize/2);
            if (val.enabled[i][j]) {
                skin.elementTextS(val.data[i][j], 
                              i*matrix.elementSize+(matrix.x+matrix.elementSize/2), 
                              j*matrix.elementSize+(matrix.y+matrix.elementSize/2));
            }
        }
    }
    
    //hide disabled
    for (var i = 0; i < matrix.elements; i++) {
        for (var j = 0; j < matrix.elements; j++) {
            if (!val.enabled[i][j]) {
                skin.elementHideS(
                    i*matrix.elementSize+matrix.x+matrix.elementSize/2, 
                    j*matrix.elementSize+matrix.y+matrix.elementSize/2
                );
            }
        }
    }
};
var showAnswer = function() {
    for (var i = 0; i < matrix.elements; i++) {
        for (var j = 0; j < matrix.elements; j++) {
            if (!val.answer[i][j]) {
                skin.elementAnswerS(i*matrix.elementSize+matrix.x+matrix.elementSize/2, 
                        j*matrix.elementSize+matrix.y+matrix.elementSize/2, 20, 20);
            }
        }
    }
};
var showCorrect = function() {
    var horizontal = function() {
        for (var j = 0; j < 2; j++) {
            for (var i = 0; i < matrix.elements; i++) {
                if (val.currentSumV[i] === val.finalSumV[i]) {
                    skin.sumSelectS(i*matrix.elementSize + 
                                (matrix.x +matrix.elementSize/2), 
                           -1*matrix.elementSize + j*matrix.elementSize*
                                (matrix.elements+1)+(matrix.y +matrix.elementSize/2)
                    );
                }
            }
        }
    }();
    var vertical = function() {
        for (var j = 0; j < 2; j++) {
            for (var i = 0; i < matrix.elements; i++) {
                if (val.currentSumH[i] === val.finalSumH[i]) {
                    skin.sumSelectS(-1*matrix.elementSize + j*matrix.elementSize*
                                (matrix.elements+1)+(matrix.x +matrix.elementSize/2), 
                            i*matrix.elementSize + 
                                (matrix.y +matrix.elementSize/2)
                    );
                }
            }
        }
    }();
};
var setGame = function() {
    skin.specialS();
    var win = [];
    for (var i = 0; i < matrix.elements; i++) {
        if (val.currentSumV[i] === val.finalSumV[i] && 
            val.currentSumH[i] === val.finalSumH[i] ) {
            win.push(true);
        } else {
            win.push(false);
        }
    }
    if (equal(win) && win[0] !== false) {
        skin.winS();
        val.win = true;
    } else {
        val.win = false;
    }
};

/**|SELECTOR|**/
var selected = {};
var selector = function() {
    var x, y;
    for (var i = 0; i < matrix.elements; i++) {
        for (var j = 0; j < matrix.elements; j++) {
            if ((mouseX > i*matrix.elementSize + matrix.x) && 
                (mouseX < i*matrix.elementSize + (matrix.x+matrix.elementSize)) && 
                (mouseY > j*matrix.elementSize + matrix.y) && 
                (mouseY < j*matrix.elementSize + (matrix.y+matrix.elementSize)) ){
                skin.elementSelectS( 
                    i*matrix.elementSize+(matrix.x+matrix.elementSize/2), 
                    j*matrix.elementSize+(matrix.y+matrix.elementSize/2)
                );
                x=i;
                y=j;
            }
        }
    }
    selected.x = x;
    selected.y = y;
};
var toggle = function() {
    val.enabled[selected.x][selected.y] = !val.enabled[selected.x][selected.y];
};
mouseClicked = function() {
    if (!val.win) {
        toggle();
    }
};

/**|DRAW|**/
var drawElements = function() {
    matrix.draw();
    skins(val.skin);
    updateSum();
    
    setGame();
    sumRing();
    elements();
    selector();
    
    showCorrect();
    //showAnswer();
};
draw = function() {
    background(colors.backgroundColor);
    textAlign(CENTER, CENTER);
    
    drawElements();
};


