"use client";
import {useState} from "react";
import type {EngagementConfig,EngagementField} from "./SpaceEngagementConfig";
type Field={id:string;label:string;type?:"text"|"textarea"|"number"|"date"|"time"|"url"|"select";required?:boolean;options?:string[]};
type Props={category:string;identity:string;role:string;canContribute:boolean;config?:Partial<EngagementConfig>;onSubmission:(kind:string,payload:Record<string,string>)=>void};
const templates:Record<string,Record<string,Field[]>>={
 "Projects & Ideas":{
 "Submit an idea":[{id:"title",label:"Idea title"},{id:"details",label:"Describe the idea",type:"textarea"},{id:"benefit",label:"Expected benefit",required:false},{id:"reference",label:"Reference link",type:"url",required:false}],
 "Suggest a task":[{id:"task",label:"Task title"},{id:"details",label:"Task details",type:"textarea"},{id:"due",label:"Suggested due date",type:"date",required:false}],
 "Offer help":[{id:"area",label:"What can you help with?"},{id:"offer",label:"Describe your offer",type:"textarea"},{id:"availability",label:"Availability",required:false}],
 "Ask for help":[{id:"request",label:"What do you need help with?"},{id:"details",label:"Details",type:"textarea"}]},
 "Learning & Growth":{
 "Ask a lesson question":[{id:"lesson",label:"Lesson or topic",required:false},{id:"question",label:"Your question",type:"textarea"}],
 "Submit a reflection":[{id:"topic",label:"Lesson or topic",required:false},{id:"reflection",label:"Your reflection",type:"textarea"}],
 "Submit practice":[{id:"activity",label:"Practice activity"},{id:"response",label:"Your response or evidence",type:"textarea"}],
 "Share a learning resource":[{id:"title",label:"Resource title"},{id:"url",label:"URL or file link",type:"url"}],
 "Mark lesson complete":[{id:"lesson",label:"Lesson or activity"}]},
 "Travel & Experiences":{
 "Suggest destination":[{id:"destination",label:"Destination or activity"},{id:"reason",label:"Why should we go?",type:"textarea"},{id:"url",label:"Useful link",type:"url",required:false}],
 "Add itinerary entry":[{id:"activity",label:"Place or activity"},{id:"date",label:"Date",type:"date"},{id:"time",label:"Time",type:"time",required:false},{id:"location",label:"Address or map link",required:false}],
 "Add packing item":[{id:"item",label:"Packing item"},{id:"quantity",label:"Quantity",type:"number",required:false},{id:"traveller",label:"Who is bringing it?",required:false}],
 "Vote in a poll":[{id:"poll",label:"Poll or question"},{id:"choice",label:"Your choice"}],
 "RSVP to an event":[{id:"event",label:"Event"},{id:"response",label:"Response",type:"select",options:["Going","Not going","Maybe"]}]},
 "Communities & Causes":{
 "RSVP to an event":[{id:"event",label:"Event"},{id:"response",label:"Response",type:"select",options:["Going","Not going","Maybe"]}],
 "Volunteer for a shift":[{id:"role",label:"Role or shift"},{id:"availability",label:"Availability",type:"textarea"}],
 "Propose an activity":[{id:"title",label:"Activity title"},{id:"details",label:"Description",type:"textarea"},{id:"date",label:"Suggested date",type:"date",required:false}],
 "Report a community issue":[{id:"topic",label:"Issue"},{id:"details",label:"Details",type:"textarea"}],
 "Share a resource":[{id:"title",label:"Resource title"},{id:"url",label:"URL or file link",type:"url"}]},
 "Shared Interests & Hobbies":{
 "Recommend something":[{id:"title",label:"Recommendation"},{id:"reason",label:"Why recommend it?",type:"textarea"},{id:"url",label:"Link",type:"url",required:false}],
 "Suggest an activity":[{id:"activity",label:"Activity"},{id:"date",label:"Suggested date",type:"date",required:false},{id:"place",label:"Place",required:false}],
 "Vote in a poll":[{id:"poll",label:"Poll or question"},{id:"choice",label:"Your choice"}],
 "RSVP to a meetup":[{id:"meetup",label:"Meetup"},{id:"response",label:"Response",type:"select",options:["Going","Not going","Maybe"]}]},
 "People & Connections":{
 "Respond to an invitation":[{id:"invitation",label:"Invitation"},{id:"response",label:"Response",type:"select",options:["Accept","Decline","Maybe"]}],
 "RSVP to an occasion":[{id:"occasion",label:"Occasion"},{id:"response",label:"Response",type:"select",options:["Going","Not going","Maybe"]},{id:"guests",label:"Number of guests",type:"number",required:false}],
 "Send a greeting":[{id:"message",label:"Your greeting",type:"textarea"}],
 "Share a memory":[{id:"title",label:"Memory title",required:false},{id:"memory",label:"Tell the memory",type:"textarea"}],
 "Suggest an arrangement":[{id:"suggestion",label:"Your suggestion",type:"textarea"},{id:"date",label:"Date",type:"date",required:false}]},
 "Resources & Collections":{
 "Submit a resource":[{id:"title",label:"Resource title"},{id:"url",label:"URL or file link",type:"url"},{id:"type",label:"Resource type"},{id:"description",label:"Description",type:"textarea",required:false},{id:"tags",label:"Tags",required:false}],
 "Suggest a correction":[{id:"resource",label:"Resource title or reference"},{id:"correction",label:"What should change?",type:"textarea"}],
 "Report a broken link":[{id:"resource",label:"Resource title or reference"},{id:"issue",label:"What is wrong?"}],
 "Recommend a collection item":[{id:"title",label:"Item title"},{id:"reason",label:"Why include it?",type:"textarea"},{id:"url",label:"Link",type:"url",required:false}]}
};
export default function SpaceGenericEngagement({category,identity,role,canContribute,config,onSubmission}:Props){
 const [action,setAction]=useState(""),[values,setValues]=useState<Record<string,string>>({}),[message,setMessage]=useState("");
 const defaults=Object.keys(templates[category]||{});
 const enabled=config?.enabledActions||defaults;
 const available=enabled.filter(name=>(config?.actionRoles?.[name]||["participant","contributor","moderator"]).includes(role));
 const custom=category==="Other / Something else";
 const fields:Field[]=custom?(config?.customFields||[{id:"details",label:"Your contribution",type:"textarea"}]).map((f:EngagementField)=>({id:f.id,label:f.label,type:f.type==="textarea"?"textarea":f.type==="number"?"number":f.type==="date"?"date":f.type==="time"?"time":f.type==="url"?"url":f.type==="select"?"select":"text",required:f.required,options:f.options})):((templates[category]||{})[action]||[]);
 function submit(e:React.FormEvent){e.preventDefault();const missing=fields.filter(f=>f.required!==false&&!String(values[f.id]||"").trim());if(missing.length){setMessage("Complete "+missing.map(f=>f.label).join(", ")+".");return;}if(!action){setMessage("Choose an action first.");return;}const payload:Record<string,string>={};fields.forEach(f=>payload[f.label]=values[f.id]||"");payload["Submitted by"]=identity;payload["Review status"]=config?.approvalRequired?"Pending review":"Submitted";onSubmission(action,payload);setValues({});setMessage(config?.confirmation||"Your contribution has been saved on this device.");}
 if(!canContribute||!available.length)return <section className="bp-engagement-tools"><p className="bp-muted">This Space is currently read-only for your access level.</p></section>;
 return <section className="bp-engagement-tools bp-generic-tools"><header><span className="bp-eyebrow">SPACE PARTICIPATION</span><h2>Take part in this Space</h2><p>Choose what you want to do. Each action has its own short form.</p></header><form className="bp-form" onSubmit={submit}><label>What would you like to do?<select required value={action} onChange={e=>{setAction(e.target.value);setValues({});setMessage("");}}><option value="">Choose an action</option>{available.map(x=><option key={x} value={x}>{custom?(config?.customAction||"Send a custom contribution"):x}</option>)}</select></label>{action&&fields.map(f=><label key={f.id}>{f.label}{f.type==="textarea"?<textarea required={f.required!==false} rows={3} value={values[f.id]||""} onChange={e=>setValues(v=>({...v,[f.id]:e.target.value}))}/>:f.type==="select"?<select required={f.required!==false} value={values[f.id]||""} onChange={e=>setValues(v=>({...v,[f.id]:e.target.value}))}><option value="">Choose</option>{(f.options||[]).map(o=><option key={o}>{o}</option>)}</select>:<input required={f.required!==false} type={f.type||"text"} value={values[f.id]||""} onChange={e=>setValues(v=>({...v,[f.id]:e.target.value}))}/>}</label>)}{action&&<button className="bp-button bp-primary">Submit contribution ↗</button>}</form>{message&&<p className="bp-tool-message" role="status">{message}</p>}<small className="bp-muted">Prototype submissions are saved in this browser and are not synced across devices.</small></section>;
}
