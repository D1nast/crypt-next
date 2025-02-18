'use client';
// UI/UX関係
import { useState,useEffect } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// Amplifyとの接続関係
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
Amplify.configure(outputs);
const client = generateClient<Schema>()

export default function SignUp(){
    const [email,setEmail] = useState("");
    // const [pass,setPass] = useState("");
    // const [passwordType,setPasswordType] = useState("password");
    const [user,setUsers] = useState<Schema["User"]["type"][]>([]);
    const fetchUsers = async () => {
        const { data: items } = await client.models.User.list();
        setUsers(items);
    };
    const createUser = async (input:string) => {
        await client.models.User.create({
            email: input ,
            deliver: true
        })
        fetchUsers();
    };  
    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <Box sx={{border:{xs:'none',sm:0},padding:{xs:'150px 50px 150px 50px',sm:'150px 0px 60px 0px'},display:'flex',flexDirection:'column',justifyContent:'center',backgroundColor:'#000000'}}>
            {/* サブスク登録画面 */}
            <Box sx={{display:'flex',justifyContent:'center',paddingTop:'20px',paddingBottom:'20px'}}>
                <Box sx={{width:"500px",display:"flex",flexDirection:"column",alignItems:"center",maxWidth:'100%',
                    padding:{xs:'20px 0px 20px 0px',sm:'20px 0px 20px 0px'},border:"solid #FFFFFF",boxShadow:"0 3px 5px rgba(0, 0, 0, 0.22)"}}>
                    <Typography sx={{marginBottom:"20px",color:'#FFFFFF'}}>Subscription</Typography>
                {/* メールアドレス */}
                <Box>
                    <Input value={email} placeholder=" Mail" onChange={(e) => setEmail(e.target.value)} 
                    sx ={{backgroundColor:'white',width:{xs:'250px',sm:'400px'},height:{xs:'20px',sm:'20px'}}} />
                </Box>
                {/* ボタン */}
                <Box style={{ marginTop: "20px" }}>
                    <button onClick={()=>{createUser(email)}}>Subscribe</button>
                    {/* <button onClick={()=>{changeUser(email)}}>Stop/Resume</button>
                    <button onClick={()=>{changeUser(email)}}>Delete</button> */}
                </Box>
                </Box>
            </Box>
            <Box sx={{backgroundColor:"#FFFFFF",width:"100%"}}>
                <h5>登録ユーザ一覧    DynamoDBと接続</h5>
                <h4>先にデータベースとの接続だけ成功。ユーザー登録や削除はLambdaの実装の中で対応予定</h4>
                <ul>
                    {user.map(({ id, email }) => (
                    <li style={{color:"#FFFFFFF"}} key={id}>{email}</li>
                    ))}
                </ul>
            </Box>
            {/* 各ボタン説明 */}
            <Box sx={{marginTop:'50px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                <Typography sx={{marginBottom:"20px",color:'#FFFFFF'}}>Subscribe : Register your email address</Typography>
                <Typography sx={{marginBottom:"20px",color:'#FFFFFF'}}>Stop / resume : Stop delivering email. If you&apos;ve already stopped,resume delivering.</Typography>
                <Typography sx={{marginBottom:"20px",color:'#FFFFFF'}}>Delete : Delete your email address</Typography>
            </Box>
        </Box> 
                
    );
}

