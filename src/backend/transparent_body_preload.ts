import { webFrame } from 'electron'

const removeBackground = `
document.onreadystatechange = function(e)
{
  if (document.readyState === 'interactive')
  {
    console.log('REMOVING BACKGROUND VIA transparent_body_preload.js')
    const styles = 'body { background-color: transparent !important; }'
    const styleSheet = document.createElement('style')
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
  }
};
`
webFrame.executeJavaScript(removeBackground)
