//Route pour retourner bonjour
import { NextResponse } from "next/server";
import { login } from "@/model/user";
 
export async function GET(request){
  try{
    const params = request.nextUrl.searchParams;
    const courriel = params.get('courriel');
    const password = params.get('password');
    const user = await login(courriel, password);
    if(user === "User non connu") return NextResponse.json({erreur : "User non connu"}, {status: 404})
    return NextResponse.json({email:user.email}, {status: 200})
  }
  catch(error){
      return NextResponse.json({erreur : error}, {status: 500})
  }
}