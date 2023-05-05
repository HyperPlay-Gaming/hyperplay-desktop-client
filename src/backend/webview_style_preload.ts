import { webFrame } from 'electron'

const exposeWindowEthereumProvider = `
document.onreadystatechange = function(e)
{
  if (document.readyState === 'interactive')
  {
    console.log("DOM fully loaded and parsed");
    const styles = '\
    ::-webkit-scrollbar { \
      width: 20px; \
      height: 20px; \
    }\
    ::-webkit-scrollbar-thumb {\
      height: 40%;\
      width: 8px;\
      border: solid 6px transparent;\
      box-shadow: inset 0 0 10px 10px #282B34;\
      border-radius: 80px;\
    }\
    ::-webkit-scrollbar-thumb:hover {\
      box-shadow: inset 0 0 10px 10px #5a5e6a;\
    }\
    ::-webkit-scrollbar-corner {\
      background-color: transparent;\
    }'

    const styleSheet = document.createElement('style')
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
  }
};
`
webFrame.executeJavaScript(exposeWindowEthereumProvider)
