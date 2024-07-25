const { default: mongoose } = require("mongoose");

const User = require('./User');

const CommentSchema = new mongoose.Schema({

    body:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',

    },
    article:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    }


},{

    timestamps:true

});

CommentSchema.methods.toCommentResponse = async function(user){

    const authObj = await User.findById(this.author).exec();

    return {
        
        id:this._id,
        body:this.body,
        createdAt:this.createdAt,
        updatedAt:this.updatedAt,
        author:authObj.toProfileJSON(user)


    }

}

module.exports = mongoose.model('Comment', CommentSchema)