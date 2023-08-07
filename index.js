import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;



let date = new Date();
let formattedDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
});





let today=["Make breakfast"];
let work=["Reply to work emails"];


//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));



//routes
app.get('/', (req, res) =>{
    res.render('index.ejs', {list: today, title: formattedDate});
})


app.post('/submit', (req,res) =>{
    let item = req.body.newItem;
    let listType = req.body.listType;

    if(listType == 'Work')  {
        work.push(item);
        res.redirect("/work");
    }
    else {
        today.push(item);
        res.redirect("/");
    }

    
})




app.get('/work', (req, res) => {
    res.render('index.ejs', {list: work, title: "Work"});
})






app.listen(port, () =>{
    console.log('server is running on port ' + port);
})