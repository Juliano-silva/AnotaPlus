var array = []
var count = 0
var Button = document.createElement("button")
Button.id = "FecharConfig"
Button.innerText = "Fechar o Config"


// Create Docs
function Salvar() {
    location.reload()
    if (localStorage.Dots) {
        array = JSON.parse(localStorage.getItem("Dots"))
    }

    array.push({
        "ID": count++,
        "Name": document.getElementById("Name").value,
        "Conteudo": [],
    })

    localStorage.Dots = JSON.stringify(array)
    var Configuration = JSON.parse(localStorage.getItem("Configuration"))
    Configuration.Background_URL?.push(document.getElementById("BackURL").value)
    Configuration.Fonts?.push({
        "Name_Font": document.getElementById("Font").value,
        "Font_Link": document.getElementById("Font_Link").value
    })
    localStorage.Configuration = JSON.stringify(Configuration)
}

function CorRandom(Tamanho) {
    var primary = "#"
    var caracter = "0123456789abcdef"
    for (var i = 0; i < Tamanho; i++) {
        primary += caracter.charAt(Math.floor(Math.random() * caracter.length))
    }
    return primary
}

function Body() {
    var Api = JSON.parse(localStorage.getItem("Dots"))
    var Input = document.createElement("input")
    var Enviar = document.createElement("button")
    for (var i = 0; i < Api.length; i++) {
        var Name = document.createElement("h1")
        Name.id = i
        Name.style.borderLeft = "0.6vh solid" + CorRandom(6)
        Name.style.marginTop = "0.6vh"
        Name.innerText = Api[i].Name
        Name.addEventListener("click", Abrir)
        SidebarConteudo.append(Name)
        function Abrir() {
            document.getElementById("Configuration").innerHTML = ""
            document.getElementById("SidebarPáginas").innerHTML = ""
            Enviar.id = this.id
            Enviar.className = "EnviarBtn"
            Input.id = "Input"
            document.getElementById("Configuration").style.display = "none"
            Input.placeholder = "Adicionar Página"
            Enviar.innerText = "+ Adicionar Página"
            Enviar.addEventListener("click", AddFunc)
            SidebarPáginas.append(Input, Enviar)
            var ID1 = this.id
            for (var j = 0; j < Api[ID1].Conteudo.length; j++) {
                var CaixaConteudo = document.createElement("div")
                CaixaConteudo.id = "CaixaConteudo"
                CaixaConteudo.innerText = Api[ID1].Conteudo[j].Name
                CaixaConteudo.id = j
                CaixaConteudo.className = "ConteudoCaixa"
                CaixaConteudo.addEventListener("click", function () {
                    document.getElementById("Configuration").style.display = "block"
                    var ID_Add = this.id
                    document.title = Api[ID1].Conteudo[ID_Add].Name
                    if (localStorage.Configuration) {
                        var Buscar = JSON.parse(localStorage.getItem("Dots"))
                        document.getElementById("Body").style.backgroundImage = `url(${Buscar[ID1].Conteudo[ID_Add].BackgroundEscolha})`
                        var API = JSON.parse(localStorage.getItem("Configuration"))
                        for (var i = 0; i < API.Background_URL.length; i++) {
                            var ImgCreate = document.createElement("img")
                            ImgCreate.src = API.Background_URL[i]
                            ImgCreate.id = i
                            ImgCreate.classList = "ImgCreate"
                            ImgCreate.addEventListener("click", function () {
                                var API = JSON.parse(localStorage.getItem("Configuration"))
                                Buscar[ID1].Conteudo[ID_Add].BackgroundEscolha = API.Background_URL[this.id]
                                localStorage.Dots = JSON.stringify(Buscar)
                            })
                            document.getElementById("Configuration").append(ImgCreate)
                        }
                        for (var f = 0; f < API.Fonts.length; f++) {
                            var Font_Name = document.createElement("h1")
                            Font_Name.innerText = API.Fonts[f].Name_Font
                            Font_Name.id = f
                            Font_Name.addEventListener("click", function () {
                                var API = JSON.parse(localStorage.getItem("Configuration"))
                                Buscar[ID1].Conteudo[ID_Add].Font = API.Font[this.id]
                                localStorage.Dots = JSON.stringify(Buscar)
                            })
                        }
                        document.getElementById("Configuration").append(Font_Name,Button)
                    }
                    const Conteudo2 = `
                    <div>
                    <div id='Inputs'>
                    <input type="text" id="Texto_Conteudos">
                    <textarea id="AddTexto_Conteudo" cols="30" rows="10"></textarea>
                    <input type="file" placeholder="Adicionar Música , Vídeo ou Image via File" id="File_Conteudo">
                    <input type="text" placeholder="Adicionar Música , Vídeo ou Image via URL" id="Url_Conteudos">
                    <button id=${this.id} onclick="Created(this.id,${ID1})">Click</button>
                    </div>
                    <button id="Add_Conteudo" onclick="ConteudoAbrir()">Adicionar Conteudo</button>
                   <div id='Caixa_DADOS'>
                   <h1>${Api[ID1].Conteudo[ID_Add].Name}</h1>
                   <h3>${Api[ID1].Conteudo[ID_Add].data}</p>
                   <div id='Dados_Dots'></div>
                   </div>
                    </div>
                    `
                    document.getElementById("Conteudo").innerHTML =  Conteudo2
                    for (var i = 0; i < Api[ID1].Conteudo[ID_Add].Dados.length; i++) {
                        var Box = document.createElement("div")
                        var Titulo = document.createElement("h1")
                        var Imgs = document.createElement("img")
                        var Texto = document.createElement("p")
                        Box.id = "Caixa_MiniText"
                        Titulo.innerText = Api[ID1].Conteudo[ID_Add].Dados[i].Conteudo.Name
                        Texto.innerText = Api[ID1].Conteudo[ID_Add].Dados[i].Conteudo.Texto
                        Imgs.src = Api[ID1].Conteudo[ID_Add].Dados[i].Conteudo.Image
                        Box.append(Titulo, Texto, Imgs)
                        document.getElementById("Dados_Dots").append(Box)
                    }
                })
                SidebarPáginas.append(CaixaConteudo)
            }
        }
    }
}

