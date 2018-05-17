class Tempate{
    constructor(obj){
        this.id = obj.id;
        this.data = obj.data;
    }

    init(){
        this.insert(this.getContainer(this.id), this.create(this.data));
    }

    getContainer(id){
        return document.getElementById(id);
    }

    create(data){
        return `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${data.src}" alt="Card image cap">
            <div class="card-body">
                <p class="card-text">${data.fileName}</p>
            </div>
        </div>`
    }

    insert(dom, data){
        dom.innerHTML += data;
    }
}

