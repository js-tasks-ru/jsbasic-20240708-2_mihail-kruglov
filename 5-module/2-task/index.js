function toggleText() {
  const doc = document.querySelector(".toggle-text-button");
  const text = document.querySelector("#text");
  doc.onclick = _ => text.hidden = !text.hidden; 
  
}
