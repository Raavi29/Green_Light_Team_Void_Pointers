import React from "react";

export default function VideoPlaceholder({ onUpload }) {
  // onUpload(base64) optional function to upload a test frame
  const handleFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const b = await f.arrayBuffer();
    const base64 = `data:${f.type};base64,${arrayBufferToBase64(b)}`;
    onUpload && onUpload(base64);
  };

  function arrayBufferToBase64(buffer){
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i=0;i<len;i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  return (
    <div className="card">
      <div style={{height:320, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
        <div style={{fontSize:18,fontWeight:700}}>Live Camera</div>
        <div className="small" style={{marginTop:6}}>Video preview placeholder — replace with <code>&lt;video&gt;</code> or stream</div>
        <input style={{marginTop:12}} type="file" accept="image/*" onChange={handleFile} />
      </div>
    </div>
  );
}