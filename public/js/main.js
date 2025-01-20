const socket = io ();

const bateriaList = document.getElementById("baterias");


socket.on("init", (baterias) =>{
    
    baterias.forEach((bateria) => {
        const li = createBateria(bateria);
        bateriaList.appendChild(li);
    });
});

socket.on("new-bateria", (bateria) => {
    
    baterias.forEach((bateria) => {
        const li = createBateria(bateria);
        bateriaList.appendChild(li);
    });
});
function createBateria(bateria) {
    const li = document.createElement("li"); 
    li.innerHTML = `
    <strong>${bateria.name}</strong> : ${bateria.type}
    `;
    li.className = "collection-item" ;

    return li;

}