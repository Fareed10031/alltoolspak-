"use client";
import { useState, useEffect, useMemo } from "react";
export default function Page() {
  const [dob, setDob] = useState("2000-01-15");
  const [name, setName] = useState("");
  const [now, setNow] = useState(new Date());
  useEffect(()=>{ const t=setInterval(()=>setNow(new Date()),1000); return()=>clearInterval(t); },[]);
  const d = useMemo(()=>{
    if(!dob) return null;
    const b=new Date(dob); if(isNaN(b.getTime())||b>now) return null;
    let y=now.getFullYear()-b.getFullYear(); let m=now.getMonth()-b.getMonth(); let da=now.getDate()-b.getDate();
    if(da<0){ m--; da+=new Date(now.getFullYear(),now.getMonth(),0).getDate(); } if(m<0){ y--; m+=12; }
    const diff=now.getTime()-b.getTime();
    const next=new Date(now.getFullYear(),b.getMonth(),b.getDate()); if(next<now) next.setFullYear(now.getFullYear()+1);
    return { y,m,da, totalDays:Math.floor(diff/86400000), totalWeeks:Math.floor(Math.floor(diff/86400000)/7), totalMonths:y*12+m, hours:Math.floor(diff/3600000), minutes:Math.floor(diff/60000), seconds:Math.floor(diff/1000), day:b.toLocaleDateString('en-US',{weekday:'long'}), nextDays:Math.ceil((next.getTime()-now.getTime())/86400000), nextDate:next.toLocaleDateString() };
  },[dob,now]);
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4"><div className="max-w-4xl mx-auto bg-white rounded-[24px] border p-6">
      <div className="text-[11px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full inline-block font-bold">CALC • 100% FREE & CLIENT-SIDE • PRIVACY FIRST</div>
      <h1 className="text-3xl font-extrabold mt-4">Age Calculator</h1>
      <p className="text-slate-500 mt-2">Calculate exact age from date of birth in years, months, days, and live seconds. High accuracy for Pakistan CNIC, school admissions, job exams.</p>
      <div className="mt-6"><label className="text-xs font-bold">DATE OF BIRTH *</label><input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="w-full mt-2 p-4 border rounded-xl" /></div>
      <div className="mt-4"><label className="text-xs font-bold">FULL NAME OR NICKNAME (OPTIONAL)</label><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Jordan Smith - Optional for sharing" className="w-full mt-2 p-4 border rounded-xl" /><p className="text-[11px] text-slate-400 mt-1">Optional - For personalization only. No data is stored or transmitted.</p></div>
      <div className="mt-6 bg-slate-50 border border-dashed rounded-xl p-3 text-center text-xs text-slate-400">AD SLOT • High Viewability Header Placement • Responsive 728x90 / 300x250</div>
      {d && <div className="mt-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-[24px] p-6"><p>Your exact chronological age is:</p><h2 className="text-4xl font-black mt-2">{d.y} Years, {d.m} Months, {d.da} Days</h2><div className="mt-4 flex gap-2 text-xs"><span className="bg-white/20 px-3 py-1 rounded-full">✓ 100% Client-Side</span><span className="bg-white/20 px-3 py-1 rounded-full">✓ Real-Time Second Counter</span><span className="bg-white/20 px-3 py-1 rounded-full">✓ Leap Year Accurate</span></div></div>}
      {d && <div className="mt-4 bg-slate-50 border rounded-xl p-4"><p className="text-xs font-bold">TOTAL TIME LIVED</p><p><b>{d.totalDays.toLocaleString()}</b> Days</p><p><b>{d.totalWeeks.toLocaleString()}</b> Weeks</p></div>}
      <div className="mt-4 grid gap-3"><button onClick={()=>navigator.clipboard.writeText(`${d?.y} Years`)} className="bg-slate-900 text-white p-4 rounded-xl font-bold">Copy Result</button><button onClick={()=>window.print()} className="bg-white border p-4 rounded-xl font-bold">Print / Save PDF</button></div>
      <div className="mt-4 bg-slate-50 border border-dashed rounded-xl p-3 text-center text-xs">AD SLOT • High CTR Post-Result Slot • Best Performing Ads Placement</div>
      <div className="mt-8"><h2 className="text-2xl font-bold">About Age Calculator on AllToolsPK</h2><p className="mt-3 text-slate-600">Age Calculator on AllToolsPK is a free, privacy-first, client-side tool that calculates exact chronological age in years, months, days, hours, minutes, seconds. 100% private, runs in your browser.</p></div>
    </div></div>
  );
}
