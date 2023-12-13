var array = []
var ConfigArray = []

// Create Docs
function Salvar() {
    location.reload()
    if (localStorage.Dots) {
        array = JSON.parse(localStorage.getItem("Dots"))
    }

    array.push({
        "Name": document.getElementById("Name").value,
        "Color": document.getElementById("Color").value,
        "Conteudo": [],
    })

    localStorage.Dots = JSON.stringify(array)

    if (localStorage.Configuration) {
        ConfigArray = JSON.parse(localStorage.getItem("Configuration"))
    }

    ConfigArray.push({
        "Fonts": ({
            "Name_Font": document.getElementById("Font").value,
            "Font_Link": document.getElementById("Font_Link").value
        }),
        "Background_URL": document.getElementById("BackURL").value,
        // "Escolhas": ({
        //     "Position": "flex",
        //     "Color": document.getElementById("Color").value,
        //     "ImageWidth": 200,
        //     "ImageHeight": 300,
        //     "Background_Card": "blue"
        // })
    })
    localStorage.Configuration = JSON.stringify(ConfigArray)
}

// Gerar Cores
function CorRandom(Tamanho) {
    var primary = "#"
    var caracter = "0123456789abcdef"
    for (var i = 0; i < Tamanho; i++) {
        primary += caracter.charAt(Math.floor(Math.random() * caracter.length))
    }
    return primary
}

