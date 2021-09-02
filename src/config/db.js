const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aishu:aishu@cluster0.zag8m.mongodb.net/recipeapi?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=> console.log('database connected'))
.catch((e)=> console.log('database connection eerr',e))