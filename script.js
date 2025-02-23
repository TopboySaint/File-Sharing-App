let dropZone = document.getElementById("drop-zone");
let fileInput = document.getElementById("fileInput");
let fileList = document.getElementById("file-list");
let sendButton = document.getElementById("send-btn");

let filesToSend = [];

//Drag and drop feature
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.background = "rgba(255, 255, 255, 0.5)";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.background = "transparent";
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.style.background = "transparent";
  handleFiles(e.dataTransfer.files);
});

//File Selection
fileInput.addEventListener("change", (e) => {
  handleFiles(e.target.files);
});

//Handle files
function handleFiles(files) {
  for (let file of files) {
    filesToSend.push(files);
    const fileItem = document.createElement("p");
    fileItem.textContent = `📁 ${file.name} (${(file.size / 1024).toFixed(
      2
    )} KB)`;
    fileList.appendChild(fileItem);
  }
}

//Send files using webRTC
sendButton.addEventListener("click", () => {
  if (filesToSend === 0) {
    alert("No file selected");
    return;
  }

  //Creating a data url for each file
  filesToSend.forEach((file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      const link = document.createElement("a");
      link.href = event.target.result;
      link.download = file.name;
      link.textContent = `Download: ${file.name}`;
      document.getElementById("share-links").appendChild(link);
    };
  });
  alert("Files are ready to be shared!");
});
