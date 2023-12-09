from flask import Flask,render_template,session,redirect,url_for,jsonify,request,send_from_directory
import webview
app = Flask(__name__)

@app.route("/",methods=["GET","POST"])
def Index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True,port=4300)


