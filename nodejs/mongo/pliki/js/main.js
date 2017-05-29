   function getList(){
     var xmlhttp = new XMLHttpRequest();
     var url = "/all";

     xmlhttp.onreadystatechange = function() {
      //  console.log("reolad");
       if (this.readyState == 4 && this.status == 200) {
         console.log("ready");
         var articles = JSON.parse(this.responseText);
         insertArticles(articles);
         console.log(this.responseText);
       } else {
        //  console.log("not ready status: " + this.status)
       };
     };
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
   }
   function insertArticles(obj) {
     var data = "";
     for(var i = 0; i < obj.length; i++){
       data += '<li onclick="getOneArticle(\'' + obj[i]._id.toString() + '\')">';
       data +=  obj[i].title;
       data += '</li>';
     }
     console.log(data);
     document.getElementById("list").innerHTML = data;
   }
   function getOneArticle(id){
     var xmlhttp = new XMLHttpRequest();
     var url = "/one/" + id;

     xmlhttp.onreadystatechange = function() {
       //console.log("reolad");
       if (this.readyState == 4 && this.status == 200) {
         //console.log("ready");
         var article = JSON.parse(this.responseText);
         if(article) {
           document.getElementById('article').innerHTML = article.body;
           document.getElementById('title').innerHTML = article.title;
         } else
           document.getElementById('title').innerHTML = "Brak artykuł";
         console.log(this.responseText);
       } else {
         //console.log("not ready status: " + this.status)
       };
     };
     xmlhttp.open("GET", url, true);
     xmlhttp.send();

   }
   function saveArticle(){
     console.log("save clicked");
     var xmlhttp = new XMLHttpRequest();
     var id = document.getElementById("id").value;
     if(id.length < 1) id ="0";
     var url = "/add/" + id;
     var body = document.getElementById('editor').value;
     var title = document.getElementById('titleEdit').value;
     var params = "title=" + title + "&body=" + body;
     xmlhttp.onreadystatechange = function() {
       //console.log("reolad");
       if (this.readyState == 4 && this.status == 200) {
         getList();
         console.log(this.responseText);
       } else {
         //console.log("not ready status: " + this.status)
       };
     };
     xmlhttp.open("POST", url, true);
     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xmlhttp.send(params);

   }

getList();
