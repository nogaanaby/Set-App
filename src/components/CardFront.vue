<template>
    <div>
        <!--{{JSON.stringify(cards)}}-->
        <h3>hi I am cardFront</h3>
        <p>{{cards[0]}}</p>
        <div class="cardDiv" v-for="card in cards" :key="card.index">
            <canvas :ref='"shapeCanvas1"+card.index' width="150" height="66"></canvas>
            <canvas :ref='"shapeCanvas2"+ card.index' v-if="is2" width="150" height="66"></canvas>
            <canvas :ref='"shapeCanvas3"+ card.index' v-if="is3" width="150" height="66"></canvas>
        </div>
        <slot></slot>
    </div>
</template>
<script>
/* eslint-disable */
    //const utils = require('../js/utils.js')
    //console.log(utils.a)
    export default{
        name: 'cardFront',  
        data(){
            return{
                cards: [],
                canvas: [],
                context: [],
                is2: true,
                is3: true,
                cardTemplate: {
                    'id': 0,
                    'shape': 'sub',
                    'number': 1,
                    'color': 'red',
                    'filling': 'str'
                },
                cardProperties: {
                    shapes: ['rect', 'sub', 'tri'],
                    numbers: [1, 2, 3],
                    colors: ['red', 'purple', 'green'],
                    fills: ['empty', 'full', 'stripes']
                }   
            }
        },
        mounted(){
            // init cards deck (3^4 combintaions)
            this.cardProperties.shapes
                .forEach(shape => this.cardProperties.numbers
                    .forEach(number => this.cardProperties.colors
                        .forEach(color => this.cardProperties.fills
                            .forEach(fill,id => this.cards.push({id, shape, number, color, fill}))
                        )
                    )
                )
            
            console.log("ok")
            console.log(this.$refs)

            for (let i = 0; i< 80; i++){
                this.canvas[i] = this.$refs["shapeCanvas"][i][1]
                console.log(this.$refs["shapeCanvas"][i][1])
                this.context[i] = this.canvas[i].getContext("2d")
                this.drawSub(this.context[i])
                this.drawShape(this.context[i], cards[1].shape)
                this.changeColor(this.context[i], this.cards[i].color) 
                this.changeFill(this.context[i], this.cards[i].filling)
                this.changeNumber(this.cards[i].number)
            }      
        },
        methods: {
            /**************************************
             shapes
            *************************************/

            //draw a subsidized on certun canvas with the given color
            drawSub: function(context){
                    //subsidized stracture and size
                //150 x 66

                var blx= 37; //blx= basic left x cordinate
                var bly= 33;

                var bbx= 75; //blx= basic buttom x cordinate
                var bby= 56;

                var brx= 112; 
                var bry= 33;

                var bux= 75; 
                var buy= 10;
 
     
                context.beginPath();        

                context.moveTo(blx,bly);
                context.lineTo(bbx,bby);
                context.lineTo(brx,bry);
                context.lineTo(bux,buy);
                context.lineTo(blx,bly);

                context.closePath();
                context.stroke();
                
            },
            drawRect: function(ctx){
                ctx.beginPath();
                ctx.moveTo(37,10);
                ctx.lineTo(112,10);
                ctx.lineTo(112,56);
                ctx.lineTo(37,56);
                ctx.lineTo(37,10);
                ctx.closePath();
                ctx.stroke();
            },

            drawTri: function(ctx){
                ctx.beginPath();
                ctx.moveTo(75,10);
                ctx.lineTo(112,56);
                ctx.lineTo(37,56);
                ctx.lineTo(75,10);
                ctx.closePath();
                ctx.stroke();
            },

            /************************************
             shape fill
            ************************************/
            drawStr: function(context, x, b, c){
                    let Ya = -0.6 * x + b;
                    let Yb = 0.6 * x + c;
            
                    context.moveTo(x, Ya);
                    context.lineTo(x, Yb);       
            
                    context.stroke();
            },
            subStr: function(context){
                for(let x = 39; x <= 75; x += 5){
                    this.drawStr(context, x, 55, 10.8)
                }
            
                for(let x = 79; x <= 112; x += 5){
                    this.drawStr(context, x, 100, -35)
                }
            },
            subFull: function(context){
                for(let x = 39; x <= 75; x++){
                    this.drawStr(context, x, 55, 10.8)
                }
            
                for(let x = 76; x <= 112; x++){
                    this.drawStr(context, x, 100, -35)
                }
            },
            changeFillsub: function(ctx, fill){
                if(fill == "full"){
                    this.subFull(ctx);
                }
                else if(fill == "str"){
                    this.subStr(ctx);
                }
                else{
            
                }
            },
            /************************************
             rectengle
            ************************************/
            rectStr: function(context){
                let x;
                for(x = 37; x <= 112; x += 5){

                    context.moveTo(x, 10);
                    context.lineTo(x, 56);       

                    context.stroke();
                }
            },
            rectFull: function(context){
                let x;
                for(x = 37; x <= 112; x++){

                    context.moveTo(x, 10);
                    context.lineTo(x, 56);       

                    context.stroke();
                }
            },
            changeFillrect: function(ctx, fill){
                if(fill == "full"){
                    this.rectFull(ctx);
                }
                else if(fill == "str"){
                    this.rectStr(ctx);
                }
                else{
            
                }
            },
            /************************************
             triangle
            ************************************/
            triStr: function(context){
                let x;
                for(x = 39; x <= 75; x += 5){
                
                    let Ya = -1.21 * x + 100.79;

                    context.moveTo(x, Ya);
                    context.lineTo(x, 56);       

                    context.stroke();
                }

                for(x = 79; x <= 112; x += 5){
                   let Yc = 1.24 * x - 83.24;

                    context.moveTo(x, Yc);
                    context.lineTo(x, 56); 

                    context.stroke();
                }    
            },
            triFull: function(context){
                let x;
                for(x = 39; x <= 75; x ++){
                
                    let Ya = -1.21 * x + 100.79;

                    context.moveTo(x, Ya);
                    context.lineTo(x, 56);       

                    context.stroke();
                }

                for(x = 76; x <= 112; x ++){
                   let Yc = 1.24 * x - 83.24;

                    context.moveTo(x, Yc);
                    context.lineTo(x, 56); 

                    context.stroke();
                }  
            },
            changeFilltri: function(ctx, fill){
                if(fill == "full"){
                    this.triFull(ctx)
                }
                else if(fill == "str"){
                    this.triStr(ctx)
                }
                else{
            
                }
            },
            /**************************************
             changim
            *************************************/

            changeColor: function(context, color){
                context.strokeStyle= color;
                context.stroke(); 
            },

            changeFill: function(context, shape){
                if(shape == "sub"){
                    this.changeFillsub(this.context)                
                }
                if(shape == "rect"){
                    this.changeFillrect(this.context) 
                } 
                if(shape == "tri"){
                    this.changeFilltri(this.context) 
                }                 
            },            

            changeNumber: function(num){
                if(num == 1){
                    this.is2 = false
                    this.is3 = false
                }
                if(num == 2){
                    this.is3 = false
                }   
            },

            drawShape: function(ctx, shape){
                if(shape == "sub"){
                    this.drawSub(ctx)                  
                }
                if(shape == "rect"){
                    this.drawRect(ctx) 
                }
                if(shape == "tri"){
                    this.drawTri(ctx)
                }   
            },        

            /**************************************
             clear canvas
            *************************************/

            clear: function(ctx){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
                                                                  
              
        }
    }

  
</script>

<style scoped>
    .cardDiv{
      border: 1px solid gray;
      display: flex; 
      flex-direction: column;
      width: 150px;
      height: 198px;
      justify-content: center;
    }

    canvas{
        margin: 0px;
    }

</style>