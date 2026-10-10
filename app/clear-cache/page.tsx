"use client";
import { useEffect } from "react";
export default function ClearCache(){useEffect(()=>{async function c(){if('caches' in window){const k=await caches.keys();await Promise.all(k.map(x=>caches.delete(x)));}try{const dbs=await indexedDB.databases();dbs.forEach(db=>{if(db.name) indexedDB.deleteDatabase(db.name);});}catch{}localStorage.clear();sessionStorage.clear();alert("100% Old Background Remover Cache Deleted! Now delete this /clear-cache page and push.");}c();},[]);return <div>Clearing 100% Cache... Done. Now delete this page folder.</div>;}
