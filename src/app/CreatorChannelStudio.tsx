"use client";
import {useMemo,useState} from "react";

export type CreatorProgramme = {
  id:string;
  postId:string;
  startsAt:string;
  durationMinutes:number;
  audience:"everyone"|"participants"|"moderators";
};
export type CreatorChannelConfig = {
  preset:string;
  accentColor:string;
  borderColor:string;
  backgroundColor:string;
  sections:string[];
  allowExplore:boolean;
  allowWatchlist:boolean;
  allowSuggestions:boolean;
  allowBrokenLinkReports:boolean;
  allowComments:boolean;
  allowReactions:boolean;
  schedule:CreatorProgramme[];
};
export type CreatorPublishedItem = {id:string;title:string;sourceType?:string;status?:"published"|"draft"|"archived"};
export const CREATOR_SECTIONS=["Live now","Programme guide","Featured programmes","Videos","Reels","Free TV","Playlists","External projects"];
export const CREATOR_PRESETS:Record<string,string[]> = {
  "General entertainment":["Live now","Programme guide","Featured programmes","Videos","Reels","Playlists"],
  "News & current affairs":["Live now","Programme guide","Featured programmes","Videos","External projects"],
  "Music & performance":["Live now","Programme guide","Featured programmes","Videos","Reels","Playlists"],
  "Learning & knowledge":["Programme guide","Featured programmes","Videos","Playlists","External projects"],
  "Community television":["Live now","Programme guide","Featured programmes","Videos","External projects"],
  "My own mix":[...CREATOR_SECTIONS]
};
export function readableForeground(hex:string){const value=hex.replace("#","");if(!/^[0-9a-fA-F]{6}$/.test(value))return "#18202b";const channels=[0,2,4].map(i=>parseInt(value.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2));const luminance=0.2126*channels[0]+0.7152*channels[1]+0.0722*channels[2];return luminance>0.179?"#18202b":"#ffffff";}
export const defaultCreatorChannelConfig:CreatorChannelConfig={
  preset:"My own mix",accentColor:"#155eef",borderColor:"#d8dee8",backgroundColor:"#f4f5f7",
  sections:[...CREATOR_SECTIONS],allowExplore:true,allowWatchlist:true,allowSuggestions:true,
  allowBrokenLinkReports:true,allowComments:true,allowReactions:false,schedule:[]
};
type Props={
  title:string;description:string;value?:Partial<CreatorChannelConfig>;posts:CreatorPublishedItem[];
  onTitleChange:(value:string)=>void;onDescriptionChange:(value:string)=>void;
  onChange:(value:CreatorChannelConfig)=>void;onPreview:()=>void;
};
export default function CreatorChannelStudio({title,description,value,posts,onTitleChange,onDescriptionChange,onChange,onPreview}:Props){
 const config={...defaultCreatorChannelConfig,...value,sections:value?.sections?.length?[...value.sections]:[...defaultCreatorChannelConfig.sections],schedule:value?.schedule||[]};
 const [postId,setPostId]=useState("");const [startsAt,setStartsAt]=useState("");const [duration,setDuration]=useState("60");const [audience,setAudience]=useState<CreatorProgramme["audience"]>("everyone");const [notice,setNotice]=useState("");
 const published=useMemo(()=>posts.filter(p=>(p.status||"published")==="published"),[posts]);
 const previewText=readableForeground(config.backgroundColor),accentText=readableForeground(config.accentColor);
 function update(patch:Partial<CreatorChannelConfig>){onChange({...config,...patch});}
 function addProgramme(e:React.FormEvent){e.preventDefault();const post=published.find(p=>p.id===postId);if(!post||!startsAt){setNotice("Choose a published programme and its start date and time.");return;}const start=new Date(startsAt);if(Number.isNaN(start.getTime())||start.getTime()<Date.now()-60000){setNotice("Choose a future start time for this programme.");return;}const minutes=Math.max(5,Math.min(1440,Number(duration)||60));const next=[...config.schedule,{id:"programme-"+Date.now(),postId,startsAt:start.toISOString(),durationMinutes:minutes,audience}].sort((a,b)=>a.startsAt.localeCompare(b.startsAt));update({schedule:next});setPostId("");setStartsAt("");setDuration("60");setAudience("everyone");setNotice("Programme added to your channel schedule.");}
 function moveSection(index:number,direction:-1|1){const next=[...config.sections],target=index+direction;if(target<0||target>=next.length)return;[next[index],next[target]]=[next[target],next[index]];update({sections:next});}
 function toggleSection(section:string){const next=config.sections.includes(section)?config.sections.filter(x=>x!==section):[...config.sections,section];update({sections:next});}
 return <section className="bp-creator-studio">
  <header className="bp-creator-studio-head"><span className="bp-eyebrow">CREATOR STUDIO · YOUR CHANNEL</span><h2>Design your channel</h2><p>Name it, describe it, arrange your programming and decide how viewers may participate.</p></header>
  <div className="bp-creator-studio-grid">
   <section className="bp-creator-studio-panel">
    <h3>01 · Channel identity</h3>
    <label>Channel name<input value={title} onChange={e=>onTitleChange(e.target.value)} placeholder="Give your channel its own name"/></label>
    <label>Channel description<textarea rows={3} value={description} onChange={e=>onDescriptionChange(e.target.value)} placeholder="Tell viewers what your channel is about and what kind of programming to expect."/></label>
    <label>Starting format<select value={config.preset} onChange={e=>update({preset:e.target.value,sections:[...CREATOR_PRESETS[e.target.value]]})}>{Object.keys(CREATOR_PRESETS).map(x=><option key={x}>{x}</option>)}</select></label>
   </section>
   <section className="bp-creator-studio-panel">
    <h3>02 · Channel appearance</h3>
    <div className="bp-creator-colours">
     <label>Accent colour<input type="color" value={config.accentColor} onChange={e=>update({accentColor:e.target.value})}/><small>Selected tabs, links and highlights</small></label>
     <label>Border colour<input type="color" value={config.borderColor} onChange={e=>update({borderColor:e.target.value})}/><small>Programme and section borders</small></label>
     <label>Channel background<input type="color" value={config.backgroundColor} onChange={e=>update({backgroundColor:e.target.value})}/><small>Channel surface tint</small></label>
    </div>
    <div className="bp-creator-live-preview" style={{background:config.backgroundColor,borderColor:config.borderColor}}>
     <span style={{color:accentText}}>CHANNEL PREVIEW</span><strong style={{color:previewText}}>{title.trim()||"Your channel name"}</strong><p style={{color:previewText}}>{description.trim()||"Your channel description will appear here."}</p><div>{config.sections.slice(0,4).map(x=><span key={x} style={{borderColor:config.borderColor}}>{x}</span>)}</div>
    </div>
    <small className="bp-muted">The interface protects readable text contrast even when you choose a custom palette.</small>
   </section>
  </div>
  <section className="bp-creator-studio-panel">
   <h3>03 · Arrange your channel</h3><p className="bp-muted">Choose which sections viewers see, then move them into your preferred order.</p>
   <div className="bp-creator-section-list">{CREATOR_SECTIONS.map(section=>{const index=config.sections.indexOf(section);return <div className="bp-creator-section-row" key={section}><label className="bp-check"><input type="checkbox" checked={index>=0} onChange={()=>toggleSection(section)}/>{section}</label><div><button type="button" disabled={index<=0} onClick={()=>moveSection(index,-1)} aria-label={"Move "+section+" up"}>↑</button><button type="button" disabled={index<0||index===config.sections.length-1} onClick={()=>moveSection(index,1)} aria-label={"Move "+section+" down"}>↓</button></div></div>})}</div>
  </section>
  <section className="bp-creator-studio-panel">
   <h3>04 · Programme schedule</h3><p className="bp-muted">Arrange your own broadcast-style timetable using published channel items. These are Creator schedules, not a third-party broadcaster's verified EPG.</p>
   <form className="bp-form" onSubmit={addProgramme}>
    <label>Published programme<select required value={postId} onChange={e=>setPostId(e.target.value)}><option value="">Choose from your content library</option>{published.map(p=><option key={p.id} value={p.id}>{p.title} · {p.sourceType||"Media"}</option>)}</select></label>
    <div className="bp-resource-grid"><label>Start date & time<input required type="datetime-local" value={startsAt} onChange={e=>setStartsAt(e.target.value)}/></label><label>Duration (minutes)<input type="number" min="5" max="1440" value={duration} onChange={e=>setDuration(e.target.value)}/></label></div>
    <label>Who can see this programme?<select value={audience} onChange={e=>setAudience(e.target.value as CreatorProgramme["audience"])}><option value="everyone">Everyone who can enter this channel</option><option value="participants">Signed-in participants and above</option><option value="moderators">Moderators and owner only</option></select></label>
    <button className="bp-button bp-primary" disabled={!published.length}>＋ Add to programme schedule</button>
   </form>
   {!config.schedule.length?<p className="bp-empty">Your schedule is empty. Publish a programme, then add its date and time here.</p>:<div className="bp-creator-schedule-list">{config.schedule.map(item=>{const post=published.find(p=>p.id===item.postId);return <article key={item.id}><div><strong>{post?.title||"Unavailable published item"}</strong><small>{new Date(item.startsAt).toLocaleString()} · {item.durationMinutes} min · {item.audience==="everyone"?"All channel viewers":item.audience==="participants"?"Participants and above":"Moderators and owner"}</small></div><button type="button" onClick={()=>update({schedule:config.schedule.filter(x=>x.id!==item.id)})}>Remove</button></article>})}</div>}
   {notice&&<p className="bp-tool-message" role="status">{notice}</p>}
  </section>
  <section className="bp-creator-studio-panel">
   <h3>05 · Viewer permissions</h3><p className="bp-muted">These channel-wide controls work alongside Space access (Public, VIP circles or Access only) and individual programme audience settings.</p>
   <div className="bp-creator-permission-list">
    {([{key:"allowExplore",label:"Explore channel shelves",help:"Allow viewers to browse the channel library."},{key:"allowWatchlist",label:"Save programmes to a watchlist",help:"Let viewers save items for later."},{key:"allowSuggestions",label:"Suggest programmes or sources",help:"Let eligible participants suggest what you should add."},{key:"allowBrokenLinkReports",label:"Report broken links",help:"Let eligible participants report source problems."},{key:"allowComments",label:"Comment on programmes",help:"Allow comments where the published item also permits them."},{key:"allowReactions",label:"React to programmes",help:"Allow reactions where the published item also permits them."}] as const).map(item=><label className="bp-creator-permission" key={item.key}><input type="checkbox" checked={config[item.key]} onChange={e=>update({[item.key]:e.target.checked} as Partial<CreatorChannelConfig>)}/><span><strong>{item.label}</strong><small>{item.help}</small></span></label>)}
   </div>
  </section>
  <div className="bp-creator-studio-footer"><small>Changes save to this browser's Backpack workspace. They are not synced to other devices.</small><button type="button" className="bp-button bp-primary" onClick={onPreview}>Preview channel ↗</button></div>
 </section>;
}
