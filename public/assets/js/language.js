const view = {
    render : ()=>{
        const area = document.getElementById("displayLanguages");
        area.style.background = "none"
        area.style.boxShadow = 0
        const xhr = new XMLHttpRequest();
        xhr.open("Get", "http://localhost:3000/language",true)
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const results = JSON.parse(this.responseText);
                results.map(language => {
                    const div = document.createElement("div");
                    div.innerHTML = `
                        <li class="language-title">${language.title}</li>
                        <li class="actions edit"><button class="btn btn-primary" onClick="editModal(${language.id})" >edit</button></li>
                        <li class="actions fan"><button class="btn btn-danger">del</button></li>
                    `
                    div.classList.add("result");
                    area.appendChild(div);
                    return this.responseText.id;
                });
            }
        }
        xhr.send();
    }
    
}
function editModal(params) {
    console.log(params);
}
view.render();