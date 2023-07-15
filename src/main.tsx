import "./style.css";
import { Wreact } from "./Wreact";
import { Counter } from "./components/Counter";

const el = document.querySelector<HTMLDivElement>("#app")!;
Wreact.render(Counter, el);
