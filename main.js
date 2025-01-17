// Modules to control application life and create native browser window

const { app, BrowserWindow, ipcMain } = require('electron');

let ffmpeg = require("fluent-ffmpeg");

const crypto = require('crypto');

let mysql = require('mysql');

var R2 = require('cloudflare-r2')

global.fetch = require('node-fetch')

const fs = require('fs');

//const config = require('./config.json');

const configfile = fs.readFileSync('./config.json');

const config = JSON.parse(configfile);

//console.log(config);

const { spawn, execFile } = require('child_process');

const { access_Key, secret_Key, account_Id, host, user, pass, database } = config;

var r2 = new R2({
  accessKey: access_Key,
  secretKey: secret_Key,
  accountId: account_Id,
  region: 'auto'
});

let mainWindow;

const server_quality_order = [
  "A1080p 2 Legendado (Recomendado)",
  "A1080p 2 Legendado",
  "A1080p 2 Dublado (Recomendado)",
  "A1080p 2 Dublado",
  "A1080p Legendado (Recomendado)",
  "A1080p Legendado",
  "A1080p Dublado (Recomendado)",
  "A1080p Dublado",
  "B1080p 2 Legendado (Recomendado)",
  "B1080p 2 Legendado",
  "B1080p 2 Dublado (Recomendado)",
  "B1080p 2 Dublado",
  "B1080p Legendado (Recomendado)",
  "B1080p Legendado",
  "B1080p Dublado (Recomendado)",
  "B1080p Dublado",
  "FHD 6 Legendado (Recomendado)",
  "FHD 6 Legendado",
  "FHD 6 Dublado (Recomendado)",
  "FHD 6 Dublado",
  "FHD 4 Legendado (Recomendado)",
  "FHD 4 Legendado",
  "FHD 3 Legendado (Recomendado)",
  "FHD 3 Legendado",
  "FHD 3 Dublado (Recomendado)",
  "FHD 3 Dublado",
  "FHD 2 Legendado (Recomendado)",
  "FHD 2 Legendado",
  "FHD 2 Dublado (Recomendado)",
  "FHD 2 Dublado",
  "FHD Legendado (Recomendado)",
  "FHD Legendado",
  "FHD Dublado (Recomendado)",
  "FHD Dublado",
  "HD 6 Legendado (Recomendado)",
  "HD 6 Legendado",
  "HD 6 Dublado (Recomendado)",
  "HD 6 Dublado",
  "HD 4 Legendado (Recomendado)",
  "HD 4 Legendado",
  "HD 3 Legendado (Recomendado)",
  "HD 3 Legendado",
  "HD 3 Dublado (Recomendado)",
  "HD 3 Dublado",
  "HD 2 Legendado (Recomendado)",
  "HD 2 Legendado",
  "HD 2 Dublado (Recomendado)",
  "HD 2 Dublado",
  "HD Legendado (Recomendado)",
  "HD Legendado",
  "HD Dublado (Recomendado)",
  "HD Dublado",
  "1080p 5 Legendado (Recomendado)",
  "1080p 5 Legendado",
  "1080p 5 Dublado (Recomendado)",
  "1080p 5 Dublado",
  "1080p 2 Legendado (Recomendado)",
  "1080p 2 Legendado",
  "1080p 2 Dublado (Recomendado)",
  "1080p 2 Dublado",
  "1080p Legendado (Recomendado)",
  "1080p Legendado",
  "1080p Dublado (Recomendado)",
  "1080p Dublado",
  "720p 5 Legendado (Recomendado)",
  "720p 5 Legendado",
  "720p 5 Dublado (Recomendado)",
  "720p 5 Dublado",
  "720p 2 Legendado (Recomendado)",
  "720p 2 Legendado",
  "720p 2 Dublado (Recomendado)",
  "720p 2 Dublado",
  "720p Legendado (Recomendado)",
  "720p Legendado",
  "720p Dublado (Recomendado)",
  "720p Dublado",
  "480p 5 Legendado (Recomendado)",
  "480p 5 Legendado",
  "480p 5 Dublado (Recomendado)",
  "480p 5 Dublado",
  "480p 2 Legendado (Recomendado)",
  "480p 2 Legendado",
  "480p 2 Dublado (Recomendado)",
  "480p 2 Dublado",
  "480p Legendado (Recomendado)",
  "480p Legendado",
  "480p Dublado (Recomendado)",
  "480p Dublado",
  "SD 6 Legendado (Recomendado)",
  "SD 6 Legendado",
  "SD 6 Dublado (Recomendado)",
  "SD 6 Dublado",
  "SD 4 Legendado (Recomendado)",
  "SD 4 Legendado",
  "SD 3 Legendado (Recomendado)",
  "SD 3 Legendado",
  "SD 3 Dublado (Recomendado)",
  "SD 3 Dublado",
  "SD 2 Legendado (Recomendado)",
  "SD 2 Legendado",
  "SD 2 Dublado (Recomendado)",
  "SD 2 Dublado",
  "SD Legendado (Recomendado)",
  "SD Legendado",
  "SD Dublado (Recomendado)",
  "SD Dublado",
  "HD Mobile Dublado",
  "HD Mobile Legendado",
  "HD Mobile 2 Legendado",
  "HD Mobile 2 Dublado",
  "SD Mobile Legendado (Recomendado)",
  "SD Mobile Legendado",
  "SD Mobile Dublado (Recomendado)",
  "SD Mobile Dublado",
  "A720p 2 Legendado (Recomendado)",
  "A720p 2 Legendado",
  "A720p 2 Dublado (Recomendado)",
  "A720p 2 Dublado",
  "A720p Legendado (Recomendado)",
  "A720p Legendado",
  "A720p Dublado (Recomendado)",
  "A720p Dublado",
  "A480p 2 Legendado (Recomendado)",
  "A480p 2 Legendado",
  "A480p 2 Dublado (Recomendado)",
  "A480p 2 Dublado",
  "A480p Legendado (Recomendado)",
  "A480p Legendado",
  "A480p Dublado (Recomendado)",
  "A480p Dublado",
  "B720p 2 Legendado (Recomendado)",
  "B720p 2 Legendado",
  "B720p 2 Dublado (Recomendado)",
  "B720p 2 Dublado",
  "B720p Legendado (Recomendado)",
  "B720p Legendado",
  "B720p Dublado (Recomendado)",
  "B720p Dublado",
  "B480p 2 Legendado (Recomendado)",
  "B480p 2 Legendado",
  "B480p 2 Dublado (Recomendado)",
  "B480p 2 Dublado",
  "B480p Legendado (Recomendado)",
  "B480p Legendado",
  "B480p Dublado (Recomendado)",
  "B480p Dublado",
  "Legendado (Recomendado)",
  "Legendado",
  "Dublado (Recomendado)",
  "Dublado",
  "480P (Recomendado)",
  "480P"
];


