import React, {useState} from "react";

function App(){
  const [q, setQ] = useState("");
  const [history, setHistory] = useState([]);

  async function ask(){
    if(!q) return;
    setHistory(prev => [...prev, {role:"user", text:q}]);
    setQ("");
    try{
      const resp = await fetch(`http://localhost:8000/ask?q=${encodeURIComponent(q)}`);
      const data = await resp.json();
      setHistory(prev => [...prev, {role:"assistant", text:data.answer, source:data.source}]);
    }catch(e){
      setHistory(prev => [...prev, {role:"assistant", text:"Error contacting backend"}])
    }
  }

  return (
    <div style={{maxWidth:800, margin:"20px auto", fontFamily:"Arial"}}>
      <h2>JEE/NEET Tutor (Demo)</h2>
      <div style={{border:"1px solid #ddd", padding:10, minHeight:300}}>
        {history.map((m,i)=>(
          <div key={i} style={{margin:"8px 0", textAlign: m.role==="user"?"right":"left"}}>
            <div style={{display:"inline-block", background: m.role==="user"?"#dcf8c6":"#f1f0f0", padding:10, borderRadius:8}}>
              <div style={{whiteSpace:"pre-wrap"}}>{m.text}</div>
              {m.source && <div style={{fontSize:11, color:"#666", marginTop:6}}>source: {m.source}</div>}
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:10, display:"flex"}}>
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Ask JEE/NEET question..." style={{flex:1, padding:10}} />
        <button onClick={ask} style={{padding:"10px 15px"}}>Ask</button>
      </div>
    </div>
  );
}

export default App;
