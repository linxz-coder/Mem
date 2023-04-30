// ==UserScript==
// @name         Download Text File
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Download the text content as a file with one click
// @author       凡学子
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
      //Download Button
      const downloadBtn = document.createElement('div');
      downloadBtn.id = 'download-btn';
      downloadBtn.textContent = 'download';
      downloadBtn.style.position = 'fixed';
      downloadBtn.style.top = '10px';
      downloadBtn.style.right = '10px';
      downloadBtn.style.padding = '8px 16px';
      downloadBtn.style.backgroundColor = '#000';
      downloadBtn.style.fontSize = '15px';
      downloadBtn.style.color = '#fff';
      downloadBtn.style.border = 'none';
      downloadBtn.style.borderRadius = '4px';
      document.body.appendChild(downloadBtn);
  
      //download status
      const downloadStatus = document.createElement('div');
      downloadStatus.id = 'download-status';
      downloadStatus.style.position = 'fixed';
      downloadStatus.style.top = '10px';
      downloadStatus.style.right = '100px';
      downloadStatus.style.width = '100px';
      downloadStatus.style.padding = '6px';
      downloadStatus.style.backgroundColor = '#D3D3D3';
      downloadStatus.style.fontSize = '14px';
      downloadStatus.style.color = '#fff';
      downloadStatus.style.borderRadius = '4px';
      downloadStatus.style.opacity = '0'; // 初始时不可见
      downloadStatus.style.transition = 'opacity 1s'; // 1 秒渐变消失
      downloadBtn.parentNode.insertBefore(downloadStatus, downloadBtn.nextSibling);
  
  
      //mem it Button
      const syncBtn = document.createElement('div');
      syncBtn.id = 'sync-btn';
      syncBtn.textContent = 'mem it';
      syncBtn.style.position = 'fixed';
      syncBtn.style.top = '50px';
      syncBtn.style.right = '10px';
      syncBtn.style.padding = '8px 16px';
      syncBtn.style.fontSize = '15px';
      syncBtn.style.lineHeight = '1.5';
      syncBtn.style.textAlign = 'center';
      syncBtn.style.background = 'linear-gradient(to right, rgb(227, 73, 76), rgb(217, 61, 128))';
      syncBtn.style.color = '#fff';
      syncBtn.style.border = 'none';
      syncBtn.style.borderRadius = '4px';
      syncBtn.style.marginTop = '5px'; //增加按钮与downloadBtn之间的白色缝隙
      document.body.appendChild(syncBtn);
      
      //save Button
      const newBtn = document.createElement('div');
      newBtn.id = 'newBtn';
      newBtn.textContent = 'Mem created successfully!';
      newBtn.style.position = 'fixed';
      newBtn.style.top = '100px';
      newBtn.style.right = '10px';
      newBtn.style.padding = '8px 16px';
      newBtn.style.fontSize = '10px';
      newBtn.style.lineHeight = '1.5';
      newBtn.style.textAlign = 'center';
      newBtn.style.background = '#D3D3D3';
      newBtn.style.color = '#fff';
      newBtn.style.border = 'none';
      newBtn.style.borderRadius = '4px';
      newBtn.style.marginTop = '5px'; //增加按钮与downloadBtn之间的白色缝隙
      document.body.appendChild(newBtn);
      newBtn.style.opacity = '0'; // 初始时不可见
      newBtn.style.transition = 'opacity 1s'; // 1 秒渐变消失
      //newBtn.style.display = 'none'
  
  
      //Uniform font and formatting
      downloadBtn.style.boxSizing = 'border-box';
      syncBtn.style.boxSizing = 'border-box';
      downloadBtn.style.fontFamily = 'inherit';
      syncBtn.style.fontFamily = 'inherit';
  
      //Click element to force refresh
      //setTimeout(function() {
      //const flexDiv = document.getElementsByClassName('flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative');
      //console.log(flexDiv);
      //for (let i = 0; i < flexDiv.length; i++) {
          //flexDiv[i].addEventListener('click', function() {
              //location.reload();
          //});
      //}
  //}, 5000); // 5000 毫秒 = 5 秒
  
  
  
      //鼠标悬浮
      downloadBtn.addEventListener('mouseover', () => {
              downloadBtn.style.cursor = 'pointer';
          });
      downloadBtn.addEventListener('mouseout', () => {
              downloadBtn.style.cursor = 'default';
          });
      syncBtn.addEventListener('mouseover', () => {
              syncBtn.style.cursor = 'pointer';
          });
      syncBtn.addEventListener('mouseout', () => {
              syncBtn.style.cursor = 'default';
          });
  
      setTimeout(function() {
  
          //定义text
          const myCollection = document.getElementsByClassName('min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap break-words');
          let text = '';
  
          function updateText() {
              let newtext = '';
              for (let i = 0; i < myCollection.length; i++) {
                  if (i % 2 === 0) {
                      newtext += '## ' + myCollection[i].innerText + '\n';
                  } else {
                      newtext += myCollection[i].innerText + '\n\n\n\n';
                  }
              };
              console.log(newtext);
              text = newtext;
          }
  
         window.onload = function() {
             updateText();
         };
  
         // 定时更新文本内容
          setInterval(updateText, 10000);
  
  
          downloadBtn.addEventListener('click', function() {
              if (text != "") {
                  // 创建 Blob 对象
                  const blob = new Blob([text], {type: 'text/plain'});
                  // 创建 URL 对象
                  const url = URL.createObjectURL(blob);
                  // 创建 a 标签并设置 download 属性
                  const link = document.createElement('a');
                  link.download = 'mytext.txt';
                  link.href = url;
                  // 将 a 标签添加到 DOM 中并模拟点击
                  document.body.appendChild(link);
                  link.click();
                  // 移除 a 标签并释放 URL 对象
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
  
                  downloadStatus.innerText = 'Downloaded!';
                  downloadStatus.style.opacity = '1';
                  setTimeout(() => {
                      downloadStatus.style.opacity = '0';
                  }, 1500);
              } else {
             alert("wait 10 seconds to load text")
              };
          });
  
          syncBtn.addEventListener('click', function() {
              console.log("memdotai");
              // 发送 POST 请求
              fetch("https://api.mem.ai/v0/mems", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": "ApiAccessToken <your token>"
                  },
                  body: JSON.stringify({
                      content: text
                  })
              })
                  .then(response => {
                  if (response.ok) {
                      console.log("Mem created successfully.");
                      //newBtn.style.display = 'block';
                      newBtn.style.opacity = '1';
                      setTimeout(() => {
                      newBtn.style.opacity = '0';
                  }, 1500);
                  } else {
                      console.error("Error creating mem:");
                      console.error(response.status, response.statusText);
                      alert("wait 10 seconds to load text")
                  }
              })
                  .catch(error => {
                  console.error("Error creating mem:");
                  console.error(error);
              });
          });
  
      }, 2000); 
   // };
  })();
  
  
  