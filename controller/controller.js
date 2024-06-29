const {user, todo} = require("../schema/schema");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const registerUser = async(req,res) => {
    try {
        const {fname,email,phone,password} = req.body;

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        req.body.password = hashedPassword;

        console.log(fname,email,phone,hashedPassword);

        const newUser = new user({fname:fname,email:email,phone:phone,password:hashedPassword});
        await newUser.save();
        res.status(200).json({data:newUser})
    } catch (error) {
        console.log("signup error", error)
        res.status(500).json({error:'User could not be created'})
    }
}

const loginUser = async(req,res) => {
    
    const {phone,password} = req.body

    const existingUser = await user.findOne({phone})

    if(!existingUser){
        return res.status(400).json("User not found")
    }
    try {
        if(await bcrypt.compare(password, existingUser.password)){
            const token = jwt.sign({id:existingUser._id, phone:existingUser.phone},'ig7jughf6uhugn7hjijgunj7huj;0n;l,9n',{expiresIn: '1h'})
            res.status(200).send({
                fname:existingUser.fname,
                email:existingUser.email,
                phone:existingUser.phone,
                token
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Failed")
    }
    
}

const addTodo = async(req,res) => {
    if(!req.body){
        res.status(400).send("Add a task");
    }
    const newTodo = new todo(req.body);
    await newTodo.save();
    res.status(200).json(newTodo)
}

const getTodo = async(req,res) => {
    const findTodo = await todo.find()
    if(!findTodo){
        return res.status(400).json({message:"No task found"});
    }
    return res.status(200).json(findTodo)
}

const deleteTodo = async(req,res) => {
    const { id } = req.params;
    console.log("Deleting task!!!", id);

    const existingData = await todo.findByIdAndDelete({_id: id});

    console.log("Id: ", id);
    console.log("existing data: ", existingData);

    if(!existingData){
    return res.status(404).send({error: "Id not found"})
    }
    res.status(200).send({message: "User task deleted"});
}

const updateTodo = async(req,res) => {
    const {id,title} = req.body;
    console.log("id: ",id);

    const existingData = await todo.findOneAndDelete({_id:id},{$set: {title:title}},{new:true})

    console.log("existing data: ", existingData);
    console.log('Title', title);
    console.log("Id", id);
    if(!existingData){
        return res.status(404).send({error: "Id not found"})
        }
    res.status(200).send({message:"Title changed successfully"});
}



module.exports = {registerUser,loginUser,addTodo,deleteTodo,updateTodo,getTodo}