//Electron Environment_Set

async function createWindow () {

  mainWindow = new BrowserWindow({width: 1024, height: 675})
  
  mainWindow.setMenuBarVisibility(false)

  mainWindow.setMinimumSize(1024, 675);
  mainWindow.setMaximumSize(1024, 675);

  mainWindow.setMaximizable(false);

  mainWindow.loadFile('html/index.html')

  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

app.on('ready', readyWindow)

async function readyWindow(){
  try{
    await createWindow();

  }
  catch{

  }
  finally{
    setTimeout(function () {
      getCount();
    }, 500);
    await getVideos();

}
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

let anime_start_point = 0;
let movie_start_point = 0;
let serie_start_point = 0;
let isStop = false;

ipcMain.on('start', async () => {
    //start_convert();
    isStop = false;
    await convert();
});



ipcMain.on('stop', async () => {
  isStop = true;
});


ipcMain.on('set', async (event, host, user, pass, accessKey, secretKey, accountId, database) => {
  console.log(host, user, pass, accessKey, secretKey, accountId, database)
  set_config(host, user, pass, accessKey, secretKey,accountId, database)
});
//m3u8->mp4 convert

    /**
     * Sets the input file
     * @param {String} filename M3U8 file path. You can use remote URL
     * @returns {Function}
     */
function setInputFile(filename) {

      if (!filename) throw new Error("You must specify the M3U8 file address");
      this.M3U8_FILE = filename;
      return this;
}
  
    /**
     * Sets the output file
     * @param {String} filename Output file path. Has to be local :)
     * @returns {Function}
     */
function setOutputFile(filename) {
      if (!filename) throw new Error("You must specify the file path and name");
      this.OUTPUT_FILE = filename;
      return this;
}

async function start_convert(url, bucket_name, episode_id, server){

  console.log(url, bucket_name, episode_id, server)
  const hash = crypto.createHash('md5').update(url).digest("hex");
  const filename = `${hash}`;
  let filetype = ""
      try {
        let replaced1=url.replace("http://streaming-sao-b0-cloud-b1-cdn.usercdn.club","http://bot2.usercdn.club/")
        let replaced2=replaced1.replace("http://streaming-sao-b0-cloud-b2-cdn.usercdn.club","http://bot2.usercdn.club/")
        let replaced3=replaced2.replace("http://streaming-sao-b0-cloud-b3-cdn.usercdn.club","http://bot2.usercdn.club/")
        //let replaced4=replaced3.replace("http://streaming-sao01.cloudplayapp.online","http://bot.cloudplayapp.online")
        mainWindow.webContents.send('show_header',"Convert to MP4");
        mainWindow.webContents.send('hide_spinner');
        mainWindow.webContents.send('show_message',replaced3);
        if(replaced3.includes(".mp4")){
          setInputFile(replaced3);
          setOutputFile(filename + ".mp4");
          filetype = "mp4";
          console.log(filetype)
        }
        else{
          filetype = "m3u8";
          console.log(filetype)
        }
        await convert_process(replaced3, filename, filetype);
        console.log("Conversion completed!");
    } catch (err) {
        console.error("Conversion failed:", err);
        mainWindow.webContents.send('show_header',"Valid URL");
        // throw new ConversionError("Conversion failed", err);
    } finally {
        await upload(filename, bucket_name, episode_id, server);
    } 
}
   /**
     * Sets the input file
     * @param {String} filename M3U8 file path. You can use remote URL
     * @returns {Function}
     */
   function setInputFile(filename) {

    if (!filename) throw new Error("You must specify the M3U8 file address");
    this.M3U8_FILE = filename;
    return this;
}

  /**
   * Sets the output file
   * @param {String} filename Output file path. Has to be local :)
   * @returns {Function}
   */
function setOutputFile(filename) {
    if (!filename) throw new Error("You must specify the file path and name");
    this.OUTPUT_FILE = filename;
    return this;
}


function convert_process(url, filename,filetype) {
      console.log("Converting...");
      console.log(url)
      return new Promise((resolve, reject) => {
        if(filetype === "m3u8"){
        const bat = spawn('cmd.exe', ['/c', "N_m3u8DL-RE.exe " + url + " --save-name " + filename + " -mt -M mp4 -sv best -sa best"]);

        bat.stdout.on('data', (data) => {
          //console.log(data.toString());
          mainWindow.webContents.send('show_message',data.toString());
        });

        bat.stderr.on('data', (data) => {
          console.error(data.toString());
        });

        bat.on('exit', (code) => {
         console.log(`Child exited with code ${code}`);
         resolve();
        });
      }
      else{
          if (!this.M3U8_FILE || !this.OUTPUT_FILE) {
          reject(new Error("You must specify the input and the output files"));
          return;
        }

        ffmpeg(this.M3U8_FILE)
          .on("error", error => {
            reject(new Error(error));
          })
          .on('progress', (progress) => {
            console.log(progress.percent)
            mainWindow.webContents.send('show_message',"Download MP4 file: " + progress.percent + "%");
          })
          .on("end", () => {
            resolve();
          })
          .outputOptions("-c copy")
          .outputOptions("-bsf:a aac_adtstoasc")
          .output(this.OUTPUT_FILE)
          .run();
      }
        });
}

//test
async function start_test(url, bucket_name, episode_id, server){
  try {
    await
      test(url, bucket_name, episode_id, server)
      //mainWindow.webContents.send('preparing');
  } catch (err) {
      console.error("Conversion failed:", err);
      throw new ConversionError("Conversion failed", err);
  } finally {}
}

function test(url, bucket_name, episode_id, server){
    return new Promise((resolve, reject) => {
        let count = 0;
        for (let i = 0; i <= 100; i++) {
            const timeid = setTimeout(() => {
              mainWindow.webContents.send('success', i);
              mainWindow.webContents.send('show_header',"Convert to MP4");
              mainWindow.webContents.send('hide_spinner');
              mainWindow.webContents.send('show_message',url);
              count++;
              if (count>100) {
                clearTimeout(timeid);
                resolve('success');
              }
            }, 10*i);
        }
    })
    .then(async (result)=>{
        const hash = crypto.createHash('md5').update(url).digest("hex");
        const filename = `${hash}`;
        fs.writeFile(filename, 'This is Test File', (err) => {
          if (err) throw err;
          console.log('File created');
        });
        while(!fs.existsSync(filename)) {

        }
        await upload(filename, bucket_name, episode_id, server);
        await fs.unlink(filename, (err) => {
          if (err) throw err;
          console.log('File deleted!'); 
        });

    })
}

//MySQL

let con = mysql.createConnection({
    host: host,
    user: user,
    password: pass,
    database: database
});

function queryDb(sql) {
      return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
}

connectDb();

function connectDb() {
      return new Promise((resolve, reject) => {
        con.connect(err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
}

let anime_episode_ID = [];
let serie_episode_ID = [];
let movie_ID = [];
let current_anime = 0;
let current_serie = 0;
let current_movie = 0;



async function getVideos() {
    await getAnimes("start");
    await getSeries("start");
    await getMovies("start");
    console.log("Completed");
    setTimeout(() => {
      mainWindow.webContents.send('completed loaded');
    }, 500);
}

async function addVideos(){
  if(isStop = true){
  await getAnimes("patrol");
  await getSeries("patrol");
  await getMovies("patrol");
  console.log("Completed");}
}

async function convert(){
  await process_animes();
  await process_series();
  await process_movies();
  console.log("Completed");
  mainWindow.webContents.send('hide_spinner');
}

async function process_animes() {
  let anime_videos = [];
  for(i = anime_start_point; i < anime_episode_ID.length; i++){
    mainWindow.webContents.send('show_header',"Validate URL");
    console.log("anime_episode_ID.length:"+anime_episode_ID.length);
    console.log("current_anime:"+current_anime);
    if (!isStop) {
      const anime_temp_videos = await queryDb('SELECT id, anime_episode_id, server, link FROM anime_videos WHERE anime_episode_id =' + anime_episode_ID[current_anime].id);
      let temp_server = 99999;
      let temp_id = 0;
      let isExist = false;
      console.log("animetempvideo:"+anime_temp_videos.length);
      if (anime_temp_videos.length != 0) {
        for (let j = 0; j < anime_temp_videos.length; j++) {
          if (anime_temp_videos[j].server != "" && temp_server > server_quality_order.indexOf(anime_temp_videos[j].server)) {
            let url = anime_temp_videos[j].link;
            let replaced1 = url.replace("http://streaming-sao-b0-cloud-b1-cdn.usercdn.club", "http://bot2.usercdn.club/")
            let replaced2 = replaced1.replace("http://streaming-sao-b0-cloud-b2-cdn.usercdn.club", "http://bot2.usercdn.club/")
            let replaced3 = replaced2.replace("http://streaming-sao-b0-cloud-b3-cdn.usercdn.club", "http://bot2.usercdn.club/")
            let replaced4=replaced3.replace("http://streaming-sao01.cloudplayapp.online","http://bot.cloudplayapp.online")
            mainWindow.webContents.send('show_message',replaced4);
            if (replaced3.includes('bot')) {
            if(!anime_temp_videos[j].server.includes('R2')) {
              temp_server = server_quality_order.indexOf(anime_temp_videos[j].server);
              temp_id = j;
              isExist = true;
            }
            }
          }
        }
        if (isExist) {
          anime_videos.push(anime_temp_videos[temp_id]);
          let top_quality_server = anime_temp_videos[temp_id].server;
          if (top_quality_server.includes('Legendado')) {
            let tempstr = top_quality_server.replace('Legendado', 'Dublado');
            let Dublado_video = await queryDb('SELECT id, anime_episode_id, server, link FROM anime_videos WHERE anime_episode_id = ' + anime_episode_ID[current_anime].id + ' and server = "' + tempstr + '"');
            if (Dublado_video.length != 0) {
              anime_videos.push(Dublado_video[0]);
            }
          }
          // mainWindow.webContents.send('show_message', "Preparing Animes: " + (i + 1) + " items");
        }
        else{
          await queryDb('UPDATE anime_episodes SET sent = 1 WHERE id =' + anime_temp_videos[temp_id].anime_episode_id);
          await mainWindow.webContents.send('setCountAnime', current_anime + "/" + anime_episode_ID.length);
          getCount();
          current_anime++;
          continue;
        }
      }
      for (let i = 0; i < anime_videos.length; i++) {
        console.log(anime_videos[i].link);
        mainWindow.webContents.send('show_header',"Convert to MP4");
        await start_convert("https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8", "anime", anime_videos[i].anime_episode_id, anime_videos[i].server);
        await queryDb('UPDATE anime_episodes SET sent = 1 WHERE id =' + serie_temp_videos[temp_id].anime_episode_id);
        setTimeout(function () {
          getCount();
        }, 100);
        await mainWindow.webContents.send('setCountAnime', current_anime + "/" + anime_episode_ID.length);
        anime_start_point = i + 1;
      }
      anime_videos = [];
    }
    else{
      break;
    }
    current_anime++;
  }
}
async function process_series(){
  let serie_videos = [];
  for(i = serie_start_point; i < serie_episode_ID.length; i++){
    mainWindow.webContents.send('show_header',"Validate URL");
    console.log("current_anime:"+current_anime);
    if (!isStop) {
      const serie_temp_videos = await queryDb('SELECT id, episode_id, server, link FROM serie_videos WHERE episode_id =' + serie_episode_ID[current_serie].id);
      let temp_server = 99999;
      let temp_id = 0;
      let isExist = false;
      if (serie_temp_videos.length != 0) {
        for (let j = 0; j < serie_temp_videos.length; j++) {
          if (serie_temp_videos[j].server != "" && temp_server > server_quality_order.indexOf(serie_temp_videos[j].server)) {
            let url = serie_temp_videos[j].link;
            let replaced1 = url.replace("http://streaming-sao-b0-cloud-b1-cdn.usercdn.club", "http://bot2.usercdn.club/")
            let replaced2 = replaced1.replace("http://streaming-sao-b0-cloud-b2-cdn.usercdn.club", "http://bot2.usercdn.club/")
            let replaced3 = replaced2.replace("http://streaming-sao-b0-cloud-b3-cdn.usercdn.club", "http://bot2.usercdn.club/")
            let replaced4=replaced3.replace("http://streaming-sao01.cloudplayapp.online","http://bot.cloudplayapp.online")
            mainWindow.webContents.send('show_message',replaced4);
            if (replaced3.includes('bot')) {
              if(!serie_temp_videos[j].server.includes('R2')) {
              temp_server = server_quality_order.indexOf(serie_temp_videos[j].server);
              temp_id = j;
              isExist = true;
            }
            }
          }
        }
        if (isExist) {
          serie_videos.push(serie_temp_videos[temp_id]);
          let top_quality_server = serie_temp_videos[temp_id].server;
          if (top_quality_server.includes('Legendado')) {
            let tempstr = top_quality_server.replace('Legendado', 'Dublado');
            let Dublado_video = await queryDb('SELECT id, episode_id, server, link FROM serie_videos WHERE episode_id = ' + serie_episode_ID[current_serie].id + ' and server = "' + tempstr + '"');
            if (Dublado_video.length != 0) {
              serie_videos.push(Dublado_video[0]);
            }
          }
          // mainWindow.webContents.send('show_message', "Preparing Animes: " + (i + 1) + " items");
        }
        else{
          await queryDb('UPDATE episodes SET sent = 1 WHERE id =' + serie_temp_videos[temp_id].episode_id);
          await mainWindow.webContents.send('setCountSeries', current_serie + "/" + serie_episode_ID.length);
          current_serie++;
          continue;
        }
      }
      for (let i = 0; i < serie_videos.length; i++) {
        console.log(serie_videos[i].link);
        await start_convert(serie_videos[i].link, "serie", serie_videos[i].episode_id, serie_videos[i].server);
        await queryDb('UPDATE episodes SET sent = 1 WHERE id =' + serie_videos[i].episode_id);
        setTimeout(function () {
          getCount();
        }, 100);
        await mainWindow.webContents.send('setCountSeries', current_serie + "/" + serie_episode_ID.length);
        serie_start_point = i + 1;
      }
      serie_videos = [];
    }
    else{
      break;
    }
    current_serie++;
  }
}

async function process_movies(){
  let movie_videos = [];
  for(i = movie_start_point; i < movie_ID.length; i++){
    mainWindow.webContents.send('show_header',"Validate URL");
    console.log("current_anime:"+current_serie);
    if (!isStop) {
      const movie_temp_videos = await queryDb('SELECT id, movie_id, server, link FROM movie_videos WHERE movie_id =' + movie_ID[current_movie].id);
      let temp_server = 99999;
      let temp_id = 0;
      let isExist = false;
      if (movie_temp_videos.length != 0) {
        for (let j = 0; j < movie_temp_videos.length; j++) {
          if (movie_temp_videos[j].server != "" && temp_server > server_quality_order.indexOf(movie_temp_videos[j].server)) {
            let url = movie_temp_videos[j].link;
            let replaced1 = url.replace("http://streaming-sao-b0-cloud-b1-cdn.usercdn.club", "http://bot2.usercdn.club/")
            let replaced2 = replaced1.replace("http://streaming-sao-b0-cloud-b2-cdn.usercdn.club", "http://bot2.usercdn.club/")
            let replaced3 = replaced2.replace("http://streaming-sao-b0-cloud-b3-cdn.usercdn.club", "http://bot2.usercdn.club/")
            let replaced4=replaced3.replace("http://streaming-sao01.cloudplayapp.online","http://bot.cloudplayapp.online")
            mainWindow.webContents.send('show_message',replaced4);
            if (replaced3.includes('bot')) {
              if(!movie_temp_videos[j].server.includes('R2')) {
              temp_server = server_quality_order.indexOf(movie_temp_videos[j].server);
              temp_id = j;
              isExist = true;
            }
            }
          }
        }
        if (isExist) {
          movie_videos.push(movie_temp_videos[temp_id]);
          let top_quality_server = movie_temp_videos[temp_id].server;
          if (top_quality_server.includes('Legendado')) {
            let tempstr = top_quality_server.replace('Legendado', 'Dublado');
            let Dublado_video = await queryDb('SELECT id, movie_id, server, link FROM movie_videos WHERE movie_id = ' + movie_ID[current_movie].id + ' and server = "' + tempstr + '"');
            if (Dublado_video.length != 0) {
              movie_videos.push(Dublado_video[0]);
            }
          }
          // mainWindow.webContents.send('show_message', "Preparing Animes: " + (i + 1) + " items");
        }
        else{
          await queryDb('UPDATE movies SET sent = 1 WHERE id =' + movie_temp_videos[temp_id].movie_id);
          await mainWindow.webContents.send('setCountMovies', current_movie + "/" + movie_ID.length);
          current_movie++;
          continue;
        }
      }
      for (let i = 0; i < movie_videos.length; i++) {
        console.log(movie_videos[i].link);
        
        await start_convert(movie_videos[i].link, "filme", movie_videos[i].id, movie_videos[i].server);
        await queryDb('UPDATE movies SET sent = 1 WHERE id =' + movie_videos[i].movie_id);
        setTimeout(function () {
          getCount();
        }, 100);
        await mainWindow.webContents.send('setCountMovies', current_movie + "/" + movie_ID.length);
        movie_start_point = i + 1;
      }
      movie_videos = [];
    }
    else{
      break;
    }
    current_movie++;
  }
}

async function upload(filename, bucket_name, episode_id, server){

  
  try {
    const fileBuffer = fs.readFileSync(filename+".mp4")
    mainWindow.webContents.send('show_header',"Upload to " + bucket_name + " Bucket");
    mainWindow.webContents.send('show_spinner');
    mainWindow.webContents.send('show_message', filename);

    let putResponse = await r2.putObject({
        bucket : bucket_name,
        key : filename,
        body: fileBuffer
    })


    console.log(putResponse.url)
    if(bucket_name === "anime"){
      await queryDb(`INSERT INTO anime_videos (anime_episode_id, link, server) 
      VALUES('`+episode_id+`', '`+putResponse.url+`', '`+server + "-R2-link"+`')`);
    }
    if(bucket_name === "filme"){
      await queryDb(`INSERT INTO movie_videos (movie_id, link, server) 
      VALUES('`+episode_id+`', '`+putResponse.url+`', '`+server + "-R2-link"+`')`);
    }
    if(bucket_name === "serie"){
      await queryDb(`INSERT INTO serie_videos (episode_id, link, server) 
      VALUES('`+episode_id+`', '`+putResponse.url+`', '`+server + "-R2-link"+`')`);
    }
    console.log("complete upload");
  }
  catch (ex) {
      console.log(ex)
  }
  finally{
    if(fs.existsSync(filename + ".mp4")) {
    await fs.unlink(filename + ".mp4", (err) => {
      if (err) throw err;
      console.log('File deleted!'); 
    });
    }
  }
}
//preparing all data

async function getAnimes(flag){

  try {
    anime_episode_ID = await queryDb('SELECT id FROM anime_episodes where sent = 0');
  } catch (err) {
    console.error('Error: ', err);
  }
  finally{
    
  }
}

async function getSeries(flag){
  try {
    serie_episode_ID = await queryDb('SELECT id FROM episodes where sent = 0');
  } catch (err) {
    console.error('Error: ', err);
  }
}
async function getMovies(flag){
  try {
    movie_ID = await queryDb('SELECT id FROM movies where sent = 0');
  } catch (err) {
    console.error('Error: ', err);
  }
}

async function getCount(){
  //anime_count
    const animeAllCount =await queryDb('SELECT COUNT(*) AS count FROM anime_episodes');
    const animeNewCount =await queryDb('SELECT COUNT(*) AS count FROM anime_episodes where sent = 0');
    const animeCompletedCount =await queryDb('SELECT COUNT(*) AS count FROM anime_episodes where sent = 1');
    let anime_count_all = animeAllCount[0].count;
    let anime_count_new = animeNewCount[0].count;
    let anime_count_completed = animeCompletedCount[0].count;
    anime_arr = {all:anime_count_all, new:anime_count_new, completed:anime_count_completed};
    await mainWindow.webContents.send('animecount', anime_arr);
  //movie_count
    const movieAllCount =await queryDb('SELECT COUNT(*) AS count FROM movies');
    const movieNewCount =await queryDb('SELECT COUNT(*) AS count FROM movies where sent = 0');
    const movieCompletedCount =await queryDb('SELECT COUNT(*) AS count FROM movies where sent = 1');
    let movie_count_all = movieAllCount[0].count;
    let movie_count_new = movieNewCount[0].count;
    let movie_count_completed = movieCompletedCount[0].count;
    movie_arr = {all:movie_count_all, new:movie_count_new, completed:movie_count_completed};
    await mainWindow.webContents.send('moviecount', movie_arr);
  //serie_count
    const serieAllCount =await queryDb('SELECT COUNT(*) AS count FROM episodes');
    const serieNewCount =await queryDb('SELECT COUNT(*) AS count FROM episodes where sent = 0');
    const serieCompletedCount =await queryDb('SELECT COUNT(*) AS count FROM episodes where sent = 1');
    let serie_count_all = serieAllCount[0].count;
    let serie_count_new = serieNewCount[0].count;
    let serie_count_completed = serieCompletedCount[0].count;
    serie_arr = {all:serie_count_all, new:serie_count_new, completed:serie_count_completed};
    await mainWindow.webContents.send('seriecount', serie_arr);
}


// fs.writeFile('./config.json', JSON.stringify(config, null, 2), (err) => {
//   if (err) throw err;
//   console.log('File written!'); 
// });

function set_config(host, user, pass, accessKey, secretKey, accountId, database){
  config.host = host;
  config.user = user;
  config.pass = pass;
  config.access_Key = accessKey;
  config.secret_Key = secretKey;
  config.account_Id = accountId;
  config.database = database;
  fs.writeFile('./config.json', JSON.stringify(config, null, 2), (err) => {
    if (err) throw err;
    console.log('File written!');
  });
}


function find_min(nums) {
  let min_num = Number.INFINITY; // bigger than all other numbers
  for (let num of nums) {
    if (num < min_num) {
      min_num = num; // (Fill in the missing line here)
    }
  }
  return min_num;
}
