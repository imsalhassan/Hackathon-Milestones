import { Paragraph } from "@/components/paragraph";

export default async function Product({params}:{params:{product:string}}){
    const fetchData = await fetch (`https://jsonplaceholder.typicode.com/posts/${params.product}`,{cache:"no-store"});
    const res = await fetchData.json();
    console.log(res);
   
    return(
        
        <div>
           
        <Paragraph text="Product Detail"/>
        <p>{res.id}</p>
        <p>{res.title}</p>
        <p>{res.body}</p>
        </div>
    )
}