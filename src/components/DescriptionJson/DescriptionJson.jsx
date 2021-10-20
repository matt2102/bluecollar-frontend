
import draftToHtml from 'draftjs-to-html';
import sanitizeHtml from 'sanitize-html';
import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

export const DescriptionJson = ({descriptionJson}) => {

  let options = {
    entityStyleFn: (entity) => {
      const entityType = entity.get('type').toLowerCase();
      if (entityType === 'link') {
        const data = entity.getData();
        return {
          element: 'a',
          attributes: {
            href: data.url,
            target:'_blank'
          },
          style:
            {color: '#f3cc17',
            backgroundColor: '#f3cc17'},

        };
      }
    }
  };
  const jsonObj = JSON.parse(descriptionJson)
  if(Object.keys(jsonObj).length === 0){
    return null
  }
  const html = stateToHTML(convertFromRaw(jsonObj), options);
  const clean = sanitizeHtml(html)
  return(
    <div dangerouslySetInnerHTML={ {__html: clean} }
      />
  )
}

export default DescriptionJson