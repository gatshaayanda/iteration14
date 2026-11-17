import { redirect } from "next/navigation";

export default function LegacyBusinessRoute(){
  redirect("/?mode=channel");
}
