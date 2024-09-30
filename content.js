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
      width: 720px;
      height: 520px;
      padding: 85px 0 0 0;
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

// 创建一个 MutationObserver 实例
const classMap = {
  "www.doubao.com": "code-block-element-vwNJex",
  "tongyi.aliyun.com": "tongyi-design-highlighter",
};
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const domain = window.location.hostname;
          const className = classMap[domain];
          if (node.classList.contains(className)) {
            addPreviewButton(node);
          } else {
            const codeAreas = node.querySelectorAll(`.${className}`);
            codeAreas.forEach(addPreviewButton);
          }
        }
      });
    }
  });
});

// 配置 observer
const config = { childList: true, subtree: true };

// 开始观察整个 document
observer.observe(document.body, config);

// 对于页面加载时已经存在的元素，立即添加按钮
document
  .querySelectorAll(".code-block-element-vwNJex")
  .forEach(addPreviewButton);
