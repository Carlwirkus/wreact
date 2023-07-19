import "./style.css";
import { Wreact } from "./Wreact";
import { Images } from "./components/Images";

const el = document.querySelector<HTMLDivElement>("#app")!;
Wreact.render(Images, el);
