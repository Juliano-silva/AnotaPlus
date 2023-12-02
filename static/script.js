var array = []
var count = 0

// Create Docs
function Salvar(){
    if(localStorage.Dots){
        array = JSON.parse(localStorage.getItem("Dots"))
    }

    array.push({
        "ID": count++,
        "Name":document.getElementById("Name").value,
        "Conteudo":[],
        "Mover":[]
    })

    localStorage.Dots = JSON.stringify(array)
}

function Body(){
    var Api = JSON.parse(localStorage.getItem("Dots"))
    var Input = document.createElement("input")
    var Enviar = document.createElement("button")
    for(var i = 0; i < Api.length;i++){
        var Name = document.createElement("h1")
        Name.id = i
        Name.innerText = Api[i].Name
        Name.addEventListener("click",Abrir)
        SidebarConteudo.append(Name)
        function Abrir(){
            document.getElementById("Conteudo").innerHTML = ""
            Enviar.id = this.id
            Input.id = "Input"
            Enviar.innerText = "Click"
            Enviar.addEventListener("click",AddFunc)
            Conteudo.append(Input,Enviar)
            var ID1 = this.id
            for(var j = 0; j < Api[ID1].Conteudo.length; j++){
                var CaixaConteudo = document.createElement("div")
                CaixaConteudo.id = "CaixaConteudo"
                CaixaConteudo.innerText = Api[ID1].Conteudo[j].Name
                CaixaConteudo.id = j
                CaixaConteudo.className = "ConteudoCaixa"
                var ID2 = this.id
                CaixaConteudo.addEventListener("click",function(){
                    console.log(ID2);
                    const Conteudo2 = `
                    <div>
                    <h1>${Api[ID1].Conteudo[ID2].Name}</h1>
                    <p>${Api[ID1].Conteudo[ID2].Conteudo}</p>
                    <h3>${Api[ID1].Conteudo[ID2].data}</p>
                    </div>
                    `

                    document.getElementById("Conteudo").innerHTML = Conteudo2
                })
                Conteudo.append(CaixaConteudo)
            }
        }
    }
}

function AddFunc(){
    var Add = JSON.parse(localStorage.getItem("Dots"))
    Add[this.id].Conteudo?.push({
        "Name":document.getElementById("Input").value,
        "Conteudo":[],
        "data":[],
        "Movimento":[]
    })
    localStorage.Dots = JSON.stringify(Add)
}

// Sidebar
document.getElementById("CloseSidebar").addEventListener("click",function(){
    document.getElementById("Sidebar").style.display = "none"
})
document.onload = Body()