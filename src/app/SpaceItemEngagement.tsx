"use client";
import {useEffect,useState} from "react";
type Comment={author:string;text:string};
type Props={spaceId:string;itemId:string;title:string;identity:string;canInteract:boolean;canComment?:boolean;allowComments:boolean;allowReactions:boolean;reactionTypes:string[];comments:Comment[];onComment:(text:string,title:string,itemId:string)=>void};
export default function SpaceItemEngagement({spaceId,itemId,title,identity,canInteract,canComment,allowComments,allowReactions,reactionTypes,comments,onComment}:Props){
 const [votes,setVotes]=useState<Record<string,string[]>>({});
 const [draft,setDraft]=useState("");
 const [message,setMessage]=useState("");
 const storageKey="backpack-os:item-reactions:v1:"+spaceId+":"+itemId;
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem(storageKey)||"{}");setVotes(saved&&typeof saved==="object"?saved:{});}catch{setVotes({});}},[storageKey]);
 function react(reaction:string){if(!canInteract)return;const next:Record<string,string[]>={};Object.entries(votes).forEach(([key,actors])=>{const kept=actors.filter(actor=>actor!==identity);if(kept.length)next[key]=kept;});const already=(votes[reaction]||[]).includes(identity);if(!already)next[reaction]=[...(next[reaction]||[]),identity];setVotes(next);try{localStorage.setItem(storageKey,JSON.stringify(next));}catch{}}
 function submit(e:React.FormEvent){e.preventDefault();if(!draft.trim())return;onComment(draft.trim(),title,itemId);setDraft("");setMessage("Comment saved on this device.");}
 const available=reactionTypes.length?reactionTypes:["Like"];
 const mayComment=canComment??canInteract;
 return <section className="bp-item-engagement" aria-label={"Engagement for "+title}>
  {allowReactions&&<><div className="bp-item-reactions"><span>Reactions</span>{available.map(reaction=><button type="button" key={reaction} disabled={!canInteract} aria-pressed={(votes[reaction]||[]).includes(identity)} onClick={()=>react(reaction)}>{reaction} · {(votes[reaction]||[]).length}</button>)}</div>{!canInteract&&<small>A participating account is required to react.</small>}</>}
  {allowComments&&<div className="bp-item-comments"><strong>Comments · {comments.length}</strong>{comments.map((comment,index)=><p key={index}><b>{comment.author}</b> {comment.text}</p>)}{mayComment?<form onSubmit={submit}><label>Comment on this item<textarea rows={2} value={draft} onChange={e=>setDraft(e.target.value)} placeholder={"Share a thought about "+title+"…"}/></label><button className="bp-button" disabled={!draft.trim()}>Post comment</button></form>:<small>{canInteract?"Your role cannot comment on this item.":"Sign in with a participating account to comment."}</small>}</div>}
  {message&&<small role="status">{message}</small>}
 </section>;
}
