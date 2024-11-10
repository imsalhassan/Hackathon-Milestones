//import Navbar from "@/components/navbar"
//import { Paragraph } from "@/components/paragraph"
import Link from "next/link"
export default async function Products(){
    const fetchData = await fetch ("https://jsonplaceholder.typicode.com/posts",{next:{revalidate:2000},});
    const res = await fetchData.json();
    return(
        <div>
            <h3>Products List</h3>
            <ol>
          {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                res.map((item:unknown,_i:number) => {
                return(
                    
                    // eslint-disable-next-line react/jsx-key
                    <li><Link href={`/products/${item.id}`}>{item.title}</Link></li>
                )
            })
          }
        </ol>
        </div>
        
    );
}