from flask import *
import os,glob,webview
from werkzeug.utils import secure_filename
app = Flask(__name__)

Folder = "C:\\Users\\sustu\\OneDrive\\Imagens\\Programação\\Flask\\AnotaPlus\\Files\\"
FolderR = r"C:\\Users\\sustu\\OneDrive\\Imagens\\Programação\\Flask\\AnotaPlus\\Files\\"

@app.route("/",methods=["GET","POST"])
def Index():
    files = list(filter(os.path.isfile, glob.glob(Folder + "*"))) 
    files.sort(key=os.path.getctime)
    with open('C:/Users/sustu/OneDrive/Imagens/Programação/Flask/AnotaPlus/main.json','w',encoding="utf-8") as arquivo:
        Escrito = str('{"Name_Music":' f"{files}""}")
        arquivo.write(Escrito.replace("'",'"').replace("\\","").replace("C:UserssustuOneDriveImagensProgramaçãoFlaskAnotaPlusFiles",""))
    return render_template("index.html")

@app.route("/Data",methods=['GET',"POST"])
def Data():
    file = request.files['AddBackFile']
    savePath = os.path.join(os.path.join(os.getcwd(), Folder), secure_filename(file.filename))
    file.save(savePath)
    return render_template("index.html")

@app.route("/BuscarJson",methods=["GET","POST"])
def FileName():
    with open("C:/Users/sustu/OneDrive/Imagens/Programação/Flask/AnotaPlus/main.json",encoding="utf-8") as meu_json:
        dados = json.load(meu_json)
        return jsonify(dados)

@app.route('/Json/<path:filename>')
def ImageFolder(filename):
    return send_from_directory(Folder,filename)

if __name__ == "__main__":
    app.run(debug=True,port=4300)