function ConteudoAbrir() {
    document.getElementById("Inputs").style.display = "block"
}

if (localStorage.Configuration) {
    console.log("TEM");
} else {
    var array = ({
        "Fonts": [],
        "Background_URL": [],
        "Background_File": [],
    })
    localStorage.Configuration = JSON.stringify(array)
}


function Created(ID, Class) {
    var Add = JSON.parse(localStorage.getItem("Dots"))
    document.title = Add[Class].Conteudo[ID].Dados
    Add[Class].Conteudo[ID].Dados?.push({
        "Name": document.getElementById("Texto_Conteudos").value,
        "Conteudo": ({
            "Texto": AddTexto_Conteudo.value,
            "File": File_Conteudo.value,
            "Image": Url_Conteudos.value
        }),
        "Backgrounds": [],
        "Fonts": [],
    })
    localStorage.Dots = JSON.stringify(Add)
}

function AddFunc() {
    var Add = JSON.parse(localStorage.getItem("Dots"))
    Add[this.id].Conteudo?.push({
        "Name": document.getElementById("Input").value,
        "Dados": [],
        "data": [],
        "BackgroundEscolha": [],
        "Font": []
    })
    localStorage.Dots = JSON.stringify(Add)
}

function Abrir_Input() {
    document.getElementById("Add").style.display = "block"
}

Button.addEventListener("click",function(){
    document.getElementById("Configuration").style.display = "none"
})

// Sidebar
document.getElementById("OpenSidebar").addEventListener("click", function () {
    document.getElementById("Sidebar").style.display = "block"
})
document.getElementById("CloseSidebar").addEventListener("click", function () {
    document.getElementById("Sidebar").style.display = "none"
})
document.onload = Body()