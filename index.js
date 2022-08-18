const { Console } = require('console');
const express=require('express')
const app= express()
const router= express.Router();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/productos', router)
app.set("view engine","ejs")
app.set('views',__dirname +'/views')
app.use(express.static(__dirname + "/public"));



const PORT=8080
app.listen(PORT,()=>{
    console.log('server on')
})



const listaProductos=[]





app.get('/index',(req,res)=>{
    res.render('index')
})
app.get('/modificarProducto',(req,res)=>{
    res.render('PutEX'); 
})
app.get('/Error',(req,res)=>{
    res.render('Error'); 
})







router.get('/',(req,res)=>{
    res.json(listaProductos)
    console.log(listaProductos) 
})

router.get('/agregarProducto',(req,res)=>{
    res.render('Post_Ex'); 
})






router.post('/', (req,res)=>{
    const data=  req.body
    addProd(data)
    res.json(listaProductos)
})


//Devuelve un producto por ID
router.get('/:id',(req,res)=>{
    let para=req.params.id
    let producto;
    producto=listaProductos.find(p=>p.id==para)
    if(!producto){
        res.status(404).render('Error')
    }else{
    res.json(producto)
    }
})

//Devuelve un producto por ID
router.put('/:id',(req,res)=>{
    let para=req.params.id
    let num= parseInt(para)
    let elm = num-1
    if(elm>listaProductos.length){
        //res.render('Error')
        res.status(400).json(`404`)
    }else{
    let data=req.body


    if(!data.title){
        data.title=listaProductos[elm].title
    }
    if(!data.price){
        data.price=listaProductos[elm].price
    }
    if(!data.thumbnail){
        data.thumbnail=listaProductos[elm].thumbnail
    }





    let producto;
    producto=listaProductos.find(p=>p.id==para)
    let newObj={
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
        id: num
    }
    
    listaProductos[elm]=newObj

    res.json(listaProductos)
    }
    
   
})

router.delete('/:id',(req,res)=>{
    let para=req.params.id
    let num= parseInt(para)
    let elm = num-1
    producto=listaProductos.find(p=>p.id==para)
    if(!producto){
        res.status(404).json("404")
    }else{
    listaProductos.splice(elm,1)
    }

})











function addProd(data){
    let newId;

    if(listaProductos.length==0){
        newId=1;
    }else{
        newId =  listaProductos.length + 1
    }

    const newObj={...data, id:newId }

    listaProductos.push(newObj);
    console.log(listaProductos)

}






