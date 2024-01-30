import { webFrame } from 'electron'

const removeBackground = `
document.onreadystatechange = function(e)
{
  if (document.readyState === 'interactive')
  {
    const styles = 'body { background: transparent !important } div.layout-root { padding: 0px !important; padding-top: 10px !important; }'
    const styleSheet = document.createElement('style')
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
  }
};
`
webFrame.executeJavaScript(removeBackground)
