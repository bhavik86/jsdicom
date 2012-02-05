// All tools may implement any of the following functions
// mousedown(x, y)
// mouseup(x, y)
// mousemove(x, y)
// mouseclick(x, y)
// draw(canvas)
// set_file(file)

function MeasureTool(app) {
    this.in_motion = false;
    this.app = app;
    this.file;
    this.startX;
    this.startY;
    this.currX;
    this.currY;

    this.click = function(x, y) {
        if(this.in_motion) {
            this.in_motion = false;
            // Add line drawing obj to file
            if(this.file.measurelines === undefined)
                this.file.measurelines = [];
            this.file.measurelines.push([this.startX, this.startY, this.currX, this.currY]);
        } else {
            this.startX = x;
            this.startY = y;
            this.in_motion = true;
        }
    }

    this.mousemove = function(x, y) {
        if(this.in_motion) {
            this.currX = x;
            this.currY = y;
            app.draw_image();
        }
    }

    this.postdraw = function(canvas) {
        // Draw current line
        if (this.in_motion) {
            canvas.beginPath();
            canvas.moveTo(this.startX, this.startY);
            canvas.lineTo(this.currX, this.currY);
            canvas.strokeStyle = '#f44'; // red
            canvas.lineWidth   = 4;
            canvas.stroke();
            canvas.closePath()
        }
        lines = this.file.measurelines;
        for(idx in lines) { 
            canvas.beginPath();
            canvas.moveTo(lines[idx][0], lines[idx][1]);
            canvas.lineTo(lines[idx][2], lines[idx][3]);
            canvas.strokeStyle = '#f44'; // red
            canvas.lineWidth   = 4;
            canvas.stroke();
            canvas.closePath()

        }
        
    }

    this.set_file = function(file) {
        this.file = file;
    }
}

function WindowLevelTool(app) {
    this.is_mouse_down = false;
    this.app = app;
    this.last_mouse_pos_x = 0;
    this.last_mouse_pos_y = 0;

    this.scroll = function(detail) {
        this.app.set_slice_idx(this.app.get_slice_idx() + detail);
    }
    this.mousedown = function(x, y) {
        this.is_mouse_down = true;
    }

    this.mouseup = function(x, y) {
        this.is_mouse_down = false;
    }

    this.mousemove = function(x, y) {
        if(this.is_mouse_down) {
            var curr_windowing = this.app.get_windowing();
            var xdiff = x - this.last_mouse_pos_x;
            var ydiff = y - this.last_mouse_pos_y
            app.set_windowing(curr_windowing[0] + xdiff, curr_windowing[1] + ydiff);
        }
        this.last_mouse_pos_x = x;
        this.last_mouse_pos_y = y;
    }

    this.postdraw = function(canvas) {
    }

    this.click = function(x, y) {
    }

    this.set_file = function(file) {
    }
}

function ZoomPanTool(app) {
    this.is_mouse_down = false;
    this.app = app;
    this.last_mouse_pos_x = 0;
    this.last_mouse_pos_y = 0;

    this.scroll = function(detail) {
        this.app.set_scale(this.app.get_scale() + detail/100.0);
    }

    this.mousedown = function(x, y) {
        this.is_mouse_down = true;
        this.last_mouse_pos_x = y;
        this.last_mouse_pos_y = y;
    }

    this.mouseup = function(x, y) {
        this.is_mouse_down = false;
    }

    this.mousemove = function(x, y) {
        if(this.is_mouse_down) {
            var xdiff = (this.mouse_down_pos_x - x);
            var ydiff = (this.mouse_down_pos_y - y);
            xdiff /= 100.0;
            ydiff /= 100.0;
            var curr_pan = app.get_pan();
            app.set_pan(curr_pan[0] - xdiff, curr_pan[1] - ydiff);
        }
        this.mouse_down_pos_x = x;
        this.mouse_down_pos_y = y;
    }

    this.postdraw = function(canvas) {
    }

    this.click = function(x, y) {
    }

    this.set_file = function(file) {
    }
}
