//import { Heading } from "@/components/heading";

import { Paragraph } from "@/components/paragraph";
import {Heading} from "../components/heading"
import { SubHeading } from "@/components/sub-heading";
import About from "@/components/about";
//import Navbar from "@/components/navbar";


export default function Home() {
  return (
    <div>
     
      <Heading name="imsal" cast="Hassan" />
      <SubHeading/>
      <Paragraph text= "This is my react component."/>
      <Paragraph text= "This is my next component."/>
      <About/>
    </div>
      );
}
