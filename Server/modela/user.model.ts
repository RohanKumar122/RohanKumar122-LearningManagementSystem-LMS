import mongoose,{Schema,model,Document, Model} from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    avatar:{
        public_id:string;
        url:string;
    },
    role:string;
    isVerified:boolean;
    courses:Array<{courseId:string}>;
    comparePassword:(password:string)=> Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: {
            validator: (value: string) => emailRegexPattern.test(value),
            message: "Please enter a valid email address",
        },
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password should be longer than 6 characters"],
    },
    avatar:{
        public_id: String,
        url: String,
    },
    role:{
        type:String,
        default:"user"
    },
    isVerified:{    
        type:Boolean,
        default:false
    },
    courses:[{
        courseId:String
    }] ,

},{timestamps:true});

// Hash Password before saving 
userSchema.pre<IUser>("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
});

// Compare Password
userSchema.methods.comparePassword = async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password,this.password);    
};

const  userModel :Model<IUser> = model<IUser>("User",userSchema);

export default userModel;