function Body() {
    // Criar as Seções
    var Api = JSON.parse(localStorage.getItem("Dots"))
    for (var i = 0; i < Api.length; i++) {
        var Name = document.createElement("h1")
        var Remove = document.createElement("button")
        var Editar = document.createElement("button")
        var Caixa = document.createElement("div")
        Caixa.id = "CaixaConteudoCaixa"
        Name.id = i
        Remove.id = i
        Editar.id = i
        Remove.innerText = "🗑️"
        Editar.innerText = "🖋️"
        Editar.addEventListener("click", function () {
            document.getElementById("Name").value = JSON.parse(localStorage.getItem("Dots"))[this.id].Name
            var Ids = this.id
            document.getElementById("Update").style.display = "block"
            document.getElementById("Add").style.display = "block"
            document.getElementById("Update").onclick = function () {
                location.reload()
                var Name = document.getElementById("Name").value
                var Modificar;
                if (localStorage.getItem("Dots") == null) {
                    Modificar = []
                } else {
                    Modificar = JSON.parse(localStorage.getItem("Dots"))
                }
                Modificar[Ids].Name = Name
                localStorage.setItem("Dots", JSON.stringify(Modificar))
                document.getElementById("Update").style.display = "none"
            }
        })
        Remove.addEventListener("click", function () {
            location.reload()
            var Dots;
            if (localStorage.getItem("Dots") == null) {
                Dots = []
            } else {
                Dots = JSON.parse(localStorage.getItem("Dots"))
            }
            Dots.splice(this.id, 1)
            localStorage.setItem("Dots", JSON.stringify(Dots))
        })
        Name.style.borderLeft = "0.6vh solid" + Api[i].Color || CorRandom(6)
        Name.style.marginTop = "0.6vh"
        Name.innerText = Api[i].Name
        Name.addEventListener("click", Abrir)
        if (Name.innerText != "") {
            Caixa.append(Name, Remove, Editar)
            SidebarConteudo.append(Caixa)
        }
        // Function Para Abrir as Seções
        function Abrir() {
            document.getElementById("Configuration").innerHTML = ""
            document.getElementById("SidebarPáginaConteudo").innerHTML = ""
            document.getElementById("SidebarPáginas").style.display = "block"
            var ID1 = this.id
            AddPágiFunc.className = ID1
            for (var j = 0; j < Api[ID1].Conteudo.length; j++) {
                var CaixaConteudo = document.createElement("h1")
                var Remove = document.createElement("button")
                var Editar = document.createElement("button")
                var Caixa = document.createElement("div")
                Caixa.id = "CaixaConteudoCaixa"
                CaixaConteudo.innerText = Api[ID1].Conteudo[j].Name
                CaixaConteudo.id = j;
                Remove.id = j;
                Editar.id = j;
                Remove.innerText = "🗑️"
                Remove.addEventListener("click", function () {
                    location.reload()
                    var Dots;
                    if (localStorage.getItem("Dots") == null) {
                        Dots = []
                    } else {
                        Dots = JSON.parse(localStorage.getItem("Dots"))
                    }
                    Dots[ID1].Conteudo[this.id] = ""
                    localStorage.Dots = JSON.stringify(Dots)
                })
                Editar.innerText = "🖋️"
                Editar.addEventListener("click", function () {
                    var Ids = this.id
                    document.getElementById("AddPágina").style.display = "block"
                    document.getElementById("UpdatePágina").style.display = "block"
                    document.getElementById("Input").value = Api[ID1].Conteudo[Ids].Name
                    document.getElementById("UpdatePágina").onclick = function () {
                        location.reload()
                        var Name = document.getElementById("Input").value
                        var Modificar;
                        if (localStorage.getItem("Dots") == null) {
                            Modificar = []
                        } else {
                            Modificar = JSON.parse(localStorage.getItem("Dots"))
                        }
                        Modificar[ID1].Conteudo[Ids].Name = Name
                        localStorage.setItem("Dots", JSON.stringify(Modificar))
                    }
                })
                CaixaConteudo.addEventListener("click", function () {
                    var ID_Add = this.id
                    document.title = Api[ID1].Conteudo[ID_Add].Name
                    var Buscar = JSON.parse(localStorage.getItem("Dots"))
                    var LinkFont = Buscar[ID1].Conteudo[ID_Add].Fonts.Font_Link
                    var NameFont = Buscar[ID1].Conteudo[ID_Add].Fonts.Name_Font
                    document.getElementById("Body").setAttribute('href', LinkFont?.substring(LinkFont.indexOf("https"), LinkFont.indexOf(")")))
                    document.getElementById("Body").style.fontFamily = NameFont?.substring(NameFont.indexOf("'"), NameFont.indexOf(";"))
                    const Conteudo2 = `
                    <div>
                    <div id='Inputs'>
                    <h1 id='AddInputsConteudo'>Adicionar um novo Conteudo</h1>
                    <input type="text" id="Texto_Conteudos">
                    <textarea id="AddTexto_Conteudo" cols="30" rows="10"></textarea>
                    <label for="File_Conteudo">Enviar arquivo</label>
                    <input type="text" placeholder="Adicionar Música , Vídeo ou Image via URL" id="Url_Conteudos">
                    <form action="/Data" id="AddBackFiles"  method="post" enctype="multipart/form-data">
                    <input type="file" placeholder="Adicionar Música , Vídeo ou Image via File" id="AddBackFile" name="AddBackFile">
                    <button>Click Enviar Arquivo</button>
                    </form>
                    <button id='UpdateCard' style='display:none'>Update</button>
                    <button id=${this.id} class="Button_Input" onclick="Created(this.id,${ID1})">Enviar</button>
                    <div id='Config_Conteudo'></div>
                    </div>
                    <button id="Add_Conteudo" onclick="ConteudoAbrir()">Adicionar Conteudo</button>
                   <div id='Caixa_DADOS'>
                   <h1>${Api[ID1].Conteudo[ID_Add].Name}</h1>
                   <h3>${Api[ID1].Conteudo[ID_Add].data}</p>
                   <div id='Dados_Dots'></div>
                   </div>
                    </div>
                    `
                    document.getElementById("Conteudo").innerHTML = Conteudo2
                    for (var i = 0; i < Api[ID1].Conteudo[ID_Add].Dados.length; i++) {
                        var Box = document.createElement("div")
                        var Titulo = document.createElement("h1")
                        var Imgs = document.createElement("img")
                        var Texto = document.createElement("p")
                        var Remove = document.createElement("button")
                        var Editar = document.createElement("button")
                        Box.id = "Caixa_MiniText"
                        Titulo.innerText = Api[ID1].Conteudo[ID_Add].Dados[i].Name
                        Texto.innerHTML = Api[ID1].Conteudo[ID_Add].Dados[i].Conteudo.Texto
                        Imgs.src = Api[ID1].Conteudo[ID_Add].Dados[i].Conteudo.Image
                        $(Imgs).bind("error", function (e) { 
                            $(this).hide(); 
                          }); 
                        var Extension = Api[ID1].Conteudo[ID_Add].Dados[i].Conteudo.File.split('.').pop()
                        Remove.id = i
                        Editar.id = i
                        Remove.innerText = "🗑️"
                        Remove.addEventListener("click", function () {
                            location.reload()
                            var Dots;
                            if (localStorage.getItem("Dots") == null) {
                                Dots = []
                            } else {
                                Dots = JSON.parse(localStorage.getItem("Dots"))
                            }
                            Dots[ID1].Conteudo[ID_Add].Dados[this.id] = ""
                            localStorage.Dots = JSON.stringify(Dots)
                        })
                        Editar.innerText = "🖋️"
                        Editar.addEventListener("click", function () {
                            var Ids = this.id
                            document.getElementById("UpdateCard").style.display = "block"
                            document.getElementById("Inputs").style.display = "block"
                            document.getElementById("Texto_Conteudos").value = Api[ID1].Conteudo[ID_Add].Dados[Ids].Name
                            document.getElementById("AddTexto_Conteudo").value = Api[ID1].Conteudo[ID_Add].Dados[Ids].Conteudo.Texto
                            document.getElementById("Url_Conteudos").value = Api[ID1].Conteudo[ID_Add].Dados[Ids].Conteudo.Image
                            document.getElementById("UpdateCard").onclick = function () {
                                location.reload()
                                var Modificar;
                                if (localStorage.getItem("Dots") == null) {
                                    Modificar = []
                                } else {
                                    Modificar = JSON.parse(localStorage.getItem("Dots"))
                                }
                                Modificar[ID1].Conteudo[ID_Add].Dados[Ids].Name = Texto_Conteudos.value
                                Modificar[ID1].Conteudo[ID_Add].Dados[Ids].Conteudo.Texto = AddTexto_Conteudo.value
                                Modificar[ID1].Conteudo[ID_Add].Dados[Ids].Conteudo.Image = Url_Conteudos.value
                                Modificar[ID1].Conteudo[ID_Add].Dados[Ids].Conteudo.File = document.getElementById("EscolhaFile").innerText
                                localStorage.setItem("Dots", JSON.stringify(Modificar))
                                document.getElementById("UpdateCard").style.display = "none"
                            }
                        })
                        Box.append(Titulo,Texto, Imgs)
                        if(Extension == "jpg" || Extension == "gif" || Extension == "png"){
                            var FileImg = document.createElement("img")
                            FileImg.src = "/Json/" +  Api[ID1].Conteudo[ID_Add].Dados[i].Conteudo.File
                            Box.append(FileImg)
                        }
                        if(Extension == "mp3" || Extension == "m4a"){
                            var FileAudio = document.createElement("audio")
                            FileAudio.controls = true
                            FileAudio.src = "/Json/" +  Api[ID1].Conteudo[ID_Add].Dados[i].Conteudo.File
                            Box.append(FileAudio)
                        }
                        if(Extension == "mp4"){
                            var FileVideo = document.createElement("vido")
                            FileVideo.controls = true
                            FileVideo.src = "/Json/" +  Api[ID1].Conteudo[ID_Add].Dados[i].Conteudo.File
                            Box.append(FileVideo)
                        }
                        Box.append(Remove, Editar)
                        document.getElementById("Dados_Dots").append(Box)
                    }
                    var Buscar = JSON.parse(localStorage.getItem("Dots"))
                    document.getElementById("Body").style.backgroundImage = `url(${Buscar[ID1].Conteudo[ID_Add].BackgroundEscolha})`
                    var API = JSON.parse(localStorage.getItem("Configuration"))
                    var TituloPáginas = document.createElement("h1")
                    TituloPáginas.innerText = "Background Escolher:"
                    document.getElementById("Config_Conteudo").append(TituloPáginas)
                    for (var i = 0; i < API.length; i++) {
                        var ImgCreate = document.createElement("img")
                        ImgCreate.src = API[i].Background_URL
                        ImgCreate.id = i
                        ImgCreate.classList = "ImgCreate"
                        ImgCreate.addEventListener("click", function () {
                            var API = JSON.parse(localStorage.getItem("Configuration"))
                            Buscar[ID1].Conteudo[ID_Add].BackgroundEscolha = API[this.id].Background_URL
                            localStorage.Dots = JSON.stringify(Buscar)
                            location.reload()
                        })
                        if (API[i].Background_URL != "") {
                            document.getElementById("Config_Conteudo").append(ImgCreate)
                        }
                    }
                    var TituloPáginas2 = document.createElement("h1")
                    TituloPáginas2.innerText = "Fonts Escolher:"
                    document.getElementById("Config_Conteudo")?.append(TituloPáginas2)
                    for (var f = 0; f < API.length; f++) {
                        var Font_Name = document.createElement("h2")
                        Font_Name.innerText = API[f].Fonts.Name_Font
                        Font_Name.id = f
                        Font_Name.addEventListener("click", function () {
                            var API = JSON.parse(localStorage.getItem("Configuration"))
                            Buscar[ID1].Conteudo[ID_Add].Fonts = API[this.id].Fonts
                            localStorage.Dots = JSON.stringify(Buscar)
                        })
                        if (API[f].Fonts.Name_Font != "") {
                            document.getElementById("Config_Conteudo").append(TituloPáginas2,Font_Name)
                        }
                    }
                    var TituloPáginas3 = document.createElement("h1")
                    TituloPáginas3.innerText = "Files Escolher:"
                    document.getElementById("Config_Conteudo")?.append(TituloPáginas3)
                    fetch("/BuscarJson").then(function (response) {
                        response.json().then(async (data) => {
                            for (var i = 0; i < data.Name_Music.length; i++) {
                                var Files = document.createElement("h3")
                                Files.innerText = data.Name_Music[i]
                                Files.id = i
                                Files.addEventListener("click", function () {
                                    document.getElementById("EscolhaFile").innerText = data.Name_Music[this.id]
                                })
                                document.getElementById("Config_Conteudo")?.append(Files)
                            }
                        })
                    })
                })
                if (Api[ID1].Conteudo[j] != "") {
                    Caixa.append(CaixaConteudo, Remove, Editar)
                    SidebarPáginaConteudo.append(Caixa)
                }
            }
        }
    }
}

