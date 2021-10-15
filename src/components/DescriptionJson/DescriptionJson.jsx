
import draftToHtml from 'draftjs-to-html';
import sanitizeHtml from 'sanitize-html';

export const DescriptionJson = ({descriptionJson}) => {
  const html = draftToHtml(
    JSON.parse(descriptionJson),
  )
  const clean = sanitizeHtml(html)
  return(
    <div dangerouslySetInnerHTML={ {__html: clean} }/>
  )
}

export default DescriptionJson