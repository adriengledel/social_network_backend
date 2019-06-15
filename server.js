import mongoose   from "mongoose";
import app from './express';

//Connexion à la base de donnée
mongoose.connect('mongodb://localhost/socialNetwork', { useNewUrlParser: true }).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

app.get('/hello',function(req,res){
    res.json("Hello World")
  });
//Définition et mise en place du port d'écoute
const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));

