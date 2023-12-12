// Modules to control application life and create native browser window

const { app, BrowserWindow, ipcMain } = require('electron');

let ffmpeg = require("fluent-ffmpeg");

const crypto = require('crypto');

let mysql = require('mysql');

var R2 = require('cloudflare-r2')

global.fetch = require('node-fetch')

const fs = require('fs');

var r2 = new R2({
  accessKey: 'ca6a46cbfe155c8b1f4c85c715864938',
  secretKey: '4f313d0a6d2af9c6893ff1f0aa9668c8f4ce724233fbe126d80568345cceed21',
  accountId: '340cf263fdf44b55df5780b245125d2f',
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

function createWindow () {

  mainWindow = new BrowserWindow({width: 1024, height: 768})
  
  mainWindow.setMenuBarVisibility(false)

  mainWindow.setMinimumSize(1024, 768);
  mainWindow.setMaximumSize(1024, 768);

  mainWindow.setMaximizable(false);

  mainWindow.loadFile('html/index.html')

  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

app.on('ready', createWindow)

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

ipcMain.on('start', async () => {
    //start_convert();
    await convert();
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

async function start_convert(url, bucket_name,episode_id, server){
  const hash = crypto.createHash('md5').update(url).digest("hex");
  const filename = `MP4/`+`${hash}.mp4`;
      try {

        let replaced1=url.replace("http://streaming-sao-b0-cloud-b1-cdn.usercdn.club","http://bot2.usercdn.club/")
        let replaced2=replaced1.replace("http://streaming-sao-b0-cloud-b2-cdn.usercdn.club","http://bot2.usercdn.club/")
        let replaced3=replaced2.replace("http://streaming-sao-b0-cloud-b3-cdn.usercdn.club","http://bot2.usercdn.club/")
        console.log(replaced3);
        setInputFile(replaced3);
        setOutputFile(filename);
        mainWindow.webContents.send('show_header',"Convert to MP4");
        mainWindow.webContents.send('show_message',url);
        await convert_process();
        console.log("Conversion completed!");
    } catch (err) {
        console.error("Conversion failed:", err);
        mainWindow.webContents.send('show_header',"Valid URL");
        // throw new ConversionError("Conversion failed", err);
    } finally {
        await upload(filename, bucket_name, episode_id, server);
    } 
}

function convert_process() {
      console.log("Converting...");
      return new Promise((resolve, reject) => {
        
        if (!this.M3U8_FILE || !this.OUTPUT_FILE) {
          reject(new Error("You must specify the input and the output files"));
          return;
        }

        ffmpeg(this.M3U8_FILE)
          .on("error", error => {
            reject(new Error(error));
          })
          .on('progress', (progress) => {
            mainWindow.webContents.send('success', progress.percent);
          })
          .on("end", () => {
            resolve();
          })
          .outputOptions("-c copy")
          .outputOptions("-bsf:a aac_adtstoasc")
          .output(this.OUTPUT_FILE)
          .run();
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

        console.log(result);
        mainWindow.webContents.send('complete');

        const hash = crypto.createHash('md5').update(url).digest("hex");
        const filename = `MP4/`+`${hash}.mp4`;
        fs.writeFile(filename, 'This is Test File', (err) => {
          if (err) throw err;
          console.log('File created');
        });
        while(!fs.existsSync(filename)) {

        }
        await upload(filename, bucket_name, episode_id, server);
    })
}

//MySQL

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nikolas"
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

let anime_videos = [];
let serie_videos = [];
let movie_videos = [];

getVideos();

async function getVideos() {
    await getAnimes();
    await getSeries();
    await getMovies();
    mainWindow.webContents.send('show_header',"Complete loaded");
}

async function convert(){
  await process_animes();
  await process_series();
  await process_movies();
  console.log("All Completed");
  mainWindow.webContents.send('complete');
}

async function process_animes(){
  for(let i = 0; i < anime_videos.length; i++) {
    await start_test(anime_videos[i].link, "anime", anime_videos[i].anime_episode_id, anime_videos[i].server);
    await mainWindow.webContents.send('setCountAnime', (i + 1) + "/" + anime_videos.length);
  }
}
async function process_series(){
  for(let i = 0; i < serie_videos.length; i++) {
    await start_test(serie_videos[i].link, "serie", serie_videos[i].episode_id, serie_videos[i].server);
    await mainWindow.webContents.send('setCountSeries', (i + 1) + "/" + serie_videos.length);
  }
}
async function process_movies(){
  for(let i = 0; i < movie_videos.length; i++) {
    await start_test(movie_videos[i].link, "filme", movie_videos[i].movie_id, movie_videos[i].server);
    await mainWindow.webContents.send('setCountMovies', (i + 1) + "/" + movie_videos.length);
  }
}

async function upload(filename, bucket_name, episode_id, server){
  try {
    const fileBuffer = fs.readFileSync(filename)
    mainWindow.webContents.send('show_header',"Upload to " + bucket_name + " Bucket");
    mainWindow.webContents.send('show_message',filename);

    let putResponse = await r2.putObject({
        bucket : bucket_name,
        key : filename,
        body: fileBuffer
    })
    console.log(putResponse.url)
    if(bucket_name === "anime"){
      await queryDb(`INSERT INTO hightest_animes (anime_episode_id, R2_link, server) 
      VALUES('`+episode_id+`', '`+putResponse.url+`', '`+server+`')`);
    }
    if(bucket_name === "filme"){
      await queryDb(`INSERT INTO hightest_movies (movie_id, R2_link, server) 
      VALUES('`+episode_id+`', '`+putResponse.url+`', '`+server+`')`);
    }
    if(bucket_name === "serie"){
      await queryDb(`INSERT INTO hightest_series (serie_episode_id, R2_link, server) 
      VALUES('`+episode_id+`', '`+putResponse.url+`', '`+server+`')`);
    }
    console.log("complete upload");
  }
  catch (ex) {
      console.log(ex)
  }
}

//preparing all data

async function getAnimes(){
  try {
    const anime_episodeID = await queryDb('SELECT id FROM anime_episodes');
    for(let i = 0; i < 5; i++) {
      const anime_temp_videos = await queryDb('SELECT id, anime_episode_id, server, link FROM anime_videos WHERE anime_episode_id ='+ anime_episodeID[i].id);
      let temp_server = 99999;
      let temp_id = 0;
          for(let j = 0; j<anime_temp_videos.length; j++){
            if(anime_temp_videos[j].server!="" && temp_server > server_quality_order.indexOf(anime_temp_videos[j].server)){
                temp_server = server_quality_order.indexOf(anime_temp_videos[j].server);
                temp_id = j;
            }
          }
          anime_videos.push(anime_temp_videos[temp_id]);
          mainWindow.webContents.send('show_message',"Preparing animes: "+ (i+1) + "/" + anime_episodeID.length);
    }
  } catch (err) {
    console.error('Error: ', err);
  }
}

async function getSeries(){
  try {
    const serie_episodeID = await queryDb('SELECT id FROM episodes');
    for(let i = 0; i < 5; i++) {
      const serie_temp_videos = await queryDb('SELECT id, episode_id, server, link FROM serie_videos WHERE episode_id ='+ serie_episodeID[i].id);
      let temp_server = 99999;
      let temp_id = 0;
          for(let j = 0; j<serie_temp_videos.length; j++){
            if(serie_temp_videos[j].server!="" && temp_server > server_quality_order.indexOf(serie_temp_videos[j].server)){
                temp_server = server_quality_order.indexOf(serie_temp_videos[j].server);
            }
          }
          serie_videos.push(serie_temp_videos[temp_id]);
          mainWindow.webContents.send('show_message',"Preparing series: "+ (i+1) + "/" + serie_episodeID.length);    
    }
  } catch (err) {
    console.error('Error: ', err);
  }
}

async function getMovies(){
  try {
    const movie_ID = await queryDb('SELECT id FROM movies');
    for(let i = 0; i < movie_ID.length; i++) {
      const movie_temp_videos = await queryDb('SELECT id, movie_id, server, link FROM movie_videos WHERE movie_id ='+ movie_ID[i].id);
      let temp_server = 99999;
      let temp_id = 0;
          for(let j = 0; j<movie_temp_videos.length; j++){
            if(movie_temp_videos[j].server!="" && temp_server > server_quality_order.indexOf(movie_temp_videos[j].server)){
                temp_server = server_quality_order.indexOf(movie_temp_videos[j].server);
            }
          }
          movie_videos.push(movie_temp_videos[temp_id]);
          mainWindow.webContents.send('show_message',"Preparing Movies: "+ (i+1) + "/" + movie_ID.length);    
    }
  } catch (err) {
    console.error('Error: ', err);
  }
}