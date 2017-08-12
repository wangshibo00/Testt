var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");

//静态化www文件夹
app.use(express.static("www"));

app.get("/api/car/:carname" , (req,res)=>{
	//汽车的名字，就是文件夹的名字，英语
	var carname = req.params.carname;
	//完整的图片文件夹路径
	var dirpath = path.resolve(__dirname , "www/carpic/" , carname);
	//结果
	var results = {"name" : carname , "colors" : {}};
	//readdir表示读取指定文件夹中的所有文件夹名字
	fs.readdir(dirpath , (err , colornames) => {
		if(err){
			res.json({"wrong" : 1});
			return;
		}
		colornames.forEach((colorname)=>{
			var o = {};
			//再次遍历这个颜色文件夹，得到类型，同步遍历。
			//同步函数没有回调函数，都是等号左边得到值
			var typenames = fs.readdirSync(path.resolve(dirpath , colorname));
			typenames.forEach((typename)=>{
				//再次遍历这个颜色的这个类型的文件夹，得到图片名字
				//同步遍历。
				var images = fs.readdirSync(path.resolve(dirpath , colorname , typename) );
				//删除"Thumbs.db"这项
				images = images.filter((item)=>{
					return item != "Thumbs.db";
				});
				o[typename] = images;
			});
			results.colors[colorname] = {"types" : o};
		});
		res.json(results);
	});
});


app.listen(3000);
console.log(3000);