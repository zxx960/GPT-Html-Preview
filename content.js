// 创建一个函数来添加按钮
function addPreviewButton(codeArea) {
  // 如果codeArea.textContent中不包含<!DOCTYPE html>，则不添加按钮
  if (!codeArea.textContent.includes("<!DOCTYPE html>")) return;
  if (codeArea.querySelector(".preview-button")) return; // 如果按钮已存在，则不再添加
  const button = document.createElement("button");
  button.textContent = "预览";
  button.className = "preview-button";
  button.style.cssText = `
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 1000;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    background-color: #4CAF50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  `;

  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#45a049";
  });

  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "#4CAF50";
  });

  button.addEventListener("click", () => {
    const content = codeArea.textContent;
    //截取<!DOCTYPE html>到</html>之间的内容
    const start = content.indexOf("<!DOCTYPE html>");
    const end = content.indexOf("</html>");
    const htmlContent = content.substring(start, end + 7);
    // 创建一个弹窗容器
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 820px;
      height: 620px;
      overflow: scroll;
      padding: 50px 0 0 0;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 1000;
    `;
    // 创建一个关闭按钮
    const closeButton = document.createElement("button");
    closeButton.textContent = "关闭";
    closeButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: #ff5c5c;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
    `;
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modal);
    });
    // 创建一个 iframe 元素
    const iframe = document.createElement("iframe");
    iframe.srcdoc = htmlContent;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.borderRadius = "10px";
    // 将 iframe 和关闭按钮添加到弹窗容器中
    modal.appendChild(closeButton);
    modal.appendChild(iframe);
    // 将弹窗容器插入到 body 中
    document.body.appendChild(modal);
  });

  codeArea.style.position = "relative";
  codeArea.appendChild(button);
}

const classMap = {
  "www.doubao.com": "code-block-element-vwNJex",
  "tongyi.aliyun.com": "tongyi-design-highlighter",
};

const domain = window.location.hostname;
const className = classMap[domain];

if (className) {
  setInterval(() => {
    //如果域名是tongyi.aliyun.com，删除classname下面所有的linenumber子元素
    document.querySelectorAll(`.${className}`).forEach((codeArea) => {
      if (domain === "tongyi.aliyun.com") {
        codeArea.querySelectorAll(".linenumber").forEach((item) => item.remove());
      }
      addPreviewButton(codeArea);
    });
  }, 1500);
}