function ConteudoAbrir() {
    document.getElementById("Inputs").style.display = "block"
}


function Created(ID, Class) {
    location.reload()
    var Add = JSON.parse(localStorage.getItem("Dots"))
    document.title = Add[Class].Conteudo[ID].Dados
    Add[Class].Conteudo[ID].Dados?.push({
        "Name": document.getElementById("Texto_Conteudos").value,
        "Conteudo": ({
            "Texto": AddTexto_Conteudo.value,
            "File": document.getElementById("EscolhaFile").innerText,
            "Image": Url_Conteudos.value
        })
    })
    localStorage.Dots = JSON.stringify(Add)
}

function AddFunc() {
    document.getElementById("AddPágina").style.display = "block"
}

document.getElementById("AddPágiFunc").addEventListener("click", function () {
    location.reload()
    var Add = JSON.parse(localStorage.getItem("Dots"))
    Add[this.className].Conteudo?.push({
        "Name": document.getElementById("Input").value,
        "Dados": [],
        "data": new Date().toJSON(),
        "BackgroundEscolha": [],
        "Fonts": []
    })
    localStorage.Dots = JSON.stringify(Add)
})

function Abrir_Input() {
    document.getElementById("Add").style.display = "block"
}

// Sidebar
document.getElementById("OpenSidebar").addEventListener("click", function () {
    document.getElementById("Sidebar").style.display = "block"
})
document.getElementById("CloseSidebar").addEventListener("click", function () {
    document.getElementById("Sidebar").style.display = "none"
    document.getElementById("SidebarPáginas").style.display = "none"
})

document.onload = Body()