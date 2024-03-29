const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const saltRounds = 10;

const UsuariosSchema = new Schema({
    firstName: { type: String, default:"", lowercase:true },
    lastName: { type: String, default:"", lowercase:true },
    email: { type: String, required: true, lowercase:true },
    password: { type: String, require: true},
    profilePhoto:{type:Array, default:[]},
    adress: { type: Array, default:[]},
    phone: { type: String, default: ''},
    admin: { type: Boolean, default: false },
    activo: { type: Boolean, default: true }
})
UsuariosSchema.pre("save", function(next){
    if(this.isNew|| this.isModified("password")){
        const document = this;

        bcrypt.hash(document.password, saltRounds,(error, hashPassword)=>{
            if (error){
                next(error)
            }else{
                document.password=hashPassword;
                next();
            }

        });
    }else{
        next()
    }
});

UsuariosSchema.methods.isCorrectPassword = async function (password) {
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        throw error;
    }
};


module.exports = mongoose.model("Usuarios", UsuariosSchema)

